import React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterDapp from "../pages/RegisterDapp/RegisterDapp";
import RouteCodes from "./RouteCodes";

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route path={RouteCodes.home} element={<Home />} />
        <Route path={RouteCodes.registerDapp} element={<RegisterDapp />} />
      </ReactRoutes>
    </>
  );
};

export default Routes;
