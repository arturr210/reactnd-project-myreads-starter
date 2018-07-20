import React from 'react'
import * as BooksAPI from './BooksAPI'
import {
    Route
} from 'react-router-dom'
import {
    Link
} from 'react-router-dom'
import './App.css'
import Test from './test'
import Shelf2 from './shelf2'
import Shelf3 from './shelf3'
import Search from './search'



class BooksApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            searchedBook: [],
            query: '',
            shelfTest: '',
            allbooks: [],
            showSearchPage: false
        };
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                allbooks: books,
            })
            console.log(this.state.allbooks)
        })
    }
    updateBookInfo(book, shelf) {
        BooksAPI.update(book, shelf).then((books) => {
            this.setState({
                // allbooks:books,
            })
            console.log(this.state.allbooks)
        })


    }




    searchupdate = (book, id) => {

        let tempbook = this.state.allbooks
        let testing = tempbook.findIndex(b => b.id === book[0].id)
        if (tempbook.findIndex((b) => b.id === book[0].id) > 0) {
            console.log(testing)
        } else {
            let updbook = tempbook.concat(book)
            console.log(updbook)
            this.setState({

                allbooks: updbook

            })
        }

        let shelf = id
        BooksAPI.update(book[0], shelf).then((data) => {

        })
    }


    ontest = (book, id) => {
        console.log(id)

        this.setState({
            shelfTest: book,


        })

        console.log(this.state.shelfTest)
    }




    searchIt = (query) => {
        //  query=event.target.value
        this.setState({
            query: query
        })

        if (query !== "") {

            BooksAPI.search(query, 20).then((books) => {

                if (books instanceof Array) {

                    let testbook = books
                    console.log(testbook)


                    let testbookmega = testbook.map((test) => Object.assign(test, {
                        shelf: 'blue'
                    })) // blue.... ;-)
                    console.log(testbookmega)

                    this.setState({
                        searchedBook: testbookmega
                    })
                    console.log(this.state.searchedBook + 'query')


                } else {

                    this.setState({
                        searchedBook: []
                    })

                }
            })

        }
    }




    render() {
        console.log(this.state.allbooks)

        const {
            query
        } = this.state;


        return (



            <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={query} onChange={(event) => this.searchIt(event.target.value)} placeholder="Search by title or author"/>
              </div>
             </div> 
            <div className = "search-books-results" >
            <ol  ><div><Search key={1} test={this.searchupdate}  update = {this.updateBookInfo}   books={this.state.searchedBook} /></div> </ol> 
            </div> 
            </div>
        )
    }/>
     
   <Route exact path = '/'
    render = {
        () => (
            <div className="list-books" >
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books"   >
                    <ol className="books-grid"   >                      
                         <Test test={  this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid" >                      
                     <Shelf2 test={this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />
                   </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid" >                    
                     <Shelf3 test={this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />           
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
    }
    /> 
    </div>
)
}
}

export default BooksApp




















































//       <div className="app">
//         {this.state.showSearchPage ? (
//           <div className="search-books">
//             <div className="search-books-bar">
//               <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
//               <div className="search-books-input-wrapper">
//                 <input type="text" value={query} onChange={(event) => this.searchIt(event.target.value)} placeholder="Search by title or author"/>
//               </div>
//             </div>
//             <div className="search-books-results">
//               <ol  ><div   ><Search  test={this.searchupdate}  update = {this.updateBookInfo}   books={this.state.searchedBook} /></div> </ol>
//             </div>
//           </div>
//         ) : (
//           <div className="list-books" >
//             <div className="list-books-title">
//               <h1>MyReads</h1>
//             </div>
//             <div className="list-books-content">
//               <div>
//                 <div className="bookshelf">
//                   <h2 className="bookshelf-title">Currently Reading</h2>
//                   <div className="bookshelf-books"   >
//                     <ol className="books-grid"   >                      
//                          <Test test={  this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />
//                     </ol>
//                   </div>
//                 </div>
//                 <div className="bookshelf">
//                   <h2 className="bookshelf-title">Want to Read</h2>
//                   <div className="bookshelf-books">
//                     <ol className="books-grid" >                      
//                      <Shelf2 test={this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />
//                    </ol>
//                   </div>
//                 </div>
//                 <div className="bookshelf">
//                   <h2 className="bookshelf-title">Read</h2>
//                   <div className="bookshelf-books">
//                     <ol className="books-grid" >                    
//                      <Shelf3 test={this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />           
//                     </ol>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="open-search">
//               <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }
// }

// export default BooksApp
