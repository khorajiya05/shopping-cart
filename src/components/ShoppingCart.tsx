import { useCartContext } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { useAppSelector } from "../app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { ApiError } from "./ApiError";

export const ShoppingCart = () => {
  //-----------------------------Hook------------------------
  const { products, loading, error } = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const {
    cartItem,
    totalPriceOfCartItems,
    convertPriceInCurrency,
    totalDiscountOfTotalPrice,
  } = useCartContext();

  const totalPriceOfItems = totalPriceOfCartItems();
  const TotalPriceInCurrency = convertPriceInCurrency(totalPriceOfItems);
  const totalPriceByRemoveDiscount = convertPriceInCurrency(
    totalPriceOfCartItems() - totalDiscountOfTotalPrice()
  );
  const discount = totalDiscountOfTotalPrice();
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
                  {/* cart item table head */}
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
                    {loading ? (
                      <tbody>
                        <tr>
                          <td colSpan={4}>
                            <Loading />
                          </td>
                        </tr>
                      </tbody>
                    ) : !loading && products.length ? (
                      <tbody className="border-0">
                        {cartItem.map((elem) => {
                          return <CartItem {...elem} key={elem.id} />;
                        })}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan={4}>
                            <ApiError error={error} />
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
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
                      <span
                        className="btn btn-outline-dark btn-sm"
                        onClick={() =>
                          navigate("/checkout", { state: [...cartItem] })
                        }
                      >
                        Procceed to checkout
                        <i className="fas fa-long-arrow-alt-right ms-2" />
                      </span>
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
                          {TotalPriceInCurrency}
                        </span>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Discount
                        </strong>
                        <span className="text-muted small">{discount}</span>
                      </li>
                      <li className="border-bottom my-2" />
                      <li className="d-flex align-items-center justify-content-between mb-4">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>{totalPriceByRemoveDiscount}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h1>Cart is empty</h1>
              <NavLink
                className="btn btn-link p-0 text-dark btn-sm text-decoration-none"
                to="/category"
              >
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
