import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { NavLink } from "react-router-dom";
import { StoreItem } from "../components/StoreItem";
import { Loading } from "../components/Loading";
import { ApiError } from "../components/ApiError";
import { Footer } from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
          <Carousel>
            <div>
              <section className="d-flex align-items-center justify-content-around  px-md-5">
                <div className="container">
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
            <div>
              <section className="d-flex align-items-center justify-content-around  px-md-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <p className="text-muted small text-uppercase mb-2">
                        New Inspiration 2022
                      </p>
                      <h1 className="h2 text-uppercase mb-3">
                        33% off on new season
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
                    src={products[11]?.image}
                    alt="pic 2"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </section>
            </div>
            <div>
              <section className="d-flex align-items-center justify-content-around  px-md-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <p className="text-muted small text-uppercase mb-2">
                        New Inspiration 2022
                      </p>
                      <h1 className="h2 text-uppercase mb-3">
                        23% off on new season
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
                    src={products[12]?.image}
                    alt="pic 2"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </section>
            </div>
          </Carousel>
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
        <Footer />
        <ToastContainer />
      </>
    );
  } else {
    return <Loading />;
  }
};
