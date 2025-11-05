import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["SUPER_ADMIN", "ADMIN", "EMPLOYEE", "STUDENT", "PARENT", "GUEST"],
    },
    profile_image: { type: String, default: null },
    last_login: { type: Date, default: null },
    status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"] },
    deletedAt: { type: Date, default: null },
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

userSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
