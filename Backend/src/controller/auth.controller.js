import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import BlockList from "../model/blockList.model.js";

async function Register(req, res) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(300).json({
        message: "username , password , email is required",
      });
    }

    const checkUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkUser) {
      return res.status(403).json({
        message: "User Already with this Email or Username",
      });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token);

    res.status(201).json({
      "message": "User Register Successfully",
      "userData" : newUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      error: error,
    });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(303).json({
        message: "email and password are required , try again",
      });
    }

    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.status(404).json({
        message: "User Not exists with this email , please register before",
      });
    }
    const checkPassword = await checkEmail.comparePassword(password);

    if (!checkPassword) {
      return res.status(505).json({
        message: "Password Incorrect",
      });
    }

    const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);
    const user = checkEmail.toObject();
    delete user.password;
    console.log("User Login Successfully");
    res.status(200).json({
      message: "User Login Successfully",
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      error: error,
    });
  }
}

async function Logout(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        message: "Token is Required",
      });
    }

    const checkBlockList = await BlockList.findOne({ token });

    if (checkBlockList) {
      return res.status(303).json({
        message: "Token Already Blocklisted",
      });
    }

    const blockList = await BlockList.create({
      token: token,
    });

    res.clearCookie("token");

    res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      error: error,
    });
  }
}

async function GetMe(req, res) {
  try {
    const user = req.user;

    const findUser = await User.findOne({ _id: user.id });
    if (!findUser) {
      console.log("no user found in DB , try login first");
      return res.status(404).json({
        message: "No User found in DB , please try login first",
      });
    }

    res.status(200).json({
      message: "User Data Found",
      userData: findUser,
      userToken: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
    });
  }
}

export { Register, Login, Logout, GetMe };
