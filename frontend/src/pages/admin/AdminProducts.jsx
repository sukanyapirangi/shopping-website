import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  // ADD
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "ACTIVE",
    imageUrl: ""
  });

  // EDIT
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProducts();
  }, [navigate, token]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  // ADD PRODUCT
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock)
      return alert("Please fill all required fields!");

    try {
      await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      alert("Product added!");
      setShowAddModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (item) => {
    setEditProduct({ ...item });
    setShowEditModal(true);
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async () => {
    try {
      await fetch(`http://localhost:4000/api/products/${editProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProduct),
      });

      alert("Product updated!");
      setShowEditModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  // TOGGLE STATUS ACTIVE / INACTIVE
  const handleToggleStatus = async (item) => {
    try {
      const updated = {
        ...item,
        status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      };

      await fetch(`http://localhost:4000/api/products/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>🛠 Manage Products</h1>

      <button
        onClick={() => setShowAddModal(true)}
        style={btnPrimary}
      >
        ➕ Add Product
      </button>

      <table style={table}>
        <thead style={thead}>
          <tr>
            <th style={th}>Image</th>
            <th style={th}>Name</th>
            <th style={th}>Price</th>
            <th style={th}>Stock</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id} style={row}>
              <td style={td}><img src={item.imageUrl} width="50" alt="" /></td>
              <td style={td}>{item.name}</td>
              <td style={td}>₹ {item.price}</td>
              <td style={td}>{item.stock}</td>
              <td style={td}>
                <span style={{ color: item.status === "ACTIVE" ? "green" : "red" }}>
                  {item.status}
                </span>
              </td>
              <td style={td}>
                <button style={editBtn} onClick={() => openEditModal(item)}>✏ Edit</button>

                <button
                  style={{
                    background: item.status === "ACTIVE" ? "tomato" : "seagreen",
                    color: "#fff",
                    padding: "6px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "6px",
                    fontSize: "12px",
                  }}
                  onClick={() => handleToggleStatus(item)}
                >
                  {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL */}
      {showAddModal && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Add Product</h2>
            <ProductFormFields product={newProduct} setProduct={setNewProduct} />

            <div style={btnRow}>
              <button onClick={handleAddProduct} style={btnYellow}>Save</button>
              <button onClick={() => setShowAddModal(false)} style={btnGray}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && editProduct && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Edit Product</h2>
            <ProductFormFields product={editProduct} setProduct={setEditProduct} />

            <div style={btnRow}>
              <button onClick={handleUpdateProduct} style={btnGreen}>Update</button>
              <button onClick={() => setShowEditModal(false)} style={btnGray}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- FORM COMPONENT ---------- */
function ProductFormFields({ product, setProduct }) {
  return (
    <>
      <input style={input} placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input style={input} placeholder="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      <input type="number" style={input} placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
      <input type="number" style={input} placeholder="Stock"
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })} />
      <input style={input} placeholder="Category"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })} />
      <input style={input} placeholder="Image URL"
        value={product.imageUrl}
        onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })} />
      <select style={input} value={product.status}
        onChange={(e) => setProduct({ ...product, status: e.target.value })}>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </>
  );
}

/* ---------- STYLES ---------- */
const table = { width: "100%", borderCollapse: "collapse", background: "#fff" };
const thead = { background: "#111", color: "#fff" };
const th = { padding: "10px" };
const td = { padding: "10px" };
const row = { borderBottom: "1px solid #ddd", textAlign: "center" };
const overlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "#fff", padding: "20px", width: "350px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "10px" };
const input = { padding: "8px", borderRadius: "5px", border: "1px solid #ccc" };

const editBtn = { background: "royalblue", padding: "6px 10px", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const btnRow = { display: "flex", gap: "10px", marginTop: "10px" };
const btnPrimary = { background: "#4CAF50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px" };

const btnYellow = { background: "#FFD700", padding: "8px 14px", borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: 700 };
const btnGreen = { background: "#28a745", padding: "8px 14px", border: "none", borderRadius: "5px", color: "#fff" };
const btnGray = { background: "#ccc", padding: "8px 14px", border: "none", borderRadius: "5px" };
