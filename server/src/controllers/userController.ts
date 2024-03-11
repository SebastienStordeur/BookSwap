import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

// Add validation
export async function signup(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide a valid username, email and password" });
    }

    await User.create({ username, email, password });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    const validPassword = await bcrypt.compare(password, user!.password);

    if (!user || !validPassword) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET", { expiresIn: "30d" });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
