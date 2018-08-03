const Mock = require("mockjs");

const baseUrl = process.env.BASE_URL;

const value = {access: ['role_admin']};

Mock.mock("/login", "post", {msg: 'login fail', code: -1, data: value});
Mock.mock("/logout", "post", {msg: 'logout success', code: 0});
