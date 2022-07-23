import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ShoppingCart } from "./components/ShoppingCart";
import CartContextProvider from "./context/CartContext";
import StoreItemContextProvider from "./context/StoreItemContext";
import SavedItemsContextProvider from "./context/SavedItemsContext";
import { ItemDetail } from "./components/ItemDetail";
import { Category } from "./pages/Shop";
import CheckOut from "./pages/CheckOut";
import Login from "./pages/Signup";
import { useAppDispatch } from "./app/hooks";
import { fetchProducts } from "./features/productSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Invoice from "./pages/Invoice";
import WishList from "./pages/WishList";

function App() {
  const dispatch = useAppDispatch();

  dispatch(fetchProducts());

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL || "",
            displayName: authUser.displayName || "",
            email: authUser.email || "",
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <StoreItemContextProvider>
      <CartContextProvider>
        <SavedItemsContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item" element={<ItemDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/category" element={<Category />} />
            <Route path="/wishlist" element={<WishList/>} />
            <Route
              path="/checkout"
              element={<PrivateRoute Component={CheckOut} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={<PrivateRoute Component={Profile} />}
            />
            <Route
              path="/invoice"
              element={<PrivateRoute Component={Invoice} />}
            />
          </Routes>
        </SavedItemsContextProvider>
      </CartContextProvider>
    </StoreItemContextProvider>
  );
}

export default App;
