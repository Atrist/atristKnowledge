## 定义一个 Schemas

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个 collection 里的文档的构成。

```js
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
})
```

在这之后你还想添加 keys 的话， 请使用 [Schema#add](http://www.mongoosejs.net/docs/api.html#schema_Schema-add) 方法。

document 里每个属性的类型都会被转换为 在 `blogSchema` 里定义对应的 [SchemaType](http://www.mongoosejs.net/docs/api.html#schematype_SchemaType)。 例如 `title` 属性会被转换为 `SchemaType String`， 而 `date`属性会被转换为 `SchemaType Date`。 还可以像上面 `meta` 属性，更详细地指定嵌套在里面的属性类型。

允许使用的 SchemaTypes 有:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

更多关于 [SchemaTypes](http://www.mongoosejs.net/docs/schematypes.html)

Schema 的功能不只是定义文档结构和属性类型，它可以定义——

- document 的 [instance methods](http://www.mongoosejs.net/docs/guide.html#methods)
- model 的 [static Model methods](http://www.mongoosejs.net/docs/guide.html#statics)
- [复合索引](http://www.mongoosejs.net/docs/guide.html#indexes)
- 文档的生命周期钩子，也成为[中间件](http://www.mongoosejs.net/docs/middleware.html)

## 创建一个 model

我们要把 schema 转换为一个 [Model](http://www.mongoosejs.net/docs/models.html)， 使用 `mongoose.model(modelName, schema)` 函数：

```js
var Blog = mongoose.model('Blog', blogSchema)
// ready to go!
```

## 实例方法（method）

[documents](http://www.mongoosejs.net/docs/documents.html) 是 Models 的实例。 Document 有很多自带的[实例方法](http://www.mongoosejs.net/docs/api.html#document-js)， 当然也可以自定义我们自己的方法。

```js
// define a schema
var animalSchema = new Schema({ name: String, type: String })

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb)
}
```

现在所有 `animal` 实例都有 `findSimilarTypes` 方法：

```js
var Animal = mongoose.model('Animal', animalSchema)
var dog = new Animal({ type: 'dog' })

dog.findSimilarTypes(function (err, dogs) {
  console.log(dogs) // woof
})
```

- 重写 mongoose 的默认方法会造成无法预料的结果，[相关链接](http://www.mongoosejs.net/docs/api.html#schema_Schema.reserved)。
- **不要**在自定义方法中使用 ES6 箭头函数，会造成 this 指向错误。

## 静态方法（static）

添加 `Model` 的静态方法也十分简单，继续用 `animalSchema` 举例：

```js
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb)
}

var Animal = mongoose.model('Animal', animalSchema)
Animal.findByName('fido', function (err, animals) {
  console.log(animals)
})
```

同样不要在**静态**方法中使用 ES6 箭头函数

## 查询助手（query helper）

查询助手作用于 query 实例，方便你自定义拓展你的 [链式查询](http://www.mongoosejs.net/docs/queries.html)

```js
animalSchema.query.byName = function (name) {
  return this.find({ name: new RegExp(name, 'i') })
}

var Animal = mongoose.model('Animal', animalSchema)
Animal.find()
  .byName('fido')
  .exec(function (err, animals) {
    console.log(animals)
  })
```

## 索引（index）

MongoDB 支持 [secondary indexes](http://docs.mongodb.org/manual/indexes/). 在 mongoose 中，我们在 `Schema` 中定义索引。索引分字段级别和`schema`级别， [复合索引](https://docs.mongodb.com/manual/core/index-compound/) 需要在 schema 级别定义。

```js
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true }, // field level
})

animalSchema.index({ name: 1, type: -1 }) // schema level
```

应用启动时， Mongoose 会自动调用 `createIndex` 初始化你定义的索引。 Mongoose 顺序处理每一个 `createIndex` ，然后在 model 触发 'index' 事件。虽然对开发有利，但建议在生产中禁用此行为，因为创建索引可能会[严重影响性能](http://docs.mongodb.org/manual/core/indexes/#index-creation-operations)。通过将架构的`autoIndex`选项设置为`false`来禁用该行为，或者通过将`autoindex`选项设置为`false`来在连接上全局禁用该行为。

```js
  mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
  mongoose.createConnection('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
  animalSchema.set('autoIndex', false);
  // or
  new Schema({..}, { autoIndex: false });
```

索引构建完成或失败后，Mongoose 会触发 `index` 事件。

```js
// Will cause an error because mongodb has an _id index by default that
// is not sparse
animalSchema.index({ _id: 1 }, { sparse: true })
var Animal = mongoose.model('Animal', animalSchema)

Animal.on('index', function (error) {
  // "_id index cannot be sparse"
  console.log(error.message)
})
```

相关链接 [Model#ensureIndexes](http://www.mongoosejs.net/docs/api.html#model_Model.ensureIndexes)

## 虚拟值（Virtual）

[Virtuals](http://www.mongoosejs.net/docs/api.html#schema_Schema-virtual) 是 document 的属性，但是不会被保存到 MongoDB。 getter 可以用于格式化和组合字段数据， setter 可以很方便地分解一个值到多个字段。

```js
// define a schema
var personSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
})
// compile our model
var Person = mongoose.model('Person', personSchema)

// create a document
var axl = new Person({
  name: { first: 'Axl', last: 'Rose' },
})
```

如果你要 log 出全名，可以这么做：

```js
console.log(axl.name.first + ' ' + axl.name.last) // Axl Rose
```

但是每次都这么拼接实在太麻烦了， 推荐你使用[virtual property getter](http://www.mongoosejs.net/docs/api.html#virtualtype_VirtualType-get)， 这个方法允许你定义一个 `fullName` 属性，但不必保存到数据库。

```js
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last
})
```

现在, mongoose 可以调用 getter 函数访问 `fullName` 属性：

```js
console.log(axl.fullName) // Axl Rose
```

如果对 document 使用 `toJSON()` 或 `toObject()`，默认不包括虚拟值， 你需要额外向 [toObject()](http://www.mongoosejs.net/docs/api.html#document_Document-toObject) 或者 `toJSON()` 传入参数 `{ virtuals: true }`。

你也可以设定虚拟值的 `setter` ，下例中，当你赋值到虚拟值时，它可以自动拆分到其他属性：

```js
personSchema
  .virtual('fullName')
  .get(function () {
    return this.name.first + ' ' + this.name.last
  })
  .set(function (v) {
    this.name.first = v.substr(0, v.indexOf(' '))
    this.name.last = v.substr(v.indexOf(' ') + 1)
  })

axl.fullName = 'William Rose' // Now `axl.name.first` is "William"
```

再次强调，虚拟值不能用于查询和字段选择，因为虚拟值不储存于 MongoDB。

### 别名（Alias）

Aliase 是一种特殊的虚拟值，它的 `getter` 和 `setter` 会无缝链接到另一个值。这是一个节省带宽的做法， 你可以储存一个更短的属性名到数据库，同时在调用的时候保持可读性。

```js
var personSchema = new Schema({
  n: {
    type: String,
    // Now accessing `name` will get you the value of `n`, and setting `n` will set the value of `name`
    alias: 'name',
  },
})

// Setting `name` will propagate to `n`
var person = new Person({ name: 'Val' })
console.log(person) // { n: 'Val' }
console.log(person.toObject({ virtuals: true })) // { n: 'Val', name: 'Val' }
console.log(person.name) // "Val"

person.name = 'Not Val'
console.log(person) // { n: 'Not Val' }
```

## 选项

Schemas 有很多可配置选项，你可以在构造时传入或者直接 `set`：

```js
new Schema({..}, options);

// or

var schema = new Schema({..});
schema.set(option, value);
```

合法的选项:

- [autoIndex](http://www.mongoosejs.net/docs/guide.html#autoIndex)
- [bufferCommands](http://www.mongoosejs.net/docs/guide.html#bufferCommands)
- [capped](http://www.mongoosejs.net/docs/guide.html#capped)
- [collection](http://www.mongoosejs.net/docs/guide.html#collection)
- [id](http://www.mongoosejs.net/docs/guide.html#id)
- [\_id](http://www.mongoosejs.net/docs/guide.html#_id)
- [minimize](http://www.mongoosejs.net/docs/guide.html#minimize)
- [read](http://www.mongoosejs.net/docs/guide.html#read)
- [shardKey](http://www.mongoosejs.net/docs/guide.html#shardKey)
- [strict](http://www.mongoosejs.net/docs/guide.html#strict)
- [strictQuery](http://www.mongoosejs.net/docs/guide.html#strictQuery)
- [toJSON](http://www.mongoosejs.net/docs/guide.html#toJSON)
- [toObject](http://www.mongoosejs.net/docs/guide.html#toObject)
- [typeKey](http://www.mongoosejs.net/docs/guide.html#typeKey)
- [validateBeforeSave](http://www.mongoosejs.net/docs/guide.html#validateBeforeSave)
- [versionKey](http://www.mongoosejs.net/docs/guide.html#versionKey)
- [collation](http://www.mongoosejs.net/docs/guide.html#collation)
- [skipVersioning](http://www.mongoosejs.net/docs/guide.html#skipVersioning)
- [timestamps](http://www.mongoosejs.net/docs/guide.html#timestamps)
- [useNestedStrict](http://www.mongoosejs.net/docs/guide.html#useNestedStrict)

### option: autoIndex

应用启动时，Mongoose 自动发送 `createIndex` 指令， schema 里的每个 index 都会被创建。 如果你需要关闭自动创建功能或者需要在创建后进行一系列操作， 可以把 `autoIndex` 设为 `false`， 然后对 model 调用 [ensureIndexes](http://www.mongoosejs.net/docs/api.html#model_Model.ensureIndexes)：

```js
var schema = new Schema({..}, { autoIndex: false });
var Clock = mongoose.model('Clock', schema);
Clock.ensureIndexes(callback);
```

### option: bufferCommands

默认情况下，当连接断开时，mongoose 会缓冲命令，直到驱动程序设法重新连接为止。 要禁用缓冲，请将`bufferCommands`设置为 false。

```js
mongoose.set('bufferCommands', true);
// Schema option below overrides the above, if the schema option is set.
var schema = new Schema({..}, { bufferCommands: false });
```

### option: capped

Mongoose 支持 MongoDB 的 [capped](http://www.mongodb.org/display/DOCS/Capped+Collections) collections。 要从底层把 collection 设定为 capped （封顶）, 可以把 collection 的最大容量设定到 `capped` 选项（单位[bytes](http://www.mongodb.org/display/DOCS/Capped+Collections#CappedCollections-size.)）。

```js
new Schema({..}, { capped: 1024 });
```

如果您想传递其他选项（例如 [max](http://www.mongodb.org/display/DOCS/Capped+Collections#CappedCollections-max) 或 [autoIndexId](http://www.mongodb.org/display/DOCS/Capped+Collections#CappedCollections-autoIndexId)），则也可以将 capped 选项设置为对象。这个情况下你需要显式传入必要值 `size`。

```js
new Schema({..}, { capped: { size: 1024, max: 1000, autoIndexId: true } });
```

### option: collection

Mongoose 通过 [utils.toCollectionName](http://www.mongoosejs.net/docs/api.html#utils_exports.toCollectionName) 方法 默认生成 collection 的名称（生成 model 名称的复数形式）。 设置这个选项可以自定义名称。

```js
var dataSchema = new Schema({..}, { collection: 'data' });
```

### option: id

Mongoose 会默认生成一个虚拟值 `id`，指向文档的 `_id` 字段。 如果你不需要 id 虚拟值，可以通过这个选项禁用此功能。

```js
// default behavior
var schema = new Schema({ name: String })
var Page = mongoose.model('Page', schema)
var p = new Page({ name: 'mongodb.org' })
console.log(p.id) // '50341373e894ad16347efe01'

// disabled id
var schema = new Schema({ name: String }, { id: false })
var Page = mongoose.model('Page', schema)
var p = new Page({ name: 'mongodb.org' })
console.log(p.id) // undefined
```

### option: \_id

Mongoose 默认给你的 [Schema](http://www.mongoosejs.net/docs/api.html#schema-js) 赋值一个 \_id。 这个值的类型是 [ObjectId](http://www.mongoosejs.net/docs/api.html#schema_Schema.Types)，这与 MongoDB 的默认表现一致。 如果你不需要 `_id`，可以通过这个选项禁用此功能。

此选项**只能**用于 subdocument。 Mongoose 不能保存没有 id 的文档，如果你硬是要这么做，会报错的哦。

```js
// default behavior
var schema = new Schema({ name: String })
var Page = mongoose.model('Page', schema)
var p = new Page({ name: 'mongodb.org' })
console.log(p) // { _id: '50341373e894ad16347efe01', name: 'mongodb.org' }

// disabled _id
var childSchema = new Schema({ name: String }, { _id: false })
var parentSchema = new Schema({ children: [childSchema] })

var Model = mongoose.model('Model', parentSchema)

Model.create({ children: [{ name: 'Luke' }] }, function (error, doc) {
  // doc.children[0]._id will be undefined
})
```

## option: minimize

Mongoose 默认不保存空对象。

```js
var schema = new Schema({ name: String, inventory: {} })
var Character = mongoose.model('Character', schema)

// will store `inventory` field if it is not empty
var frodo = new Character({ name: 'Frodo', inventory: { ringOfPower: 1 } })
Character.findOne({ name: 'Frodo' }, function (err, character) {
  console.log(character) // { name: 'Frodo', inventory: { ringOfPower: 1 }}
})

// will not store `inventory` field if it is empty
var sam = new Character({ name: 'Sam', inventory: {} })
Character.findOne({ name: 'Sam' }, function (err, character) {
  console.log(character) // { name: 'Sam' }
})
```

如果把 `minimize` 选项设为 `false`，Mongoose 将保存空对象。

```js
var schema = new Schema({ name: String, inventory: {} }, { minimize: false })
var Character = mongoose.model('Character', schema)

// will store `inventory` if empty
var sam = new Character({ name: 'Sam', inventory: {} })
Character.findOne({ name: 'Sam' }, function (err, character) {
  console.log(character) // { name: 'Sam', inventory: {}}
})
```

### option: read

允许在架构级别设置[query＃read](http://www.mongoosejs.net/docs/api.html#query_Query-read)选项，从而为我们提供了将默认[ReadPreferences](http://docs.mongodb.org/manual/applications/replication/#replica-set-read-preference)应用于从模型派生的所有查询的方法。

```js
var schema = new Schema({..}, { read: 'primary' });            // also aliased as 'p'
var schema = new Schema({..}, { read: 'primaryPreferred' });   // aliased as 'pp'
var schema = new Schema({..}, { read: 'secondary' });          // aliased as 's'
var schema = new Schema({..}, { read: 'secondaryPreferred' }); // aliased as 'sp'
var schema = new Schema({..}, { read: 'nearest' });            // aliased as 'n'
```

还允许使用每个首选项的别名，因此不必键入“ secondaryPreferred”并拼写错误，我们只需传递“ sp”即可。read 选项还允许我们指定标签集。这些命令告诉[驱动程序](https://github.com/mongodb/node-mongodb-native/)应尝试从副本集中的哪些成员读取。在[此处](http://docs.mongodb.org/manual/applications/replication/#tag-sets)和[此处](http://mongodb.github.com/node-mongodb-native/driver-articles/anintroductionto1_1and2_2.html#read-preferences)阅读有关标签集的更多信息。

注意：在连接时，您还可以指定驱动程序读取优先[策略](http://mongodb.github.com/node-mongodb-native/api-generated/replset.html?highlight=strategy)选项：

```js
// pings the replset members periodically to track network latency
var options = { replset: { strategy: 'ping' }};
mongoose.connect(uri, options);

var schema = new Schema({..}, { read: ['nearest', { disk: 'ssd' }] });
mongoose.model('JellyBean', schema);
```

### option: shardKey

分片相关,当我们拥有[分片的 MongoDB 体系结构](http://www.mongodb.org/display/DOCS/Sharding+Introduction)时，将使用 shardKey 选项。每个分片集合都有一个分片密钥，所有插入/更新操作中都必须存在该分片密钥。我们只需要将此架构选项设置为相同的分片键，就可以完成所有设置。

```js
new Schema({ .. }, { shardKey: { tag: 1, name: 1 }})
```

请注意，Mongoose 不会为您发送`shardcollection`命令。您必须自己配置分片。

### option: strict

Strict 选项默认为 true，这意味着你不能 `save` schema 里没有声明的属性。

```js
var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is not saved to the db

// set to false..
var thingSchema = new Schema({..}, { strict: false });
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is now saved to the db!!
```

`doc.set()` 也受该选项影响：

```js
var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing;
thing.set('iAmNotInTheSchema', true);
thing.save(); // iAmNotInTheSchema is not saved to the db
```

这个值可以在 model 级别重写，在第二个参数值传入：

```js
var Thing = mongoose.model('Thing')
var thing = new Thing(doc, true) // enables strict mode
var thing = new Thing(doc, false) // disables strict mode
```

也可以将`strict`选项设置为“ `throw`”，这将导致产生错误而不是丢弃不良数据。

注意：无论架构选项如何，总是会忽略在架构中不存在的实例上设置的任何键/值。

```js
var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing;
thing.iAmNotInTheSchema = true;
thing.save(); // iAmNotInTheSchema is never saved to the db
```

### option: strictQuery

为了向后兼容，strict 选项不适用于查询的 filter 参数。

```js
const mySchema = new Schema({ field: Number }, { strict: true })
const MyModel = mongoose.model('Test', mySchema)

// Mongoose will **not** filter out `notInSchema: 1`, despite `strict: true`
MyModel.find({ notInSchema: 1 })
```

`strict`选项确实适用于更新。

```js
// Mongoose will strip out `notInSchema` from the update if `strict` is
// not `false`
MyModel.updateMany({}, { $set: { notInSchema: 1 } })
```

```js
const mySchema = new Schema(
  { field: Number },
  {
    strict: true,
    strictQuery: true, // Turn on strict mode for query filters
  }
)
const MyModel = mongoose.model('Test', mySchema)

// Mongoose will strip out `notInSchema: 1` because `strictQuery` is `true`
MyModel.find({ notInSchema: 1 })
```

`Mongoose`有一个单独的`strictQuery`选项，可将过滤器参数的严格模式切换为查询。

```js
const mySchema = new Schema(
  { field: Number },
  {
    strict: true,
    strictQuery: true, // Turn on strict mode for query filters
  }
)
const MyModel = mongoose.model('Test', mySchema)

// Mongoose will strip out `notInSchema: 1` because `strictQuery` is `true`
MyModel.find({ notInSchema: 1 })
```

### option: toJSON

与[toObject](http://www.mongoosejs.net/docs/guide.html#toObject)选项完全相同，但仅在调用文档 toJSON 方法时适用。

```js
var schema = new Schema({ name: String })
schema.path('name').get(function (v) {
  return v + ' is my name'
})
schema.set('toJSON', { getters: true, virtuals: false })
var M = mongoose.model('Person', schema)
var m = new M({ name: 'Max Headroom' })
console.log(m.toObject()) // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom' }
console.log(m.toJSON()) // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
// since we know toJSON is called whenever a js object is stringified:
console.log(JSON.stringify(m)) // { "_id": "504e0cd7dd992d9be2f20b6f", "name": "Max Headroom is my name" }
```

要查看所有可用的 toJSON / toObject 选项，请阅读[此内容](http://www.mongoosejs.net/docs/api.html#document_Document-toObject)。

### option: toObject

Documents 的 [toObject](http://www.mongoosejs.net/docs/api.html#document_Document-toObject) 方法可以把文档转换成一个 plain javascript object （也就是去掉里面的方法）。 这是一个可以接收多个参数的方法，我们可以在 schemas 定义这些参数。

例如要打印出虚拟值，可以向 `toObject` 传入 `{ getters: true }`：

```js
var schema = new Schema({ name: String })
schema.path('name').get(function (v) {
  return v + ' is my name'
})
schema.set('toObject', { getters: true })
var M = mongoose.model('Person', schema)
var m = new M({ name: 'Max Headroom' })
console.log(m) // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
```

完整的 toObject 选项请看[这里](http://www.mongoosejs.net/docs/api.html#document_Document-toObject)。

### option: typeKey

默认情况下，如果您的架构中有一个带有键“类型”的对象，mongoose 会将其解释为类型声明。

```js
// Mongoose interprets this as 'loc is a String'
var schema = new Schema({ loc: { type: String, coordinates: [Number] } })
```

但是，对于像 [geoJSON](http://docs.mongodb.org/manual/reference/geojson/) 这样的应用程序，“ type”属性很重要。如果要控制使用哪个键 mongoose 查找类型声明，请设置“ typeKey”架构选项。

```js
var schema = new Schema(
  {
    // Mongoose interpets this as 'loc is an object with 2 keys, type and coordinates'
    loc: { type: String, coordinates: [Number] },
    // Mongoose interprets this as 'name is a String'
    name: { $type: String },
  },
  { typeKey: '$type' }
) // A '$type' key means this object is a type declaration
```

### option: validateBeforeSave

默认情况下，文档在保存到数据库之前会自动进行验证。这是为了防止保存无效的文档。如果要手动处理验证并能够保存未通过验证的对象，则可以将`validateBeforeSave`设置为 false。

```js
var schema = new Schema({ name: String })
schema.set('validateBeforeSave', false)
schema.path('name').validate(function (value) {
  return v != null
})
var M = mongoose.model('Person', schema)
var m = new M({ name: null })
m.validate(function (err) {
  console.log(err) // Will tell you that null is not allowed.
})
m.save() // Succeeds despite being invalid
```

### option: versionKey

`versionKey` 是 Mongoose 在文件创建时自动设定的。 这个值包含文件的[内部修订号](http://aaronheckmann.tumblr.com/post/48943525537/mongoose-v3-part-1-versioning)。 `versionKey` 是一个字符串，代表版本号的属性名， 默认值为 `__v`。如果这个值与你的计划冲突，你可以设定为其他名称：

```js
var schema = new Schema({ name: 'string' });
var Thing = mongoose.model('Thing', schema);
var thing = new Thing({ name: 'mongoose v3' });
thing.save(); // { __v: 0, name: 'mongoose v3' }

// customized versionKey
new Schema({..}, { versionKey: '_somethingElse' })
var Thing = mongoose.model('Thing', schema);
var thing = new Thing({ name: 'mongoose v3' });
thing.save(); // { _somethingElse: 0, name: 'mongoose v3' }
```

你也可以赋值为 `false` 禁用 `versionKey`。 你不应该随便禁用这个功能，[除非你清楚知道这有什么影响](http://aaronheckmann.tumblr.com/post/48943525537/mongoose-v3-part-1-versioning)。
```js
new Schema({..}, { versionKey: false });
var Thing = mongoose.model('Thing', schema);
var thing = new Thing({ name: 'no versioning please' });
thing.save(); // { name: 'no versioning please' }
```
### option: collation
为 查询（query）和 聚合（aggregation）设置 [collation](https://docs.mongodb.com/manual/reference/collation/)。 这里有一份友好的 [collation 指南](http://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-34-collations)。
```js
var schema = new Schema({
  name: String
}, { collation: { locale: 'en_US', strength: 1 } });

var MyModel = db.model('MyModel', schema);

MyModel.create([{ name: 'val' }, { name: 'Val' }]).
  then(function() {
    return MyModel.find({ name: 'val' });
  }).
  then(function(docs) {
    // `docs` will contain both docs, because `strength: 1` means
    // MongoDB will ignore case when matching.
  });
```
### option: skipVersioning
`skipVersioning`允许从版本控制中排除路径（即，即使这些路径已更新，内部修订版也不会递增）。除非您知道自己在做什么，否则请勿这样做。对于子文档，请使用完全限定的路径将此内容包括在父文档中。
```js
new Schema({..}, { skipVersioning: { dontVersionMe: true } });
thing.dontVersionMe.push('hey');
thing.save(); // version is not incremented
```
### option: timestamps
如果设置了 `timestamps` 选项, `mongoose` 会在你的 `schema` 自动添加 createdAt 和 updatedAt 字段， 其类型为 [Date](http://www.mongoosejs.net/docs/api.html#schema-date-js)。

这两个字段的默认名是 `createdAt` 和 `updatedAt`， 你可以通过设定 `timestamps.createdAt` 和 `timestamps.updatedAt` 自定义字段名称。
```js
var thingSchema = new Schema({..}, { timestamps: { createdAt: 'created_at' } });
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing();
thing.save(); // `created_at` & `updatedAt` will be included
```
### option: useNestedStrict
在 mongoose4 中，`update()` 和 `findOneAndUpdate()`只检查顶层 schema 的严格模式设定。
```js
var childSchema = new Schema({}, { strict: false });
var parentSchema = new Schema({ child: childSchema }, { strict: 'throw' });
var Parent = mongoose.model('Parent', parentSchema);
Parent.update({}, { 'child.name': 'Luke Skywalker' }, function(error) {
  // 报错！原因是父Schema设定为`strict: throw`，但是因为只检查顶层，导致
  // 子Schema的 `strict: false` 遭到无情忽视
});

var update = { 'child.name': 'Luke Skywalker' };
var opts = { strict: false };
Parent.update({}, update, opts, function(error) {
  // 这样可以，因为重写了父Schema的 strict 选项
});
```
如果您把`useNestedStrict`设为true，mongoose 就不会忽略嵌套的strict设定。
```js
var childSchema = new Schema({}, { strict: false });
var parentSchema = new Schema({ child: childSchema },
  { strict: 'throw', useNestedStrict: true });
var Parent = mongoose.model('Parent', parentSchema);
Parent.update({}, { 'child.name': 'Luke Skywalker' }, function(error) {
  // Works!
});
```