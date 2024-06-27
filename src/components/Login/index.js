import {Component} from 'react' // importing component from react
import Cookies from 'js-cookie' // importing Cookies

import {BiShow, BiHide} from 'react-icons/bi'

// import MoviesContext from '../../context/MoviesContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  // static contextType = this.context

  onSubmitFailure = errorMsg => {
    this.setState(prevState => ({showError: !prevState.showError, errorMsg}))
  }

  onSubmitSuccess = jwtToken => {
    const {username} = this.state
    const {history} = this.props

    localStorage.setItem('username', username)

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickShowHidePassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onEnterUsername = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showPassword, showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }

    return (
      <div className="login-page-bg-container">
        <div className="webiste-logo-container">
          <img
            src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1718959127/MoviesApp/rgdwnrmlrenzm4rsz1us.png"
            className="login-website-logo"
            alt="login website logo"
          />
        </div>

        <div className="login-form-main-container">
          <div className="login-form-container">
            <form className="login-form" onSubmit={this.onClickLogin}>
              <h1 className="login-heading"> Login </h1>

              <div className="username-container">
                <label
                  htmlFor="username"
                  className="username-password-label-item"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="login-page-username-input-box"
                  placeholder="Username"
                  onChange={this.onEnterUsername}
                  value={username}
                />
              </div>

              <div className="password-container">
                <label
                  htmlFor="password"
                  className="username-password-label-item"
                >
                  PASSWORD
                </label>
                <div className="password-box">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="login-page-password-input-box"
                    id="password"
                    placeholder="Password"
                    onChange={this.onEnterPassword}
                    value={password}
                  />
                  {showPassword ? (
                    <button
                      type="button"
                      className="password-hide-unhide-btn"
                      onClick={this.onClickShowHidePassword}
                    >
                      {' '}
                      <BiHide />{' '}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="password-hide-unhide-btn"
                      onClick={this.onClickShowHidePassword}
                    >
                      {' '}
                      <BiShow />{' '}
                    </button>
                  )}
                </div>
              </div>

              {showError && <p className="login-error-msg"> {errorMsg} </p>}

              <div className="login-button-container">
                <button type="submit" className="login-button">
                  {' '}
                  Login{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
