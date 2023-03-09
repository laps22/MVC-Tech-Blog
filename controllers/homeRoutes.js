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

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }
  
      const passwordValid = await bcrypt.compare(password, user.password);
  
      if (!passwordValid) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }
  
      req.session.logged_in = true;
      req.session.user_id = user.id;
      req.session.save(); // Save the session before redirecting
  
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
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