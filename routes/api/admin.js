const express = require("express");
const router = express.Router();
const jwt = require("../jwt");
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("../getSendResult");
// const cryptor = require("../../util/crypt"); //加密算法
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.password);
    if (result) {
      //cookie的登录方式
      // res.cookie("token", cryptor.encrypt(result.id.toString()), {
      //   path: "/",
      //   domain: "localhost",
      //   maxAge: 7 * 24 * 3600 * 1000,
      //   // signed: true, //对称加密
      // });
      // res.header("authorization", result.id);

      //session的登录方式
      let value = result.id;
      // value = cryptor.encrypt(value.toString());

      // req.session.loginUser = result;
      jwt.publish(10800, { id: value }, res); //发放jwt
    }
    return result;
  })
);
router.post(
  "/addAdmin",
  asyncHandler(async (req, res) => {
    const obj = {
      loginId: req.body.loginId,
      loginPwd: req.body.loginPwd,
    };
    const result = await adminServ.addAdmin(obj);
    return result;
  })
);
router.get(
  "/whoami",
  asyncHandler(async (req, res) => {
    return await adminServ.getAdminById(req.userId);
  })
);

module.exports = router;
