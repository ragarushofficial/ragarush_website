const rateLimit = require("express-rate-limit");

const windowMs = Number(process.env.RATE_LIMIT_WINDOW) || 60 * 60 * 1000;
const limit = Number(process.env.RATE_LIMIT_MAX) || 5;

/**
 * Limit POST /api/orders — default 5 requests per IP per hour (configurable via env).
 */
const orderCreateRateLimit = rateLimit({
  windowMs,
  limit,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errors: [
      {
        field: "_rate_limit",
        message:
          "Too many order submissions from this address. Please try again in a little while.",
      },
    ],
  },
});

module.exports = { orderCreateRateLimit };
