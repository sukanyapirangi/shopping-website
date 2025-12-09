import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const userToken = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    alert("Logged out successfully!");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      style={{
        background: "#0D1117",
        padding: "16px 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #222",
        boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "#28A7FF",
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        🛍 Retail Store
      </Link>

      {/* Menu Links */}
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/" style={linkStyle}>Products</Link>

        {/* Cart Button */}
        <Link to="/cart" style={cartBtn}>
          🛒 Cart
          {cart.length > 0 && (
            <span style={badge}>{cart.length}</span>
          )}
        </Link>

        {/* USER AUTH SECTION */}
        {!userToken ? (
          <>
            <Link to="/login" style={authBtn}>Login</Link>
            <Link to="/register" style={authBtn}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={logoutBtn}>Logout</button>
        )}

        {/* ADMIN LOGIN */}
        <Link
          to="/admin/login"
          style={{
            color: "#FFD700",
            fontWeight: "600",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          Admin 🔐
        </Link>
      </div>
    </nav>
  );
}

/* ---- STYLES ---- */
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "17px",
};

const cartBtn = {
  position: "relative",
  background: "#1A73E8",
  padding: "8px 16px",
  borderRadius: "6px",
  color: "white",
  fontWeight: "600",
  textDecoration: "none",
};

const badge = {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  background: "red",
  color: "white",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const authBtn = {
  color: "#00E676",
  fontWeight: "600",
  textDecoration: "none",
  fontSize: "17px",
};

const logoutBtn = {
  background: "crimson",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
};
