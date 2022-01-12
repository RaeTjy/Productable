import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const CustomTypography = withStyles({
  root: {
    color: "#15233c",
    variant: "h1",
    fontSize: "70px",
    fontWeight: "600",
    fontFamily: "Noto Serif",
  },
})(Typography);

const CustomHeading = ({ label }) => {
  return <CustomTypography>{label}</CustomTypography>;
};

export default CustomHeading;
