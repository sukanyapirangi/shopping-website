import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (!form.email || !form.password) return alert("Enter credentials");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Login failed");

      localStorage.setItem("userToken", data.token);
      alert("Login successful!");
      navigate("/");
      window.location.reload();
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={box}>
      <h2>User Login</h2>

      <input
        style={input}
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        style={input}
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin} style={btn}>Login</button>
      <p>Don't have account? <a href="/register">Register</a></p>
    </div>
  );
}

const box = {
  maxWidth: "360px", margin: "60px auto", padding: "20px",
  background: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};
const input = {
  width: "100%", padding: "10px", margin: "8px 0",
  border: "1px solid #ccc", borderRadius: "5px"
};
const btn = {
  width: "100%", background: "#2E89FF", padding: "10px",
  borderRadius: "5px", border: "none", color: "#fff", fontWeight: "600",
  cursor: "pointer", marginTop: "10px"
};
