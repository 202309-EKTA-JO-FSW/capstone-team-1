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

// make type lowercase when add to model
menuItemSchema.pre("save", function (next) {
  // Capitalize first letter of first name
  this.type = this.type.toLowerCase();
  next();
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
