import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, title, posterPath} = movieDetails

  return (
    <Link to={`/movies/${id}`} className="home-movie-img-link-item">
      <img
        testid="movieItem"
        src={posterPath}
        className="home-slider-movie-img"
        alt={title}
      />
    </Link>
  )
}

export default MovieItem
