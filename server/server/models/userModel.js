const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = Schema({
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

const cartSchema = Schema({
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
    firstName: {
      type: String,
      maxLength: 20,
      required: true,
    },
    lastName: {
      type: String,
      maxLength: 20,
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
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    phoneNumber: {
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
    orders: [
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

// capitlize name before store it
userSchema.pre("save", function (next) {
  // Capitalize first letter of first name
  this.firstName =
    this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
  // Capitalize first letter of last name
  this.lastName =
    this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
  next();
});

module.exports = mongoose.model("User", userSchema);
