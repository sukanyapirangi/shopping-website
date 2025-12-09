import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const sidebarLink = {
    width: "100%",
    textAlign: "left",
    padding: "12px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    color: "#fff",
    cursor: "pointer"
  };

  return (
    <div style={{ width: "220px", background: "#111", height: "100vh", color: "#fff", padding: "20px"}}>
      <h2 style={{ marginBottom: "30px" }}>Admin</h2>

      <button style={sidebarLink} onClick={() => navigate("/admin/dashboard")}>
        Dashboard
      </button>

      <button style={sidebarLink} onClick={() => navigate("/admin/products")}>
        Products
      </button>

      <button style={sidebarLink} onClick={() => navigate("/admin/orders")}>
        Orders
      </button>

      <button
        style={{ ...sidebarLink, marginTop: "40px", background: "red", borderRadius: "6px" }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
