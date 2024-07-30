const secrect = "dizao06";
const jwt = require("jsonwebtoken");
const cookieKey = "jwt"; // 定义cookie的键名

exports.publish = function (maxAge = 3600 * 24, info = {}, res) {
  // 生成jwt
  const token = jwt.sign(info, secrect, {
    expiresIn: maxAge,
  });
  // 添加到cookie
  // res.cookie(cookieKey, token, {
  //   maxAge: maxAge * 1000, // 将秒转换为毫秒
  //   path: "/",
  //   httpOnly: true, // 增加安全性
  // });
  // 添加到HTTP响应头
  res.set("Authorization", `Bearer ${token}`);
};

exports.verify = function (req) {
  // 验证令牌
  let token;
  // 尝试从cookie或Authorization头中获取token
  token = req.cookies[cookieKey] || req.headers.authorization;

  if (token) {
    // 如果token是从cookie中获取的，则不需要进一步处理
    // 如果token是从Authorization头中获取的，可能需要提取token部分
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    try {
      // 使用jwt库验证token
      const result = jwt.verify(token, secrect);
      return result; // 返回解码后的信息
    } catch (err) {
      // 令牌无效或已过期，处理错误
      console.error("Token verification failed:", err);
      return null;
    }
  } else {
    // 没有找到token
    return null;
  }
};
