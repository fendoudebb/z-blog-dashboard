const Mock = require("mockjs");

const baseUrl = process.env.BASE_URL;

const value = {access: ['role_admin']};

const data = {"number":0,"numberOfElements":5,"size":5,"totalElements":5,"totalPages":1,"content":[{"id":6,"title":"da","author":"msj","description":"da","original":true,"updateTime":"2018-07-04T22:06:20","articleModule":"android","articleModuleAlias":"Android"},{"id":5,"title":"aa","author":"msj","description":"a","original":true,"updateTime":"2018-07-01T21:16:29","articleModule":"java","articleModuleAlias":"Java"},{"id":4,"title":"312","author":"msj","description":"312","original":true,"updateTime":"2018-07-01T21:09:25","articleModule":"android","articleModuleAlias":"Android"},{"id":3,"title":"addsad","author":"msj","description":"dsad","original":true,"updateTime":"2018-07-01T08:17:32","articleModule":"ios","articleModuleAlias":"iOS"},{"id":2,"title":"12","author":"msj","description":"321","original":true,"updateTime":"2018-07-01T00:19:45","articleModule":null,"articleModuleAlias":null}],"lastModifyTime":1533307983245};

Mock.mock(baseUrl+"/login?username=aaa&password=aaa", "post", {msg: 'login success', code: 0, data: value});
Mock.mock(baseUrl+"/logout", "post", {msg: 'logout success', code: 0});
Mock.mock(baseUrl+"/admin/article/list", "post", {msg: 'logout success', code: 0,data: data});
