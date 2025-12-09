import { useParams, Link } from "react-router-dom";

export default function SuccessPage() {
  const { id } = useParams();

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        Your Order ID is: <strong>#{id}</strong>
      </p>

      <p style={{ marginTop: "20px" }}>
        Thank you for shopping with us 💛
      </p>

      <Link
        to="/"
        style={{
          marginTop: "30px",
          display: "inline-block",
          background: "black",
          color: "white",
          padding: "10px 18px",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Back to Store
      </Link>
    </div>
  );
}
