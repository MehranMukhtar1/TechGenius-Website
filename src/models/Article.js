import mongoose from 'mongoose';
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String },
  slug: { type: String },
  content: { type: String },
  poster: { type: String },
  author: { type: String }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Article", articleSchema);