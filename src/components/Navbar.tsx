import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { fetchUsers } from "../features/produxtSlice";
import { useAppDispatch } from "../app/hooks";

export function Navbar() {
  const { cartItem } = useCartContext();
  const dispatch = useAppDispatch();
  const total = cartItem.length;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      {/* navbar*/}
      <header className="header bg-white sticky-top shadow-sm">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <NavLink className="navbar-brand" to="/">
              <span className="fw-bold text-uppercase text-dark">S cart</span>
            </NavLink>
            <button
              className="navbar-toggler navbar-toggler-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/category">
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    id="pagesDropdown"
                    to="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </NavLink>
                  <div
                    className="dropdown-menu mt-3 shadow-sm"
                    aria-labelledby="pagesDropdown"
                  >
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/"
                    >
                      Homepage
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/category"
                    >
                      Category
                    </NavLink>
                    <NavLink
                      to={"/cart"}
                      className="dropdown-item border-0 transition-link"
                    >
                      Shopping cart
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/checkout"
                    >
                      Checkout
                    </NavLink>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to={"/cart"}
                    className="nav-link"
                    //  onClick={() => openCart()}
                  >
                    <i className="fas fa-dolly-flatbed me-1 text-gray" />
                    Cart
                    <small className="text-gray fw-normal">
                      ({total > 0 ? total : "0"})
                    </small>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#!">
                    <i className="far fa-heart me-1" />
                    <small className="text-gray fw-normal"> (0)</small>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#!">
                    <i className="fas fa-user me-1 text-gray fw-normal" />
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
