import { useState } from "react";

function ProductCard({ product, onDelete, onEdit, onPublish, onUnpublish }) {
  const { name, brand, price, images, status } = product;
  const [imgError, setImgError] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {images && images.length > 0 && !imgError ? (
          <img
            src={images[0]}
            alt={name}
            style={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={styles.placeholder}>
            <span style={{ fontSize: "24px", color: "#CBD5E1" }}>📦</span>
          </div>
        )}
      </div>

      <div style={styles.info}>
        <h3 style={styles.name}>{name}</h3>

        <div style={styles.row}>
          <span style={styles.label}>Product type -</span>
          <span style={styles.value}>Food</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Brand Name -</span>
          <span style={styles.value}>{brand}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Selling Price -</span>
          <span style={styles.value}>₹ {price}</span>
        </div>
      </div>

      <div style={styles.footer}>
        {status === 'unpublished' ? (
          <button
            style={{ ...styles.btn, ...styles.publishBtn }}
            onClick={(e) => { e.stopPropagation(); onPublish(product._id); }}
          >
            Publish
          </button>
        ) : (
          <button
            style={{ ...styles.btn, ...styles.unpublishBtn }}
            onClick={(e) => { e.stopPropagation(); onUnpublish(product._id); }}
          >
            Unpublish
          </button>
        )}

        <button
          style={{ ...styles.btn, ...styles.editBtn }}
          onClick={(e) => { e.stopPropagation(); onEdit(product); }}
        >
          Edit
        </button>

        <button
          style={{ ...styles.btn, ...styles.deleteBtn }}
          onClick={(e) => { e.stopPropagation(); onDelete(product._id); }}
        >
          <img src="/assests/icons/delete.svg" alt="Delete" style={{ width: "16px", height: "16px", opacity: 0.6 }} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #E2E8F0",
    display: "flex",
    flexDirection: "column",
    height: "100%", 
  },
  imageContainer: {
    height: "160px",
    width: "100%",
    background: "#F8FAFC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #F1F5F9"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "16px"
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F1F5F9"
  },
  info: {
    padding: "16px",
    flex: 1
  },
  name: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#0F172A",
    margin: "0 0 12px 0",
    lineHeight: "1.4",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "12px"
  },
  label: {
    color: "#64748B"
  },
  value: {
    color: "#0F172A",
    fontWeight: "500"
  },
  footer: {
    padding: "12px 16px",
    borderTop: "1px solid #E2E8F0",
    display: "flex",
    gap: "8px",
    background: "#F8FAFC"
  },
  btn: {
    height: "36px",
    borderRadius: "6px",
    border: "none",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s",
    flex: 1
  },
  publishBtn: {
    background: "#1D4ED8", 
    color: "white",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
  },
  unpublishBtn: {
    background: "#16A34A",
    color: "white"
  },
  editBtn: {
    background: "#E2E8F0",
    color: "#334155",
    border: "1px solid #CBD5E1"
  },
  deleteBtn: {
    flex: "0 0 36px", 
    background: "#F1F5F9",
    border: "1px solid #CBD5E1"
  }
};

export default ProductCard;
