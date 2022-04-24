import axios from "../custom-axios/axios";

const BookStoreService = {
    fetchBooks: () => {
        return axios.get("/books");
    },

    fetchCategories: () => {
        return axios.get("/categories");
    },

    fetchAuthors: () => {
        return axios.get("/authors");
    },

    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },

    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add",
            {
                name,
                category,
                author,
                availableCopies
            })
    },

    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            name,
            category,
            author,
            availableCopies
        })
    },

    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },

    markAsTaken: (id) => {
        return axios.post(`/books/mark-as-taken/${id}`);
    }

}

export default BookStoreService;
