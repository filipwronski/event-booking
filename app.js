const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const app = express();

const gaphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index'); 

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: gaphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

mongoose.connect(
    `mongodb+srv://${
        process.env.MONGO_USER
    }:${
        process.env.MONGO_PASSWORD
    }@cluster0-ncdt1.mongodb.net/${
        process.env.MONGO_DB
    }?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000)
})
.catch(error => {
    console.log(error)
});