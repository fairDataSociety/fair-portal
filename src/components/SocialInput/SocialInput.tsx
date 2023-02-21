import React from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControlProps,
  FormHelperText,
} from "@mui/material";

export interface SocialInputProps {
  label: string;
  icon: React.ReactElement;
  errorMessage?: string;
}

const SocialInput = ({
  label,
  icon,
  errorMessage,
  ...rest
}: SocialInputProps & FormControlProps) => {
  return (
    <FormControl {...rest} error={Boolean(errorMessage)}>
      <InputLabel htmlFor="input-with-icon-adornment">{label}</InputLabel>
      <OutlinedInput
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
