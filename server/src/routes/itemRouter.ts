import express from "express";
import {
  createItem,
  deleteItem,
  getItem,
  getItemsFromUser,
} from "../controllers/itemController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/getItems", getItemsFromUser);
router.get("/getItem/:id", getItem);

router.post("/create", auth, createItem);
router.delete("/delete/:id", auth, deleteItem);

export default router;
