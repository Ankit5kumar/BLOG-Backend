const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
  createBlog,
  getAllBlogs,
getBlogById,
  updateBlog,
  deleteBlog,
  getBlogByuserId
} = require('../controllers/blogController');


router.post('/blog', authMiddleware, upload.single('image'), createBlog);
router.get('/blog', getAllBlogs);
router.get('/blogbyid/:id', getBlogById);
router.get('/blog/:id', getBlogByuserId);
router.put('/blogupdate/:id',  upload.single('image'), updateBlog);
router.delete('/blogdelete/:id',  deleteBlog);

module.exports = router;








