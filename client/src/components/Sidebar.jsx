import { useNavigate, useLocation } from 'react-router-dom';

const styles = {
    sidebar: {
        width: "260px",
        background: "#0F172A",
        color: "#ffffff",
        padding: "24px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box"
    },

    logoContainer: {
        marginBottom: "32px",
        paddingLeft: "8px"
    },

    logo: {
        height: "46px",
        width: "auto",
        objectFit: "contain",
        display: "block",
        cursor: 'pointer'
    },

    searchContainer: {
        position: "relative",
        marginBottom: "32px"
    },

    searchIcon: {
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "16px",
        height: "16px",
        opacity: 0.5
    },

    search: {
        width: "100%",
        padding: "10px 12px 10px 40px",
        borderRadius: "8px",
        border: "1px solid #334155",
        background: "#1E293B",
        color: "#F1F5F9",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s",
        boxSizing: "border-box"
    },

    menu: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },

    item: {
        fontSize: "14px",
        color: "#94A3B8",
        cursor: "pointer",
        padding: "10px 12px",
        borderRadius: "8px",
        transition: "all 0.2s",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },

    active: {
        color: "#ffffff",
        fontWeight: "600",
        background: "rgba(255, 255, 255, 0.05)"
    },

    icon: {
        width: "20px",
        height: "20px",
        filter: "brightness(0) invert(1)"
    }
};

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={styles.sidebar}>
            <div style={styles.logoContainer}>
                <img src="/assests/common/logo.svg" alt="Productr" style={styles.logo} onClick={() => navigate('/')} />
            </div>

            <div style={styles.searchContainer}>
                <img src="/assests/common/Search.svg" alt="" style={styles.searchIcon} />
                <input
                    placeholder="Search"
                    style={styles.search}
                />
            </div>

            <div style={styles.menu}>
                <div
                    style={{ ...styles.item, ...(location.pathname === '/home' ? styles.active : {}) }}
                    onClick={() => navigate('/home')}
                >
                    <img src="/assests/common/Home.svg" alt="" style={{ ...styles.icon, opacity: location.pathname === '/home' ? 1 : 0.7 }} />
                    Home
                </div>
                <div
                    style={{ ...styles.item, ...(location.pathname === '/products' ? styles.active : {}) }}
                    onClick={() => navigate('/products')}
                >
                    <img src="/assests/common/Shopping-bag.svg" alt="" style={{ ...styles.icon, opacity: location.pathname === '/products' ? 1 : 0.7 }} />
                    Products
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
