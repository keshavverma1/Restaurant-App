import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoconnect.js";
import cookieParser from "cookie-parser";
//Configuring Environment Variables
dotenv.config();
const app = express();
//Port of Server
const port = process.env.PORT || 4000;

// Connect to the database
connectDatabase();

//Middlewares
app.use(cors());
// Parse JSON data sent by the client into a JavaScript object.
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.send("Server is Running");
});

import authRouter from "./routes/authRoutes.js";
app.use("/auth", authRouter);

import categoryRouter from "./routes/categoryRoutes.js";
app.use("/category", categoryRouter);

import menuRouter from "./routes/menuRoutes.js";
app.use("/menu", menuRouter);

import cartRouter from "./routes/cartRoutes.js";
app.use("/cart", cartRouter);

//Server is Running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
