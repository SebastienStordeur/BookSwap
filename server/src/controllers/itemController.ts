import { Request, Response } from "express";
import Item, { ItemInterface } from "../models/itemModel";
import mongoose, { Document } from "mongoose";
import User from "../models/userModel";

// specify items from WHICH USER
export async function getItemsFromUser(req: Request, res: Response) {
  try {
    const items = await Item.find({}).lean();
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function getItem(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ _id: id });

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// Transaction, update user.items => unShift new item and create the new entry in item db
export async function createItem(req: Request, res: Response) {
  let { title, description, price, to_trade } = req.body;
  const userId = res.locals.userId;

  try {
    if (
      !title ||
      !description ||
      price === undefined ||
      to_trade === undefined ||
      !userId
    ) {
      return res.status(400).json({ error: "some error occured" });
    }

    const item = await Item.create({
      title,
      description,
      price: to_trade ? 0 : price,
      to_trade,
      owner: userId,
    });

    return res.status(201).json({ item });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}
