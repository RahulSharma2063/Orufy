import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        
        navigate("/otp");
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.imageWrapper}>
                    <img
                        src="/assests/login/login-left.svg"
                        alt="Login Visual"
                        style={styles.leftImage}
                    />
                </div>
            </div>

            <div style={styles.rightSection}>
                <div style={styles.loginSection}>
                    

                    <h1 style={styles.title}>Login to your Productr account</h1>

                    <form onSubmit={handleLogin}>
                        <div style={styles.field}>
                            <label style={styles.label}>Email/Phone Number</label>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Enter email or phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" style={styles.button}>
                            Login
                        </button>
                    </form>

                    <div style={styles.signupBox}>
                        Don’t have an account?{" "}
                        <span style={styles.signupLink}>
                            Create Account
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "#F8FAFC",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden"
    },

    leftSection: {
        width: "50%",
        padding: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        boxSizing: "border-box"
    },

    imageWrapper: {
        width: "100%",
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative"
    },

    leftImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    rightSection: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 10%",
        background: "#F8FAFC",
        boxSizing: "border-box"
    },

    loginSection: {
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column"
    },

    logo: {
        height: "32px",
        display: "block"
    },

    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: "32px",
        lineHeight: "1.2"
    },

    field: {
        marginBottom: "24px"
    },

    label: {
        display: "block",
        marginBottom: "6px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#334155"
    },

    input: {
        width: "100%",
        height: "48px",
        padding: "0 16px",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
        fontSize: "14px",
        color: "#0F172A",
        boxSizing: "border-box",
        outline: "none",
        backgroundColor: "#FFFFFF",
        transition: "border 0.2s"
    },

    button: {
        width: "100%",
        height: "48px",
        background: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "24px",
        boxShadow: "0 4px 6px -1px rgba(30, 58, 138, 0.2)"
    },

    signupBox: {
        width: "100%",
        padding: "16px",
        background: "#F1F5F9",
        borderRadius: "12px",
        textAlign: "center",
        color: "#64748B",
        fontSize: "13px",
        fontWeight: "500",
        boxSizing: "border-box"
    },

    signupLink: {
        color: "#2563EB",
        fontWeight: "600",
        cursor: "pointer"
    }
};

export default Login;
