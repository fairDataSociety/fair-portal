import React from "react";
import { styled } from "@mui/system";

export interface FormWrapperProps {
  children: React.ReactNode;
}

export const Wrapper = styled("div")({
  display: "flex",
  width: "100%",
});

export const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  minHeight: "90vh",
  borderRight: `3px solid ${theme.palette.border.main}`,
  background: `linear-gradient(-45deg, ${theme.palette.primary.light} 25px, transparent 1%), ${theme.palette.primary.dark}`,
  backgroundSize: "50px 50px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const ContentWrapper = styled("div")(({ theme }) => ({
  padding: "20px",
  width: "500px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <Wrapper>
      <Sidebar />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

export default FormWrapper;
