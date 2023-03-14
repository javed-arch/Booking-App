import express from "express";
import {
  getHotel,
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", getHotel);

router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
