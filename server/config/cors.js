const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Merge ALLOWED_ORIGINS (production-style) and CORS_ORIGIN (legacy / dev) into one allowlist.
 */
function getAllowedOrigins() {
  const raw = `${process.env.ALLOWED_ORIGINS || ""},${process.env.CORS_ORIGIN || ""}`;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsOriginCallback(origin, callback) {
  const allowedOrigins = getAllowedOrigins();

  if (!origin) {
    return callback(null, true);
  }

  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }

  if (NODE_ENV !== "production") {
    if (
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
      /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
  }

  return callback(null, false);
}

module.exports = {
  corsOriginCallback,
  getAllowedOrigins,
};
