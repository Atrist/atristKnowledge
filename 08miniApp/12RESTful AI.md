# RESTful API

## HTTP的动词
- get:查询
- post:创建
- put:更新
- patch:局部更新
- Delete:删除

## 状态码
- 200:请求成功,返回数据
- 3xx:请求成功,但需要改变请求资源的方式
- 4xx:请求有错误
- 5xx:服务器内部有错误

## 错误处理
```json
{
    "error":"错误的具体信息"
}
```

## 返回结果
- get:返回资源对象列表/单个资源对象
- POST:返回新生成的资源对象
- PUT:返回修改后的完整资源对象
- PATCH:返回被修改的属性
- DELELET:空(状态码204)

## 实例
用户|todo
--|--
GET:/user|GET:/toods <br/>GET:/tood/id
POST:/user|POST:/todos
PATCH:/user|PATCH:/todos/id
<p></p> |DELETE:/toods/id