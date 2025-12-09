import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password)
      return alert("Fill all fields!");

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Registration failed");

      alert("Registration successful!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={box}>
      <h2>Create Account</h2>

      <input
        style={input}
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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

      <button onClick={handleRegister} style={btn}>Register</button>
      <p>Already have account? <a href="/login">Login</a></p>
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
  width: "100%", background: "#00C853", padding: "10px",
  border: "none", borderRadius: "5px", color: "#fff", fontWeight: "600",
  cursor: "pointer", marginTop: "10px"
};
