const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express')
require('dotenv').config()

const gravatar = require('../util/gravatar')
const { format } = require('date-fns')

module.exports = {
async postBlog(parent, args, { models, user }) {
    if (!user) {
        throw new AuthenticationError('You must be signed in to create a note')
    }

    return await models.Blog.create({
        content: args.content,
        author: mongoose.Types.ObjectId(user.id)
    })
},

async updateBlog(parent, { id, content }, { models, user }) {
    if (!user) {
        throw new AuthenticationError('You need to vre signed in to update a blog')
    }

    const blog = await models.Blog.findById(id)

    if (blog && String(blog.author) != user.id) {
        throw new ForbiddenError('You dont have permissions to update this blog')
    }

    return await models.Blog.findOneAndUpdate(
        { 
            _id: id 
        },
        { 
            $set: {
                content,
                updatedAt: format(new Date(), 'MMM Do yyyy')
            }
        },
        { 
            new: true 
        }
    )
},

async deleteBlog(parent, { id }, { models, user }) {
    if (!user) {
        throw new AuthenticationError('You must be signed in to delete a blog')
    }

    const blog = await models.Blog.findById(id)

    if (blog && String(blog.author) != user.id) {
        throw new ForbiddenError('You dont have permissios to delete the blog')
    }

    try {
        await blog.remove()
        return true
    }
    catch (err) {
        return false
    }
},

async signUp(parent, { username, email, password }, { models }) {
    email = email.trim().toLowerCase()
    const hashed = await bcrypt.hash(password, 10)
    const avatar = gravatar(email)
    try {
        const user = await models.User.create({
            username,
            email,
            avatar,
            password: hashed
        })
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    } catch (err) {
        console.log(err)
        throw new Error('Error creating account')
    }
},

async signIn(parent, { username, email, password }, { models }) {
    if(email) {
        email = email.trim().toLowerCase()
    }

    const user = await models.User.findOne({
        $or: [{ email }, { username }]
    })
    
    if (!user) {
        throw new AuthenticationError('Error signin in')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw new AuthenticationError('Error signin in')
    }

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
},

toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
        throw new AuthenticationError('You must be signed in to favourite a blog')
    }

    let blogCheck = await models.Blog.findById(id)
    const hasUser = blogCheck.favoritedBy.indexOf(user.id)

    if (hasUser >= 0) {
        return await models.Blog.findByIdAndUpdate(
            id,
            {
                $pull: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },

                $inc: {
                    favoriteCount: -1
                }
            },
            {
                new: true
            }
        )
    } else {
        return await models.Blog.findByIdAndUpdate(
            id,
            {
                $push: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },

                $inc: {
                    favoriteCount: 1
                }
            },
            {
                new: true
            }
        )
    }
}
}