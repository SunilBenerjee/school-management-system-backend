import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    user_type: {
      type: String,
      required: true,
      enum: ["SUPER_ADMIN", "ADMIN", "EMPLOYEE"],
    },
    profile_image: { type: String, required: false },
    status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"] },
    unique_id: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
