# Google Books Search

This app is a "search engine" that interacts with Google's Google Books API to search for and return books for the title or key word(s) entered in the search field. Users will get a list of books for their search. They will then be able to click "View" to go to that book on Google Books, or click "Save" to save that book to a database. Navigating to the "Saved" page will display a list of all saved books in the database. On the saved page, the user will have the option again to click "View" to go to that book on Google Books, or click "Delete" to remove that book from the database.

---

Here is a link to the deployed site on heroku:

[Aaron's Google Books Search](https://ag-google-books-search.herokuapp.com/)

![Screenshot of Google Book Search](https://user-images.githubusercontent.com/58674283/88348379-138f2b80-cd02-11ea-9d76-b2295b59ee74.png?raw=true "Home Page")

![Screenshot of Google Book Search](https://user-images.githubusercontent.com/58674283/88348378-125dfe80-cd02-11ea-97f4-cf86d200d772.png?raw=true "search results")

![Screenshot of Google Book Search](https://user-images.githubusercontent.com/58674283/88348373-0f630e00-cd02-11ea-9e86-639f965f7093.png?raw=true "saved books")

---

The main focus of this project was to get more comfortable with React and implement many of the core concepts of that library in a deployed project.

This app will require a Google Books API key in a .env file to function. In the .env file, the API key will need to be entered in this format:

```
GOOGLE_BOOKS=<Your API key>
```

---

In this project I used:
- HTML
- JSX
- CSS
- JavaScript
- Node 
- React
- MERN (MongoDB, Express, React, Node)
- Mongoose
- Axios