import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styleSheet from "./CSS/style.module.css";
import { useCartContext } from "../context/CartContext";

type ProductDetailType = {
  title: string;
  price: number;
  image: string;
  id: number;
  description: string;
  off: number;
  discount: number;
  starPercentageRounded: string;
  category: string;
  rating: { rate: number; count: number };
};

export const ItemDetail = () => {
  const [swapImage, setSwapImage] = useState(false);
  const { increaseCartItemQuantity, getCartItemquantity } = useCartContext();
  const { state } = useLocation();
  const { title, price, image, id, description, off, discount, starPercentageRounded, category, rating} = state as ProductDetailType;

  const navigate = useNavigate();
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
                      {/* <i className="fa fa-shopping-cart text-muted" /> */}
                    </div>
                    <div className="mt-4 mb-4">
                      <div className="text-uppercase text-muted brand mb-1">
                        {category}
                      </div>
                      <h5 className="text-capitalize">{title}</h5>
                      <div className="price d-flex flex-row align-items-center mt-3">
                        <span className={`${styleSheet.actprice} act-price`}>
                          {discount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                        <div className="ml-2">
                          <small
                            className={`${styleSheet.disprice} dis-price ml-1`}
                          >
                            {price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </small>
                          <span className="ml-1">{off}% OFF</span>
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
                      >
                        Buy now
                      </button>
                      {quantity > 0 ? (
                        <button
                          className={`${styleSheet.btndanger} btn btn-danger text-uppercase mr-2 mb-1 px-4 disabled`}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          className={`${styleSheet.btndanger} btn btn-danger text-uppercase mr-2 mb-1 px-4`}
                          onClick={() => increaseCartItemQuantity(id)}
                        >
                          Add to cart
                        </button>
                      )}
                      <i className={`${styleSheet.i} fa fa-heart text-muted`} />
                      <i
                        className={`${styleSheet.i} fa fa-share-alt text-muted`}
                      />
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
