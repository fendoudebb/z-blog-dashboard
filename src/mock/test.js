const Mock = require("mockjs");

const value = {access: ['role_admin']};

Mock.mock("/login", "post", {msg: 'login success', code: 0, data: value});
Mock.mock("/logout", "post", {msg: 'logout success', code: 0});
