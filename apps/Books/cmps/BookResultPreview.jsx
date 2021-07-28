import {IconPlus} from '../../../cmps/IconPlus.jsx'
export function BookResultPreview({book,onAddBook}){

return <div className="book-result-preview"> 
    <span className="search-res-title">{book.volumeInfo.title}</span>
    <span className="search-res-author">{book.volumeInfo.authors[0]}</span> 
    <button onClick={()=>onAddBook(book)}><IconPlus/></button>
</div>


}