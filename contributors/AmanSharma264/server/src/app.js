import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import subscriptionRoutes from "./routes/subscription.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

// app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SubSentry backend is healthy",
  });
});

app.use("/api/subscription", subscriptionRoutes);

export default app;
