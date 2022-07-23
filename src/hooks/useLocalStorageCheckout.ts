import { useEffect, useState } from "react";

interface Initialvalue  {
    product:{id:number,
    quantity:number}[]
}
interface Checkout extends Initialvalue {
    address: {firstName: string, lastName: string, email:string, phone:string, address:string, pin:string, city:string, state:string}
}


export const useLocalStorageCheckout = (key:string, initialvalue:Checkout[]) => {
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
