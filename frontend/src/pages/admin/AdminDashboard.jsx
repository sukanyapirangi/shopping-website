import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      alert("Failed to load dashboard stats");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
          📊 Dashboard
        </h1>

        <div style={{ display: "flex", gap: "20px" }}>
          <StatCard title="Products" value={stats.products} color="#ff9800" />
          <StatCard title="Orders" value={stats.orders} color="#03a9f4" />
          <StatCard title="Revenue" value={`₹ ${stats.revenue}`} color="#4caf50" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        padding: "20px",
        width: "200px",
        borderRadius: "10px",
        textAlign: "center",
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        fontSize: "20px"
      }}
    >
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}
