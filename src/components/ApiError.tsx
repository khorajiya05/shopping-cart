import React from "react";

export const ApiError = ({ error }: { error: string }) => {
  return (
    <div className="container">
      <div className="row" style={{ height: "75vh" }}>
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1>Somethig Went Wrong</h1>
          <div>
            <span className="hidden" id="js-hidden">
              {error}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
