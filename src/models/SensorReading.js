const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      default: Date.now, // epoch ms
    },
  },
  {
    timestamps: true, // creates createdAt automatically
  }
);

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
