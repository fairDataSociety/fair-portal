import React from "react";
import { styled } from "@mui/system";
import { Dapp } from "../../model/Dapp";
import DappItem from "./DappItem";
import { Link } from "react-router-dom";

export interface DappGridProps {
  dapps: Dapp[];
}

export const DappList = styled("div")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(auto-fill, 100%)",
  justifyContent: "center",
  gridGap: "40px",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fill, 300px)",
  },
}));

export const StyledLinks = styled(Link)({
  textDecoration: "none",
});

const DappGrid = ({ dapps }: DappGridProps) => {
  return (
    <DappList>
      {dapps.map((dapp, index) => (
        <StyledLinks to="dapp">
          <DappItem dapp={dapp} key={index} />
        </StyledLinks>
      ))}
    </DappList>
  );
};

export default DappGrid;
