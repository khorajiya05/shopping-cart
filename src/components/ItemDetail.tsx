import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import styleSheet from "./CSS/style.module.css";
import { useCartContext } from "../context/CartContext";
import { useStoreItemContext } from "../context/StoreItemContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSavedItemsContext } from "../context/SavedItemsContext";
import { ToastContainer } from "react-toastify";

type ProductDetailType = {
  title: string;
  price: number;
  image: string;
  id: number;
  description: string;
  off: number;
  category: string;
  rating: { rate: number; count: number };
};

export const ItemDetail = () => {
  const [swapImage, setSwapImage] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    increaseCartItemQuantity,
    getCartItemquantity,
    convertPriceInCurrency,
  } = useCartContext();
  const { findStarPercentageRounded, findDiscount, passDataToCheckOut } =
    useStoreItemContext();
  const {
    addItemToSavedList,
    getItemsListFromSavedList,
    handleToast,
    removeItemFromSavedList,
  } = useSavedItemsContext();

  const { title, price, image, id, description, off, category, rating } =
    state as ProductDetailType;

  const isSavedItem = getItemsListFromSavedList().find(
    (elem) => elem.id === id
  );

  const starPercentageRounded = findStarPercentageRounded(rating.rate);
  const discount = convertPriceInCurrency(findDiscount(price, off));
  const quantity = getCartItemquantity(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className={styleSheet.card}>
              <div className="row">
                <div className="col-md-6  bg-white mb-1">
                  <div className="row d-flex flex-md-column align-items-center border ">
                    <div className="col-md col-3 thumbnail text-center order-md-1 d-md-flex justify-content-center gap-1 ">
                      <img
                        onClick={() => setSwapImage(false)}
                        className={`${!swapImage && "border"} p-1 opacity-75`}
                        src={image}
                        width={70}
                        alt="no img"
                        style={{ objectFit: "contain", cursor: "pointer" }}
                      />
                      <img
                        onClick={() => setSwapImage(!swapImage)}
                        className={`${swapImage && "border"} p-2`}
                        src={image}
                        width={70}
                        alt="no img"
                        style={{ objectFit: "contain", cursor: "pointer" }}
                      />
                    </div>
                    <img
                      className={`${
                        swapImage ? "" : "opacity-75"
                      } col-8 order-md-0 mb-md-3 col-md`}
                      id="main-image"
                      src={image}
                      width={250}
                      height={300}
                      alt="no img"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className={`${styleSheet.product} p-4 d-flex flex-column justify-content-between`}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="d-flex align-items-center"
                        onClick={() => navigate(-1)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-long-arrow-left" />
                        <span className="ml-1">Back</span>
                      </div>
                      <div className="d-flex gap-3">
                        {isSavedItem ? (
                          <>
                            <ToastContainer />
                            <FavoriteIcon
                              className="text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                removeItemFromSavedList(id);
                                handleToast("Product removed from wishlist","info");
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <ToastContainer />
                            <FavoriteIcon
                              className="text-muted"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                addItemToSavedList(id);
                                handleToast("Product added in wishlist", "success");
                              }}
                            />
                          </>
                        )}
                        {quantity > 0 ? (
                          <NavLink to="/cart" className="text-muted">
                            Open
                            <i className="fas fa-dolly-flatbed mx-1" />
                          </NavLink>
                        ) : (
                          <label
                            className="text-dark"
                            onClick={() => {
                              increaseCartItemQuantity(id);
                              handleToast("Added in cart", "success");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Add
                            <i className="fas fa-dolly-flatbed mx-1" />
                          </label>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <div className="text-uppercase text-muted brand mb-1">
                        {category}
                      </div>
                      <h5 className="text-capitalize">{title}</h5>
                      <div className="price d-flex flex-row align-items-center mt-3">
                        <label className={`${styleSheet.actprice} act-price`}>
                          {discount}
                        </label>
                        <div className="ml-2">
                          <small
                            className={`${styleSheet.disprice} dis-price mx-1`}
                          >
                            {convertPriceInCurrency(price)}
                          </small>
                          <span> {off}% off</span>
                        </div>
                      </div>
                    </div>
                    <p className={`${styleSheet.about} mb-4`}>{description}</p>
                    <div>
                      <div className="stars-outer">
                        <div
                          className="stars-inner"
                          style={{ width: `${starPercentageRounded}` }}
                        ></div>
                      </div>
                      <span
                        className="text-muted"
                        style={{ fontSize: ".9rem" }}
                      >
                        X{rating.count}
                      </span>
                    </div>
                    <div className="cart mt-4 align-items-center">
                      <button
                        className={`${styleSheet.btnprimary} btn btn-primary text-uppercase mr-2 mb-1 px-4`}
                        onClick={() =>
                          passDataToCheckOut([
                            {
                              title,
                              price,
                              image,
                              id,
                              description,
                              off,
                              category,
                              rating,
                            },
                          ])
                        }
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
