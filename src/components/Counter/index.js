import {Component} from 'react'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import './index.css'

class Counter extends Component {
  onIncrement = () => {
    const {currentPage, onPageChange, totalPages} = this.props

    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  onDecrement = () => {
    const {currentPage, onPageChange} = this.props

    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  render() {
    const {currentPage, totalPages} = this.props

    return (
      <div className="counter-main-container">
        <button
          type="button"
          onClick={this.onDecrement}
          className="decrease-btn"
        >
          <FaChevronLeft />
        </button>
        <p className="page-number">
          {currentPage} of {totalPages}
        </p>
        <button
          type="button"
          onClick={this.onIncrement}
          className="increase-btn"
        >
          <FaChevronRight />
        </button>
      </div>
    )
  }
}

export default Counter
