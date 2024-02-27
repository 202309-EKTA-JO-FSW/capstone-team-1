const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://firebasestorage.googleapis.com/v0/b/capstone-project-486e3.appspot.com/o/images%2FO9IY130.jpg?alt=media&token=65c6fcea-df3d-4121-a28c-86a3537d2bde",
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
