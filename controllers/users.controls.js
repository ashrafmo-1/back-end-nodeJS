const { validationResult } = require("express-validator"); // medile ware
const User = require("../models/users.modele"); // get users data from DB server

// done
const getAllUsers = async (req, res) => {
  const users = await User.find(); // get users data from database
  res.json(users);
}
// done
const getSingleUser = async (req, res) => {
  try {
    // get single user from DB
    const user = await User.findById(req.params.userId).exec();
    !user ? res.status(404).json({ message: "cant not find user" }) : null; // if me can't find user
    res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "error in getting user info: " + err.message  });
  }
}
// done
const addNewUser = async (req, res) => {
  console.log(req.body); // by default undefined because express not available to use medle ware body parser
  const error = validationResult(req);
  !error.isEmpty() ? res.status(400).json(error.array()) : null;
  // sent user to DB
  const user = new User(req.body)
  await user.save(); // return promise
  res.status(201).json(user);
}

const chnageUser = async (req, res) => {
  const userId = req.params.userId;
  try{
    // find user id and return changed user info
    const changeUserInfo = await User.findByIdAndUpdate(userId, {$set: {...req.body}}, {new: true});
    res.status(200).json(changeUserInfo);
  } catch(err) {
    return res.status(500).json({ message: "error in cahnging user info: " + err.message });
  }
}
// done
const delUser = async (req, res) => {
  await User.deleteOne({_id: req.params.userId});
  res.status(200).json({success: true});
}

module.exports = {
  getAllUsers,
  getSingleUser,
  addNewUser,
  chnageUser,
  delUser
}