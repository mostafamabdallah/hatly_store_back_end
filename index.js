const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRouter = require("./src/routes/product");
const categoryRouter = require("./src/routes/category");
const brandRouter = require("./src/routes/brands");
const mailRouter = require("./src/routes/mail");
const attactmentsRouter = require("./src/routes/attactments");


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", productRouter);
app.use("/api/", categoryRouter);
app.use("/api/", brandRouter);
app.use("/api/", mailRouter);
app.use("/api/", attactmentsRouter);


app.listen(process.env.PORT, () => {
  console.log("server start on 8000");
});
