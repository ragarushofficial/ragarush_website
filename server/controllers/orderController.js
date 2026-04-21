const { escape } = require("validator");
const Order = require("../models/Order");
const { generateUniqueOrderId } = require("../utils/generateOrderId");
const { computePricing } = require("../utils/pricing");
const { sendNewOrderNotifications } = require("../utils/orderNotificationEmails");

const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

/**
 * POST /api/orders
 */
async function createOrder(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      planId,
      occasion,
      occasionOther,
      languages,
      genre,
      story,
      referenceLinks,
      specialInstructions,
      addonSocial = false,
      addonVideo = false,
      whatsappUpdates = false,
    } = req.body;

    const emailNorm = String(email).toLowerCase().trim();
    const mobileNorm = String(phone).replace(/\D/g, "");
    const mobile10 =
      mobileNorm.length === 12 && mobileNorm.startsWith("91")
        ? mobileNorm.slice(2)
        : mobileNorm.length === 10
          ? mobileNorm
          : mobileNorm;

    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
    const duplicate = await Order.findOne({
      "customer.email": emailNorm,
      "customer.mobile": mobile10,
      createdAt: { $gte: since },
    }).lean();

    if (duplicate) {
      return res.status(409).json({
        success: false,
        errors: [
          {
            field: "duplicate",
            message:
              "It looks like you've already submitted a request recently. Our team will contact you soon!",
          },
        ],
      });
    }

    const orderId = await generateUniqueOrderId(Order);

    const isSignature = planId === "signature";
    const socialFlag = isSignature ? true : Boolean(addonSocial);

    const pricing = computePricing(planId, addonSocial, Boolean(addonVideo));

    const doc = new Order({
      orderId,
      customer: {
        firstName,
        lastName,
        email: emailNorm,
        mobile: mobile10,
        city: city ? escape(String(city).trim()) : "",
        whatsappOptIn: Boolean(whatsappUpdates),
      },
      songDetails: {
        plan: pricing.planLabel,
        occasion: escape(String(occasion).trim()),
        occasionOther:
          occasion === "Other" && occasionOther
            ? escape(String(occasionOther).trim())
            : "",
        languages: languages.map((l) => escape(String(l).trim())),
        genre: genre ? escape(String(genre).trim()) : "",
        story: escape(String(story).trim()),
        referenceSongs: referenceLinks ? escape(String(referenceLinks).trim()) : "",
        specialInstructions: specialInstructions
          ? escape(String(specialInstructions).trim())
          : "",
      },
      addOns: {
        socialMediaRelease: socialFlag,
        videoReelVersion: Boolean(addonVideo),
      },
      pricing: {
        planPrice: pricing.planPrice,
        addOnsTotal: pricing.addOnsTotal,
        estimatedTotal: pricing.estimatedTotal,
      },
      agreedToTerms: true,
    });

    await doc.save();

    void sendNewOrderNotifications({
      order: doc,
      raw: {
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        story: String(story).trim(),
        referenceLinks: referenceLinks ? String(referenceLinks).trim() : "",
        specialInstructions: specialInstructions ? String(specialInstructions).trim() : "",
      },
    });

    return res.status(201).json({
      success: true,
      orderId: doc.orderId,
      estimatedTotal: doc.pricing.estimatedTotal,
      message: "Your song request has been received. Our team will reach out within 24 hours.",
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[createOrder]", err);
    }
    return res.status(500).json({
      success: false,
      errors: [{ field: "_server", message: "Something went wrong. Please try again later." }],
    });
  }
}

/**
 * GET /api/orders/:orderId
 */
async function getOrderById(req, res) {
  try {
    const { orderId } = req.params;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        success: false,
        errors: [{ field: "orderId", message: "Invalid order id" }],
      });
    }

    const order = await Order.findOne({ orderId: orderId.trim() }).lean();
    if (!order) {
      return res.status(404).json({
        success: false,
        errors: [{ field: "orderId", message: "Order not found" }],
      });
    }

    const safe = {
      orderId: order.orderId,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      songDetails: {
        plan: order.songDetails.plan,
        occasion: order.songDetails.occasion,
        languages: order.songDetails.languages,
      },
      pricing: order.pricing,
    };

    return res.json({ success: true, order: safe });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getOrderById]", err);
    }
    return res.status(500).json({
      success: false,
      errors: [{ field: "_server", message: "Could not fetch order" }],
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
};
