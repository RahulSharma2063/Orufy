import { useState, useEffect } from "react";
import { api } from "../api";

function AddProductModal({ onClose, onCreate, initialData }) {
    const [images, setImages] = useState([]);
    const [name, setName] = useState("CakeZone Walnut Brownie");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [mrp, setMrp] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [exchange, setExchange] = useState("Yes");
    const [nameError, setNameError] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setType(initialData.type || "");
            setQuantity(initialData.quantity || "");
            setMrp(initialData.mrp || "");
            setPrice(initialData.price || "");
            setBrand(initialData.brand || "");
            setExchange(initialData.exchange || "Yes");
            if (initialData.images) setImages(initialData.images);
        } else {
            setName("");
        }
    }, [initialData]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...previews]);
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            setNameError(true);
            return;
        }
        setNameError(false);

        const productData = {
            name,
            type,
            quantity,
            mrp,
            price,
            brand,
            exchange,
            images,
            published: initialData ? initialData.published : false
        };

        let res;
        try {
            if (initialData) {
                res = await api.put(`/products/${initialData._id}`, productData);
            } else {
                res = await api.post("/products", productData);
            }
            onCreate(res.data, !!initialData);
            onClose();
        } catch (e) {
            console.error("Failed to save product", e);
            const msg = e.response?.data?.message || "Failed to save product. Is backend running?";
            alert(`Error: ${msg}`);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3 style={styles.heading}>{initialData ? "Edit Product" : "Add Product"}</h3>
                    <button style={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div style={styles.body}>
                    <div style={styles.field}>
                        <label style={styles.label}>Product Name</label>
                        <input
                            value={name}
                            onChange={e => { setName(e.target.value); setNameError(false); }}
                            style={{
                                ...styles.input,
                                borderColor: nameError ? "#EF4444" : "#CBD5E1"
                            }}
                            placeholder="Enter product name"
                        />
                        {nameError && <span style={styles.errorText}>Please enter product name</span>}
                    </div>

                    <CustomSelect
                        label="Product Type"
                        placeholder="Select product type"
                        options={["Bakery", "Food", "Electronics", "Clothes", "Beauty Products", "Others"]}
                        defaultValue={initialData ? initialData.type : ""}
                        onChange={setType}
                    />
                    <Field label="Quantity Stock" value={quantity} setValue={setQuantity} placeholder="Total numbers of Stock available" />
                    <Field label="MRP" value={mrp} setValue={setMrp} placeholder="Total numbers of Stock available" />
                    <Field label="Selling Price" value={price} setValue={setPrice} placeholder="Total numbers of Stock available" />
                    <Field label="Brand Name" value={brand} setValue={setBrand} placeholder="Total numbers of Stock available" />

                    <div style={styles.field}>
                        <div style={styles.uploadHeader}>
                            <label style={styles.label}>Upload Product Images</label>
                            <label style={styles.addPhotos}>
                                Add More Photos
                                <input type="file" multiple hidden onChange={handleImageUpload} />
                            </label>
                        </div>

                        {images.length === 0 ? (
                            <label style={styles.uploadBox}>
                                <span style={styles.uploadText}>Enter Description</span>
                                <span style={styles.browse}>Browse</span>
                                <input type="file" multiple hidden onChange={handleImageUpload} />
                            </label>
                        ) : (
                            <div style={styles.previewGrid}>
                                {images.map((img, i) => (
                                    <div key={i} style={{ position: 'relative' }}>
                                        <img src={img} alt="" style={styles.previewImg} />
                                    </div>
                                ))}
                                <label style={styles.miniUpload}>
                                    <img src="/assests/icons/upload-cloud.svg" alt="+" style={{ width: 20, opacity: 0.5 }} />
                                    <input type="file" multiple hidden onChange={handleImageUpload} />
                                </label>
                            </div>
                        )}
                    </div>

                    <CustomSelect
                        label="Exchange or return eligibility"
                        placeholder="Yes"
                        options={["Yes", "No"]}
                        defaultValue={exchange}
                        onChange={setExchange}
                    />
                </div>

                <div style={styles.footer}>
                    <button style={styles.button} onClick={handleSubmit}>
                        {initialData ? "Update" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const Field = ({ label, value, setValue, placeholder }) => (
    <div style={styles.field}>
        <label style={styles.label}>{label}</label>
        <input
            value={value}
            onChange={e => setValue(e.target.value)}
            style={styles.input}
            placeholder={placeholder}
        />
    </div>
);

const CustomSelect = ({ label, options, placeholder, defaultValue, onChange }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue || "");

    useEffect(() => {
        if (defaultValue) setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div style={styles.field}>
            <label style={styles.label}>{label}</label>
            <div style={styles.selectBox} onClick={() => setOpen(!open)}>
                <span style={{ color: value ? "#0f172a" : "#94a3b8" }}>
                    {value || placeholder}
                </span>
                <img src="/assests/icons/Drop-down.svg" alt="" style={{ opacity: 0.5 }} />
            </div>

            {open && (
                <div style={styles.dropdown}>
                    {options.map(opt => (
                        <div
                            key={opt}
                            style={styles.option}
                            onClick={() => {
                                setValue(opt);
                                onChange(opt);
                                setOpen(false);
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
    },
    modal: {
        width: "650px",
        maxHeight: "90vh",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    header: {
        height: "72px",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #E2E8F0"
    },
    heading: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#0F172A",
        letterSpacing: "-0.5px"
    },
    closeBtn: {
        border: "none",
        background: "transparent",
        fontSize: "24px",
        color: "#64748B",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.2s"
    },
    body: {
        padding: "32px",
        overflowY: "auto"
    },
    field: {
        marginBottom: "24px",
        position: "relative"
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "#334155",
        marginBottom: "8px"
    },
    input: {
        width: "100%",
        height: "48px",
        padding: "0 16px",
        borderRadius: "10px",
        border: "1px solid #CBD5E1",
        fontSize: "14px",
        color: "#0F172A",
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxSizing: "border-box"
    },
    selectBox: {
        height: "48px",
        width: "100%",
        border: "1px solid #CBD5E1",
        borderRadius: "10px",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        background: "#fff",
        boxSizing: "border-box"
    },
    dropdown: {
        position: "absolute",
        top: "60px",
        width: "100%",
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        zIndex: 50,
        overflow: "hidden",
        maxHeight: "240px",
        overflowY: "auto"
    },
    option: {
        padding: "12px 16px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#334155",
        transition: "background 0.1s"
    },
    uploadHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px"
    },
    addPhotos: {
        fontSize: "13px",
        color: "#2563EB",
        fontWeight: "600",
        cursor: "pointer"
    },
    uploadBox: {
        height: "160px",
        border: "2px dashed #CBD5E1",
        borderRadius: "12px",
        background: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        cursor: "pointer",
        transition: "background 0.2s"
    },
    uploadText: {
        fontSize: "14px",
        color: "#64748B"
    },
    browse: {
        fontSize: "14px",
        color: "#2563EB",
        fontWeight: "600"
    },
    previewGrid: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap"
    },
    previewImg: {
        width: "64px",
        height: "64px",
        borderRadius: "8px",
        objectFit: "cover",
        border: "1px solid #E2E8F0"
    },
    miniUpload: {
        width: "64px",
        height: "64px",
        borderRadius: "8px",
        border: "1px dashed #CBD5E1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94A3B8",
        cursor: "pointer",
        fontSize: "24px"
    },
    footer: {
        padding: "24px 32px",
        borderTop: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "flex-end",
        background: "#F8FAFC"
    },
    button: {
        minWidth: "120px",
        height: "48px",
        borderRadius: "10px",
        border: "none",
        color: "#fff",
        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)"
    },
    errorText: {
        color: "#EF4444",
        fontSize: "12px",
        marginTop: "6px",
        display: "block"
    }
};

export default AddProductModal;
