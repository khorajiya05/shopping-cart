import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { StoreItem } from "../components/StoreItem";
import { useAppSelector } from "../app/hooks";
import { useStoreItemContext } from "../context/StoreItemContext";
import { Loading } from "../components/Loading";
import { ApiError } from "../components/ApiError";

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
  const { filterItems, filterProducts } = useStoreItemContext();
  const [value, setValue] = useState<StoreItemType[] | []>([]);
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [zoom, setZoom] = useState(false);
  const [value2, setValue2] = useState(true);

  const sortProductsHighToLow = (stype: any) => {
    if (stype === 1) {
      setValue(filterItems.sort((a, b) => a.price - b.price));
      setValue2(!value2);
      console.log(filterItems);
    } else {
      setValue(filterItems.sort((a, b) => b.price - a.price));
      console.log(filterItems);
      setValue2(!value2);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setValue(filterItems);
  }, [filterItems]);

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
                      Showing{" "}
                      {value?.length ? value.length : filterItems.length}{" "}
                      results
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
                          onClick={() => sortProductsHighToLow(1)}
                        >
                          Low - High
                        </NavLink>
                      </li>

                      <li className="list-inline-item text-muted me-3">
                        <NavLink
                          className="reset-anchor p-0"
                          to="/category"
                          onClick={() => sortProductsHighToLow(0)}
                        >
                          High - Low
                        </NavLink>
                      </li>

                      <li className="list-inline-item"></li>
                    </ul>
                  </div>
                </div>

                {/* products */}
                {/* <div className="row" style={{overflow:"auto", height:"100vh"}}>
                  {filterItems.length !== 0 ? (value.length >1 ? value : filterItems).map((elem: StoreItemType) => {
                    return (
                      <div className={zoom ? "col-lg-6 col-sm-12 my-3" : "col-lg-4 col-sm-6 my-2"} key={elem.id}>
                        <StoreItem {...elem} />
                      </div>
                    );
                  }) : <div className="d-flex justify-content-center"><h1>Item not found</h1></div>}
                </div> */}

                <div
                  className="row"
                  style={{ overflow: "auto", height: "100vh" }}
                >
                  { loading ? ( loading && <Loading/> ) : !loading && error ?( <ApiError error={error}/> ): !loading && products.length ? 
                    (filterItems.map((elem: StoreItemType) => {
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
                    })) : ""
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-dark text-white">
        <div className="container py-4">
          <div className="row py-5">
            <div className="col-md-4 mb-3 mb-md-0">
              <h6 className="text-uppercase mb-3">Customer services</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <a className="footer-link" href="#!">
                    Help &amp; Contact Us
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Returns &amp; Refunds
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Online Stores
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h6 className="text-uppercase mb-3">Company</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <a className="footer-link" href="#!">
                    What We Do
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Available Services
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Latest Posts
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="text-uppercase mb-3">Social media</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <a className="footer-link" href="#!">
                    Twitter
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Tumblr
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="#!">
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="border-top pt-4"
            style={{ borderColor: "#1d1d1d !important" }}
          >
            <div className="row">
              <div className="col-md-6 text-center text-md-start">
                <p className="small text-muted mb-0">
                  © 2021 All rights reserved.
                </p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <p className="small text-muted mb-0">Juned Khorajiya</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
