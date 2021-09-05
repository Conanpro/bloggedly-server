const app = require('express')()
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { JWT_SECRET, DB_HOST, PORT } = process.env
const port = PORT || '3000' 
const db = require('./db')
const models = require('./models')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const depthLimit = require('graphql-depth-limit')
const { createComplexityLimitRule } = require('graphql-validation-complexity')
app.use(cors())

db.connect(DB_HOST)

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, JWT_SECRET)
        } catch (err) {
            throw new Error('Session invalid')
        }
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        const token = req.headers.authorization
        const user = getUser(token)
        return { models, user }
    }
})

server.applyMiddleware({ app, path: '/' })

app.listen({ port }, () => {
    console.log(`🚀 Graphql server running at http://localhost:${port}${server.graphqlPath}`)
})