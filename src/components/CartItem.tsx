import storeData from "../data/items.json";
import { useCartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";

type CartItemProps = {
  id: number;
  quantity: number;
};

export const CartItem = (props: CartItemProps) => {
  const { id, quantity } = props;
  const { removeCartItem, decreaseCartItemQuantity, increaseCartItemQuantity } =
    useCartContext();

  const item = storeData.find((elem) => elem.id === id);

  const totalPriceOfItem = quantity * (item?.price || 0);

  return (
    <>
      <tr>
        <th className="ps-0 py-3 border-light" scope="row">
          <div className="d-flex align-items-center">
            <a
              className="reset-anchor d-block animsition-link"
              href="detail.html"
            >
              <img src={item?.image} alt="..." width={70} />
            </a>
            <div className="ms-3">
              <strong className="h6">
                <NavLink className="reset-anchor animsition-link" to={`/item/${id}`}>
                {item?.title.split(" ").slice(0, 3).join(" ")}...
                </NavLink>
              </strong>
            </div>
          </div>
        </th>
        <td className="p-3 align-middle border-light">
          <p className="mb-0 small">
            {item?.price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </td>
        <td className="p-3 align-middle border-light">
          <div className="border d-flex align-items-center justify-content-between px-3">
            <span className="small text-uppercase text-gray headings-font-family">
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
          <p className="mb-0 small">
            {totalPriceOfItem.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </td>
        <td className="p-3 align-middle border-light">
          <label className="reset-anchor" onClick={() => removeCartItem(id)}>
            <i className="fas fa-trash-alt small text-muted" />
          </label>
        </td>
      </tr>
    </>
  );
};
