import axios from "axios";
import mongoose, { ConnectOptions } from "mongoose";

export const connectDatabase = async () => {
  if (!process.env.DBURL) {
    throw new Error("Please enter DBURL");
  }

  try {
    const connection = await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    if (connection) {
      console.log(`✅ :: Database is connected`);
    } else {
      console.error(`❌ :: Error in connecting database`);
    }
  } catch (error) {
    console.error(`[Error]: ${error}`);
  }
};
