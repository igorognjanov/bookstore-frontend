import './App.css';
import {React, Component} from "react";
import Books from "../Books/books";
import BookStoreService from "../../repository/bookstoreRepository";
import {Route, BrowserRouter as Router, Navigate, Routes} from "react-router-dom";
import Categories from "../Categories/categories"
import Header from "../Header/header"
import BookAdd from "../Books/BookAdd/bookAdd"
import BookEdit from "../Books/BookEdit/bookEdit";
import data from "bootstrap/js/src/dom/data";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {
                name: 'rogi',
                category: 'igor',
                author: 0,
                availableCopies: 0
            }
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <div className={"container"}>
                    <Routes>
                        <Route path={"/books"} exact
                               element={<Books books={this.state.books}
                                               onDelete={this.deleteBook}
                                               authors={this.state.authors}
                                               onEdit={this.getBook}
                                               markAsTaken={this.markAsTaken}/>}/>
                        <Route path={"/books/add"} exact
                               element={<BookAdd categories={this.state.categories} authors={this.state.authors}
                                                 onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact
                               element={<BookEdit categories={this.state.categories} authors={this.state.authors}
                                                  onEditBook={this.editBook} book={this.state.selectedBook}/>}/>
                        <Route path={"/categories"} exact element={<Categories categories={this.state.categories}/>}/>
                        <Route path="*" element={<Navigate to="/books" replace/>}/>
                    </Routes>
                </div>

            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {
        BookStoreService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadCategories = () => {
        BookStoreService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadAuthors = () => {
        BookStoreService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    deleteBook = (id) => {
        BookStoreService.deleteBook(id)
            .then(this.loadBooks);
    }

    addBook = (name, category, author, availableCopies) => {
        BookStoreService.addBook(name, category, author, availableCopies)
            .then(this.loadBooks);
        this.loadBooks();
    }

    editBook = (id, name, category, author, availableCopies) => {
        BookStoreService.editBook(id, name, category, author, availableCopies)
            .then(this.loadBooks);
    }

    getBook = (id) => {
        BookStoreService.getBook(id)
            .then((data) => this.setState({
                selectedBook: data.data
            }));
    }

    markAsTaken = (id) => {
        BookStoreService.markAsTaken(id)
            .then(this.loadBooks);
    }

}

export default App;
