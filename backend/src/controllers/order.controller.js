const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createOrder = async (req, res) => {
  try {
    const { customerName, email, contactNumber, shippingAddress, items, total } =
      req.body;

    const order = await prisma.order.create({
      data: {
        customerName,
        email,
        contactNumber,
        shippingAddress,
        status: "New",
        total,
      },
    });

    for (const item of items) {
      const { productId, quantity, unitPrice } = item;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          quantity,
          unitPrice,
          lineTotal: quantity * unitPrice,
        },
      });

      // 🔥 Read current stock
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      // 🔥 Update stock manually
      await prisma.product.update({
        where: { id: productId },
        data: {
          stock: product.stock - quantity,
        },
      });
    }

    res.json({ message: "Order created successfully", orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { items: true }
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status }
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

