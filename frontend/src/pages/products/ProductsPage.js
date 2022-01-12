import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  fade,
  IconButton,
  Link,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProductFooter from "./ProductFooter";
import ProductsContainer from "./ProductsContainer";
import FileBase64 from "react-file-base64";
import { v4 as uuid } from "uuid";

import axios from "axios";
import CustomHeading from "../../components/CustomHeading";
import Header from "../../components/header/header";
import { Add } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import ProductDialog from "../../components/ProductDialog";

const PRODUCTS_PER_PAGE = 5;

const ProductsPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [product, setProduct] = useState({
    sku: "",
    title: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const refresh = () => {
    setChanged(!changed);
    getNumberOfPages();
  };
  const createProduct = async () => {
    setLoading(true);
    const unique_id = uuid();

    let newProduct = {
      ...product,
      sku: unique_id,
    };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/products", newProduct, config);
      if (data) {
        enqueueSnackbar("Product has been created.", {
          variant: "success",
        });

        refresh();
      }
    } catch (error) {
      enqueueSnackbar("Product creation failed.", {
        variant: "error",
      });
    }
    setProduct({
      sku: "",
      title: "",
      image: "",
    });

    setLoading(false);
    setOpen(false);
  };

  const getNumberOfPages = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get("/api/products/count", {}, config);
      if (data) {
        const numPages = Math.ceil(data / PRODUCTS_PER_PAGE);
        if (pageIndex > numPages) {
          setPageIndex(1);
        }
        setTotalPages(numPages);
      }
    } catch (error) {
      enqueueSnackbar("Counting failed.", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getNumberOfPages();
  }, []);

  const handlePageClick = (event, newPage) => {
    if (pageIndex === newPage) return;

    setPageIndex(newPage);
  };

  const handleAddProduct = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onTitleChange = (title) => {
    setProduct({ ...product, title: title });
  };
  const onUploadImage = ({ base64 }) => {
    setProduct({ ...product, image: base64 });
  };

  return (
    <Box
      display="flex"
      flexGrow={1}
      flexDirection="column"
      minHeight="100vh"
      maxHeight="100vh"
    >
      <Header></Header>
      <Box display="flex" alignSelf="center">
        <CustomHeading label={"Products"} />
      </Box>
      <Divider light />
      <Box display="flex">
        <IconButton onClick={handleAddProduct}>
          <Add />
        </IconButton>
      </Box>
      <ProductsContainer
        numProdPerPage={PRODUCTS_PER_PAGE}
        pageIndex={pageIndex}
        changed={changed}
        refresh={refresh}
      />
      <ProductFooter
        pageIndex={pageIndex}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
      <ProductDialog
        title={"Create Product"}
        open={open}
        handleClose={handleClose}
        onUploadImage={onUploadImage}
        onTitleChange={onTitleChange}
        productTitle={product.title}
        action={"Create"}
        handleAction={createProduct}
        loading={loading}
      />
    </Box>
  );
};

export default ProductsPage;
