# nodejs使用monogdb

## 安装命令
npm install mongodb

# 连接数据库

通过MongoClient.connect连接数据库，在回调中会返回db对象以供之后使用。
```js
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dbname';
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