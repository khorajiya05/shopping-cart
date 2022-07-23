import { createContext, ReactNode, useContext } from "react";
import { useLocalStorageSavedItems } from "../hooks/useLocalStorageSavedItems";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SavedItemType = {
  id: number;
};

type SavedItemsContextType = {
  addItemToSavedList: (id: number) => void;
  removeItemFromSavedList: (id: number) => void;
  getItemsListFromSavedList: () => SavedItemType[];
  handleToast:(message:string, type:string)=>void;
};

type SavedItemsContextProviderProps = {
  children: ReactNode;
};

// ______________________________________create context_______________________________
export const SavedItemsContext = createContext({} as SavedItemsContextType);

//______________________________custom hook(get context data)_________________________
export const useSavedItemsContext = () => {
  return useContext(SavedItemsContext);
};

//____________________________context provider_______________________________________
const SavedItemsContextProvider = ({
  children,
}: SavedItemsContextProviderProps) => {
  const [savedItems, setSavedItems] = useLocalStorageSavedItems("s-saved", []);

  //add item in saved list
  const addItemToSavedList = (id: number) => {
    const item = savedItems.find((elem: SavedItemType) => elem.id === id);
    if (item === undefined) {
      setSavedItems((prevItems: SavedItemType[]) => [...prevItems, { id }]);
    }
  };

  //remove items from wishlist
  const removeItemFromSavedList = (id: number) => {
    setSavedItems((prevItem:SavedItemType[]) => prevItem.filter((elem) => elem.id !== id))
   
  };

  // get item list of wishlist
  const getItemsListFromSavedList = () => {
    return savedItems;
  };

  //handle toast
  const handleToast = (message: string, type: string) => {
    switch (true) {
      case type === "success":
        toast.success(message);
      
        break;

      case type === "error":
        toast.error(message);
        break;

      case type === "info": 
        toast.info(message);
        break;

      case type === "warn":
        toast.warn(message);
        break;

      default:
        toast(message);
        break;
    }
  };

  return (
    <SavedItemsContext.Provider
      value={{
        addItemToSavedList,
        removeItemFromSavedList,
        getItemsListFromSavedList,
        handleToast
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
};

export default SavedItemsContextProvider;
