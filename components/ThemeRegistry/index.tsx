"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

type Props = {
  children: ReactNode;
};

const ThemeRegistry = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeRegistry;
