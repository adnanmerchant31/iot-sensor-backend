require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");




const sensorRoutes = require("./routes/sensorRoutes");

const app = express();

// Middleware: allows JSON body
app.use(express.json());

// Routes
app.use("/api/sensor", sensorRoutes);
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
