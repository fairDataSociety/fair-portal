import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import intl from "react-intl-universal";
import DappForm, { DappFormFields } from "../../components/DappForm/DappForm";
import { LocalDapp } from "../../model/Dapp";
import { LinearProgress, Typography } from "@mui/material";
import dappRegistry, {
  getDapp,
  registerDapp,
} from "../../storage/dapp-registry";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { SwarmLocation } from "@fairdatasociety/fdp-contracts-js";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "20px",
  width: "500px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const FormWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const EditDapp = () => {
  const { hash } = useParams();
  const [dapp, setDapp] = useState<LocalDapp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [done, setDone] = useState<boolean>(false);

  const loadDapp = async () => {
    try {
      const dapp = await getDapp(hash as string);

      setDapp(dapp);
    } catch (error) {
      setError(String(error));
    }
  };

  const onRegister = async (dapp: DappFormFields): Promise<void> => {
    try {
      setLoading(true);

      await dappRegistry.deleteRecord(hash as SwarmLocation);

      await registerDapp(dapp.url, dapp);

      setDone(true);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDapp();
  }, []);

  return (
    <Wrapper>
      {done ? (
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {intl.get("DAPP_REGISTRATION_SUCCESS")}
        </Typography>
      ) : (
        <FormWrapper>
          {dapp ? (
            <>
              <Typography variant="caption" sx={{ marginBottom: "20px" }}>
                {intl.get("EDITING_NOTE")}
              </Typography>
              <DappForm
                dapp={dapp}
                loading={loading}
                error={error}
                onSubmit={onRegister}
              />
            </>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <LinearProgress
              color="secondary"
              sx={{ width: "100%", mt: "50px" }}
            />
          )}
        </FormWrapper>
      )}
    </Wrapper>
  );
};

export default EditDapp;
