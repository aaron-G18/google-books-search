import axios from "axios";
require("dotenv").config();

const apiKey = process.env.GOOGLE_BOOKS;


export default {

  // Builds the query string and sends query to Google Books API 
  googleBooks: function (search) {
    let query = "https://www.googleapis.com/books/v1/volumes?q=" + search + "&maxResults=30&printType=books&api_key=" + apiKey;
    return axios.get(query)
  },

  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};