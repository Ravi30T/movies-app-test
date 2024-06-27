import {Component} from 'react'
import {Link} from 'react-router-dom'
import Counter from '../Counter'

import './index.css'

class PaginationList extends Component {
  state = {currentPage: 1, moviesPerPage: 16, smMoviesPerPage: 12}

  onHandlePageChange = pageNumber => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const {currentPage, moviesPerPage, smMoviesPerPage} = this.state
    const {data} = this.props

    const lastItemIndex = currentPage * moviesPerPage

    const firstItemIndex = lastItemIndex - moviesPerPage

    const movieItems = data.slice(firstItemIndex, lastItemIndex)

    const totalPages = Math.ceil(data.length / moviesPerPage)

    /*  Sm devices data per page   */

    const smLastItemIndex = currentPage * smMoviesPerPage

    const smFirstItemIndex = smLastItemIndex - smMoviesPerPage

    const smMovieItems = data.slice(smFirstItemIndex, smLastItemIndex)

    const smTotalPages = Math.ceil(data.length / smMoviesPerPage)

    /*                             */

    return (
      <>
        <div className="lg-pagination-list-container">
          <ul className="popular-movies-list-container">
            {movieItems.map(each => (
              <li key={each.id} className="popular-movie-list-tem">
                <Link to={`/movies/${each.id}`}>
                  <img
                    src={each.posterPath}
                    className="popular-movie-img"
                    alt={each.title}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="counter-container">
            <Counter
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={this.onHandlePageChange}
            />
          </div>
        </div>

        <div className="sm-pagination-list-container">
          <ul className="popular-movies-list-container">
            {smMovieItems.map(each => (
              <li key={each.id} className="popular-movie-list-tem">
                <Link to={`/movies/${each.id}`}>
                  <img
                    src={each.posterPath}
                    className="popular-movie-img"
                    alt={each.title}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="counter-container">
            <Counter
              totalPages={smTotalPages}
              currentPage={currentPage}
              onPageChange={this.onHandlePageChange}
            />
          </div>
        </div>
      </>
    )
  }
}

export default PaginationList
