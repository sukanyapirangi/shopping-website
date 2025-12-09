const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middleware/auth.middleware");
const {
  getPublicProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductStatus,
} = require("../controllers/product.controller");

// Public routes
router.get("/", getPublicProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", requireAdmin, createProduct);
router.put("/:id", requireAdmin, updateProduct);
router.patch("/:id/status", requireAdmin, toggleProductStatus);

module.exports = router;
