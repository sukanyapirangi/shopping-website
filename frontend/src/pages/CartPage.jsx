import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div style={{ padding: "40px 50px" }}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                background: "white",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: "60px", height: "60px", borderRadius: "6px" }}
                />
                <div>
                  <strong>{item.name}</strong>
                  <p>₹ {item.price} × {item.quantity}</p>
                </div>
              </div>

              <strong>₹ {item.price * item.quantity}</strong>
              <button
  onClick={() => removeFromCart(item.id)}
  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  ✖ Remove
</button>

            </div>
          ))}

          <hr />
          <p><b>Subtotal:</b> ₹ {subtotal.toFixed(2)}</p>
          <p><b>Tax (5%):</b> ₹ {tax.toFixed(2)}</p>
          <h3><b>Total:</b> ₹ {total.toFixed(2)}</h3>
          



          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "18px",
              background: "#1A73E8",
              color: "white",
              padding: "10px 18px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout ➜
          </button>
        </>
      )}
    </div>
  );
}
