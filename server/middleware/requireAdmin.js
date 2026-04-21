/**
 * Expects Authorization: Bearer <ADMIN_PASSWORD> (same value as Next.js ADMIN_PASSWORD).
 */
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(503).json({
      success: false,
      errors: [{ field: "_config", message: "Admin access is not configured" }],
    });
  }
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${expected}`) {
    return res.status(401).json({
      success: false,
      errors: [{ field: "_auth", message: "Unauthorized" }],
    });
  }
  next();
}

module.exports = { requireAdmin };
