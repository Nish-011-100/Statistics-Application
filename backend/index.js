const connection = require("./database");
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
``;
const querystring = require("querystring");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/", router);
app.use("/Product", require("./Routes/Product/Product"));
app.use("/Supplier", require("./Routes/Supplier/Supplier"));
app.use("/Order", require("./Routes/Order/Order"));
app.use("/Statistics", require("./Routes/Statistics/Statistics"));

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
