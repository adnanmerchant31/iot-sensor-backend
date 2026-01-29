const SensorReading = require("../models/SensorReading");

// POST /api/sensor/ingest
exports.ingestReading = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    // Validation
    if (!deviceId || temperature === undefined) {
      return res.status(400).json({
        message: "deviceId and temperature are required",
      });
    }

    const newReading = new SensorReading({
      deviceId,
      temperature,
      timestamp: timestamp || Date.now(),
    });

    await newReading.save();

    res.status(201).json({
      message: "Sensor data saved successfully",
      data: newReading,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/sensor/:deviceId/latest
exports.getLatestReading = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const latestReading = await SensorReading.findOne({ deviceId })
      .sort({ timestamp: -1 });

    if (!latestReading) {
      return res.status(404).json({
        message: "No data found for this device",
      });
    }

    res.json(latestReading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
