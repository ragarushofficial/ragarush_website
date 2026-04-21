const Order = require("../models/Order");
const { STATUS_ENUM } = Order;

function buildStats(orders) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const byStatus = {};
  STATUS_ENUM.forEach((s) => {
    byStatus[s] = 0;
  });
  let thisMonthCount = 0;
  let revenueThisMonth = 0;

  for (const o of orders) {
    byStatus[o.status] = (byStatus[o.status] || 0) + 1;
    if (o.createdAt && o.createdAt >= startOfMonth) {
      thisMonthCount += 1;
      revenueThisMonth += Number(o.pricing?.estimatedTotal) || 0;
    }
  }

  return {
    total: orders.length,
    thisMonthCount,
    revenueThisMonth,
    byStatus,
  };
}

/**
 * GET /api/admin/orders — full list + stats (admin only)
 */
async function listOrders(req, res) {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    const stats = buildStats(orders);
    return res.json({
      success: true,
      stats,
      orders,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[listOrders]", err);
    }
    return res.status(500).json({
      success: false,
      errors: [{ field: "_server", message: "Could not load orders" }],
    });
  }
}

/**
 * PATCH /api/admin/orders/:orderId/status
 */
async function patchOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body || {};

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        success: false,
        errors: [{ field: "orderId", message: "Invalid order id" }],
      });
    }

    if (!status || typeof status !== "string" || !STATUS_ENUM.includes(status)) {
      return res.status(400).json({
        success: false,
        errors: [{ field: "status", message: `Status must be one of: ${STATUS_ENUM.join(", ")}` }],
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: orderId.trim() },
      { $set: { status } },
      { new: true, runValidators: true }
    ).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        errors: [{ field: "orderId", message: "Order not found" }],
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[patchOrderStatus]", err);
    }
    return res.status(500).json({
      success: false,
      errors: [{ field: "_server", message: "Could not update status" }],
    });
  }
}

module.exports = {
  listOrders,
  patchOrderStatus,
};
