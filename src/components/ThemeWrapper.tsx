"use client";

import { useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { themeSettings } from "@/lib/theme";
import { State } from "@/models/base.model";
import { clearMessage } from "@/redux/ui";


export default function ThemeWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const mode = useSelector((state: State) => state.auth.mode);
  const message = useSelector((state: State) => state.ui.message);
  const dispatch = useDispatch();
  
  const theme = useMemo(() => {
    return createTheme(themeSettings(mode));
  }, [mode]);

  useEffect(() => {
    if (message) {
      toast(message.text, {
        type: message.type,
        onClose: () => dispatch(clearMessage()),
      });
    }
  }, [message?.text, message?.type]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
}
