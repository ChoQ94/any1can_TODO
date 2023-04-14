import React from "react";
import Input from "@mui/joy/Input";

interface Props {
  value?: string;
  onChange?: any;
  placeholder?: string;
  variant?: "plain" | "outlined" | "soft" | "solid" | undefined;
  onKeyDown?: any;
  endDecorator: any;
}
export default function Textfield(props: Props) {
  const { value, onChange, placeholder, variant, onKeyDown, endDecorator } =
    props;

  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant={variant}
      onKeyDown={onKeyDown}
      endDecorator={endDecorator}
    />
  );
}
