import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { NavLink } from "react-router-dom";
import { StoreItem } from "../components/StoreItem";
import { Loading } from "../components/Loading";
import { ApiError } from "../components/ApiError";

export const Home = () => {

  const { products, loading, error } = useAppSelector((state) => state.product);



  if (loading) {
    return <Loading />;
  } else if (!loading && error) {
    return <ApiError error={error} />;
  } else if (!loading && products.length) {
    return (
      <>
        <Container className="mb-4">
          {/* crausel start */}

          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <section className="hero pb-3 bg-cover bg-center d-flex align-items-center justify-content-around py-5 px-md-5">
                  <div className="container py-5">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="text-muted small text-uppercase mb-2">
                          New Inspiration 2022
                        </p>
                        <h1 className="h2 text-uppercase mb-3">
                          15% off on new season
                        </h1>
                        <NavLink className="btn btn-dark" to="/category">
                          Browse collections
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      height={200}
                      width={250}
                      src={products[0]?.image}
                      alt="pic 2"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </section>
              </div>
              <div className="carousel-item">
                <section className="hero pb-3 bg-cover bg-center d-flex align-items-center justify-content-around py-5 px-md-5">
                  <div className="container py-5">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="text-muted small text-uppercase mb-2">
                          New Inspiration 2022I
                        </p>
                        <h1 className="h2 text-uppercase mb-3">
                          33% off on new season
                        </h1>
                        <a className="btn btn-dark" href="shop.html">
                          Browse collections
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      height={200}
                      width={250}
                      src={products[11]?.image}
                      alt="pic 2"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </section>
              </div>
              <div className="carousel-item">
                <section className="hero pb-3 bg-cover bg-center d-flex align-items-center justify-content-around py-5 px-md-5">
                  <div className="container py-5">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="text-muted small text-uppercase mb-2">
                          New Inspiration 2022I
                        </p>
                        <h1 className="h2 text-uppercase mb-3">
                          23% off on new season
                        </h1>
                        <a className="btn btn-dark" href="shop.html">
                          Browse collections
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      height={200}
                      width={250}
                      src={products[12]?.image}
                      alt="pic 2"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* crausal end */}

          {
            <Row md={2} xs={1} lg={3} className="g-3">
              {products.map((elem) => {
                return (
                  <Col key={elem.id}>
                    <StoreItem {...elem} />
                  </Col>
                );
              })}
            </Row>
          }
        </Container>
        <footer className="bg-dark text-white">
          <div className="container py-4">
            <div className="row py-5">
              <div className="col-md-4 mb-3 mb-md-0 d-md-flex flex-column align-items-center">
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
              <div className="col-md-4 mb-3 mb-md-0 d-md-flex flex-column align-items-center">
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
              <div className="col-md-4 mb-3 mb-md-0 d-md-flex flex-column align-items-center">
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
                    © 2022 All rights reserved.
                  </p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <p className="small text-muted mb-0">Juned Khorajiya</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  } else {
    return <Loading />;
  }
};
