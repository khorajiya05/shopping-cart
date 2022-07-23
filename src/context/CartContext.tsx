import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppSelector } from "../app/hooks";

//-----------------------------types section------------------------------------
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  increaseCartItemQuantity: (id: number) => void;
  decreaseCartItemQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
  getCartItemquantity: (id: number) => number;
  convertPriceInCurrency: (price: number) => string;
  totalPriceOfCartItem: (id: number, quantity?: number) => number;
  totalPriceOfCartItems: () => number;
  removeDiscountFromItemPrice: (id: number, quantity?: number) => number;
  totalDiscountOfTotalPrice: () => number;
  storeItems: StoreProductType[];

  cartItem: { id: number; quantity: number }[];
};
type CartItem = {
  id: number;
  quantity: number;
};

type StoreProductType = {
  title: string;
  price: number;
  image: string;
  id: number;
  description: string;
  off: number;
  category: string;
  rating: { rate: number; count: number };
};

//-------------------------custom hook(returns context value)------------------------------
export const useCartContext = () => {
  return useContext(CartContext);
};

//------------------------------------created context----------------------------------
export const CartContext = createContext({} as ShoppingCartContext);

//------------------------------------context provider---------------------------------
const CartContextProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItem, setCartItem] = useLocalStorage("shopping-cart", []);
  const [storeItems, setStoreItems] = useState<StoreProductType[]>([]);
  const { products } = useAppSelector((state) => state.product);

  //get cart item quantity
  const getCartItemquantity = (id: number) => {
    const index = cartItem.findIndex((item: CartItem) => item.id === id);
    if (index > -1) {
      return cartItem[index].quantity;
    } else {
      return 0;
    }
  };

  //increase quantiy of items
  const increaseCartItemQuantity = (id: number) => {
    const index = cartItem.findIndex((item: CartItem) => item.id === id);
    if (index > -1) {
      let newArr = [...cartItem];
      newArr[index].quantity = newArr[index].quantity + 1;
      setCartItem(newArr);
    } else {
      setCartItem([...cartItem, { id, quantity: 1 }]);
    }
  };

  //decrease quantity of items
  const decreaseCartItemQuantity = (id: number) => {
    const index = cartItem.findIndex((item: CartItem) => item.id === id);
    if (index > -1 && cartItem[index].quantity === 1) {
      const newArr = cartItem.filter((item: CartItem) => item.id !== id);
      setCartItem(newArr);
    } else {
      const newArr = [...cartItem];
      newArr[index].quantity = newArr[index].quantity - 1;
      setCartItem(newArr);
    }
  };

  //remove cart item
  const removeCartItem = (id: number) => {
    setCartItem(cartItem.filter((item: CartItem) => item.id !== id));
  };

  //total price of single items in cart
  const totalPriceOfCartItem = (id: number, quantity?: number) => {
    if (quantity) {
      const item = storeItems.find((elem) => elem.id === id);
      return quantity * (item?.price || 0);
    } else {
      return storeItems.find((elem) => elem.id === id)?.price || 0;
    }
  };

  // remove discount form total price of item
  const removeDiscountFromItemPrice = (id: number, quantity?: number) => {
    if (quantity) {
      const item = storeItems.find((elem) => elem.id === id);
      return Math.round(
        (totalPriceOfCartItem(id, quantity) * (100 - (item?.off || 0))) / 100
      );
    } else {
      const item = storeItems.find((elem) => elem.id === id);
      return Math.round(
        (totalPriceOfCartItem(id) * (100 - (item?.off || 0))) / 100
      );
    }
  };

  //total price of all items of cart
  const totalPriceOfCartItems = () => {
    const total = cartItem.reduce((total: number, elem: CartItem) => {
      const item = storeItems.find((elem2) => elem2.id === elem.id);
      return total + elem.quantity * (item?.price || 0);
    }, 0);
    return total;
  };

  //find tota discount of total price of all items
  const totalDiscountOfTotalPrice = () => {
    const total = cartItem.reduce((total: number, elem: CartItem) => {
      const item = storeItems.find((elem2) => elem2.id === elem.id);
      return Math.round(
        total + (elem.quantity * ((item?.price || 0) * (item?.off || 0))) / 100
      );
    }, 0);
    return total;
  };

  //number to currency converter
  const convertPriceInCurrency = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  useEffect(() => {
    setStoreItems(products);
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        getCartItemquantity,
        removeCartItem,
        totalPriceOfCartItems,
        convertPriceInCurrency,
        totalPriceOfCartItem,
        removeDiscountFromItemPrice,
        totalDiscountOfTotalPrice,
        cartItem,
        storeItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
