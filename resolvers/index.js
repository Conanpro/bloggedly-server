const Query = require('./query')
const Mutation = require('./mutation')
const { GraphQLDateTime } = require('graphql-iso-date')
const Blog = require('./blog')
const User = require('./user')

module.exports = {
    Query,
    Mutation,
    Blog,
    User,
    DateTime: GraphQLDateTime
}