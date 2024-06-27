import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  inital: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  infinite: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 5000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingMovies: [],
    originalsMovies: [],
    topRatedMovies: [],
    randomMovie: [],
    trendingApiStatus: apiStatusConstants.inital,
    originalsApiStatus: apiStatusConstants.inital,
    topRatedApiStatus: apiStatusConstants.inital,
    randomMovieStatus: apiStatusConstants.inital,
  }

  componentDidMount() {
    // Calls the getHomeVideos() automaically after first render

    this.getTrendingMovies()
    this.getOriginalsMovies()
    this.getTopRatedMovies()
    this.getRandomMovie()
  }

  onClickRandomMovieRetry = () => {
    this.getRandomMovie()
  }

  onClickTrendingRetry = () => {
    this.getTrendingMovies()
  }

  onClickOriginalsRetry = () => {
    this.getOriginalsMovies()
  }

  onClickTopRatedRetry = () => {
    this.getTopRatedMovies()
  }

  getTrendingMovies = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'

    const jwtToken = Cookies.get('jwt_token') // getting the saved token from cookies

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedTrendingMovies = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        trendingMovies: updatedTrendingMovies,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  getOriginalsMovies = async () => {
    this.setState({originalsApiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/originals'

    const jwtToken = Cookies.get('jwt_token') // getting the saved token from cookies

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedOriginalsMovies = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        originalsMovies: updatedOriginalsMovies,
        originalsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originalsApiStatus: apiStatusConstants.failure})
    }
  }

  getTopRatedMovies = async () => {
    this.setState({topRatedApiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'

    const jwtToken = Cookies.get('jwt_token') // getting the saved token from cookies

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedtopRatedMovies = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        topRatedMovies: updatedtopRatedMovies,
        topRatedApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({topRatedApiStatus: apiStatusConstants.failure})
    }
  }

  getRandomMovie = async () => {
    this.setState({randomMovieStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/originals'

    const jwtToken = Cookies.get('jwt_token') // getting the saved token from cookies

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedOriginalsRandomMovies = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      const randomNum =
        Math.ceil(Math.random() * updatedOriginalsRandomMovies.length) - 1

      const randomData = updatedOriginalsRandomMovies[randomNum]

      this.setState({
        randomMovie: randomData,
        randomMovieStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({randomMovieStatus: apiStatusConstants.failure})
    }
  }

  /*   top Rated Movies Data Rendering  */

  renderTopRatedMoviesInProgress = () => (
    <div className="home-loader-retry-main-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderTopRatedMoviesSuccess = () => {
    const {topRatedMovies} = this.state

    return (
      <div className="trending-movies-slick-container">
        <Slider {...settings}>
          {topRatedMovies.map(each => (
            <MovieItem key={each.id} movieDetails={each} />
          ))}
        </Slider>
      </div>
    )
  }

  renderTopRatedMoviesFailure = () => (
    <div className="home-loader-retry-main-container">
      <div className="home-failure-container">
        <img
          src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719225427/alert-triangle_pk32w9.png"
          className="home-failure-img"
          alt="failure view"
        />
        <p className="home-failure-container-message">
          {' '}
          Something Went Wrong. Please try again{' '}
        </p>
        <button
          type="button"
          className="home-try-again-btn"
          onClick={this.onClickTopRatedRetry}
        >
          {' '}
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  renderTopRatedMovies = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderTopRatedMoviesInProgress()
      case apiStatusConstants.success:
        return this.renderTopRatedMoviesSuccess()
      case apiStatusConstants.failure:
        return this.renderTopRatedMoviesFailure()
      default:
        return null
    }
  }

  /*                                      */

  /*   Originals Movies Data Rendering  */

  renderOriginalsMoviesInProgress = () => (
    <div className="home-loader-retry-main-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderOriginalsMoviesSuccess = () => {
    const {originalsMovies} = this.state

    return (
      <div className="trending-movies-slick-container">
        <Slider {...settings}>
          {originalsMovies.map(each => (
            <MovieItem key={each.id} movieDetails={each} />
          ))}
        </Slider>
      </div>
    )
  }

  renderOriginalsMoviesFailure = () => (
    <div className="home-loader-retry-main-container">
      <div className="home-failure-container">
        <img
          src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719225427/alert-triangle_pk32w9.png"
          className="home-failure-img"
          alt="failure view"
        />
        <p className="home-failure-container-message">
          {' '}
          Something Went Wrong. Please try again{' '}
        </p>
        <button
          type="button"
          className="home-try-again-btn"
          onClick={this.onClickOriginalsRetry}
        >
          {' '}
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  renderOriginalsMovies = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderOriginalsMoviesInProgress()
      case apiStatusConstants.success:
        return this.renderOriginalsMoviesSuccess()
      case apiStatusConstants.failure:
        return this.renderOriginalsMoviesFailure()
      default:
        return null
    }
  }

  /*                                      */

  /*   Trending Movies Data Rendering  */

  renderTrendingMoviesInProgress = () => (
    <div className="home-loader-retry-main-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderTrendingMoviesSuccess = () => {
    const {trendingMovies} = this.state

    return (
      <div className="trending-movies-slick-container">
        <Slider {...settings}>
          {trendingMovies.map(each => (
            <MovieItem key={each.id} movieDetails={each} />
          ))}
        </Slider>
      </div>
    )
  }

  renderTrendingMoviesFailure = () => (
    <div className="home-loader-retry-main-container">
      <div className="home-failure-container">
        <img
          src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719225427/alert-triangle_pk32w9.png"
          className="home-failure-img"
          alt="failure view"
        />
        <p className="home-failure-container-message">
          {' '}
          Something Went Wrong. Please try again{' '}
        </p>
        <button
          type="button"
          className="home-try-again-btn"
          onClick={this.onClickTrendingRetry}
        >
          {' '}
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  renderTrendingMovies = () => {
    const {trendingApiStatus} = this.state

    switch (trendingApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderTrendingMoviesInProgress()
      case apiStatusConstants.success:
        return this.renderTrendingMoviesSuccess()
      case apiStatusConstants.failure:
        return this.renderTrendingMoviesFailure()
      default:
        return null
    }
  }

  /*                                      */

  /*   Random Movie Data Rendering  */

  renderRandomMovieInProgress = () => (
    <>
      <Header />
      <div className="home-poster-loader-retry-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  renderRandomMovieSuccess = () => {
    const {randomMovie} = this.state
    const {id, title, overview, backdropPath} = randomMovie
    const posterGradient = `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(24, 24, 24, 0.546875) 38.26%,
    #181818 92.82%,
    #181818 98.68%,
    #181818 108.61%
  )`

    const posterImg = `url(${backdropPath})`

    return (
      <div
        className="home-page-top-container"
        style={{
          backgroundImage: `${posterGradient}, ${posterImg}`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div className="home-top-random-movie-details-container">
          <h1 className="random-movie-title"> {title} </h1>
          <p className="random-movie-description"> {overview} </p>
          <Link to={`/movies/${id}`}>
            <button type="button" className="random-movie-play-btn">
              {' '}
              Play{' '}
            </button>
          </Link>
        </div>
      </div>
    )
  }

  renderRandomMovieFailure = () => (
    <>
      <Header />
      <div className="home-poster-loader-retry-container">
        <div className="home-failure-container">
          <img
            src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719225427/alert-triangle_pk32w9.png"
            className="home-poster-failure-img"
            alt="failure view"
          />
          <p className="home-poster-failure-container-message">
            {' '}
            Something Went Wrong. Please try again{' '}
          </p>
          <button
            type="button"
            className="home-poster-try-again-btn"
            onClick={this.onClickRandomMovieRetry}
          >
            {' '}
            Try Again{' '}
          </button>
        </div>
      </div>
    </>
  )

  renderRandomMovie = () => {
    const {randomMovieStatus} = this.state

    switch (randomMovieStatus) {
      case apiStatusConstants.inProgress:
        return this.renderRandomMovieInProgress()
      case apiStatusConstants.success:
        return this.renderRandomMovieSuccess()
      case apiStatusConstants.failure:
        return this.renderRandomMovieFailure()
      default:
        return null
    }
  }

  /*                                      */

  render() {
    return (
      <div className="home-container">
        {this.renderRandomMovie()}

        <div className="trending-originals-top-rated-movies-container">
          <div className="home-heading-container">
            <h1 className="heading"> Trending Now </h1>
          </div>
          {this.renderTrendingMovies()}
        </div>

        <div className="trending-originals-top-rated-movies-container">
          <div className="home-heading-container">
            <h1 className="heading"> Top Rated </h1>
          </div>
          {this.renderTopRatedMovies()}
        </div>

        <div className="trending-originals-top-rated-movies-container">
          <div className="home-heading-container">
            <h1 className="heading"> Originals </h1>
          </div>
          {this.renderOriginalsMovies()}
        </div>

        <div className="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}
export default Home
