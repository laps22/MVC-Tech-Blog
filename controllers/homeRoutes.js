const router = require('express').Router();
const { blogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const blogPostData = await blogPost.findAll({
            include: [{ model: User }]
        });

        const posts = blogPostData.map((project) => project.get({ plain: true }));
        res.render('home', {
            posts,
            // Pass the logged in flag to the template
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

// dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findOne({ where: { username: req.session.username } });
        const blogPostData = await blogPost.findAll({ where: { user_id: user.id } });
        const posts = postData.map((project) => project.get({ plain: true }));
        res.render('dashboard', {
            logged_in: req.session.logged_in,
            posts
        });
        return;
    }
    res.render('login');
});


// create post
router.get('/dashboard/createpost', withAuth, async (req, res) => {
    res.render('createpost');
});

router.get('/dashboard/updatepost/:id', withAuth, async (req, res) => {
    const blogPostData = await blogPost.findByPk(req.params.id);
    res.render('updatepost', {
        logged_in: req.session.logged_in,
        postTitle: blogPostData.title,
        postDescription: blogPostData.description,
        postId: blogPostData.id
    });
})

module.exports = router;