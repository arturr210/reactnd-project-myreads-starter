import React,{Component} from 'react'
import Book from "./Book"
 



class Shelfs extends Component{

  render() {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf books={this.props.allbooks} val="currentlyReading" updateBookInfo={this.props.updateBookInfo}/>
              <Shelf books={this.props.allbooks} val="wantToRead" updateBookInfo={this.props.updateBookInfo}/>
              <Shelf books={this.props.allbooks} val="read" updateBookInfo={this.props.updateBookInfo}/>
            </div>
          </div>

          <div className="open-search">
           
          </div>
        </div>
    )
  }
}
export default Shelfs