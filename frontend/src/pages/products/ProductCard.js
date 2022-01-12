import React, { useEffect, useState } from "react";

import { Box, IconButton, Card } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import ProductDialog from "../../components/ProductDialog";
import axios from "axios";
import { useSnackbar } from "notistack";

const ProductCard = ({ prod, refresh }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(prod);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setProduct(prod);
  }, [prod]);
  const handleEditProduct = () => {
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

  const handleOnUpdateClick = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch("/api/products", product, config);
      if (data) {
        enqueueSnackbar("Product has been updated.", {
          variant: "success",
        });
        setOpen(false);
        refresh();
      }
    } catch (error) {
      enqueueSnackbar("Product update failed.", {
        variant: "error",
      });
      setOpen(false);
    }
    setLoading(false);
  };

  const handleOnDeleteClick = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.delete("/api/products", product.sku, config);
      enqueueSnackbar("Product has been deleted.", {
        variant: "success",
      });
      refresh();
    } catch (error) {
      enqueueSnackbar("Product delete failed.", {
        variant: "error",
      });
    }
  };

  return (
    <Card
      style={{
        minHeight: "350px",
        maxHeight: "350px",
        minWidth: "250px",
        maxWidth: "250px",
        margin: "20px",
        paddingTop: "0px",
        backgroundColor: "white",
      }}
    >
      <Box display="flex" justifyContent="end">
        <IconButton size="small" onClick={handleEditProduct}>
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={handleOnDeleteClick}>
          <Delete />
        </IconButton>
      </Box>
      <Box
        style={{
          padding: "20px",
          paddingTop: "0px",
        }}
      >
        <img
          className="activator"
          style={{ width: "100%", height: 250 }}
          src={prod.image}
        />
        <h3>{prod.title}</h3>
      </Box>

      <ProductDialog
        title={"Update Product"}
        open={open}
        handleClose={handleClose}
        onUploadImage={onUploadImage}
        onTitleChange={onTitleChange}
        productTitle={product.title}
        action={"Update"}
        handleAction={handleOnUpdateClick}
        loading={loading}
      />
    </Card>
  );
};

export default ProductCard;
