import React, { useContext } from "react";
import { Context } from "../../context/Context";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function DeleteProductModal(props) {
  const { host } = useContext(Context);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const deleteProduct = async () => {
    try {
      const url = `${host}/Product/deleteproduct`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const json = await response.json();
        return json;
      }
    } catch (error) {
      console.log("Error occurred:", error);
      return [];
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await deleteProduct();
    await props.getProducts();
    props.handleClose();
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="m-2 text-center">Are you Sure? </div>
            <div className="flex justify-between">
              <Button
                size="large"
                variant="outlined"
                color="error"
                onClick={props.handleClose}
              >
                Cancel
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Yes
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
