import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthContext/AuthContext";
import { routes } from "./routes/routes";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductView from "./pages/ProductView/ProductView";
import Cart from "./pages/Cart/Cart";
import Favourite from "./pages/Favourite/Favourite";
import Catalog from "./pages/Catalog/Catalog";
import Account from "./pages/Account/Account";
import Stores from "./pages/Stores/Stores";
import StoreView from "./pages/StoreView/StoreView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path={"*"} element={<Home />} />
            <Route path={routes.home.dynamic} element={<Home />} />
            <Route
              path={routes.productView.dynamic}
              element={<ProductView />}
            />
            <Route path={routes.cart.dynamic} element={<Cart />} />
            <Route path={routes.favourite.dynamic} element={<Favourite />} />
            <Route path={routes.catalog.dynamic} element={<Catalog />} />
            <Route path={routes.account.dynamic} element={<Account />} />
            <Route path={routes.stores.dynamic} element={<Stores />} />
            <Route path={routes.storeView.dynamic} element={<StoreView />} />
          </Routes>
        </AuthProvider>
        <ToastContainer
          position={"top-center"}
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
          closeButton={false}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
