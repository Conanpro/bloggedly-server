module.exports = {
    author: async (blog, args, { models }) => {
        return await models.User.findById(blog.author)
    },

    favoritedBy: async (blog, args, { models }) => {
        return await models.User.find({ _id: { $in: blog.favoritedBy } })
    }
}