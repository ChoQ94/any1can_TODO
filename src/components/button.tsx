import React from "react";
import { Button as MUIButton, ButtonProps as MuiButtonProps } from "@mui/joy";
import { Override } from "@/types/common";

interface CustomButtonProps {
  children?: string | React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "plain" | "outlined" | "soft" | undefined;
  color?:
    | "primary"
    | "neutral"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

export type ButtonProps = Override<MuiButtonProps, CustomButtonProps>;

export default function Button(props: ButtonProps) {
  const { children, onClick, variant = "solid", color, ...restProps } = props;
  return (
    <MUIButton onClick={onClick} variant={variant} color={color} {...restProps}>
      {children}
    </MUIButton>
  );
}
