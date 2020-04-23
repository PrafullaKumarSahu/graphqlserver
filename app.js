const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
require('dotenv').config()

const cors = require('cors')
const app = express()

//Allow cros-origin request
app.use(cors())

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    }),
)
app.listen(4000, () => {
    console.log('Listening for request on port number 4000!')
})