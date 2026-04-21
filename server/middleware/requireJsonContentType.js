/**
 * Reject non-JSON bodies for strict JSON APIs (e.g. POST /api/orders).
 */
function requireJsonContentType(req, res, next) {
  const ct = req.headers["content-type"] || "";
  if (!ct.toLowerCase().includes("application/json")) {
    return res.status(415).json({
      success: false,
      errors: [
        {
          field: "_content_type",
          message: "Content-Type must be application/json",
        },
      ],
    });
  }
  next();
}

module.exports = { requireJsonContentType };
