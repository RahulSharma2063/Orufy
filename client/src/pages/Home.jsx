import { useEffect, useState } from "react";
import { api } from "../api";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>Delete Product</h3>
          <button onClick={onClose} style={modalStyles.closeBtn}>×</button>
        </div>
        <div style={modalStyles.body}>
          <p style={modalStyles.text}>
            Are you sure you really want to delete this Product <br />
            <strong>"{productName}"</strong>?
          </p>
        </div>
        <div style={modalStyles.footer}>
          <button onClick={onConfirm} style={modalStyles.deleteActionBtn}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={toastStyles.container}>
      <span style={toastStyles.icon}>✔</span>
      {message}
      <button onClick={onClose} style={toastStyles.close}>×</button>
    </div>
  );
}

const MOCK_PRODUCTS = [
  { _id: "1", name: "Choco Fudge Brownie", brand: "CakeZone", price: 450, published: true, status: "published", images: ["/assests/products/Choco Fudge Brownie.svg"] },
  { _id: "2", name: "Christmas Cake", brand: "CakeZone", price: 500, published: true, status: "published", images: ["/assests/products/Christmas Cake.svg"] },
  { _id: "3", name: "Walnut Brownie", brand: "CakeZone", price: 400, published: false, status: "unpublished", images: ["/assests/products/Waalnut Brownie.svg"] },
];

export default function Home() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [tab, setTab] = useState("published");

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchStrict = async () => {
      try {
        const res = await api.get("/products");
        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (e) {
        console.log("Using assignment mock data in Home", e);
      }
    };
    fetchStrict();
  }, []);

  const addProduct = (p, isEdit) => {
    if (isEdit) {
      setProducts(prev => prev.map(prod => prod._id === p._id ? p : prod));
      setToast({ message: "Product updated Successfully" });
    } else {
      setProducts(prev => [...prev, p]);
      setToast({ message: "Product added Successfully" });
    }
  };

  const publishProduct = async (id) => {
  try {
    const product = products.find(p => p._id === id);
    const updated = { ...product, published: true, status: "published" };
    await api.put(`/products/${id}`, updated);
    setProducts(prev => prev.map(p => p._id === id ? updated : p));
  } catch (e) {
    alert("Failed to update status");
  }
};


  const unpublishProduct = async (id) => {
    try {
      const product = products.find(p => p._id === id);
      const updated = { ...product, published: false, status: 'unpublished' };
      await api.put(`/products/${id}`, updated);
      setProducts(prev => prev.map(p => p._id === id ? updated : p));
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const requestDelete = (id) => {
    const product = products.find(p => p._id === id);
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await api.delete(`/products/${productToDelete._id}`);
        setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
        setToast({ message: "Product Deleted Successfully" });
      } catch (e) {
        const msg = e.response?.data?.message || e.message;
        alert(`Failed to delete: ${msg}`);
      }
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const filtered = products.filter(p => {
    if (tab === "published") return p.published === true || p.status === "published";
    return p.published === false || p.status === "unpublished";
  });

  return (
    <Layout>
      <div style={{ display: "flex", gap: 32, borderBottom: "1px solid #E2E8F0", marginBottom: "32px" }}>
        <span
          style={{
            cursor: "pointer",
            fontWeight: tab === "published" ? 600 : 500,
            color: tab === "published" ? "#2563EB" : "#64748B",
            borderBottom: tab === "published" ? "2px solid #2563EB" : "2px solid transparent",
            paddingBottom: "12px",
            fontSize: "15px",
            transition: "all 0.2s"
          }}
          onClick={() => setTab("published")}
        >
          Published
        </span>
        <span
          style={{
            cursor: "pointer",
            fontWeight: tab === "unpublished" ? 600 : 500,
            color: tab === "unpublished" ? "#2563EB" : "#64748B",
            borderBottom: tab === "unpublished" ? "2px solid #2563EB" : "2px solid transparent",
            paddingBottom: "12px",
            fontSize: "15px",
            transition: "all 0.2s"
          }}
          onClick={() => setTab("unpublished")}
        >
          Unpublished
        </span>
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: "center",
          marginTop: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}>
          <img
            src="/assests/icons/empty-products.svg"
            alt="No products"
            style={{ width: "80px", height: "auto", marginBottom: "8px" }}
          />
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#334155", margin: 0 }}>
            No {tab} Products
          </h3>
          <p style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>
            Your {tab} products will appear here.
          </p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,260px)", gap: 20, marginTop: 24 }}>
        {filtered.map(p => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={requestDelete}
            onEdit={handleEdit}
            onPublish={publishProduct}
            onUnpublish={unpublishProduct}
          />
        ))}
      </div>

      {open && (
        <AddProductModal
          onClose={() => { setOpen(false); setEditingProduct(null); }}
          onCreate={addProduct}
          initialData={editingProduct}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
      />

      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </Layout>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
  },
  container: {
    backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '400px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'
  },
  title: { margin: 0, fontSize: '16px', fontWeight: '600' },
  closeBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748B' },
  body: { marginBottom: '24px' },
  text: { color: '#64748B', fontSize: '14px', lineHeight: '1.5' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  deleteActionBtn: {
    padding: '8px 24px', backgroundColor: '#1D4ED8', color: 'white', border: 'none', borderRadius: '6px',
    fontWeight: '500', cursor: 'pointer'
  }
};

const toastStyles = {
  container: {
    position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
    backgroundColor: 'white', padding: '12px 24px', borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2000,
    fontSize: '14px', fontWeight: '500', color: '#0F172A',
    border: '1px solid #E2E8F0'
  },
  icon: {
    backgroundColor: '#22C55E', color: 'white', borderRadius: '50%', width: '16px', height: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px'
  },
  close: {
    marginLeft: '12px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8'
  }
};
