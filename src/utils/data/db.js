/**
 * Get connection with MongoDB
 * 
 * When need write route or get data functions, import "connect" from this file
 */

import mongoose from "mongoose";

const connect = async () => {
  // if (mongoose.connect[0].readyState) return;   //This line I wanna keep it, need to fix how to make it work

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
