const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/User')

userRouter.post('/user_register', userController.userRegister)
userRouter.post('/user_login', userController.userLogin);

module.exports = userRouter;