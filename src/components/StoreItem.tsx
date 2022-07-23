import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStoreItemContext } from "../context/StoreItemContext";
import { useSavedItemsContext } from "../context/SavedItemsContext";

import FavoriteIcon from "@mui/icons-material/Favorite";

type StoreItemProps = {
  price: number;
  title: string;
  image: string;
  id: number;
  description: string;
  rating: { rate: number; count: number };
  off: number;
  category: string;
};

export function StoreItem({ ...props }: StoreItemProps) {
  const { findDiscount, findStarPercentageRounded } = useStoreItemContext();
  const { addItemToSavedList, getItemsListFromSavedList, handleToast, removeItemFromSavedList} =
    useSavedItemsContext();
  const { title, price, image, id, rating, description, off, category } = props;
  const navigate = useNavigate();

  const starPercentageRounded = findStarPercentageRounded(rating.rate);

  const discount: number = findDiscount(price, off);

  const isSavedItem = getItemsListFromSavedList().find(
    (elem) => elem.id === id
  );

  const productDetails = {
    title,
    price,
    image,
    id,
    description,
    off,
    category,
    rating,
  };

  return (
    <>
      <Card>
        {isSavedItem ? (
          <>
            <FavoriteIcon
              className="text-danger"
              style={{
                cursor: "pointer",
                position: "absolute",
                zIndex: "1",
                right: "5",
                top: "5",
              }}
              onClick={() => {
                removeItemFromSavedList(id);
                handleToast("Product removed your wishlist", "info");
              }}
            />
          </>
        ) : (
          <>
            <FavoriteIcon
              className="text-muted"
              style={{
                cursor: "pointer",
                position: "absolute",
                zIndex: "1",
                top: "5",
                right: "5",
              }}
              onClick={() => {
                addItemToSavedList(id);
                handleToast("Added in wishlist", "success");
              }}
            />
          </>
        )}
        <span onClick={() => navigate("/item", { state: productDetails })}>
          <Card.Img
            className="store-image-hover"
            variant="top"
            src={image}
            height="200px"
            style={{ objectFit: "contain" }}
          ></Card.Img>
          <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-basedline store-item-title mb-0">
              <span className="fs-6 text-truncate">{title}</span>
            </Card.Title>
            <Card.Text
              className="mb-0 text-truncate"
              style={{ cursor: "pointer" }}
            >
              <span>{description}</span>
              <div className="d-flex justify-content-between">
                <span className="text-muted">
                  {discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                  <small className="ms-2 text-decoration-line-through">
                    {price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </small>
                  <small className="ms-1">{off}% off</small>
                </span>

                <div>
                  <div className="stars-outer">
                    <div
                      className="stars-inner"
                      style={{ width: `${starPercentageRounded}` }}
                    ></div>
                  </div>
                  <span className="text-muted" style={{ fontSize: ".65rem" }}>
                    X{rating.count}
                  </span>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </span>
      </Card>
    </>
  );
}
