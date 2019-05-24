var express = require('express');
var router = express.Router();
var SubscribeModel = require('../models/SubscribeModel');

router.post('/login', function (req, res, next) {
  const result = {
    success: false,
    errorMsg: '',
  }
  /**
   * search dbs whether user is exist
   */
  const { body } = req;
  SubscribeModel.find({ username: body.username, password: body.password }, function (err, docs) {
    if (err) {
      result.errorMsg = err;
    } else {
      if (docs && docs.length !== 0) {
        result.success = true;
        result.username = body.username;
      } else {
        result.errorMsg = '用户不存在，请先注册!';
      }
    };
    res.send(result);
  })
})

router.post('/register', function(req, res, next) {
  const result = {
    success: false,
    errorMsg: ''
  };
  const { body } = req;
  /**
   * check whether dbs has username
   */
  SubscribeModel.find({ username: body.username }, function(err, docs) {
    if (!err) {
      if (docs && docs.length !== 0) {
        result.errorMsg = '此用户名已被注册，请重新输入';
      } else {
        /**
         * register username to dbs
         */
        var newUser = new SubscribeModel();
        newUser.username = body.username;
        newUser.password = body.password;
        newUser.save(function(err) {
          if (err) {
            result.errorMsg = '注册失败';
          } else {
            result.success = true;
          }
          res.send(result);
        })
        return;
      }
      res.send(result);
      return;
    }
    res.send(result);
  })
})

router.post('/logout', function (req, res, next) {
  const result = {
    success: false,
    errorMsg: '',
  }
  const { username } = req.body;
  if (username) {
    result.success = true;
  } else {
    result.errorMsg = '退出失败';
  }
  res.json(result);
})

module.exports = router;
