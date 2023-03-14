import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    author: String,
    hotelId: String,
    number: {
      type: Number,
      required: true,
    },
    unAvailabilityDates: [Date],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
