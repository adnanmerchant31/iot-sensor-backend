const mqtt = require("mqtt");
const SensorReading = require("./models/SensorReading");

const MQTT_BROKER_URL = "mqtt://test.mosquitto.org";

// Connect to broker
const client = mqtt.connect(MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("MQTT connected");

  // Subscribe to wildcard topic
  client.subscribe("iot/sensor/+/temperature", (err) => {
    if (!err) {
      console.log("Subscribed to MQTT topic: iot/sensor/+/temperature");
    }
  });
});

// When message is received
client.on("message", async (topic, message) => {
  try {
    // Example topic: iot/sensor/sensor-01/temperature
    const parts = topic.split("/");
    const deviceId = parts[2]; // sensor-01

    const temperature = parseFloat(message.toString());

    if (isNaN(temperature)) {
      console.log("Invalid temperature received");
      return;
    }

    const reading = new SensorReading({
      deviceId,
      temperature,
      timestamp: Date.now(),
    });

    await reading.save();
    console.log(`MQTT data saved for ${deviceId}: ${temperature}`);
  } catch (err) {
    console.error("MQTT processing error:", err.message);
  }
});
