import React, { useState } from "react";
import { styled } from "@mui/system";
import intl from "react-intl-universal";
import DappForm, { DappFormFields } from "../../components/DappForm/DappForm";
import { Dapp } from "../../model/Dapp";
import { Typography } from "@mui/material";
import { editDapp } from "../../storage/dapp-registry";
import { useParams } from "react-router-dom";
import { useDappContext } from "../../context/DappContext";

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

const EditExpiredDapp = () => {
  const { hash } = useParams();
  const { reload } = useDappContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [done, setDone] = useState<boolean>(false);

  const onRegister = async (dapp: DappFormFields): Promise<void> => {
    try {
      setLoading(true);
      setError(undefined);

      await editDapp(hash as string, dapp);

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
        <FormWrapper>
          <DappForm
            dapp={{} as Dapp}
            loading={loading}
            error={error}
            onSubmit={onRegister}
          />
        </FormWrapper>
      )}
    </Wrapper>
  );
};

export default EditExpiredDapp;
