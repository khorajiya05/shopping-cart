import { useEffect, useState } from "react";

type Initialvalue = {
    id:number;
    quantity:number;
}


export const useLocalStorage = (key:string, initialvalue:Initialvalue[]) => {
  const [value, setValue] = useState(getLocalItems(key));



//to get data from localStorage
function getLocalItems (key:string){

    const jsonValue = localStorage.getItem(key);
    if (jsonValue){
        return JSON.parse(jsonValue);
    } 
    else {
      return [];
    }
  }


useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value));
},[key, value])

return [value, setValue];
};
