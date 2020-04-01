# nodejs使用monogdb

## 安装命令
npm install mongodb

# 连接数据库

通过MongoClient.connect连接数据库，在回调中会返回db对象以供之后使用。
```js
var MongoClient = require('mongodb').MongoClient;
var ip = 'localhost';
var port = '27017';
var url = `mongodb://${ip}:${port}/dbname`;
MongoClient.connect(url, function(err, db) {
	if(err){
		console.error(err);
		return;
	}else{
		console.log("Connected correctly to server");
		db.close();
	}
});
```
# 获得Collection
调用db对象的collection获得collection
```js
var collection = db.collection('collectionName');
```
# 添加记录
调用collection的insert|insertMany方法添加记录。
```js
collection.insert[|insertMangy]({name:"myName",age:"myAge"},function(err,result){
	if(err){
		console.error(err);
	}else{
		console.log("insert result:");
		console.log(result);
	}
})
```

# 更新记录
调用collection的updateOne方法更新单个记录。
```js
collection.updateOne({ a : 2 }, { $set: { b : 1 } }, function(err, result) {
	if(err){
		console.error(err);
	}else{
		console.log("update result:");
		console.log(result);
	}
});
```
# 删除记录
调用collection的deleteOne方法更新单个记录。
```js
collection.deleteOne({ a : 3 }, function(err, result) {
    if(err){
        console.error(err);
    }else{
        console.log("delete result:");
        console.log(result);
    }
  });
```
# 查询记录
调用collection的find方法查找记录,find方法的参数为查找条件。
```js
collection.find({}).toArray(function(err, docs) {
    if(err){
        console.error(err);
    }else{
        console.log("find result:");
        console.log(result);
    }
  });
```