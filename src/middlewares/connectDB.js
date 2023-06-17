import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (!mongoose.connections[0].readyState) {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://127.0.0.1:27017/techgenius");
  }
  return handler(req, res);
}

export default connectDB;