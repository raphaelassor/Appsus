import { bookService } from '../services/book-service.js'
import { utilService } from '../services/util-service.js'
import { RatingStars } from './RatingStars.jsx'
export class ReviewAdd extends React.Component {
    state = {
        review: {
            id: utilService.makeId(),
            readerName: null,
            rating: null,
            date: '',
            reviewTxt: null
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        console.log(ev.target)
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'radio' ? +target.value : target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }
    onSubmit = (ev) => {
        ev.preventDefault()
        const bookId = this.props.match.params.bookId;
        bookService.addReview(bookId, this.state.review)
            .then(this.closeModal)
            .catch(err => console.log(err, 'error on submit'))
    }
    closeModal = () => {
        const bookId = this.props.match.params.bookId;
        this.props.history.push(`/book/${bookId}`)
    }
    render() {
        const { readerName, rating, date, reviewTxt } = this.state.review;

        return (
            <div className="add-review-modal">
                <form onSubmit={this.onSubmit}>
                    <h2>Write A Review </h2>
                    <input type="text" name="readerName" placeholder="Full Name" onChange={this.handleChange} required />
                    <input type="date" name="date" value={date} onChange={this.handleChange} required />
                    <RatingStars rating={rating} handleChange={this.handleChange} />
                    <textarea name="reviewTxt" id="" cols="40" rows="10" onChange={this.handleChange} required></textarea>
                    <div className="flex space-between">
                        <button className="btn-add-review">Post Review</button>
                        <button type="button" className="btn-add-review btn-close" onClick={this.closeModal}>Close</button>
                    </div>
                </form>
            </div>
        )

    }
}