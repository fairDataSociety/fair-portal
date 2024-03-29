import React from "react";
import { styled } from "@mui/system";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControlProps,
  FormHelperText,
  OutlinedInputProps,
} from "@mui/material";

export interface SocialInputProps {
  label: string;
  icon: React.ReactElement;
  errorMessage?: string;
  formControlProps: FormControlProps;
}

export const CustomImage = styled("img")(({ theme }) => ({
  color: theme.palette.primary.light,
  width: "20px",
}));

const SocialInput = ({
  label,
  icon,
  errorMessage,
  formControlProps,
  ...rest
}: SocialInputProps & OutlinedInputProps) => {
  return (
    <FormControl {...formControlProps} error={Boolean(errorMessage)}>
      <InputLabel htmlFor="input-with-icon-adornment">{label}</InputLabel>
      <OutlinedInput
        {...rest}
        label={label}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
      />
      <FormHelperText hidden={!Boolean(errorMessage)}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default SocialInput;
