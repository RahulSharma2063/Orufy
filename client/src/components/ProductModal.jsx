function ProductModal({ closeModal }) {
    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                
                <div style={styles.header}>
                    <h2 style={{ margin: 0 }}>Add Product</h2>
                    <button onClick={closeModal} style={styles.closeBtn}>×</button>
                </div>

                
                <div style={styles.body}>
                    <div style={styles.row}>
                        <div style={styles.group}>
                            <label style={styles.label}>Product Name</label>
                            <input style={styles.input} placeholder="Product name" />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Product Type</label>
                            <input style={styles.input} placeholder="Category" />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.group}>
                            <label style={styles.label}>Quantity</label>
                            <input style={styles.input} placeholder="0" />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Brand</label>
                            <input style={styles.input} placeholder="Brand name" />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.group}>
                            <label style={styles.label}>MRP</label>
                            <input style={styles.input} placeholder="₹0" />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Selling Price</label>
                            <input style={styles.input} placeholder="₹0" />
                        </div>
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Exchange Eligible</label>
                        <select style={styles.input}>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>

                
                <div style={styles.footer}>
                    <button onClick={closeModal} style={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button style={styles.createBtn}>
                        Create Product
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        width: 600,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 40px 80px rgba(0,0,0,0.35)",
        overflow: "hidden",
    },
    header: {
        padding: "20px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    closeBtn: {
        background: "transparent",
        border: "none",
        fontSize: 26,
        cursor: "pointer",
        lineHeight: 1,
    },
    body: {
        padding: 24,
    },
    row: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginBottom: 16,
    },
    group: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        color: "#475569",
        marginBottom: 6,
    },
    input: {
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid #cbd5e1",
        fontSize: 14,
    },
    footer: {
        padding: "16px 24px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
    },
    cancelBtn: {
        padding: "10px 18px",
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        background: "#ffffff",
        cursor: "pointer",
    },
    createBtn: {
        padding: "10px 18px",
        borderRadius: 10,
        border: "none",
        background: "#2563eb",
        color: "#ffffff",
        cursor: "pointer",
    },
};

export default ProductModal;
