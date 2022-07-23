import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { Formik, Form } from "formik";
import CheckOutFormField from "../components/CheckOutFormField";
import * as Yup from "yup";

interface CartItemType {
  id: number;
  quantity: number;
}

interface ProductItemType extends CartItemType {
  id: number;
  title: string;
  price: number;
  off: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

function CheckOut() {
  const { state } = useLocation();
  const navigate = useNavigate();


  const {
    totalPriceOfCartItems,
    convertPriceInCurrency,
    totalDiscountOfTotalPrice,
    removeDiscountFromItemPrice,
    cartItem,
    storeItems,
  } = useCartContext();

  const items = state as ProductItemType[];
  const totalPriceByRemoveDiscount = convertPriceInCurrency(
    totalPriceOfCartItems() - totalDiscountOfTotalPrice()
  );

  const handelCheckoutData = () => {
    alert("Ordered!!");
    navigate("/invoice");
  };

  if (state) {
    return (
      <>
        <div className="page-holder">
          {/*  Modal */}

          <div className="container">
            {/* HERO SECTION*/}

            <section className="py-5">
              {/* BILLING ADDRESS*/}
              <h2 className="h5 text-uppercase mb-4">Billing details</h2>
              <div className="row">
                <div className="col-lg-8">
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      address: "",
                      pincode: "",
                      city: "",
                      state: "",
                    }}
                    validationSchema={Yup.object({
                      firstName: Yup.string()
                        .required("Required")
                        .matches(/^[aA-zZ\s]+$/, "Invalid name"),
                      lastName: Yup.string()
                        .required("Required")
                        .matches(/^[aA-zZ\s]+$/, "Invalid name"),
                      email: Yup.string()
                        .email("Invalid Imail")
                        .required("Required"),
                      phone: Yup.string()
                        .required("Required")
                        .matches(
                          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                          "Phone number is not valid"
                        )
                        .min(10, "to short")
                        .max(10, "to long"),
                      address: Yup.string().required("Required"),
                      pincode: Yup.number().required("Required"),
                      city: Yup.string().required("Required"),
                      state: Yup.string().required("Required"),
                    })}
                    onSubmit={(value) => {
                      console.log(value);
                      handelCheckoutData();
                    }}
                  >
                    <Form>
                      <div className="row gy-3">
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="firstName"
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="Last name"
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="Email address"
                            id="email"
                            name="email"
                            placeholder="e.g. Jason@example.com"
                            type="email"
                          />
                        </div>

                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="Phone number"
                            id="phone"
                            name="phone"
                            placeholder="e.g. +02 245354745"
                            type="tel"
                          />
                        </div>
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="Address line 1"
                            id="address"
                            name="address"
                            placeholder="House number and street name"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="Area code"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter your area code"
                            type="number"
                          />
                        </div>
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="Town/City"
                            id="city"
                            name="city"
                            placeholder="Town/City name"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-6">
                          <CheckOutFormField
                            label="State"
                            id="state"
                            name="state"
                            placeholder="State name"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-12 form-group">
                          <button className="btn btn-dark" type="submit">
                            Place order
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
                {/* ORDER SUMMARY*/}
                <div className="col-lg-4">
                  <div className="card border-0 rounded-0 p-lg-4 bg-light">
                    <div className="card-body">
                      <h5 className="text-uppercase mb-4">Your order</h5>
                      <ul className="list-unstyled mb-0">
                        <>
                          {items[0].quantity ? (
                            cartItem.map((elem) => {
                              const data = storeItems.find(
                                (elem2) => elem2.id === elem.id
                              );
                              return (
                                <>
                                  <li className="d-flex align-items-center justify-content-between">
                                    <strong className="small fw-bold">
                                      {data?.title
                                        .split(" ")
                                        .slice(0, 3)
                                        .join(" ")}
                                      ...
                                    </strong>
                                    <span className="text-muted small">
                                      {convertPriceInCurrency(
                                        removeDiscountFromItemPrice(
                                          data?.id || 0,
                                          elem.quantity
                                        )
                                      )}
                                    </span>
                                  </li>
                                  <li className="border-bottom my-2" />
                                </>
                              );
                            })
                          ) : (
                            <>
                              <li className="d-flex align-items-center justify-content-between">
                                <strong className="small fw-bold">
                                  {items[0].title
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                                  ...
                                </strong>
                                <span className="text-muted small">
                                  {convertPriceInCurrency(
                                    removeDiscountFromItemPrice(items[0].id)
                                  )}
                                </span>
                              </li>
                              <li className="border-bottom my-2" />
                            </>
                          )}

                          <li className="d-flex align-items-center justify-content-between">
                            <strong className="text-uppercase small fw-bold">
                              Total
                            </strong>
                            <span>
                              {items[0].quantity
                                ? totalPriceByRemoveDiscount
                                : convertPriceInCurrency(
                                    removeDiscountFromItemPrice(items[0].id)
                                  )}
                            </span>
                          </li>
                        </>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Page not found</h1>;
  }
}

export default CheckOut;
