const express = require("express");
const { createOrder, getOrderById } = require("../controllers/orderController");
const { patchOrderStatus } = require("../controllers/adminOrderController");
const { validateCreateOrder } = require("../middleware/validateOrder");
const { requireAdmin } = require("../middleware/requireAdmin");
const { requireJsonContentType } = require("../middleware/requireJsonContentType");
const { orderCreateRateLimit } = require("../middleware/orderCreateRateLimit");

const router = express.Router();

router.post(
  "/",
  orderCreateRateLimit,
  requireJsonContentType,
  validateCreateOrder,
  createOrder
);
router.patch("/:orderId/status", requireAdmin, patchOrderStatus);
router.get("/:orderId", getOrderById);

module.exports = router;
