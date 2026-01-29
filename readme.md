# IoT Sensor Backend Service

A Node.js backend service that ingests IoT temperature sensor data, stores it in MongoDB Atlas, and exposes APIs to retrieve the latest sensor reading.  
This project was built as part of a Node.js Internship Pre-Assessment.

---

## Tech Stack
- Node.js (v18+)
- Express.js
- MongoDB Atlas
- Mongoose
- MQTT

---

## Features
- REST API to ingest IoT sensor temperature readings
- REST API to fetch the latest reading for a device
- MongoDB Atlas persistence using Mongoose
- Input validation for required fields
- Automatic timestamp handling when missing
- MQTT subscriber for real-time sensor data ingestion (Bonus Task)

---
## Project Structure
<img width="285" height="404" alt="Screenshot 2026-01-29 at 4 27 06 PM" src="https://github.com/user-attachments/assets/91abfb2c-045f-4da7-ac9a-a5249a2af79c" />


## Setup Instructions

### 1. Clone the repository

git clone https://github.com/adnanmerchant31/iot-sensor-backend.git

cd iot-sensor-backend



### 2. Install dependencies
npm install


### 3. Configure environment variables
Create a .env file in the project root:

PORT=3000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/iot


### 4. Run the server
npm run dev

---

---

## API Endpoints & Examples

### 1. POST `/api/sensor/ingest`

Ingest a temperature reading from an IoT sensor.

#### Request Body
```json
{
  "deviceId": "sensor-01",
  "temperature": 32.1,
  "timestamp": 1705312440000
}
```

```curl
curl -X POST http://localhost:3000/api/sensor/ingest \
-H "Content-Type: application/json" \
-d '{"deviceId":"sensor-01","temperature":32.1}'

```
### 2. GET /api/sensor/:deviceId/latest

Fetch the latest temperature reading for a specific device.

```curl
curl http://localhost:3000/api/sensor/sensor-01/latest
```

```json
{
  "_id": "65b7c9f0e1a123456789abcd",
  "deviceId": "sensor-01",
  "temperature": 32.1,
  "timestamp": 1705312440000,
  "createdAt": "2026-01-29T10:45:12.123Z",
  "updatedAt": "2026-01-29T10:45:12.123Z"
}

```