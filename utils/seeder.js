import Products from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('DB Connection Successful');
    await seedProduct();
  })
  .catch((err) => {
    console.log(err.message);
  });

const seedProduct = async () => {
  try {
    await Products.deleteMany();
    console.log('All products are deleted');

    const data = JSON.parse(fs.readFileSync('./data/shoes.json', 'utf-8'));

    await Products.insertMany(data.shoes);
    
    console.log('All products are added');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
}
