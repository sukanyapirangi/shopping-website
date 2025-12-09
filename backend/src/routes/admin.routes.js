const express = require("express");
const router = express.Router();
const prisma = require("../db/prisma");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

const {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getOrders,
  updateOrderStatus
} = require("../controllers/admin.controller");

// ======================== PRODUCTS (ADMIN) ========================

// Get all products (Admin View)
router.get("/products", adminAuth, getProducts);

// Create product with image upload
router.post(
  "/products",
  adminAuth,
  upload.single("image"),
  createProduct
);

// Update product
router.put(
  "/products/:id",
  adminAuth,
  upload.single("image"),
  updateProduct
);

// Delete product
router.delete("/products/:id", adminAuth, deleteProduct);

// ======================== ORDERS (ADMIN) ========================

// Get all orders
router.get("/orders", adminAuth, getOrders);

// Get order details
router.get("/orders/:id", adminAuth, async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { items: true }
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to load detail" });
  }
});

// Update order status
router.put("/orders/:id", adminAuth, updateOrderStatus);

// ======================== DASHBOARD STATS ========================

router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const revenue = await prisma.order.aggregate({
      _sum: { total: true }
    });

    res.json({
      products: totalProducts,
      orders: totalOrders,
      revenue: revenue._sum.total || 0
    });
  } catch {
    res.status(500).json({ message: "Stats failed" });
  }
});

module.exports = router;
