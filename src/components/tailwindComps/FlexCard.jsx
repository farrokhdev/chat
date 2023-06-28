import React from "react";
import { Box, styled } from "@mui/material";
import { useTheme } from "@emotion/react";

export const FlexCard = ({ className, children }) => {
  const { palette } = useTheme();
  return (
    <Box
      color={palette.neutral.main}
      className={`flex justify-center items-center border rounded  w-full h-full ${className}`}
    >
      {children}
    </Box>
  );
};
