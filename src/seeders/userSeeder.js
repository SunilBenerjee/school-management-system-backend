import User from "../models/User.js";
import { v4 as uuid } from "uuid";

const seedUser = async () => {
  try {
    await User.deleteMany({});
    const user = new User({
      name: "Super Admin",
      email: "superadmin@example.com",
      contact: "9999999999",
      username: "superadmin",
      password: "superadmin",
      role: "SUPER_ADMIN",
      profile_image: "",
      last_login: "",
      status: "ACTIVE",
      unique_id: uuid(),
    });
    await user.save();
  } catch (error) {
    throw error;
  }
};

export default seedUser;
