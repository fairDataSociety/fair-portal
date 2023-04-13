import React from "react";
import { styled } from "@mui/system";
import { LocalDapp } from "../../model/Dapp";
import DappItem from "./DappItem";

export interface DappGridProps {
  dapps: LocalDapp[];
}

export const DappList = styled("div")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(auto-fill, 100%)",
  gridTemplateRows: "repeat(auto-fill, 220px)",
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
