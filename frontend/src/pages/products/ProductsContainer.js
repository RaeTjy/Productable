import React, { useEffect, useState } from "react";

import { Box, fade, IconButton, Link, Tooltip } from "@material-ui/core";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductsContainer = ({ numProdPerPage, pageIndex, changed, refresh }) => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const products = await axios.post(
        "/api/products/find",
        {
          skip: (pageIndex - 1) * numProdPerPage,
          limit: numProdPerPage,
        },
        config
      );
      setProducts(products.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, [numProdPerPage, pageIndex, changed]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexGrow={1}
      flexWrap="wrap"
      overflow="auto"
    >
      {products.map((prod) => {
        return <ProductCard key={prod.sku} prod={prod} refresh={refresh} />;
      })}
    </Box>
  );
};

export default ProductsContainer;
