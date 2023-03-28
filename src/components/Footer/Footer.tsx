import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import FDSLogo from "../../assets/images/fds_logo.jpg";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "50px",
  backgroundColor: theme.palette.secondary.main,
  zIndex: 10,
}));

export const InnerWrapper = styled("div")({
  display: "flex",
  margin: "auto",
});

export const FDSLogoImg = styled("img")({
  margin: "auto",
  width: "40px",
});

const Footer = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <FDSLogoImg src={FDSLogo} />
        <Typography
          fontStyle="italic"
          variant="h6"
          sx={{ margin: "auto 0 auto 10px" }}
        >
          Fair Data Society
        </Typography>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Footer;
