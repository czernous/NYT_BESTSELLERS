const { RESTDataSource } = require('apollo-datasource-rest');

class BooksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.nytimes.com/svc/books/v3/lists';
  }

  async getBooks() {
    const accessToken = `wnyGnbh6AwvAY16sUekZVanXCVkHGGa4`;
    const data = await this.get(`/overview?api-key=${accessToken}`, {
      method: 'GET',
    });
    const response = data.results;
    const { lists } = response;

    return (
      data &&
      response && {
        lists,
      }
    );
  }
}
module.exports = BooksAPI;
