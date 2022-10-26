const express = require("express");
const cors = require("cors");
const mongooose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongooose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db Connection successful"))
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on Port ${process.env.PORT}`)
);
