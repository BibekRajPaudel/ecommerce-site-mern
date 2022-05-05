import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connDB from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

dotenv.config();

connDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);
