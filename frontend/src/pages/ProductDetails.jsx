import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <h1 style={{ marginTop: "10px" }}>{product.name}</h1>
      <p style={{ fontSize: "18px", margin: "6px 0" }}>₹ {product.price}</p>
      <p style={{ color: "#555" }}>{product.description}</p>

      {/* --- FIX: Button is independent clickable --- */}
      <button
        onClick={addToCart}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "black",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
