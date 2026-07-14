import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Tatvan Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});