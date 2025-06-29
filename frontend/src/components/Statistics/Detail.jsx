import React, { useState, useContext, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import SupplierDetail from "./SupplierDetail";

export default function Detail() {
  return (
    <>
      <h1 className="my-4 text-3xl">Product Details</h1>
      <ProductDetail />
      <h1 className="my-4 text-3xl">Supplier Details</h1>
      <SupplierDetail />
    </>
  );
}
