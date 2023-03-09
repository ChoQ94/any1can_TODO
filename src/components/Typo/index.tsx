import React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { Override } from "@/types/common";

interface CustomProps {
  align?: "center" | "inherit" | "justify" | "left" | "right";
  children?: string | React.ReactNode;
  color?: string;
  gutterBottom?: boolean;
  className?: string;
  bold?: boolean;
  noWrap?: boolean;
  component?: React.ElementType;
  style?: React.CSSProperties;
}

type Props = Override<TypographyProps, CustomProps>;

export default function Typo(props: Props) {
  const { children, component = "p", bold = false, ...restProps } = props;
  return (
    <Typography
      fontWeight={bold ? 700 : 500}
      component={component}
      {...restProps}
    >
      {children}
    </Typography>
  );
}
