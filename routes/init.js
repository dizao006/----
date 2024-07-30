const express = require("express");
const app = express();
const cors = require("cors");
// 映射public目录中的静态资源
const path = require("path");
// const session = require("express-session");
// app.use(
//   session({
//     secret: "dizao ",
//     name: "sessionId",
//   })
// );

const staticRoot = path.resolve(__dirname, "../public");
app.use(express.static(staticRoot));

//cors处理跨域问题

// app.use(require("./corsMiddleware"));
// const whiteList = ["null"];
const corsOptions = {
  origin: "http://127.0.0.1:5500", // 允许来自前端开发服务器的请求
  credentials: true, // 允许发送Cookie
};

app.use(cors(corsOptions));

//加入cookieparser中间件,加入后会在req对象中注入cookies属性，用于获取所有请求传递来的cookie，同时可以设置cookie
const cookieParser = require("cookie-parser");
// app.use(cookieParser("dizao")); //对称密钥加密
app.use(cookieParser());
//加入解析token的中间件
app.use(require("./tokenMiddleware"));

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

// 处理 api 的请求
app.use("/api/student", require("./api/student"));
// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));
app.use("/api/admin", require("./api/admin"));

// 处理错误的中间件
app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
