const { gql } = require('apollo-server-express');
// NYT Book List
const typeDefs = gql`
  type all {
    lists: [List]
  }
  type List {
    list_id: Int
    display_name: String
    list_image: String
    books: [Book]
  }

  type Book {
    title: String
    author: String
    book_image: String
    description: String
    buy_links: [Shop]
  }
  type Shop {
    name: String
    url: String
  }
  type Query {
    getBooks: all
  }
`;
module.exports = typeDefs;
