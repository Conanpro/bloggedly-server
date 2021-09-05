const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    user: async (parent, { username }, { models }) => {
        return await models.User.findOne({ username })
    },

    users: async (_, __, { models }) => {
        return models.User.find({}).limit(100)
    },

    me: async (_, __, { models, user }) => {
        return await models.User.findById(user.id)
    },

    blogFeed: async (parent, { page }, { models }) => {
        const limit = 10
        const skip = (page - 1) * limit
        let blogs = await models.Blog.find().skip(skip).limit(limit).sort({ _id: -1})
        return {
            blogs,
            page
        }
    },

    async blogs(_, __, { models }) {
        return models.Blog.find().limit(100)
    },

    async getBlog(parent, args, { models }) {
        return await models.Blog.findById(args.id)
    }
}