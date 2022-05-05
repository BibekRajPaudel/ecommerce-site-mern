import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import colors from "colors";
import connDB from "./config/db.js";

dotenv.config();

connDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);

    console.log("Data Imported".green.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
