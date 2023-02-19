const router = require('express').Router();
const { BlogPosts, User, } = require('../models');
const withAuth = require('../utils/auth');


// dashboard
router.get('/', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findOne({ where: { username: req.session.username } });
        const blogPostData = await BlogPosts.findAll({ where: { user_id: user.id } });
        const posts = blogPostData.map((project) => project.get({ plain: true }));
        res.render('dashboard', {
            logged_in: req.session.logged_in,
            posts
        });
        return;
    }
    res.render('homepage');
});


// create post
router.get('/createpost', withAuth, async (req, res) => {
    res.render('newBlogPost');
});

router.get('/updatepost/:id', withAuth, async (req, res) => {
    const blogPostData = await blogPost.findByPk(req.params.id);
    res.render('updateBlog', {
        logged_in: req.session.logged_in,
        postTitle: blogPostData.title,
        postDescription: blogPostData.description,
        postId: blogPostData.id
    });
})

module.exports = router;