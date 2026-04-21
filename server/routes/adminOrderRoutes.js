const express = require("express");
const { requireAdmin } = require("../middleware/requireAdmin");
const { listOrders } = require("../controllers/adminOrderController");

const router = express.Router();

router.use(requireAdmin);

router.get("/", listOrders);

module.exports = router;
