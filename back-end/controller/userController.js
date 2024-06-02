const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");


const registerUser = async (req, res, next) => {
  try {
    const { username,password } = req.body;
    if (!(username &&password)) {
      return res.status(400).send("All inputs are required");
    }
console.log( username, password )
    const userExists = await User.findOne( {where: {
        username: username
    }});
    console.log( JSON.stringify(userExists) )
    if (userExists) {
      return res.status(400).send("user exists");
    }
    else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        username,
        password: hashedPassword,
      });
      res
        .cookie(
          "access_token",
          generateAuthToken(user.username),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            name: user.username,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await User.findOne( {where: {
        username: username
    }})
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user.username,
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            name: user.username,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId).select("name phoneNumber isAdmin").orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
}
module.exports = { registerUser, loginUser };
