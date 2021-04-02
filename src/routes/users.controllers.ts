import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });

    if (userFound)
      return res.status(301).json({ message: "The user already exists" });

    const user = new User();
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);
    await user.save();

    res.json("saved user");
  } catch (error) {
    res.json(error);
  }
};
