import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { StoreItem } from "../components/StoreItem";
import { useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import { ApiError } from "../components/ApiError";
import { Footer } from "../components/Footer";
import { ToastContainer } from "react-toastify";

//-------------------------------types section--------------------------------------
type StoreItemType = {
  id: number;
  title: string;
  price: number;
  off: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export const Category = () => {
  // const { filterItems } = useStoreItemContext();
  const [value, setValue] = useState<StoreItemType[] | []>([]);
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [zoom, setZoom] = useState(false);
  const [value2, setValue2] = useState(true);

  //sort products by price
  const sortProductsByPrice = (stype: number) => {
    if (stype === 0) {
      setValue(value.slice().sort((a, b) => a.price - b.price));
      setValue2(!value2);
    } else {
      setValue(value.slice().sort((a, b) => b.price - a.price));
      setValue2(!value2);
    }
  };

  //filter products by category
  const filterProducts = (category: string) => {
    const filterResult = products.filter((item: StoreItemType) => {
      return item.category.toLowerCase().match(category.toLowerCase());
    });
    setValue(filterResult);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setValue(products);
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <div className="page-holder">
      <div className="container">
        <section className="py-5">
          <div className="container p-0">
            <div className="row">
              {/* SHOP SIDEBAR*/}
              <div className="col-lg-3 order-2 order-lg-1">
                <h5 className="text-uppercase mb-4">Categories</h5>
                <div className="py-2 px-4 bg-dark text-white mb-3">
                  <strong className="small text-uppercase fw-bold">
                    Fashion &amp; Acc
                  </strong>{" "}
                  {/* SHOP LISTING*/}
                </div>
                <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("women's clothing")}
                    >
                      Women's T-Shirts
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("men's clothing")}
                    >
                      Men's T-Shirts
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      className="reset-anchor"
                      to={"/category"}
                      onClick={() => filterProducts("jewelery")}
                    >
                      Jewelery
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      className="reset-anchor"
                      to="/category"
                      onClick={() => filterProducts("Novelty socks")}
                    >
                      Novelty socks
                    </NavLink>
                  </li>
                </ul>
                <div className="py-2 px-4 bg-light mb-3">
                  <strong className="small text-uppercase fw-bold">
                    Health &amp; Beauty
                  </strong>
                </div>
                <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Cosmetic")}
                    >
                      Shavers
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("bag")}
                    >
                      bags
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Cosmetic")}
                    >
                      Cosmetic
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Cosmetic")}
                    >
                      Nail Art
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Cosmetic")}
                    >
                      Skin Masks &amp; Peels
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Cosmetic")}
                    >
                      Korean cosmetics
                    </NavLink>
                  </li>
                </ul>
                <div className="py-2 px-4 bg-light mb-3">
                  <strong className="small text-uppercase fw-bold">
                    Electronics
                  </strong>
                </div>
                <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
                  <li className="mb-2">
                    <NavLink
                      className="reset-anchor"
                      to={"/category"}
                      onClick={() => filterProducts("electronics")}
                    >
                      Electronics
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("USB Flash drives")}
                    >
                      USB Flash drives
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Headphones")}
                    >
                      Headphones
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Portable speakers")}
                    >
                      Portable speakers
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() =>
                        filterProducts("Cell Phone bluetooth headsets")
                      }
                    >
                      Cell Phone bluetooth headsets
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/category"}
                      className="reset-anchor"
                      onClick={() => filterProducts("Keyboards")}
                    >
                      Keyboards
                    </NavLink>
                  </li>
                </ul>
              </div>
              {/* SHOP LISTING*/}
              <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                <div className="row mb-3 align-items-center">
                  <div className="col-lg-6 mb-2 mb-lg-0">
                    <p className="text-sm text-muted mb-0">
                      Showing {value.length} results
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                      <li className="list-inline-item text-muted me-3">
                        <NavLink
                          className="reset-anchor p-0"
                          to="/category"
                          onClick={() => setZoom(!zoom)}
                        >
                          {zoom ? (
                            <i className="fas fa-th" />
                          ) : (
                            <i className="fas fa-th-large" />
                          )}
                        </NavLink>
                      </li>

                      <li className="list-inline-item text-muted me-3">
                        <NavLink
                          className="reset-anchor p-0"
                          to="/category"
                          onClick={() => sortProductsByPrice(0)}
                        >
                          Low
                        </NavLink>
                      </li>

                      <li className="list-inline-item text-muted me-3">
                        <NavLink
                          className="reset-anchor p-0"
                          to="/category"
                          onClick={() => sortProductsByPrice(1)}
                        >
                          High
                        </NavLink>
                      </li>

                      <li className="list-inline-item"></li>
                    </ul>
                  </div>
                </div>

                {/* products carts */}
                <div
                  className="row"
                  style={{ overflow: "auto", height: "100vh" }}
                >
                  {loading ? (
                    loading && <Loading />
                  ) : !loading && error ? (
                    <ApiError error={error} />
                  ) : value.length ? (
                    value.map((elem: StoreItemType) => {
                      return (
                        <div
                          className={
                            zoom
                              ? "col-lg-6 col-sm-12 my-3"
                              : "col-lg-4 col-sm-6 my-2"
                          }
                          key={elem.id}
                        >
                          <StoreItem {...elem} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-12 d-flex flex-column align-items-center pt-5">
                      <h3>Sorry!!</h3>
                      <div className="error-details">
                        Requested Product not found!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer/>
      </div>
      <Footer />
    </div>
  );
};
