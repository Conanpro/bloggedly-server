const { gql } = require('apollo-server-express')

const typeDefs = gql`

    scalar DateTime

    type BlogFeed {
        blogs: [Blog]!
        page: Int!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String!
        blogFeed(page: Int): BlogFeed!
        favorites(page: Int): BlogFeed!
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
        getBlog(id: ID!): Blog!
        user(username: String!): User!
        users: [User!]!
        me: User!
        blogFeed(page: Int): BlogFeed!
    }

    type Mutation {
        toggleFavorite(id: ID!): Blog!
        postBlog(content: String!): Blog!
        updateBlog(id: ID!, content: String!): Blog!
        deleteBlog(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
    }
`

module.exports = typeDefs