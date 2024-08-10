import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config.js";

import postRoute from "./routes/post.routes.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.info(`MongoDB connect on ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Server API Setting Up...");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running...`);
    connectDB();
  }
});

export default app;
