import React, {
    Component
} from 'react'
import './App.css'

class Test extends Component {




    handleChange(bookid, event) {
        console.log(bookid)
        var shelf = ''
        shelf = event.target.value;
        var id = this.props.books.map((book) => {
            return (book.id === bookid ? book.shelf = shelf : book.shelf = book.shelf)
        })


        let kniga = this.props.books.filter((book) => book.id === bookid)
        this.props.test(kniga, id);
        //this.props.update(kniga, id);
        console.log(kniga)
        this.props.update(kniga[0], event.target.value)

    }


    render() {


        return (

            <div  style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
            

       {this.props.books.map((book)=>  { return (( book.shelf===this.props.bookshelf)  

    ?   <li key={book.id} ><div className="book" key={book.id} >
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  book.imageLinks ? 'url('+book.imageLinks.thumbnail+')' :'' }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} id="mySelect"  onChange={   this.handleChange.bind(this,book.id)}  >
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
                        </div></li > : null
                ) } )} 


       
 </div>
        )
    }
}
export default Test