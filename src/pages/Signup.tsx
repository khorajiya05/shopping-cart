import { Formik, Form } from "formik";
import CheckOutFormField from "../components/CheckOutFormField";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAppSelector } from "../app/hooks";

function Login() {
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const user = useAppSelector((state) => state.user)

  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      navigate("/");
      console.log(res);
    });
  };

  useEffect(()=>{
    if(user.uid !== undefined){
      navigate("/");
    }
  })
  return (
    <>
      <div className="page-holder">
        <div className="container">
          <section className="py-5">
            <div className="row">
              <div className="col-lg-12">
                {signUp ? (
                  <>
                    <div className="row gy-2 d-flex flex-column align-items-center">
                      <h2 className="h5 text-uppercase mb-4 col-md-4">
                        Signup
                      </h2>
                      <button
                        onClick={handleSignInGoogle}
                        className="mb-5 btn btn-dark col-md-4 d-flex justify-content-center align-items-center gap-2 shadow-lg"
                      >
                        <img
                          height={30}
                          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                          alt="google"
                        />
                        <span>Signup with google</span>
                      </button>
                    </div>
                    <Formik
                      initialValues={{
                       
                        email: "",
                        password: "",
                        conpassword:""
                      }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email("Invalid Imail")
                          .required("Required"),

                        password: Yup.string().required("Required"),
                        conpassword: Yup.string()
                          .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                          )
                          .required("Required")
                      })}
                      onSubmit={(value, { resetForm }) => {
                        setLoading(true);
                        createUserWithEmailAndPassword(
                          auth,
                          value.email,
                          value.password
                        )
                          .then((res) => {
                            setLoading(false);
                            navigate(-1);
                            resetForm();
                          })
                          .catch((error) => {
                            setError(error.message);
                            setLoading(false);
                          });
                      }}
                    >
                      <Form>
                        <div className="row gy-2 d-flex flex-column align-items-center">
                          <div className="col-md-4">
                            <CheckOutFormField
                              label="Email address"
                              id="email"
                              name="email"
                              placeholder="e.g. Jason@example.com"
                              type="email"
                            />
                          </div>

                          <div className="col-md-4">
                            <CheckOutFormField
                              label="Password"
                              id="password"
                              name="password"
                              placeholder="Password"
                              type="password"
                            />
                          </div>
                          <div className="col-md-4">
                            <CheckOutFormField
                              label="Confirm Password"
                              id="conpassword"
                              name="conpassword"
                              placeholder="Confirm Password"
                              type="password"
                            />
                          </div>
                          <button
                            className="btn btn-dark col-md-4"
                            type="submit"
                          >
                            {loading ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              "Signup"
                            )}
                          </button>
                          <span className="text-danger col-md-4 d-flex justify-content-center small">
                            {error}
                          </span>
                          <div
                            className="col-md-4 d-flex justify-content-center text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSignUp(false);
                              setError("");
                            }}
                          >
                            Already have accoutn!
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </>
                ) : (
                  <>
                    <div className="row gy-2 d-flex flex-column align-items-center">
                      <h2 className="h5 text-uppercase mb-4 col-md-4">Login</h2>
                      <button
                        onClick={handleSignInGoogle}
                        className="mb-5 btn btn-dark col-md-4 d-flex justify-content-center align-items-center gap-2 shadow-lg"
                      >
                        <img
                          height={30}
                          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                          alt="google"
                        />
                        <span>Login with google</span>
                      </button>
                    </div>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email("Invalid Imail")
                          .required("Required"),
                        password: Yup.string().required("Required"),
                      })}
                      onSubmit={(value, { resetForm }) => {
                        setLoading(true);
                        signInWithEmailAndPassword(
                          auth,
                          value.email,
                          value.password
                        )
                          .then((res) => {
                            navigate(-1);
                            setLoading(false);
                            resetForm();
                          })
                          .catch((error) => {
                            setError(error.message);
                            setLoading(false);
                          });
                      }}
                    >
                      <Form>
                        <div className="row gy-2 d-flex flex-column align-items-center">
                          <div className="col-md-4">
                            <CheckOutFormField
                              label="Email address"
                              id="email"
                              name="email"
                              placeholder="e.g. Jason@example.com"
                              type="email"
                            />
                          </div>
                          <div className="col-md-4">
                            <CheckOutFormField
                              label="Password"
                              id="password"
                              name="password"
                              placeholder="Password"
                              type="password"
                            />
                          </div>

                          <button
                            className="btn btn-dark col-md-4"
                            type="submit"
                          >
                            {loading ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              "Login"
                            )}
                          </button>
                          <span className="text-danger col-md-4 d-flex justify-content-center small">
                            {error}
                          </span>
                          <div
                            className="col-md-4 d-flex justify-content-center text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSignUp(true);
                              setError("");
                            }}
                          >
                            Don't have account?
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
