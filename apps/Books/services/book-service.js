import {gBooksData} from '../data/books.js'
import {googleBooksData} from '../data/google-sample.js'
export const bookService = {
    query,
    getBookById,
    addReview,
    removeReviewById,
    getBooksFromSearch,
    addGoogleBook,
    getNextBookId,
    getPrevBookId
}

function query(filterBy) {
    //axious.get('....').then(gBoobksData=>{}).....
    _updateCurrSymbol(gBooksData)
    if (filterBy) {
        var { title, maxPrice, minPrice } = filterBy
        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        const filteredBooks = gBooksData.filter(book=> {
            return(
                book.title.includes(title) && 
                book.listPrice.amount > minPrice &&
                 book.listPrice.amount < maxPrice
            )
        })
        return Promise.resolve(filteredBooks)
    }
    return Promise.resolve(gBooksData)
}

function getBookById(bookId){
return Promise.resolve(gBooksData.find(book=> book.id===bookId))
}
function removeReviewById(book,reviewId){
    const reviewIdx=book.reviews.findIndex(review=>reviewId===review.id)
    book.reviews.splice(reviewIdx,1)
    return Promise.resolve()

}
function getPrevBookId(bookId){
    const curIdx=gBooksData.findIndex(book=>book.id===bookId)
    const nextBookIdx=(curIdx===0)? gBooksData.length-1:curIdx-1 
    return gBooksData[nextBookIdx].id;
}
function getNextBookId(bookId){
    const curIdx=gBooksData.findIndex(book=>book.id===bookId)
    const nextBookIdx=(curIdx===gBooksData.length-1)? 0:curIdx+1 
    return gBooksData[nextBookIdx].id;
}
function addReview(bookId,review){
   const book=gBooksData.find(book=>book.id===bookId)
   if(!book) return Promise.reject('No Book Id Found in add Review Func')
   if(!book.reviews) book.reviews=[]
   book.reviews.push(review)
   return Promise.resolve()

}

function getBooksFromSearch(searchVal) {
    //axios.get(.....${searchVal}....).then((res)=>)...
    if(!searchVal)Promise.reject('no Search terms')
    return Promise.resolve(googleBooksData.items)
}
function addGoogleBook(googleBook) {
    console.log('adding book')
    const formattedBook = {
        "id": googleBook.id,
        "title": googleBook.volumeInfo.title,
        "subtitle":  googleBook.volumeInfo.subtitle,
        "authors":  googleBook.volumeInfo.authors,
        "publishedDate":  googleBook.volumeInfo.publishedDate,
        "description": googleBook.volumeInfo.description,
        "pageCount": googleBook.volumeInfo.pageCount,
        "categories":googleBook.volumeInfo.categories,
        "thumbnail": googleBook.volumeInfo.imageLinks.thumbnail,
        "language": googleBook.volumeInfo.language,
        "listPrice": {
            "amount": 0,
            "currencyCode": "USD",
            "isOnSale": false
        }
    }
    gBooksData.push(formattedBook)
    return Promise.resolve()
}

function _updateCurrSymbol(books){
    books.forEach(book => {
        switch (book.listPrice.currencyCode){
            case 'ILS': book.listPrice.currencySymbol='₪'
            break;
            case'USD':book.listPrice.currencySymbol='$'
            break;
            default :book.listPrice.currencySymbol='€'
        } 
    });
}