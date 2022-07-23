import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";


//-----------------------------types------------------------------------
type StoreItem = {
  id: number;
  title: string;
  price: number;
  off: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

type StoreItemContextType = {
  filterItems: StoreItem[];
  filterProducts: (category: string) => void;
  resetFilterProducts: () => void;
  findStarPercentageRounded: (rate: number) => string;
  findDiscount: (price: number, off: number) => number;
  passDataToCheckOut: (item: StoreItem[]) => void;
};

type StoreItemContextProviderProps = {
  children: ReactNode;
};

//-----------------------custom hook to get context data------------------------------------
export const useStoreItemContext = () => {
  return useContext(StoreItemContext);
};

//----------------------------------create context----------------------------------------------
export const StoreItemContext = createContext({} as StoreItemContextType);

//--------------------------------context provider--------------------------------------------

const StoreItemContextProvider = ({
  children,
}: StoreItemContextProviderProps) => {
  const { products } = useAppSelector((state) => state.product);
  const [filterItems, setFilterItems] = useState(products);
  const navigate = useNavigate();

  //filter items
  const filterProducts = (category: string) => {
    const filterResult = products.filter((item: StoreItem) => {
      return item.category.toLowerCase().match(category.toLowerCase());
    });
    setFilterItems(filterResult);
  };

  const resetFilterProducts = () => {
    setFilterItems(products);
  };

  //find starPercentageRounded
  const findStarPercentageRounded = (rate: number) => {
    const starTotal = 5;
    const starPercentage = (rate / starTotal) * 100;
    return `${Math.round(starPercentage / 10) * 10}%`;
  };

  //find discount
  const findDiscount = (price: number, off: number) => {
    return Math.round((price * (100 - off)) / 100);
  };

  //pass data to checkout
  const passDataToCheckOut = (item: StoreItem[]) => {
    navigate("/checkout", { state: item });
  };

  useEffect(() => {
    setFilterItems(products);
  }, [products]);

  return (
    <StoreItemContext.Provider
      value={{
        filterItems,
        filterProducts,
        resetFilterProducts,
        findStarPercentageRounded,
        findDiscount,
        passDataToCheckOut,
      }}
    >
      {children}
    </StoreItemContext.Provider>
  );
};

export default StoreItemContextProvider;
