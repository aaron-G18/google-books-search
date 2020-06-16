import axios from "axios";
// import keys from "../keys.js";
require("dotenv").config();

const apiKey = process.env.GOOGLE_BOOKS;


export default {

  //test
  googleBooks: function (search) {
    let query = "https://www.googleapis.com/books/v1/volumes?q=" + search +"&api_key=" + apiKey;
    return axios.get(query)
  },

  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
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