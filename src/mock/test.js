const Mock = require("mockjs");

const value = {title: 'aaa'};
const userInfo = {useId: 1,userName:'zhangsan',access:['role_admin']};


Mock.mock("login", "post",{msg: 'login success', code: 0, data: value});
Mock.mock("get_info","get",{msg: 'get info success', code: 0, data: userInfo});
Mock.mock("logout","post",{msg: 'logout success', code: 0});
