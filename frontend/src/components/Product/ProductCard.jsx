import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function ProductCard(props) {

  const [editProductOpen, setEditProductOpen] = useState(false);
  const handleEditProductOpen = () => setEditProductOpen(true);
  const handleEditProductClose = () => setEditProductOpen(false);

  const [deleteProductOpen, setDeleteProductOpen] = useState(false);
  const handleDeleteProductOpen = () => setDeleteProductOpen(true);
  const handleDeleteProductClose = () => setDeleteProductOpen(false);

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://plus.unsplash.com/premium_photo-1675604274302-665e7e65021e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="success" onClick={handleEditProductOpen}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={handleDeleteProductOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>


      <EditProductModal
        handleClose={handleEditProductClose}
        open={editProductOpen}
        id={props.id}
        name={props.name}
        description={props.description}
        getProducts={props.getProducts}
      />
      <DeleteProductModal
        handleClose={handleDeleteProductClose}
        open={deleteProductOpen}
        id={props.id}
        getProducts={props.getProducts}
      />
    </>
  );
}
