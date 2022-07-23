// import storeData from "../data/items.json";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
};
type ProductItemType = {
  id: number;
  title: string;
  price: number;
  off: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export const CartItem = (props: CartItemProps) => {
  const [productsData, setProductsData] = useState<ProductItemType[]>([]);
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  const {
    removeCartItem,
    decreaseCartItemQuantity,
    increaseCartItemQuantity,
    totalPriceOfCartItem,
    convertPriceInCurrency,
    removeDiscountFromItemPrice,
  } = useCartContext();
  const { id, quantity } = props;

  const item: ProductItemType | undefined = productsData.find(
    (elem) => elem.id === id
  );
  const totalPriceOfItem = convertPriceInCurrency(
    removeDiscountFromItemPrice(id, quantity)
  );
  const priceOfItem = convertPriceInCurrency(totalPriceOfCartItem(id));

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <tr>
        <th className="ps-0 py-3 border-light" scope="row">
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/item", { state: { ...item } })}
          >
            <span className="reset-anchor d-block animsition-link">
              <img src={item?.image} alt="..." width={70} />
            </span>
            <div className="ms-3">
              <strong className="h6">
                <span className="reset-anchor animsition-link">
                  {item?.title.split(" ").slice(0, 3).join(" ")}...
                </span>
              </strong>
            </div>
          </div>
        </th>
        <td className="p-3 align-middle border-light">
          <p className="mb-0 small">{priceOfItem}</p>
        </td>
        <td className="p-3 align-middle border-light">
          <div className="border d-flex align-items-center justify-content-between px-3">
            <span className="small text-uppercase headings-font-family">
              Quantity
            </span>
            <div className="quantity">
              <button
                className="dec-btn px-1 m-1"
                onClick={() => decreaseCartItemQuantity(id)}
              >
                <i className="fas fa-caret-left" />
              </button>
              <span>{quantity}</span>
              <button
                className="inc-btn px-1 m-1"
                onClick={() => increaseCartItemQuantity(id)}
              >
                <i className="fas fa-caret-right" />
              </button>
            </div>
          </div>
        </td>
        <td className="p-3 align-middle border-light">
          <p className="mb-0 small">{totalPriceOfItem}</p>
        </td>
        <td className="p-3 align-middle border-light">
          <label
            className="reset-anchor"
            style={{ cursor: "pointer" }}
            onClick={() => removeCartItem(id)}
          >
            <i className="fas fa-trash-alt small text-muted" />
          </label>
        </td>
      </tr>
    </>
  );
};
