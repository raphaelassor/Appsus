const { Link } = ReactRouterDOM
export function BookPreview({book}) {

    return <Link to={`/book/${book.id}`}>
    <div className="book-preview flex">
        <img src={book.thumbnail}  className="center-margin"/>
        <h3>{book.title}</h3>
        <div className="booke-preview-price">{book.listPrice.amount}{book.listPrice.currencySymbol} </div>
    </div>
    </Link>


}