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
import Search from './search'



class BooksApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            searchedBook: [],
            query: '',
            shelfTest: '',
            allbooks: [],
            mergedbooks: [],
            currently: 'currentlyReading',
            want: 'wantToRead',
            READ: 'read',

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

        console.log(book)
        BooksAPI.update(book, shelf).then((data) => {
            this.setState({
                // allbooks:book,
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


                    let testbookmega = testbook.map((test) => {


                            if (test.shelf !== "") {
                                return (Object.assign(test, {
                                    shelf: 'none'
                                }))

                            }
                        }


                    )
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

        let all = this.state.allbooks
        let searched = this.state.searchedBook
        var merged = {} // hashmap of books using  Id as keys

        all.forEach(function(book) {
            merged[book.id] = book;
        });
        // map new array  
        var res = searched.map(function(sub) {
            var book = merged[sub.id];
            if (book) {
                for (var key in book) {
                    sub[key] = book[key]
                }
            }
            return sub;
        });

        console.log(res, 'ff')




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
            <ol  ><div><Search key={1} test={this.searchupdate}  update = {this.updateBookInfo}   updbooks={this.state.allbooks} books={this.state.searchedBook} /></div> </ol> 
            </div> 
             </div>
        )
    }
    />

   
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
                    <ol key={2}className="books-grid"   >                      
                         <Test bookshelf={this.state.currently} key={3} test={  this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid" >                      
                     <Test bookshelf={this.state.want} test={this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />
                   </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid" >                    
                     <Test bookshelf={this.state.READ}test={this.ontest} update = {this.updateBookInfo} books={this.state.allbooks} />           
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