import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-container-heading"> Lost Your Way ? </h1>
    <p className="not-found-container-description">
      {' '}
      we are sorry, the page you requested could not be found <br /> Please go
      back to the homepage.{' '}
    </p>
    <Link to="/" className="not-found-link-item">
      <button type="button" className="go-home-btn">
        {' '}
        Go to Home{' '}
      </button>
    </Link>
  </div>
)

export default NotFound
