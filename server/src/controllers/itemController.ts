import { Request, Response } from "express";
import Item from "../models/itemModel";

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

// Add authorization
export async function createItem(req: Request, res: Response) {
  try {
    const { title, description, price, trade } = req.body;

    if (!title || !description || price === undefined || trade === undefined) {
      return res
        .status(400)
        .json({ error: "some error occured", body: req.body });
    }

    const item = await Item.create({
      title,
      description,
      price,
      to_trade: trade,
    });

    return res.status(201).json({ message: "created", item: item });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
