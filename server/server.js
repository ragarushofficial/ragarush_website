require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const sanitizeMongoObject = require("mongo-sanitize");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/db");
const { corsOriginCallback } = require("./config/cors");
const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const PORT = Number(process.env.PORT) || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

if (NODE_ENV === "production" || process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: corsOriginCallback,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "512kb" }));
/** Strip dangerous keys / operators from JSON body (`mongo-sanitize`). */
app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeMongoObject(req.body);
  }
  next();
});
/** Extra hardening for body, query, and params (`express-mongo-sanitize`). */
app.use(mongoSanitize({ replaceWith: "_" }));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "ragarush-api" });
});

app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    errors: [{ field: "_path", message: "Not found" }],
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (NODE_ENV === "development") {
    console.error(err);
  }
  res.status(500).json({
    success: false,
    errors: [{ field: "_server", message: "Internal server error" }],
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    if (NODE_ENV === "development") {
      console.log(`Raga Rush API listening on http://localhost:${PORT}`);
    }
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
