import mongoose from "mongoose";
import UserModel from "../model/user.js";

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crud", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true, //make this true
      autoIndex: true, //make this also true
    });
  } catch (err) {
    console.log(err);
  }
})();

export const addUser = async (req, res) => {
  try {
    const user = await new UserModel(req.body).save();
    res.status(201).json(user);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findOneAndReplace({ _id: id }, req.body);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const deleteUser = async (req, res) => { 
  const id = req.params.id;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
