import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/school-management-system", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
