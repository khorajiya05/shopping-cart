import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ShoppingCart } from "./components/ShoppingCart";
import CartContextProvider from "./context/CartContext";
import StoreItemContextProvider from "./context/StoreItemContext";
import { ItemDetail } from "./components/ItemDetail";
import { Category } from "./pages/Shop";
import {FetchData} from './pages/Fetchdata'
import CheckOut from "./pages/CheckOut";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store = {store}>
    <StoreItemContextProvider>
      <CartContextProvider>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item" element={<ItemDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/category" element={<Category />} />
            <Route path = "/checkout" element={<CheckOut/>} />
            <Route path = "/fetchdata" element={<FetchData/>} />
            <Route path = "/fetchdata" element={<FetchData/>} />
          </Routes>
      </CartContextProvider>
    </StoreItemContextProvider>
    </Provider>
  );
}

export default App;
