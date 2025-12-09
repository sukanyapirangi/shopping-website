const prisma = require("../db/prisma");
const path = require("path");

// ========================== PRODUCTS ==========================

// GET All products
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to load products" });
  }
};

// CREATE Product (with image)
exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        category: req.body.category,
        status: "ACTIVE",
        imageUrl,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Create failed" });
  }
};

// UPDATE Product
exports.updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updateData = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      category: req.body.category,
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE Product
exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

// ========================== ORDERS ==========================

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { id: "desc" },
    });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Failed to load orders" });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(order);
  } catch {
    res.status(500).json({ message: "Failed to load order details" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status },
    });
    res.json(order);
  } catch {
    res.status(500).json({ message: "Status update failed" });
  }
};

// ========================== STATS ==========================

exports.getStats = async (req, res) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const revenue = await prisma.order.aggregate({
      _sum: { total: true },
    });

    res.json({
      products: totalProducts,
      orders: totalOrders,
      revenue: revenue._sum.total || 0,
    });
  } catch {
    res.status(500).json({ message: "Stats failed" });
  }
};
