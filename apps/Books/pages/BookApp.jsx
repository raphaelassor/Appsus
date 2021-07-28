import { bookService } from '../services/book-service.js';
import { BookList } from '../cmps/BookList.jsx';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { eventBusService } from '../../../services/event-bus-service.js';
import { BookAdd } from '../cmps/BookAdd.jsx';
export class BookApp extends React.Component {

    removeEvent;
    state = {
        books: null,
        filterBy: null
    }
    componentDidMount() {
        this.loadBooks()
        this.removeEvent = eventBusService.on('add-book', (book) => {
            bookService.addGoogleBook(book).then(()=>this.loadBooks());
          })
    }
    componentWillUnmount() {
        this.removeEvent()
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
        const { books } = this.state
        if (!books) return <div>loading...</div>
        return (<React.Fragment>
            <BookAdd/>
            <section>
                <BookFilter setFilter={this.setFilter} />
                <BookList books={books} />
            </section>
        </React.Fragment>
        )
    }
}