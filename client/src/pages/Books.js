import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: ""
  };

  // function for the query to Google Books API and to transform the result into an array of book objects with only the properties needed.
  googleBooks = (search) => {
    API.googleBooks(search)
      .then (res => {
        let results = res.data.items;
        let booksArr = [];
        results.map(arr => {
          if (arr.volumeInfo.imageLinks !== undefined && arr.volumeInfo.description !== undefined && arr.volumeInfo.authors !== undefined) {
            booksArr.push({
              "bookId": arr.id,
              "title": arr.volumeInfo.title, 
              "author": arr.volumeInfo.authors[0], 
              "link": arr.volumeInfo.canonicalVolumeLink,
              "imageLink": arr.volumeInfo.imageLinks.smallThumbnail,
              "description": arr.volumeInfo.description
            })
        }
        return booksArr;
      });
        this.setState({ books: booksArr, title: "" })
      })
      .catch(err => console.log(err));
  };

  // function to handle updating state when text is typed in the input field.
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // function for event handler when the search button is submitted and call the API query function "googleBooks."
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      this.googleBooks(this.state.title)
    }
  };

  // function for event handler when the save button is clicked for a listed book to save that book to the DB.
  handleSaveClick = event => {
    event.preventDefault();
    let book = this.state.books.find(element => element.bookId === event.target.id);
    console.log(book);
    API.saveBook(
        book
      )
        .then(alert("Book Saved"))
        .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <p>Search for and save books of interest</p>
            </Jumbotron>
            <Jumbotron>
              <form>
                <h3 style={{textAlign: "left", marginTop: 15}}>Book Search</h3>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title, or key word (required)"
                />
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Search Google Books
                </FormBtn>
              </form>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <div>
              <h1>Results</h1>
              {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.bookId}>
                    <Row>
                      <Col size="md-2">
                        <img src={book.imageLink} alt={`cover for ${book.title}`}></img>
                      </Col>
                      <Col size="md-8">
                        <a href={book.link} target="_blank" rel="noopener noreferrer">
                        <strong>
                          <h3>Title: {book.title}</h3>
                        </strong>
                        </a>
                        <p>Author: {book.author}</p>
                        <br />
                        <p>Description:</p>
                        <p>{book.description}</p>
                      </Col>
                      <Col size="md-2">
                        <div>
                          <a href={book.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginLeft: 5}}><FormBtn>View</FormBtn></a>
                          <FormBtn
                            id={book.bookId}
                            onClick={this.handleSaveClick}
                            >Save
                          </FormBtn>
                        </div>
                      </Col>
                    </Row>
                  </ListItem>
                  
                ))}
              </List>
            ) : (
              <h3>No results to display. Enter search above.</h3>
            )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
