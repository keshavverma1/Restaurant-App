import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoconnect.js";
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

//Routes
app.get("/", (req, res) => {
  res.send("Server is Running");
});

import authRouter from "./routes/authRoutes.js";
app.use("/auth", authRouter);

//Server is Running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
