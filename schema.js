const { gql } = require('apollo-server-express')

const typeDefs = gql`

    scalar DateTime

    type BlogFeed {
        blogs: [Blog]!
        cursor: String!
        hasNextPage: Boolean!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String!
        blogs: [Blog]!
        favorites: [Blog!]!
    }

    type Blog {
        id: ID!
        content: String!
        author: User!
        createdAt: String!
        updatedAt: String!
        favoriteCount: Int!
        favoritedBy: [User!]!
    }

    type Query {
        blogs: [Blog]
        getBlog(id: ID!): Blog
        postBlog(content: String!): Blog!
        updateBlog(id: ID!, content: String!): Blog!
        deleteBlog(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        user(username: String!): User
        users: [User!]!
        me: User!
        toggleFavorite(id: ID!): Blog!
        blogFeed(cursor: String): BlogFeed
    }
`

module.exports = typeDefs