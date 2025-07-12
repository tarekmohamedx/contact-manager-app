const { get } = require("mongoose");
const User = require("../models/user.model");

const GetUserByUserName = async (username) => {
  return await User.findOne({ username: username });
};

const checkUserExists = async (username) => {
  return await User.exists({ username: username });
};

const checkPasswordCorrect = async (username, password) => {
  const user = await GetUserByUserName(username);
  if (!user) return false;
  console.log("Check Paswword: " + username , password, user.password);
  
  return user.password === password;
};

module.exports = { GetUserByUserName, checkUserExists, checkPasswordCorrect };
