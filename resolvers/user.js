module.exports = {
    blogs: async (user, args, { models }) => {
        return await models.Blog.find({ author: user._id }).sort({ _id: -1 })
    },

    favorites: async (user, args, { models }) => {
        return await models.Blog.find({ favoritedBy: user._id }).sort({ _id: -1 })
    }
}