const express = require('express');
const router = express.Router();
const UsersModel = require('../models/UsersModel');
const data = require('../data/address');

router.post('/createUsers', function (req, res, next) {
  const { body } = req;
  const result = {
    success: false,
    errorMsg: ''
  };
  const newUser = new UsersModel();
    newUser.avatar = body.avatar;
    newUser.name = body.name;
    newUser.nickName = body.nickName;
    newUser.age = body.age;
    newUser.gender = body.gender;
    newUser.phone = body.phone;
    newUser.email = body.email;
    newUser.address = body.address;
    newUser.save(function(err) {
    if (err) {
      result.errorMsg = "创建用户失败";
    } else {
      result.success = true;
    }
    res.send(result);
    return;
  })
});

router.get('/getAddress', function(req, res, next) {
  res.send(data);
})
module.exports = router;