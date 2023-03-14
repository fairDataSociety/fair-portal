import React, { useState } from "react";
import intl from "react-intl-universal";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import DappForm, { DappFormFields } from "../../components/DappForm/DappForm";
import { Dapp } from "../../model/Dapp";
import { Typography } from "@mui/material";
import { registerDapp } from "../../storage/dapp-registry";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [done, setDone] = useState<boolean>(false);

  const constructLink = (link: string): string => {
    if (!link) {
      return "";
    }

    if (!link.startsWith("http")) {
      return `http://${link}`;
    }

    return link;
  };

  const onRegister = async (dapp: DappFormFields): Promise<void> => {
    try {
      setLoading(true);

      await registerDapp(dapp.url, {
        ...dapp,
        github: constructLink(dapp.github),
        reddit: constructLink(dapp.reddit),
        telegram: constructLink(dapp.telegram),
        twitter: constructLink(dapp.twitter),
        website: constructLink(dapp.website),
        discord: constructLink(dapp.discord),
      });

      setDone(true);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      {done ? (
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {intl.get("DAPP_REGISTRATION_SUCCESS")}
        </Typography>
      ) : (
        <>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            {intl.get("REGISTER_DAPP_TITLE")}
          </Typography>
          <DappForm
            dapp={initialDapp}
            loading={loading}
            error={error}
            onSubmit={onRegister}
          />
        </>
      )}
    </FormWrapper>
  );
};

export default RegisterDapp;
