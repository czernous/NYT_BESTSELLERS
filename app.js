const express = require('express');
const request = require('request');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const BooksAPI = require('./graphql/datasources/books');

const app = express();
app.set('view engine', 'ejs');
// Put together a schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    BooksAPI: new BooksAPI(),
  }),
});

app.use(express.static(path.join(__dirname, 'public')));
// dynamically create the template body
let pageBody;
const generateBody = (page) => {
  pageBody = `partials/${page}`;
};
// ROUTES
app.get('/', (req, res) => {
  generateBody(`login`);
  res.render('template', { pageBody });
});
app.get('/books', (req, res) => {
  const query = `
  {
    getBooks {
      lists {
        books {
          book_image
          title
          author
          description
          buy_links {
            name
            url
          }
        }
      }
    }
  }
`;
  const url = `http://localhost:5000/graphql?query=${query}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      const data = result.data.getBooks.lists;
      generateBody(`books`);
      // console.log(data);
      res.render('template', { pageBody, data });
    } else {
      res.send('ERROR!');
    }
  });
});

// INIT APP
const port = process.env.PORT || 5000;

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
