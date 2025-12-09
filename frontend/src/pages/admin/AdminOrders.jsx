import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    }
  };

  const openDetail = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSelected(data);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
      alert("Failed to load detail");
    }
  };

  const updateStatus = async () => {
    try {
      await fetch(`http://localhost:4000/api/admin/orders/${selected.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      alert("Status updated");
      setSelected(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>📦 Orders</h1>

      <table style={table}>
        <thead style={thead}>
          <tr>
            <th style={th}>Order ID</th>
            <th style={th}>Customer</th>
            <th style={th}>Total</th>
            <th style={th}>Status</th>
            <th style={th}>Created</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={row}>
              <td style={td}>{o.id}</td>
              <td style={td}>{o.customerName}</td>
              <td style={td}>₹ {o.total}</td>
              <td style={td}>
                <span style={{ fontWeight: "bold" }}>{o.status}</span>
              </td>
              <td style={td}>{new Date(o.createdAt).toLocaleString()}</td>
              <td style={td}>
                <button style={btnView} onClick={() => openDetail(o.id)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DETAIL MODAL */}
      {selected && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Order #{selected.id}</h2>

            <p><strong>Name:</strong> {selected.customerName}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Contact:</strong> {selected.contactNumber}</p>
            <p><strong>Address:</strong> {selected.shippingAddress}</p>

            <hr />

            <h3>Items:</h3>
            {selected.items.map((it) => (
              <p key={it.id}>
                {it.quantity} x ₹ {it.unitPrice} = ₹ {it.lineTotal}
              </p>
            ))}

            <p><strong>Total:</strong> ₹ {selected.total}</p>

            <hr />

            <label>Status:</label>
            <select
              style={input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="NEW">NEW</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="RETURNED">RETURNED</option>
            </select>

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button style={btnGreen} onClick={updateStatus}>
                Update
              </button>
              <button style={btnGray} onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */
const table = { width: "100%", background: "#fff", borderCollapse: "collapse" };
const thead = { background: "#111", color: "#fff" };
const th = { padding: 10 };
const td = { padding: 10 };
const row = { borderBottom: "1px solid #ddd", textAlign: "center" };

const btnView = {
  background: "royalblue",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#fff",
  padding: 20,
  width: "400px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const input = { padding: 8, border: "1px solid #ccc", borderRadius: "6px", width: "100%" };
const btnGreen = { background: "#28a745", color: "#fff", padding: "8px 14px", border: "none", borderRadius: "5px" };
const btnGray = { background: "#ccc", padding: "8px 14px", border: "none", borderRadius: "5px" };
