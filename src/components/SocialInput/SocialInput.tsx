import React from "react";
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
