const router = require('express').Router();
const { BlogPosts, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.session.username } });
        const blogPostData = await BlogPosts.create({
            title: req.body.title,
            description: req.body.description,
            user_id: user.id,
            date: new Date(),
        });
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/update', async (req, res) => {
    try {
        const posts = await BlogPosts.findByPk(req.body.id);
        posts.update({ 
            title: req.body.title, 
            description: req.body.description, 
            date: new Date() 
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await BlogPosts.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;