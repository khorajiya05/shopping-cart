import * as React from "react";
import { NavLink } from "react-router-dom";

function Invoice() {
  return (
    <>
      <div className="card">
        <div className="card-body mx-4">
          <div className="container">
            <p className="my-5 mx-5" style={{ fontSize: 30 }}>
              Thank for your purchase
            </p>
            <div className="row">
              <ul className="list-unstyled">
                <li className="text-black">John Doe</li>
                <li className="text-muted mt-1">
                  <span className="text-black">Invoice</span> #12345
                </li>
                <li className="text-black mt-1">April 17 2021</li>
              </ul>
              <hr />
              <div className="col-xl-10">
                <p>Pro Package</p>
              </div>
              <div className="col-xl-2">
                <p className="float-end">$199.00</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-xl-10">
                <p>Consulting</p>
              </div>
              <div className="col-xl-2">
                <p className="float-end">$100.00</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-xl-10">
                <p>Support</p>
              </div>
              <div className="col-xl-2">
                <p className="float-end">$10.00</p>
              </div>
              <hr style={{ border: "2px solid black" }} />
            </div>
            <div className="row text-black">
              <div className="col-xl-12">
                <p className="float-end fw-bold">Total: $10.00</p>
              </div>
              <hr style={{ border: "2px solid black" }} />
            </div>
            <div className="text-center" style={{ marginTop: 90 }}>
              <NavLink to="df">
                <u className="text-info">View in browser</u>
              </NavLink>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
