import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    contactNumber: "",
    shippingAddress: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customerName || !form.email || !form.shippingAddress) {
      alert("Please fill all fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderData = {
      customerName: form.customerName,
      email: form.email,
      contactNumber: form.contactNumber,
      shippingAddress: form.shippingAddress,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      total,
    };

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();
      navigate(`/success/${data.orderId}`);
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div style={{ padding: "40px 50px" }}>
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          style={{ padding: "10px" }}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: "10px" }}
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={(e) =>
            setForm({ ...form, contactNumber: e.target.value })
          }
          style={{ padding: "10px" }}
          required
        />

        <textarea
          name="shippingAddress"
          placeholder="Shipping Address"
          value={form.shippingAddress}
          onChange={(e) =>
            setForm({ ...form, shippingAddress: e.target.value })
          }
          style={{ padding: "10px", minHeight: "80px" }}
          required
        />

        <h3>Total: ₹ {total.toFixed(2)}</h3>

        <button
          type="submit"
          style={{
            background: "#1A73E8",
            border: "none",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
