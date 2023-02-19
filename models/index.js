const BlogPosts = require('./BlogPosts');
const User = require('./User');
const Comments = require('./Comments')

Comments.belongsTo(User, {
    foreignKey: 'user_id',
})

BlogPosts.belongsTo(User, {
    foreignKey: 'user_id',
})

BlogPosts.hasMany(Comments, {
    foreignKey: 'blogPosts_id'
})

module.exports = {
    BlogPosts,
    User,
    Comments,
}