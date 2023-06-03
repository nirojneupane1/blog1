import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categorys',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

const blog = mongoose.model('blog', blogSchema);

export default blog;