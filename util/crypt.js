//加密与解密，对称加密
const miyao = Buffer.from("dizao06demiyaocs"); //密钥为128位
const crypto = require("crypto"); //node的加密库
const results = crypto.getCiphers(); //查看支持的所有加密算法
//向量iv  随机向量
const iv = Buffer.from("aa02dpe8fj16rgng");
exports.encrypt = function (str) {
  //返回一个函数，传入加密发方式，results中，密钥，iv
  const cry = crypto.createCipheriv("aes-128-cbc", miyao, iv);
  //进行加密，传入加密的东西，类型，和加密后的类型
  let result = cry.update(str, "utf-8", "hex");
  result += cry.final("hex");
  return result;
};
exports.decrypt = function (str) {
  const decrypt = crypto.createDecipheriv("aes-128-cbc", miyao, iv);
  let result = decrypt.update(str, "hex", "utf-8");
  result += decrypt.final("utf-8");
  return result;
};
