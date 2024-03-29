import React from "react";
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import Dapp from "../pages/Dapp/Dapp";
import EditDapp from "../pages/EditDapp/EditDapp";
import Home from "../pages/Home/Home";
import RegisterDapp from "../pages/RegisterDapp/RegisterDapp";
import RouteCodes from "./RouteCodes";
import ExpiredDapps from "../pages/ExpiredDapps/ExpiredDapps";
import EditExpiredDapp from "../pages/EditExpiredDapp/EditExpiredDapp";

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route path={RouteCodes.home} element={<Home />} />
        <Route path={RouteCodes.registerDapp} element={<RegisterDapp />} />
        <Route path={RouteCodes.editDapp} element={<EditDapp />} />
        <Route
          path={RouteCodes.editExpiredDapp}
          element={<EditExpiredDapp />}
        />
        <Route path={RouteCodes.dapp} element={<Dapp />} />
        <Route path={RouteCodes.expiredDapps} element={<ExpiredDapps />} />
        <Route path="*" element={<Navigate to={RouteCodes.home} replace />} />
      </ReactRoutes>
    </>
  );
};

export default Routes;
