const express = require("express");
const Controller = require("../controllers/AuthController");
const verifyToken = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");


const route = express.Router();

route.post("/register",upload.single("profileImage"), Controller.register);
route.post("/login", Controller.login);




module.exports = route;
  