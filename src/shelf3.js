 import React, {
     Component
 } from 'react'
 import './App.css'
 class Shelf3 extends Component {


     state = {
         shelf: ''
     }



     handleChange(bookid, event) {
         console.log(bookid)
         var shelf = event.target.value;
         var id = this.props.books.map((book) => {
             return (book.id === bookid ? book.shelf = shelf : book.shelf = book.shelf)
         })


         let kniga = this.props.books.filter((book) => book.id === bookid)
         this.props.test(kniga, id);


     }


     render() {
         return (


             <div  style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}} >
 
        

       {this.props.books.map((book)=>  { return (( book.shelf==='read')  

    ?   <li ><div className="book" key={book.id}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:   book.imageLinks ? 'url('+book.imageLinks.thumbnail+')' :''}}></div>
                            <div className="book-shelf-changer">
                              <select id="mySelect"  onChange={  this.handleChange.bind(this,book.id)}  >
                                <option value="move" disabled>Move to...</option>
                                <option value='' style={{display:'none'}}> </option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title" > {book.title }</div>
                          <div className="book-authors">{ book.authors ? book.authors.toString() : ''  }</div>
                        </div></li >
               :     null
                ) } )} 


        </div>

         )
     }
 }
 export default Shelf3