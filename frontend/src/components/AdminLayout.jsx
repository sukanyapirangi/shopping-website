import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          background: "#222",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "25px" }}>Admin</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/admin/dashboard">
            Dashboard
          </Link>

          <Link style={{ color: "white", textDecoration: "none" }} to="/admin/products">
            Products
          </Link>

          <Link style={{ color: "white", textDecoration: "none" }} to="/admin/orders">
            Orders
          </Link>

          <button
            onClick={logout}
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}
