import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import API from "../utils/API";

class Saved extends Component {
  state = {
    books: []
  };
  
  // When component mounts, call loadBooks function.
  componentDidMount() {
    this.loadBooks();
  };

  // Function to grab all the books from the DB and update the books array in state to update the DOM.
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  // function for event handler when a delete button is clicke on a book to delete that book from the DB.
  deleteBook = event => {
    event.preventDefault();
    let book = event.target.id;
    API.deleteBook(book)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Saved Books
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
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
                        <a href={book.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginLeft: 5 }}><FormBtn>View</FormBtn></a>
                        <FormBtn
                          id={book._id}
                          onClick={this.deleteBook} 
                        >
                        Delete
                        </FormBtn>
                      </Col>
                    </Row>
                  </ListItem>
                ))}
              </List>
              ) : (
              <h3>No Results to Display</h3>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
