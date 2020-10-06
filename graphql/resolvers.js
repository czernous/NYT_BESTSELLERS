// The resolvers
module.exports = {
  Query: {
    getBooks: async (_, __, { dataSources }) => dataSources.BooksAPI.getBooks(),
  },
};
