import { ReviewPreview} from './ReviewPreview.jsx'
export function ReviewsList({reviews,removeReview}){

    if(!reviews||!reviews.length) return <p className="reviews-list"> There are no reviews to display</p>

    return <section className="reviews-list">
            {reviews.map(review=><ReviewPreview review={review} key={review.id} removeReview={removeReview} />)}
    </section>

}