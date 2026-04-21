/**
 * Format: RR-YYYYMMDD-XXXX (XXXX = 4 uppercase alphanumeric)
 */

function buildOrderId() {
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RR-${ymd}-${rand}`;
}

/**
 * @param {import('mongoose').Model} OrderModel
 * @returns {Promise<string>}
 */
async function generateUniqueOrderId(OrderModel) {
  for (let i = 0; i < 20; i += 1) {
    const orderId = buildOrderId();
    // eslint-disable-next-line no-await-in-loop
    const exists = await OrderModel.exists({ orderId });
    if (!exists) return orderId;
  }
  throw new Error("Could not allocate unique orderId");
}

module.exports = { buildOrderId, generateUniqueOrderId };
