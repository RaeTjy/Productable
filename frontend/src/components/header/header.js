import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import {
  Box,
  Button,
  fade,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
const CustomTypography = withStyles({
  root: {
    color: "#15233c",
    variant: "h1",
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "Noto Serif",
  },
})(Typography);

const Header = () => {
  let navigate = useNavigate();

  const handleOnLogOff = () => {
    //remove user from store

    navigate("/");
  };
  return (
    <Box
      display="flex"
      justifySelf="top"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      style={{
        padding: "5px 10px",
        minHeight: "30px",
        backgroundColor: "#d0dfff",
      }}
    >
      <CustomTypography>Productable</CustomTypography>
      <Box display="flex">
        <Button onClick={handleOnLogOff}>Log Off</Button>
      </Box>
    </Box>
  );
};

export default Header;
