import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

function PrivateRoute(props: any) {
  const user = useAppSelector((state) => state.user);
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (user.displayName === undefined) {
      navigate("/login");
    }
  });

  return (
    <>
      <Component />
    </>
  );
}

export default PrivateRoute;
