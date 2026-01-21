// Header.jsx
function Header() {
    return (
        <div style={styles.header}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                
                <span style={styles.pageTitle}></span>
            </div>

            <div style={styles.profile}>
                <div style={styles.avatar}>R</div>

                <img
                    src="/assests/icons/Drop-down.svg"
                    alt=""
                    style={styles.dropdownIcon}
                />
            </div>
        </div>
    );
}

const styles = {
    header: {
        height: 72, 
        background: "#fff", 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        borderBottom: "1px solid #E2E8F0",
        position: "relative",
        zIndex: 1,
    },

    pageTitle: {
        fontSize: 24, 
        fontWeight: 700,
        color: "#1E293B",
        letterSpacing: "-0.5px"
    },

    profile: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "8px",
        transition: "background 0.2s"
    },

    avatar: {
        width: 40, 
        height: 40,
        borderRadius: "12px", 
        background: "#F59E0B", 
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 600,
    },

    dropdownIcon: {
        width: 12,
        height: 12,
        marginLeft: 12,
        opacity: 0.5
    },
};

export default Header;
