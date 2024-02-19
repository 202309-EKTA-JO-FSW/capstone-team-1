const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  menuItem: {
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const cartSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    menuItems: [itemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
