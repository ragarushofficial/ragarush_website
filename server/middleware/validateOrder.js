const { body, validationResult } = require("express-validator");

const NAME_RE = /^[a-zA-Z\s'\-.]{1,50}$/u;

function normalizeMobile(value) {
  const d = String(value ?? "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return d.slice(2);
  if (d.length === 11 && d.startsWith("0")) return d.slice(1);
  return d;
}

const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: result.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

const validateCreateOrder = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 50 })
    .withMessage("First name must be at most 50 characters")
    .matches(NAME_RE)
    .withMessage("First name must contain only letters, spaces, hyphens, apostrophes, or periods")
    .escape(),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 50 })
    .withMessage("Last name must be at most 50 characters")
    .matches(NAME_RE)
    .withMessage("Last name must contain only letters, spaces, hyphens, apostrophes, or periods")
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .notEmpty()
    .withMessage("Mobile number is required")
    .customSanitizer(normalizeMobile)
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be exactly 10 digits")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid Indian mobile number"),

  body("city").optional().trim().isLength({ max: 120 }).escape(),

  body("planId")
    .notEmpty()
    .withMessage("Plan is required")
    .isIn(["quick", "full", "signature"])
    .withMessage("Invalid plan"),

  body("occasion").trim().notEmpty().withMessage("Occasion is required"),

  body("occasionOther")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .custom((value, { req }) => {
      if (req.body.occasion === "Other" && (!value || !String(value).trim())) {
        throw new Error("Please describe your occasion when Other is selected");
      }
      return true;
    }),

  body("languages")
    .isArray({ min: 1 })
    .withMessage("At least one language is required")
    .custom((arr) => arr.every((x) => typeof x === "string" && x.trim().length > 0))
    .withMessage("Languages must be non-empty strings"),

  body("genre").optional().trim().isLength({ max: 80 }),

  body("story")
    .trim()
    .notEmpty()
    .withMessage("Story is required")
    .isLength({ min: 50, max: 2000 })
    .withMessage("Story must be between 50 and 2000 characters"),

  body("referenceLinks").optional().trim().isLength({ max: 2000 }),

  body("specialInstructions").optional().trim().isLength({ max: 2000 }),

  body("addonSocial").optional().isBoolean().toBoolean(),

  body("addonVideo").optional().isBoolean().toBoolean(),

  body("whatsappUpdates").optional().isBoolean().toBoolean(),

  body("agreedToTerms")
    .isBoolean()
    .withMessage("agreedToTerms must be a boolean")
    .custom((v) => v === true)
    .withMessage("You must agree to the Terms and Privacy Policy"),

  handleValidationErrors,
];

module.exports = {
  validateCreateOrder,
  handleValidationErrors,
  normalizeMobile,
};
