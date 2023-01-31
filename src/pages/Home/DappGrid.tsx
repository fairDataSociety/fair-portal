import React from "react";
import { styled } from "@mui/system";
import { Dapp } from "../../model/Dapp";
import DappItem from "./DappItem";

export interface DappGridProps {
  dapps: Dapp[];
}

export const DappList = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 100%)",
  justifyContent: "center",
  gridGap: "40px",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fill, 300px)",
  },
}));

const DappGrid = ({ dapps }: DappGridProps) => {
  return (
    <DappList>
      {dapps.map((dapp, index) => (
        <DappItem dapp={dapp} key={index} />
      ))}
    </DappList>
  );
};

export default DappGrid;
