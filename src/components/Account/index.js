import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const loggedinUser = localStorage.getItem('username')

  const onClickLogout = () => {
    const {history} = props
    localStorage.removeItem('username')

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="account-details-container">
        <h1 className="account-heading"> Account </h1>
        <hr />
        <div className="account-user-details">
          <p className="membership-heading">Member ship</p>

          <div className="user-details">
            <p className="user-name"> {loggedinUser}@gmail.com </p>
            <p className="user-password"> Password : ******** </p>
          </div>
        </div>

        <hr />

        <div className="plan-details-container">
          <p className="plan-details-heading"> Plan Details </p>
          <div className="plan-container">
            <p className="plan-details"> Premium</p>
            <p className="plan-type"> Ultra HD </p>{' '}
          </div>
        </div>

        <hr />

        <div className="logout-button-container">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            {' '}
            Logout{' '}
          </button>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default Account
