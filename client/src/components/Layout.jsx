import Sidebar from "./Sidebar";
import Header from "./Header";

const styles = {
    container: {
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "'Inter', sans-serif"
    },
    mainContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0
    },
    pageContent: {
        padding: "32px",
        flex: 1,
        overflowY: "auto"
    }
};

function Layout({ children, title, icon }) {
    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.mainContent}>
                <Header title={title} icon={icon} />
                <div style={styles.pageContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
