const Blog = require("../models/blog");

async function handleCreateBlog(req, res) {
    const { title, body } = req.body;

    await Blog.create({
        title,
        body,
        createdBy: req.user._id
    });

    return res.redirect("/");
}

// NEW: Fetch all blogs
async function handleGetAllBlogs(req, res) {
    const blogs = await Blog.find()
        .populate("createdBy", "userName");

    return res.render("home", {
        blogs
    });
}

module.exports = {
    handleCreateBlog,
    handleGetAllBlogs
};