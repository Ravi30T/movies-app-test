import {Component} from 'react'
import Cookeis from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PaginationList from '../PaginationList'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  inital: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {popularMovies: [], popularMoviesApiStatus: apiStatusConstants.inital}

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickPopularMoviesRetry = () => {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({popularMoviesApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookeis.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      const updatedPopularMovies = data.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))

      this.setState({
        popularMovies: updatedPopularMovies,
        popularMoviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({popularMoviesApiStatus: apiStatusConstants.failure})
    }
  }

  popularMoviesInprogress = () => (
    <>
      <Header />
      <div className="popular-movies-loader-retry-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  popularMoviesSuccess = () => {
    const {popularMovies} = this.state

    return (
      <>
        <Header />
        <div className="popular-movies-main-container">
          <PaginationList data={popularMovies} />
        </div>
      </>
    )
  }

  popularMoviesFailure = () => (
    <>
      <Header />
      <div className="popular-movies-loader-retry-container">
        <div className="popular-movies-failure-container">
          <img
            src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719332381/Background-Complete_v4g7bw.png"
            className="popular-movies-failure-img"
            alt="failure view"
          />
          <p className="popular-failure-container-message">
            {' '}
            Something Went Wrong. Please try again{' '}
          </p>
          <button
            type="button"
            className="popular-movies-try-again-btn"
            onClick={this.onClickPopularMoviesRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderPopularMovies = () => {
    const {popularMoviesApiStatus} = this.state

    switch (popularMoviesApiStatus) {
      case apiStatusConstants.inProgress:
        return this.popularMoviesInprogress()
      case apiStatusConstants.success:
        return this.popularMoviesSuccess()
      case apiStatusConstants.failure:
        return this.popularMoviesFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-container">
        <div>{this.renderPopularMovies()}</div>

        <div className="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular
