import { useCartContext } from "../context/CartContext";
import { CartItem } from "./CartItem";
import storeData from "../data/items.json";
import { NavLink } from "react-router-dom";

type CartItemType = {
  id: number;
  quantity: number;
};


export const ShoppingCart = () => {
  //-----------------------------Hook------------------------
  const { cartItem } = useCartContext();

  //---------------------------return jsx-------------------
  return (
    <div className="page-holder">
      <div className="container">
        <section className="py-5">
          <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
          {cartItem.length > 0 ? (
            <div className="row">
              <div className="col-lg-8 mb-4 mb-lg-0">
                {/* CART TABLE*/}
                <div className="table-responsive mb-4">
                  <table className="table text-nowrap bg-white">
                    <thead>
                      <tr>
                        <th className="border-0 p-3" scope="col">
                          <strong className="text-sm text-uppercase">
                            Product
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          <strong className="text-sm text-uppercase">
                            Price
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          <strong className="text-sm text-uppercase">
                            Quantity
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          <strong className="text-sm text-uppercase">
                            Total
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          <strong className="text-sm text-uppercase" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-0">
                      {cartItem.map((elem) => {
                        return <CartItem {...elem} key={elem.id} />;
                      })}
                    </tbody>
                  </table>
                </div>
                {/* CART NAV*/}
                <div className="bg-light px-4 py-3">
                  <div className="row align-items-center text-center">
                    <div className="col-md-6 mb-3 mb-md-0 text-md-start">
                      <NavLink
                        className="btn btn-link p-0 text-dark btn-sm"
                        to="/category"
                      >
                        <i className="fas fa-long-arrow-alt-left me-2"> </i>
                        Continue shopping
                      </NavLink>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <NavLink
                        className="btn btn-outline-dark btn-sm"
                        to="/checkout"
                      >
                        Procceed to checkout
                        <i className="fas fa-long-arrow-alt-right ms-2" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              {/* ORDER TOTAL*/}
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Cart total</h5>
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Subtotal
                        </strong>
                        <span className="text-muted small">
                          {cartItem
                            .reduce((total: number, elem: CartItemType) => {
                              const item = storeData.find(
                                (elem2) => elem2.id === elem.id
                              );
                              return total + elem.quantity * (item?.price || 0);
                            }, 0)
                            .toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                        </span>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Discount
                        </strong>
                        <span className="text-muted small">0</span>
                      </li>
                      <li className="border-bottom my-2" />
                      <li className="d-flex align-items-center justify-content-between mb-4">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>
                          {cartItem
                            .reduce((total: number, elem: CartItemType) => {
                              const item = storeData.find(
                                (elem2) => elem2.id === elem.id
                              );
                              return total + elem.quantity * (item?.price || 0);
                            }, 0)
                            .toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                        </span>
                      </li>
                      <li>
                        <form action="#">
                          <div className="input-group mb-0">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your coupon"
                            />
                            <button
                              className="btn btn-dark btn-sm w-100"
                              type="submit"
                            >
                              <i className="fas fa-gift me-2" />
                              Apply coupon
                            </button>
                          </div>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          
              <div className="d-flex flex-column align-items-center">
                <h1>Cart is empty</h1>
            
              <NavLink className="btn btn-link p-0 text-dark btn-sm text-decoration-none" to="/category">
                <i className="fas fa-long-arrow-alt-left me-2"></i>
                <h5 className="d-inline ">Continue shopping</h5>
              </NavLink>
              </div>
          )}
        </section>
      </div>
    </div>
  );
};
