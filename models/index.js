const blogPost = require('./blogPost');
const User = require('./User');

User.hasMany(blogPost, {
    foreignKey: 'user_id',
})

blogPost.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = {
    blogPost,
    User
}