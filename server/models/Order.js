const mongoose = require("mongoose");
const customerSchema = require("./Customer");
const { generateUniqueOrderId } = require("../utils/generateOrderId");

const PLAN_ENUM = ["Quick Song", "Full Story Song", "Signature Experience"];
const STATUS_ENUM = [
  "Received",
  "In Consultation",
  "In Progress",
  "In Revision",
  "Completed",
  "Delivered",
];

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      /** Creates a unique index on `orderId` */
      unique: true,
    },
    customer: {
      type: customerSchema,
      required: true,
    },
    songDetails: {
      plan: { type: String, required: true, enum: PLAN_ENUM },
      occasion: { type: String, required: true, trim: true },
      occasionOther: { type: String, trim: true, default: "" },
      languages: [{ type: String, required: true }],
      genre: { type: String, trim: true, default: "" },
      story: { type: String, required: true },
      referenceSongs: { type: String, trim: true, default: "" },
      specialInstructions: { type: String, trim: true, default: "" },
    },
    addOns: {
      socialMediaRelease: { type: Boolean, default: false },
      videoReelVersion: { type: Boolean, default: false },
    },
    pricing: {
      planPrice: { type: Number, required: true },
      addOnsTotal: { type: Number, required: true, default: 0 },
      estimatedTotal: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: "Received",
    },
    agreedToTerms: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ "customer.email": 1 });
orderSchema.index({ "customer.mobile": 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.pre("save", async function orderIdPreSave() {
  if (!this.orderId) {
    this.orderId = await generateUniqueOrderId(this.constructor);
  }
});

module.exports = mongoose.model("Order", orderSchema);
module.exports.PLAN_ENUM = PLAN_ENUM;
module.exports.STATUS_ENUM = STATUS_ENUM;
