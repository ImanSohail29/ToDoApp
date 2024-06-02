const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn}=require("../middlewares/verifyAuthToken")
const {loginUser, registerUser} = require("../controller/userController")
router.post("/register", registerUser)
router.post("/login", loginUser)
module.exports = router