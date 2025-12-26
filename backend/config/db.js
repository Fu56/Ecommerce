import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("MONGO_URI is undefined in .env".bgRed);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to MongoDB Database ${conn.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed);
  }
};
export default connectDB;
