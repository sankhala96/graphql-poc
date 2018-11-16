const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')


const app = express();


app.use('/graphql',cors(), expressGraphQL({
  schema,
  graphiql: true
}));

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);