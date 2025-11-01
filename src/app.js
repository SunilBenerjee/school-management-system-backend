import express from "express";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", AuthRoutes);
app.use("/admin", UserRoutes);

app.get("/", (req, res) => res.send("OKAY ✅ Server is running!"));
app.get("/testing", (req, res) => res.send("OKAY ✅ Testing route is working!"));

// Export the app
export default app;
