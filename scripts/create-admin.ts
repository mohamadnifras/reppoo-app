import bcrypt from "bcryptjs";
import {connectDB} from "../lib/mongodb";
import Admin from "../models/Admin";

(async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash("admin@123", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin created");
  process.exit();
})();
