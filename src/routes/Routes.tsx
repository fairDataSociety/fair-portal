import React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import RouteCodes from "./RouteCodes";

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route path={RouteCodes.home} element={<Home />} />
      </ReactRoutes>
    </>
  );
};

export default Routes;
