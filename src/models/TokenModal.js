import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.models.Token || mongoose.model("Token", tokenSchema);
export default Token;
