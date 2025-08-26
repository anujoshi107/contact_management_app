const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // Corrected spelling
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const registeruser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all the necessary fields");
  }

  // Use await and the correct method name `findOne`
  const useravailable = await User.findOne({ email });
  if (useravailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash the password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user with the hashed password
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Check if user was created successfully
  if (user) {
    // Best practice: Send a success message without the password
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
const loginuser = asynchandler(async (req,res) => {
  const {email,password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("pls enter all the credentials")
  }
  const user = await User.findOne({email});
  if(user && await bcrypt.compare(password,user.password)){
    const accesstoken = jwt.sign(
      {
        user : {
          username : user.username,
          email : user.email,
          id : user.id
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn : "15m"}
    )
    res.status(200).json({accesstoken})
  }
  else{
    res.status(401);
    throw new Error("email or password not valid");
  }
})
const currentuser = asynchandler(async (req,res) => {
  res.status(200).json(req.user)
})

// Export the controller functions
module.exports = {
  registeruser,currentuser,loginuser
};
