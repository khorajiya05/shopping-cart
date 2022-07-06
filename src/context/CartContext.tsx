import { createContext, ReactNode, useContext,} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";



//-----------------------------types section------------------------------------
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  increaseCartItemQuantity: (id: number) => void;
  decreaseCartItemQuantity: (id: number) => void;
  getCartItemquantity: (id: number) => number;
  removeCartItem:(id:number) => void;

  cartItem:{id:number, quantity:number}[];
};
type CartItem = {
  id: number;
  quantity: number;
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
      newArr[index].quantity =  newArr[index].quantity + 1;
      setCartItem(newArr)
    } else {
      setCartItem([...cartItem,{id , quantity :1}])
    }
  };

  //decrease quantity of items
  const decreaseCartItemQuantity = (id: number) => {
    const index = cartItem.findIndex((item:CartItem) => item.id === id)
    if(index > -1 && cartItem[index].quantity === 1){      
      const newArr = cartItem.filter((item:CartItem) => item.id !== id)
      setCartItem(newArr);
    } else {
      const newArr = [...cartItem];
      newArr[index].quantity = newArr[index].quantity -1 ;
      setCartItem(newArr);
    }
     };

  //remove cart item
  const removeCartItem = (id:number) => {
    setCartItem(cartItem.filter((item:CartItem)=>item.id !== id));
  }
  

  return (
    <CartContext.Provider
      value={{
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        getCartItemquantity,
        removeCartItem,
        // openCart,
        // closeCart,
        // isOpen,
        cartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;


