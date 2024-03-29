import React, { useState } from "react";
import { styled } from "@mui/system";
import intl from "react-intl-universal";
import DappForm, { DappFormFields } from "../../components/DappForm/DappForm";
import { Dapp } from "../../model/Dapp";
import { Typography } from "@mui/material";
import { registerDapp } from "../../storage/dapp-registry";
import { useDappContext } from "../../context/DappContext";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "20px",
  width: "500px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const initialDapp: Dapp = {
  name: "",
  authorName: "",
  authorAddress: "",
  category: "",
  github: "",
  logo: "",
  longDescription: "",
  reddit: "",
  shortDescription: "",
  telegram: "",
  twitter: "",
  url: "",
  ens: "",
  website: "",
  discord: "",
};

const RegisterDapp = () => {
  const { reload } = useDappContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [done, setDone] = useState<boolean>(false);

  const onRegister = async (dapp: DappFormFields): Promise<void> => {
    try {
      setLoading(true);
      setError(undefined);

      await registerDapp(dapp.url, dapp);

      reload();

      setDone(true);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {done ? (
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {intl.get("DAPP_REGISTRATION_SUCCESS")}
        </Typography>
      ) : (
        <DappForm
          dapp={initialDapp}
          loading={loading}
          error={error}
          onSubmit={onRegister}
        />
      )}
    </Wrapper>
  );
};

export default RegisterDapp;
