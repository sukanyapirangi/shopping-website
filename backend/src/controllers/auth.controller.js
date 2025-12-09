const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../db/prisma");

const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

module.exports = { login };
