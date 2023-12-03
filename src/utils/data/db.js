/**
 * Get connection with MongoDB
 * 
 * when need write route or get data functions, import "connect" from this file
 */

import mongoose from "mongoose";

const connect = async () => {
  // if (mongoose.connect[0].readyState) return;

  //connect with MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongo Conection Completed!");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;