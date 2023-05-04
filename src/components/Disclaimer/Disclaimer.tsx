import React from "react";
import { styled } from "@mui/system";
import { Container, useTheme } from "@mui/material";

export const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  height: "30px",
});

const Disclaimer = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        textAlign: "center",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      Fair Data Society offers no guarantees about the apps listed in Fair
      Portal.
    </Container>
  );
};

export default Disclaimer;
