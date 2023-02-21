import React from "react";
import intl from "react-intl-universal";
import { FieldError, useForm } from "react-hook-form";
import { Button, LinearProgress, TextField, Tooltip } from "@mui/material";
import GitHub from "@mui/icons-material/GitHub";
import { Dapp } from "../../model/Dapp";
import SocialInput from "../SocialInput/SocialInput";
import Web from "@mui/icons-material/Web";
import Telegram from "@mui/icons-material/Telegram";
import Reddit from "@mui/icons-material/Reddit";
import Twitter from "@mui/icons-material/Twitter";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export interface DappFormProps {
  dapp: Dapp;
  loading: boolean;
  error?: string;
  onSubmit: (dapp: DappFormFields) => Promise<void>;
}

export interface DappFormFields {
  name: string;
  authorName: string;
  authorAddress: string;
  url: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  github: string;
  website: string;
  telegram: string;
  reddit: string;
  twitter: string;
}

const fieldStyles = {
  marginBottom: "20px",
};

const DappForm = ({ loading, error, onSubmit }: DappFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DappFormFields>();

  const getFieldError = (
    error: FieldError | undefined,
    minLength?: number
  ): string | undefined => {
    if (!error) {
      return undefined;
    }

    if (error.type === "required") {
      return intl.get("REQUIRED_ERROR");
    }

    if (error.type === "minLength") {
      return intl.get("MINIMAL_LENGTH_ERROR", { length: minLength });
    }

    return intl.get("INVALID_VALUE");
  };

  const constructOptionalLabel = (label: string): string => {
    return `${intl.get(label)} (${intl.get("OPTIONAL")})`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={intl.get("DAPP_NAME")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        {...register("name", { required: true, minLength: 3 })}
        disabled={loading}
        error={Boolean(errors.name)}
        helperText={getFieldError(errors.name, 3)}
        data-testid="name"
      />
      <Tooltip title={intl.get("URL_TOOLTIP")} arrow>
        <TextField
          label={intl.get("URL")}
          variant="outlined"
          sx={fieldStyles}
          fullWidth
          {...register("url", { required: true })}
          disabled={loading}
          error={Boolean(errors.url)}
          helperText={getFieldError(errors.url)}
          data-testid="url"
        />
      </Tooltip>
      <TextField
        label={intl.get("AUTHOR")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        {...register("authorName", { required: true, minLength: 2 })}
        disabled={loading}
        error={Boolean(errors.authorName)}
        helperText={getFieldError(errors.authorName, 2)}
        data-testid="authorName"
      />
      <Tooltip title={intl.get("AUTHOR_ADDRESS_TOOLTIP")} arrow>
        <TextField
          label={intl.get("AUTHOR_ADDRESS")}
          variant="outlined"
          sx={fieldStyles}
          fullWidth
          {...register("authorAddress", {
            required: true,
            pattern: /^0x[a-fA-F0-9]{40}$/,
          })}
          disabled={loading}
          error={Boolean(errors.authorAddress)}
          helperText={getFieldError(errors.authorAddress)}
          data-testid="authorAddress"
        />
      </Tooltip>
      <TextField
        label={intl.get("LOGO_URL")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        {...register("logo", { required: true })}
        disabled={loading}
        error={Boolean(errors.logo)}
        helperText={getFieldError(errors.logo)}
        data-testid="logo"
      />
      <TextField
        label={intl.get("SHORT_DESCRIPTION")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        {...register("shortDescription", { required: true, minLength: 10 })}
        disabled={loading}
        error={Boolean(errors.shortDescription)}
        helperText={getFieldError(errors.shortDescription, 10)}
        data-testid="shortDescription"
      />
      <TextField
        label={intl.get("LONG_DESCRIPTION")}
        variant="outlined"
        multiline
        sx={fieldStyles}
        fullWidth
        {...register("longDescription", { required: true, minLength: 50 })}
        disabled={loading}
        error={Boolean(errors.longDescription)}
        helperText={getFieldError(errors.longDescription, 50)}
        data-testid="longDescription"
      />

      <SocialInput
        label={constructOptionalLabel("WEBSITE")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        icon={<Web />}
        {...register("website")}
        ref={null}
        disabled={loading}
        errorMessage={getFieldError(errors.website)}
        data-testid="website"
      />

      <SocialInput
        label={constructOptionalLabel("GITHUB_REPO")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        icon={<GitHub />}
        {...register("github")}
        ref={null}
        disabled={loading}
        errorMessage={getFieldError(errors.github)}
        data-testid="github"
      />

      <SocialInput
        label={constructOptionalLabel("TELEGRAM")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        icon={<Telegram />}
        {...register("telegram")}
        ref={null}
        disabled={loading}
        errorMessage={getFieldError(errors.telegram)}
        data-testid="telegram"
      />

      <SocialInput
        label={constructOptionalLabel("REDDIT")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        icon={<Reddit />}
        {...register("reddit")}
        ref={null}
        disabled={loading}
        errorMessage={getFieldError(errors.reddit)}
        data-testid="reddit"
      />

      <SocialInput
        label={constructOptionalLabel("TWITTER")}
        variant="outlined"
        sx={fieldStyles}
        fullWidth
        icon={<Twitter />}
        {...register("twitter")}
        ref={null}
        disabled={loading}
        errorMessage={getFieldError(errors.twitter)}
        data-testid="twitter"
      />

      {loading && <LinearProgress />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button
        color="primary"
        variant="contained"
        type="submit"
        size="large"
        disabled={loading}
        data-testid="submit"
        sx={{
          marginTop: "50px",
        }}
      >
        {intl.get("REGISTER")}
      </Button>
    </form>
  );
};

export default DappForm;
