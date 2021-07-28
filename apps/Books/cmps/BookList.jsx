import {BookPreview} from '../cmps/BookPreview.jsx'

export function BookList({books}) {

   
    return <section className="book-list  center-margin">
     
       { books.map(book=><BookPreview book={book} key={book.id}/>)}
    </section>  
}