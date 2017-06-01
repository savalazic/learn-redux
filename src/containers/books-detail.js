import React, { Component } from 'react'
import { connect  } from 'react-redux'

class BookDetail extends Component {
  render() {

    if (!this.props.book) {
      return <div>Select a book to get started.</div>
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>{this.props.book.title}</div>
        <div>{this.props.book.pages}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook // state.activeBook is from reducers where we create that piece of state
  }
}

export default connect(mapStateToProps)(BookDetail)