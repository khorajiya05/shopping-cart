import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { useAppSelector } from "../app/hooks";

//-----------------------------types section------------------------------------
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

// type ProductDetailPageHandlerType = {
//   title:string;
//   price:number;
//   image:string;
//   id:number;
//   description:string;
//   off:number;
//   discount:number;
//   starPercentageRounded:string;
// }

type StoreItemContextType = {
  filterItems: StoreItem[];
  filterProducts: (category: string) => void;
  resetFilterProducts: () => void;
  // productDetailPageHandler: (data:ProductDetailPageHandlerType) => void;
};

type StoreItemContextProviderProps = {
  children: ReactNode;
};






//-----------------------custom hook to return context value------------------------------------
export const useStoreItemContext = () => {
  return useContext(StoreItemContext);
};






//----------------------------------create context----------------------------------------------
export const StoreItemContext = createContext({} as StoreItemContextType);








//--------------------------------context provider--------------------------------------------


const StoreItemContextProvider = ({children}: StoreItemContextProviderProps) => {
  // const [storeItems, setStoreItems] = useState<StoreItem[]>(storeItemsJson);
  const {products} = useAppSelector(state=>state.product);
  const [filterItems, setFilterItems] = useState(products);
  // const [productDetailOpen, setIsProductDetailOpen] = useState({});

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

  //open product detail page
  // const productDetailPageHandler=(data:Partial<ProductDetailPageHandlerType>)=>{
  //   if(data)
  //   setIsProductDetailOpen(!setIsProductDetailOpen);
  //   else{
  //     setIsProductDetailOpen({});
  //   }
  // }

  useEffect(()=>{
    setFilterItems(products)
  },[products])

  return (
    <StoreItemContext.Provider
      value={{
        filterItems,
        filterProducts,
        resetFilterProducts,
        // productDetailPageHandler
        // sortProductsHighToLow,
      }}
    >
      {children}
    </StoreItemContext.Provider>
  );
};

export default StoreItemContextProvider;
