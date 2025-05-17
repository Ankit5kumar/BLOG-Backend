const Blog = require('../models/Blog');


const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const blog = new Blog({
      title,
      description,
      image,
   author: req.user.id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
   
return res.status(200).json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
const getBlogByuserId = async (req, res) => {
  try {
    const blog = await Blog.find({author:req.params.id})
    if (!blog) return res.status(404).json({ msg: 'Blog not found from user' });
    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server  from error');
  }
};


const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });



    blog.title = title || blog.title;
    blog.description = description || blog.description;
    if (image) blog.image = image;

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    await blog.deleteOne();
    res.status(200).json({ msg: 'Blog deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

    


module.exports = {
  createBlog,
  getAllBlogs,
getBlogByuserId,
  updateBlog,
  getBlogById,
  deleteBlog,
};
