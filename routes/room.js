import express from "express";
import {
  getRoom,
  getRooms,
  getHotelRooms,
  createRoom,
  updateRoomDates,
  updateRoom,
  deleteRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/:hotelid", verifyAdmin, createRoom);
router.get("/:hotelid/room", getHotelRooms);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id", verifyAdmin, deleteRoom);
router.put("/:id/availability", verifyAdmin, updateRoomDates);

export default router;
