import express from "express";
import {
  createItem,
  getItem,
  getItemsFromUser,
} from "../controllers/itemController";

const router = express.Router();

router.get("/getItems", getItemsFromUser);
router.get("/getItem/:id", getItem);

router.post("/create", createItem);
/* router.post("/login", 'login); */

export default router;
