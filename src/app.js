import express from "express";
import AuthRoute from "./routes/authRoute.js";
import SuperadminRoute from "./routes/superadminRoute.js";
import verifyToken from "./middleware/verifyToken.js";
import generalRoute from "./routes/generalRoute.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/general", generalRoute);

app.use("/auth", AuthRoute);

app.use("/superadmin", verifyToken, SuperadminRoute);

app.get("/", (req, res) => res.send("OKAY ✅ Server is running!"));

// Export the app
export default app;
