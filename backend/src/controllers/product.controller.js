const { prisma } = require("../db/prisma");

exports.getPublicProducts = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      OR: [
        { name: { contains: search,} },
        { category: { contains: search,} },
      ],
    },
    skip: Number(skip),
    take: Number(limit),
  });

  res.json(products);
};

exports.getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product || product.status !== "ACTIVE")
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;

  if (!name || !price || !category)
    return res.status(400).json({ message: "Missing required fields" });

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      imageUrl,
    },
  });

  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { name, description, price, stock, category, imageUrl } = req.body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      imageUrl,
    },
  });

  res.json(product);
};

exports.toggleProductStatus = async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const product = await prisma.product.update({
    where: { id },
    data: { status },
  });

  res.json(product);
};
