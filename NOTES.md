# Redux Notes

### Reducer 
- function that return a value of application state

#### Example
Array of objects where each object is title of the book.
Step 1: Create reducer
Step 2: Wire application - in index.js

`reducers/reducer_books.js`
```
export default function () {
  return [
    { title: 'JavaScript: The Good Parts' },
    { title: 'Harry Potter' },
    { title: 'The Dark Tower' },
    { title: 'Eloquent Ruby' }
  ]
}
```

`reducers/index.js`
```
import { combineReducers } from 'redux'
import BooksReducer from './reducer_books'

const rootReducer = combineReducers({
  books: BooksReducer
})

export default rootReducer
```

### Container
- React component that has direct connection to the state managed by Redux
- Smart Components
- Connect Container with Redux with react-redux - glue between React and Redux

`containers/book-list.js`
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

class BookList extends Component {

  renderLister() {
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className='list-group-item'>{book.title}</li>
      )
    })
  }

  render() {
    return (
      <ul className='list-group col-sm-4'>
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is return will show up as props
  // inside of BookList
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(BookList)
```

### mapStateToProps
- Takes app state and whatever is returned is what is gonna show as props inside container

`containers/book-list.js`
```
function mapStateToProps(state) {
  // Whatever is return will show up as props
  // inside of BookList
  return {
    books: state.books
  }
}
```