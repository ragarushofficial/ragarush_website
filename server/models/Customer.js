const mongoose = require("mongoose");

/**
 * Embedded customer subdocument for Order (not a separate collection).
 */
const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobile: { type: String, required: true, trim: true },
    city: { type: String, trim: true, default: "" },
    whatsappOptIn: { type: Boolean, default: false },
  },
  { _id: false }
);

module.exports = customerSchema;
