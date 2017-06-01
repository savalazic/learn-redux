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
- **Create container when we need to touch state directly!**

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

### Actions and Action Creators
- User click (calls action creator)
- Action creator return an action (object)
- Action automatically sent to all reducers
- Property on state set to the value returned from the reducer
- All reducers processed the action and returned new state. Rerender!

<img src="http://i.imgur.com/gVECf2e.jpg">


`actions/index.js`
```
export function selectBook(book) {
  console.log('a knjiga has been selektovana', book.title)
}
```

`containers/book-list.js`
```
import { selectBook } from '../actions/index'
import { bindActionCreators } from 'redux'

// anything return from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // whenever selectBook is called, result shoud be passed
  // to all of our reducers
  return bindActionCreators({
    selectBook: selectBook
  }, dispatch)
}

// promote BookList from a component to a container - it need to know
// about this new dispatch method, selectBook. Make it available 
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList)
```

### Creating action

`containers/book-list.js`
```
renderList() {
  return this.props.books.map((book) => {
    return (
      <li 
        onClick={() => this.props.selectBook(book)}
        key={book.title} className='list-group-item'>
        {book.title
      }</li>
    )
  })
}
```

### Action creator return an action

`actions/index.js`
```
export function selectBook(book) {
  // selectBook is an ActionCreator
  // it needs to return an action,
  // an object with a type propery
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}
```

### Action automatically sent to all reducers

`reducers/reducer_active_book.js`
```
// state argument is not app state, only the state this reducer is reponsible for!
export default function(state = null, action) {
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload
  }

  return state
}
```

`reducers/index.js`
```
import { combineReducers } from 'redux'
import BooksReducer from './reducer_books'
import ActiveBook from './reducer_active_book'

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBook
})

export default rootReducer
```