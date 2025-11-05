import express from "express";
import AuthRoute from "./route/authRoute.js";
import SuperadminRoute from "./route/superadminRoute.js";
import verifyToken from "./middleware/verifyTokenMiddleware.js";
import generalRoute from "./route/generalRoute.js";

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
