import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Category from '../model/CategorySchema.js';
import Blog from '../model/BlogSchema.js';
import mongoose from 'mongoose';

dotenv.config();

// Route 1: Create a blog
export const createBlog = async (req, res) => {
  const { title, slug, description, categoryData, user } = req.body;
  const { filename } = req.file;
  console.log(req.body);
  console.log(req.file);
  const token = jwt.verify(user, process.env.SECRET);
  const author = token.userId;
  
  try {
    const info = await Category.findOne({ name: categoryData });
    const category = info._id;
    
    const blog = await Blog.create({
      title,
      slug,
      image: filename,
      description,
      category,
      author
    });

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route 2: Display all blogs
export const displayBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route 3: Delete a blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such blog" });
    }

    const blog = await Blog.findOneAndDelete({ _id: id });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
