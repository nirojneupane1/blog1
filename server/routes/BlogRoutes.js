import express from 'express';
import multer from 'multer';
import { createBlog, deleteBlog, displayBlog } from '../controller/BlogController.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route 1: Create a blog
router.post('/createBlog', upload.single('image'), createBlog);

// Route 2: Display all blogs
router.get('/displayBlog', displayBlog);

// Route 3: Delete a blog
router.delete('/deleteBlog/:id', deleteBlog);

export default router;
