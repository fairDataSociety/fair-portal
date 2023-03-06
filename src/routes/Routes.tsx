import React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Dapp from "../pages/Dapp/Dapp";
import Home from "../pages/Home/Home";
import RegisterDapp from "../pages/RegisterDapp/RegisterDapp";
import RouteCodes from "./RouteCodes";

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route path={RouteCodes.home} element={<Home />} />
        <Route path={RouteCodes.registerDapp} element={<RegisterDapp />} />
        <Route path={RouteCodes.dapp} element={<Dapp />} />
      </ReactRoutes>
    </>
  );
};

export default Routes;
