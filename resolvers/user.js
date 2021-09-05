module.exports = {
    blogFeed: async (user, { page }, { models }) => {
        const limit = 10
        const skip = (page - 1) * limit
        let blogs = await models.Blog.find({ author: user._id }).skip(skip).limit(limit).sort({ _id: -1})
        return {
            blogs,
            page
        }
    },

    favorites: async (user, { page }, { models }) => {
        const limit = 10
        const skip = (page - 1) * limit
        let blogs = await models.Blog.find({ favoritedBy: user._id }).skip(skip).limit(limit).sort({ _id: -1 })
        return {
            blogs,
            page
        }
    }
}