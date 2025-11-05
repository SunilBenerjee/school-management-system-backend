import User from "../model/userModel.js";

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
      deletedAt: ""
    });
    await user.save();
  } catch (error) {
    throw error;
  }
};

export default seedUser;
