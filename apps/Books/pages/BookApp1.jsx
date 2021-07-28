import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export class BookApp extends React.Component {

    state = {
        books: null,
        selectedBook: null,
        filterBy: null,
        isBackScreen: false
    }
    componentDidMount() {
        this.loadBooks()
    }
    loadBooks() {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }
    setFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)

    }
    render() {
        const { books} = this.state
        if (!books) return <div>loading...</div>
        return (
            <section>
                <BookFilter setFilter={this.setFilter} />
                <BookList books={books} />
            </section>
        )
    }
}