import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  blogSlug: { type: String },
  name: { type: String },
  content: { type: String },
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Comment", commentSchema);