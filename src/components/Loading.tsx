import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="container">
        <div className="row" style={{ height: "90vh" }}>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <div
              className="spinner-border text-primary"
              id="spinner"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <div id="data">Loading...</div>
          </div>
        </div>
      </div>
    </>
  );
};
