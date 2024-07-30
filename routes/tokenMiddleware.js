const { getErr } = require("./getSendResult");
// const cryptor = require("../util/crypt"); //加密算法
const jwt = require("./jwt");
// 定义不需要token的请求路径和方法
const noNeedToken = [
  {
    method: "POST",
    path: "/api/admin/login",
  },
  // 如果有其他不需要token的路径和方法，可以在这里添加
];

module.exports = (req, res, next) => {
  // 检查当前请求是否在不需要token的列表中
  const isLoginRequest = noNeedToken.some(
    (route) => route.method === req.method && route.path === req.path
  );
  // 如果是登录请求，则不检查token，直接调用next()
  if (isLoginRequest) {
    next();
    return;
  }

  // // 如果不是登录请求，则检查token
  // let token =
  //   req.cookies.token ||
  //   // req.signedCookies.token || //获取加密后的密钥
  //   (req.headers.authorization
  //     ? req.headers.authorization.split(" ")[1]
  //     : null);

  // // 如果没有token，则返回错误
  // if (!token) {
  //   handleNoToken(res);
  //   return;
  // }

  // const userId = cryptor.decrypt(token);
  // res.user = userId;
  // // 如果有token，则调用next()继续处理请求
  // next();
  //处理session的登录
  // if (req.session.loginUser) {
  //   //说明已经登录了
  //   console.log("====================================");
  //   console.log(req.session);
  //   console.log("====================================");
  //   next();
  // } else {
  //   handleNoToken(req, res, next);
  // }

  const result = jwt.verify(req);
  if (result) {
    req.userId = result.id;
    next();
  } else {
    handleNoToken(res);
  }
};

function handleNoToken(res) {
  res.status(403).send(getErr("没有token", 403));
}
