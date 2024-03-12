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

// Todo, manage picture / pictures
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
      return res.status(400).json({ error: "Some fields are missing" });
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
    return res.status(400).json({ error });
  }
}

// Delete
export async function deleteItem(req: Request, res: Response) {
  try {
    const itemId = req.params.id;
    const userId = res.locals.userId;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "This item does not exist." });
    }

    if (item.owner.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You are not allowed to make this request" });
    }

    await item.deleteOne().then(() => {
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
