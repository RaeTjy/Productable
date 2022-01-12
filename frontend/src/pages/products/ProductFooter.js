import React, { useEffect, useState } from "react";

import { Box, fade, IconButton, Link, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const ProductFooter = ({ pageIndex, totalPages, handlePageClick }) => {
  return (
    <Box
      margin="20px"
      display="flex"
      justifyContent="center"
      // alignSelf="end"
    >
      <Pagination
        variant="outlined"
        color="primary"
        page={pageIndex}
        count={totalPages}
        onChange={handlePageClick}
      />
    </Box>
  );
};

export default ProductFooter;
