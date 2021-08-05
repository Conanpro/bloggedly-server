const mongoose = require('mongoose')
const { format } = require('date-fns')

const blogSchema = new mongoose.Schema({
        content:  {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: String,
            required: true,
            default: format(new Date(), 'MMM Do yyyy')
        },
        updatedAt: {
            type: String,
            required: true,
            default: format(new Date(), 'MMM Do yyyy')
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog