import Sidebar from "./Sidebar";
import Header from "./Header";

const ProductsLayout = ({ children }) => {
  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-main">
        <Header />
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductsLayout;
