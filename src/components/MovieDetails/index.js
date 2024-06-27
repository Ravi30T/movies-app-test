import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Header from '../Header'
import Footer from '../Footer'

import MoviesContext from '../../context/MoviesContext'

import './index.css'

const apiStatusConstants = {
  inital: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {movieData: [], movieDataApiStatus: apiStatusConstants.inital}

  componentDidMount() {
    this.getMovieDetails()
  }

  onClickMovieDetailsRetry = () => {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({movieDataApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedMovieDetails = {
        id: data.movie_details.id,
        backdropPath: data.movie_details.backdrop_path,
        isAdultMovie: data.movie_details.adult,
        budget: data.movie_details.budget,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
        genres: data.movie_details.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
        similarMovies: data.movie_details.similar_movies.map(each => ({
          id: each.id,
          title: each.title,
          backdropPath: each.backdrop_path,
          posterPath: each.poster_path,
        })),
        languages: data.movie_details.spoken_languages.map(each => ({
          id: each.id,
          name: each.english_name,
        })),
      }

      console.log(updatedMovieDetails)
      this.setState({
        movieData: updatedMovieDetails,
        movieDataApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({movieDataApiStatus: apiStatusConstants.failure})
    }
  }

  movieDataInprogress = () => (
    <>
      <Header />
      <div className="movie-details-loader-retry-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  movieDataSuccess = () => {
    const {movieData} = this.state
    const {
      title,
      backdropPath,
      isAdultMovie,
      budget,
      overview,
      releaseDate,
      runtime,
      voteAverage,
      voteCount,
      genres,
      similarMovies,
      languages,
    } = movieData

    const posterGradient = `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(24, 24, 24, 0.546875) 38.26%,
    #181818 92.82%,
    #181818 98.68%,
    #181818 108.61%
  )`

    const posterImg = `url(${backdropPath})`

    const date = new Date(releaseDate)

    const formattedDate = format(date, 'do MMMM yyyy')

    const posterYear = formattedDate.slice(-4)

    const hours = Math.floor(runtime / 60)

    // Calculate the remaining minutes by taking the modulus of the total minutes by 60
    const remainingMinutes = runtime % 60

    const actualRuntime = `${hours}h ${remainingMinutes}m`

    const smMoreMovies = similarMovies.slice(0, 5)

    const lgMoreMovies = similarMovies.slice(0, 6)

    return (
      <>
        <div
          className="movie-details-main-container"
          style={{
            backgroundImage: `${posterGradient}, ${posterImg}`,
            backgroundSize: '100% 100%',
          }}
        >
          <Header />

          <MoviesContext.Consumer>
            {value => {
              const {smMenu} = value

              const smDevicePosterDetailsView =
                smMenu && 'sm-movie-details-on-poster-margin'

              return (
                <div
                  className={`movie-details-on-poster ${smDevicePosterDetailsView}`}
                >
                  <h1 className="movie-title"> {title} </h1>
                  <div className="year-runtime-adult-type-container">
                    <p className="movie-run-time"> {actualRuntime} </p>
                    {isAdultMovie ? (
                      <p className="adult-type"> A </p>
                    ) : (
                      <p className="adult-type"> U/A </p>
                    )}
                    <p className="movie-released-date">{posterYear}</p>
                  </div>

                  <p className="movie-description"> {overview} </p>
                  <button type="button" className="movie-details-play-btn">
                    {' '}
                    Play{' '}
                  </button>
                </div>
              )
            }}
          </MoviesContext.Consumer>
        </div>

        <div className="movie-details-bottom-container">
          <div className="genre-container">
            <h1 className="genre-heading"> Genres </h1>
            <ul className="genre-list-container">
              {genres.map(each => (
                <li id={each.id} className="genre-audio-list-item">
                  <p className="genre-audio-list-item-name">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="audio-container">
            <h1 className="audio-heading"> Audio Available </h1>
            <ul className="audio-list-container">
              {languages.map(each => (
                <li id={each.id} className="genre-audio-list-item">
                  <p className="genre-audio-list-item-name"> {each.name} </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rating-count-rating-average-container">
            <div className="rating-count-container">
              <h1 className="rating-count-heading"> Rating Count </h1>
              <p className="rating-count"> {voteCount} </p>
            </div>

            <div className="rating-average-container">
              <h1 className="rating-average-heading"> Rating Average </h1>
              <p className="rating-average"> {voteAverage} </p>
            </div>
          </div>

          <div className="movie-budget-release-date-container">
            <div className="movie-budget-container">
              <h1 className="movie-budget-heading"> Budget </h1>
              <p className="movie-budget"> {budget} </p>
            </div>

            <div className="movie-release-date-container">
              <h1 className="movie-release-date-heading"> Release Date </h1>
              <p className="movie-bottom-release-date"> {formattedDate} </p>
            </div>
          </div>
        </div>

        <div className="more-movies-container">
          <h1 className="more-movies-heading"> More like this </h1>

          <ul className="sm-more-movies-container">
            {smMoreMovies.map(each => (
              <li key={each.id} className="more-movies-list-item">
                {' '}
                <Link to={`/movies/${each.id}`}>
                  <img
                    src={each.posterPath}
                    className="more-movies-img"
                    alt={each.title}
                  />
                </Link>{' '}
              </li>
            ))}
          </ul>

          <ul className="lg-more-movies-container">
            {lgMoreMovies.map(each => (
              <li key={each.id} className="more-movies-list-item">
                {' '}
                <Link to={`/movies/${each.id}`}>
                  <img
                    src={each.posterPath}
                    className="more-movies-img"
                    alt={each.title}
                  />
                </Link>{' '}
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  movieDataFailure = () => (
    <>
      <Header />
      <div className="movie-details-loader-retry-container">
        <div className="movie-details-failure-container">
          <img
            src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719332381/Background-Complete_v4g7bw.png"
            className="movie-details-failure-img"
            alt="failure view"
          />
          <p className="movie-details-failure-container-message">
            {' '}
            Something Went Wrong. Please try again{' '}
          </p>
          <button
            type="button"
            className="movie-details-try-again-btn"
            onClick={this.onClickMovieDetailsRetry}
          >
            {' '}
            Try Again{' '}
          </button>
        </div>
      </div>
    </>
  )

  renderMovieDetails = () => {
    const {movieDataApiStatus} = this.state
    switch (movieDataApiStatus) {
      case apiStatusConstants.inProgress:
        return this.movieDataInprogress()
      case apiStatusConstants.success:
        return this.movieDataSuccess()
      case apiStatusConstants.failure:
        return this.movieDataFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details-container">
        {this.renderMovieDetails()}
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieDetails
