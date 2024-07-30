// const allowOrigins = ["http://127.0.0.1:5500"];

// module.exports = function (req, res, next) {
//   // 处理预检请求
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       req.headers["access-control-request-method"]
//     );
//     res.header(
//       "Access-Control-Allow-Headers",
//       req.headers["access-control-request-headers"]
//     );
//     res.status(200).send(); // 发送200状态码
//     return; // 阻止继续执行
//   }

//   res.header("Access-Control-Allow-Credentials", true); // 允许带cookie
//   // 处理简单请求或实际请求
//   if ("origin" in req.headers && allowOrigins.includes(req.headers.origin)) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//   }

//   next();
// };

// // 其他代码保持不变
