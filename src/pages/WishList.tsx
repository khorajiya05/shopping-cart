import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useCartContext } from "../context/CartContext";
import { useSavedItemsContext } from "../context/SavedItemsContext";
import { useStoreItemContext } from "../context/StoreItemContext";

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

function WishList() {
  const productData = useAppSelector((state) => state.product);
  const { getItemsListFromSavedList, removeItemFromSavedList } =
    useSavedItemsContext();
  const { convertPriceInCurrency } = useCartContext();
  const { findDiscount } = useStoreItemContext();

  const [productList, setProductList] = useState<StoreItemType[]>([]);

  const savedItems = getItemsListFromSavedList();

  useEffect(() => {
    return setProductList(productData.products);
  }, [productData.products]);

  if (savedItems.length) {
    return (
      <>
        <div className="container mb-4">
          <div className="row">
            <div className="col-lg-8 py-5 mx-auto">
              {/* Item*/}

              {savedItems.map((elem) => {
                const item = productList.find((elem1) => elem1.id === elem.id);
                return (
                  <div
                    className="cart-item d-md-flex justify-content-between"
                    style={{ padding: "0 5px 0 0" }}
                  >
                    <div className="px-3 my-3">
                      <div className="cart-item-product">
                        <div className="cart-item-product-thumb">
                          <img
                            style={{
                              objectFit: "contain",
                              height: "8rem",
                              width: "6rem",
                            }}
                            src={item?.image}
                            alt="Product"
                          />
                        </div>
                        <div className="cart-item-product-info">
                          <h5 className="cart-item-product-title">
                            {item?.title.split(" ").slice(0, 4).join(" ")}
                          </h5>
                          <div className="text-md text-body font-weight-medium pb-1">
                            <span>
                              {convertPriceInCurrency(
                                findDiscount(item?.price || 0, item?.off || 0)
                              )}
                            </span>
                            {`  `}
                            <span className="text-muted text-decoration-line-through small">
                              {convertPriceInCurrency(item?.price || 0)}
                            </span>
                            {`  `}
                            <span className="small">{item?.off}% off</span>
                          </div>
                          <span>
                            Availability:
                            <span className="text-success font-weight-medium">
                              In Stock
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="remove-item"
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        width: " 22px",
                        height: "22px",
                        paddingLeft: "1px",
                        borderRadius: "50%",
                        backgroundColor: "#ff5252",
                        color: "#fff",
                        lineHeight: "23px",
                        textAlign: "center",
                        boxShadow: " 0 3px 12px 0 rgba(255, 82, 82, .5)",
                        cursor: "pointer",
                      }}
                      onClick={() => removeItemFromSavedList(item?.id || 0)}
                    >
                      <i className="fa fa-times" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column align-items-center pt-5 mt-5">
        <h1>Wishlist is empty</h1>
        <NavLink
          className="btn btn-link p-0 text-dark btn-sm text-decoration-none"
          to="/category"
        >
          <i className="fas fa-long-arrow-alt-left me-2"></i>
          <h5 className="d-inline ">Continue shopping</h5>
        </NavLink>
      </div>
    );
  }
}

export default WishList;
