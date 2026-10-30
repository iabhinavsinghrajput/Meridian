const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  downpayment: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Reserved"],
    default: "Reserved"
  },
  paymentMethod: {
    type: String,
    default: "UPI"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
