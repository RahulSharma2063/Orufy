import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Otp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        navigate("/home");
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.imageWrapper}>
                    <img
                        src="/assests/login/login-left.svg"
                        alt="Security Visual"
                        style={styles.leftImage}
                    />
                </div>
            </div>

            <div style={styles.rightSection}>
                <div style={styles.content}>
                    
                    <h1 style={styles.title}>OTP Verification</h1>
                    <p style={styles.subtitle}>
                        Enter the verification code we just sent on your email address.
                    </p>

                    <form onSubmit={handleVerify}>
                        <div style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    style={styles.otpInput}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            ))}
                        </div>

                        <button type="submit" style={styles.button}>
                            Verify
                        </button>
                    </form>

                    <p style={styles.resendText}>
                        Didn't receive code? <span style={styles.resendLink}>Resend</span>
                    </p>
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
        fontFamily: "'Inter', sans-serif"
    },

    leftSection: {
        width: "50%",
        padding: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff"
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
        background: "#F8FAFC"
    },

    content: {
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto"
    },

    logo: {
        height: "40px",
        marginBottom: "32px"
    },

    title: {
        marginBottom: "12px",
        fontSize: "28px",
        fontWeight: "700",
        color: "#0F172A",
        letterSpacing: "-0.5px"
    },

    subtitle: {
        marginBottom: "32px",
        fontSize: "15px",
        color: "#64748B",
        lineHeight: "1.5"
    },

    otpContainer: {
        display: "flex",
        gap: "12px",
        marginBottom: "32px",
        justifyContent: "space-between"
    },

    otpInput: {
        width: "50px",
        height: "50px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "600",
        color: "#0F172A",
        borderRadius: "12px",
        border: "1px solid #CBD5E1",
        background: "#ffffff",
        outline: "none",
        transition: "border-color 0.2s"
    },

    button: {
        width: "100%",
        padding: "14px",
        background: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "24px",
        boxShadow: "0 4px 6px -1px rgba(30, 58, 138, 0.2)"
    },

    resendText: {
        textAlign: "center",
        color: "#64748B",
        fontSize: "14px"
    },

    resendLink: {
        color: "#2563EB",
        fontWeight: "600",
        cursor: "pointer",
        textDecoration: "underline"
    }
};

export default Otp;
