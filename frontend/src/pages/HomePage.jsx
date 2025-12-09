import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* HERO BANNER */}
      <div style={hero}>
        <div>
          <h1 style={heroTitle}>FASHION FEST</h1>
          <p style={heroText}>Trending styles & best deals — Shop now!</p>
          <button style={heroBtn}>Explore Now ➜</button>
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div style={categoryContainer}>
        {["All", "Clothing", "Footwear", "Accessories"].map((cat) => (
          <span key={cat} style={categoryChip}>{cat}</span>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div style={productSection}>
        <h2 style={sectionTitle}>🔥 Top Picks For You</h2>

        <div style={productGrid}>
          {products.map((p) => (
            <div key={p.id} style={card}>
              <div style={imgBox}>
                <img src={p.imageUrl} alt={p.name} style={productImg} />
                <span style={tag}>BESTSELLER</span>
              </div>

              <div style={cardDetails}>
                <h3 style={productName}>{p.name}</h3>
                <p style={productDesc}>{p.description}</p>

                <p style={price}>₹ {p.price}</p>

                <button
                  onClick={() => addToCart(p)}
                  style={addBtn}
                  onMouseEnter={(e) => (e.target.style.background = "#d32f2f")}
                  onMouseLeave={(e) => (e.target.style.background = "#ff1744")}
                >
                  Add to Cart 🛍️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={footer}>
        © {new Date().getFullYear()} Retail Store • Style Redefined 💖
      </footer>
    </div>
  );
}

/* 🎨 STYLES */
const hero = {
  background: "linear-gradient(90deg, #a3858bff 0%, #ff758f 100%)",
  color: "white",
  textAlign: "center",
  padding: "80px 20px",
  fontFamily: "Poppins, sans-serif",
};
const heroTitle = { fontSize: "60px", fontWeight: "900", letterSpacing: "2px" };
const heroText = { fontSize: "20px", marginTop: "6px" };
const heroBtn = {
  marginTop: "20px",
  background: "#fff",
  color: "#965b66ff",
  padding: "12px 24px",
  fontWeight: "600",
  borderRadius: "30px",
  border: "none",
  cursor: "pointer",
};

const categoryContainer = {
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  padding: "20px",
};
const categoryChip = {
  background: "#fff",
  padding: "10px 18px",
  borderRadius: "25px",
  cursor: "pointer",
  border: "1px solid #ddd",
  fontSize: "14px",
};
const productSection = { padding: "40px" };
const sectionTitle = { fontSize: "28px", marginBottom: "20px", fontWeight: "600" };

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "25px",
};

const card = {
  background: "#dee3d6ff",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "transform 0.3s",
};
const imgBox = { position: "relative" };
const productImg = {
  width: "100%",
  height: "260px",
  objectFit: "cover",
  transition: "0.4s",
};
const tag = {
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "#48b894ff",
  color: "#fff",
  padding: "4px 8px",
  fontSize: "10px",
  borderRadius: "3px",
};
const cardDetails = { padding: "12px", textAlign: "center" };
const productName = { fontWeight: "600", fontSize: "17px" };
const productDesc = { fontSize: "14px", color: "#555", marginBottom: "5px" };
const price = { fontSize: "18px", fontWeight: "bold", color: "#d32f2f" };

const addBtn = {
  background: "#5a6376ff",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "30px",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
};

const footer = {
  background: "#111",
  color: "#fff",
  textAlign: "center",
  padding: "25px 20px",
  fontFamily: "Poppins, sans-serif",
  marginTop: "60px",
};

const socialRow = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  marginTop: "10px",
};

const socialIcon = {
  fontSize: "20px",
  cursor: "pointer",
  opacity: 0.8,
  transition: "0.2s",
};
