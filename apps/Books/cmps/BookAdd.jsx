import { bookService } from '../services/book-service.js'
import { BookResultPreview } from '../cmps/BookResultPreview.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'
export class BookAdd extends React.Component {

    state = {
        searchVal: '',
        bookResults: null
    }
    onAddBook=(book)=>{
        eventBusService.emit('add-book', book)
    }
    handleChange = ({ target }) => {
        this.setState({ searchVal: target.value }, () => {
            if(!this.state.searchVal)this.setState({bookResults:null})
            else this.queryBooksFromSearch(this.state.searchVal)
        })
    }
    queryBooksFromSearch = (searchVal) => {
        //debounce
     
        bookService.getBooksFromSearch(searchVal).then(bookResults => {
            this.setState({ bookResults }, () => console.log(bookResults))
        })

    }

    render() {
        const { searchVal, bookResults } = this.state
        return <div className="header-search-container">
            <input className="add-search-bar" type="search" onChange={this.handleChange} value={searchVal} placeholder="Add Your Favorite Books..."/>
            {bookResults &&
                <div className="add-search-bar-results">
                    {bookResults.map(book => <BookResultPreview book={book} key={book.id} onAddBook={this.onAddBook} />)}

                </div>
            }
        </div>
    }

} 