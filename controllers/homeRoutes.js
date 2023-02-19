const router = require('express').Router();
const { BlogPosts, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPosts.findAll({
            include: [{ model: User }]
        });

        const posts = blogPostData.map((project) => project.get({ plain: true }));
        console.log('BlogPosts', posts);
        res.render('homepage', {
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

router.get('/post/:id', (req, res) => {
    try {
        res.render('postDetails');
    }
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;