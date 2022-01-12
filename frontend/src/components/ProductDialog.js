import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import FileBase64 from "react-file-base64";

const ProductDialog = ({
  title,
  open,
  handleClose,
  onUploadImage,
  onTitleChange,
  productTitle,
  handleAction,
  action,
  loading,
}) => {
  const [value, setValue] = useState(productTitle);

  useEffect(() => {
    setValue(productTitle);
  }, [productTitle]);
  const onValueChange = (event) => {
    let title = event.target.value;
    setValue(title);
    onTitleChange(title);
  };

  const handleKeyPress = (event) => {
    if (event.charCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      handleAction();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignContent="space-around">
          <Box marginBottom="20px">
            <FileBase64 type="file" multiple={false} onDone={onUploadImage} />
          </Box>
          <form noValidate>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              color="primary"
              fullWidth
            >
              <OutlinedInput
                id="title"
                placeholder={"Title"}
                value={value}
                onInput={onValueChange}
                autoFocus
                onKeyPress={handleKeyPress}
              />
            </FormControl>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={productTitle === "" || loading}
          onClick={handleAction}
        >
          {loading ? <CircularProgress size={24} /> : action}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
