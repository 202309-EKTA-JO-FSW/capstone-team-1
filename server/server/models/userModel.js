const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
});

const cartSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  menuItems: [
    {
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
      total: {
        type: Number,
        required: true,
      },
    },
  ],
});

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: addressSchema,
    cart: cartSchema,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    Orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
