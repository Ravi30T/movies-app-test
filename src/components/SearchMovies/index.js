import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PaginationList from '../PaginationList'

import Header from '../Header'

// import MoviesContext from '../../context/MoviesContext'

import './index.css'

const apiStatusConstants = {
  inital: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchMovies extends Component {
  state = {
    searchMoviesData: [],
    searchVal: '',
    searchMoviesApiStatus: apiStatusConstants.inital,
  }

  getSearchMovies = async searchVal => {
    this.setState({searchMoviesApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchVal}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const updatedSearchData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
      }))

      this.setState({
        searchMoviesData: updatedSearchData,
        searchVal,
        searchMoviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({searchMoviesApiStatus: apiStatusConstants.failure})
    }
  }

  onSearchRetry = () => {
    this.getSearchMovies()
  }

  searchMoviesDataInprogess = () => (
    <>
      <div className="search-movies-loader-retry-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  searchMoviesDataSuccess = () => {
    const {searchMoviesData, searchVal} = this.state
    const verifyLength = searchMoviesData.length > 0

    return (
      <>
        {verifyLength ? (
          <div className="search-movies-movies-main-container">
            <PaginationList data={searchMoviesData} />
          </div>
        ) : (
          <div className="search-movies-loader-retry-container">
            <div className="search-no-results-container">
              <img
                src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719413039/Group_7394_wr3kqi.png"
                className="search-failure-img"
                alt="no movies"
              />
              <p className="search-no-results-container-message">
                {' '}
                Your search for {searchVal} did not find any matches.{' '}
              </p>
            </div>
          </div>
        )}
      </>
    )
  }

  searchMovieDataFailure = () => (
    <>
      <div className="search-movies-loader-retry-container">
        <div className="search-no-results-container">
          <img
            src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719332381/Background-Complete_v4g7bw.png"
            className="search-failure-img"
            alt="failure view"
          />
          <h1 className="search-no-results-container-message">
            {' '}
            Something Went Wrong. Please try again{' '}
          </h1>
          <button
            type="button"
            className="search-retry-button"
            onClick={this.onSearchRetry}
          >
            {' '}
            Try Again{' '}
          </button>
        </div>
      </div>
    </>
  )

  renderSearchMovies = () => {
    const {searchMoviesApiStatus} = this.state

    switch (searchMoviesApiStatus) {
      case apiStatusConstants.inProgress:
        return this.searchMoviesDataInprogess()
      case apiStatusConstants.success:
        return this.searchMoviesDataSuccess()
      case apiStatusConstants.failure:
        return this.searchMovieDataFailure()
      default:
        return null
    }
  }

  render() {
    const {searchVal} = this.state
    console.log(searchVal)

    return (
      <div className="search-movies-container">
        <Header getSearchMovies={this.getSearchMovies} />
        <div> {this.renderSearchMovies()} </div>
      </div>
    )
  }
}

export default SearchMovies
