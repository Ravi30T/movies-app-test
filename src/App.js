import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import MoviesContext from './context/MoviesContext'
import Login from './components/Login'
import Account from './components/Account'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import Popular from './components/Popular'
import SearchMovies from './components/SearchMovies'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {username: '', searchIcon: true, smMenu: false, searchVal: ''}

  onChangeUsername = name => {
    this.setState({username: name})
  }

  toggleSearchIcon = () => {
    this.setState({searchIcon: false})
  }

  onToggleSmMenu = () => {
    console.log('clikced menu')
    this.setState({smMenu: true})
  }

  onToggleSmMenuClose = () => {
    console.log('ms close')
    this.setState({smMenu: false})
  }

  onToggleSearchBar = value => {
    this.setState({searchVal: value})
  }

  render() {
    const {username, searchIcon, smMenu, searchVal} = this.state

    return (
      <MoviesContext.Provider
        value={{
          username,
          onChangeUsername: this.onChangeUsername,
          searchIcon,
          toggleSearchIcon: this.toggleSearchIcon,
          smMenu,
          onToggleSmMenu: this.onToggleSmMenu,
          onToggleSmMenuClose: this.onToggleSmMenuClose,
          searchVal,
          onToggleSearchBar: this.onToggleSearchBar,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={SearchMovies} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </MoviesContext.Provider>
    )
  }
}

export default App
