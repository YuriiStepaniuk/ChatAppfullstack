const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/User");
dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = "admin";
    const email = "admin@example.com";
    const password = "password123";

    let user = await User.findOne({ email });
    if (user) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("Admin user created successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
