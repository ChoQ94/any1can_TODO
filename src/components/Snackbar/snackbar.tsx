import React from "react";
import { Alert as MUIAlert, Snackbar as MUISnackbar } from "@mui/material";

interface Props {
  open?: boolean;
  onClose?: () => void;
  dialogText?: string;
  autoHideDuration?: number;
}

export default function Snackbar(props: Props) {
  const { open, onClose, dialogText, autoHideDuration = 2000 } = props;

  return (
    <MUISnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <MUIAlert severity="error">{dialogText}</MUIAlert>
    </MUISnackbar>
  );
}
