import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
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

  componentDidMount() {
    this.loadBooks();
  }

// test
  googleBooks = (search) => {
    API.googleBooks(search)
      .then (res => {
        console.log(res.data.items);
        let results = res.data.items;
        let booksArr = [];
        
        results.map(arr => {
          booksArr.push({
            "_id": arr.id,
            "title": arr.volumeInfo.title, 
            "author": arr.volumeInfo.authors, 
            "link": arr.volumeInfo.cononicalVolumeLink
        })
      });
        //
        console.log(booksArr);
        //
        this.setState({ books: booksArr, title: "" })
      })
      .catch(err => console.log(err));
  };
// test


  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      this.googleBooks(this.state.title)
    }
    
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Google Books
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
