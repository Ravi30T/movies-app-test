import React from 'react'

const MoviesContext = React.createContext({
  username: '',
  onChangeUsername: () => {},
  searchIcon: true,
  toggleSearchIcon: () => {},
  smMenu: false,
  searchVal: '',
  onToggleSearchBar: () => {},
  onToggleSmMenu: () => {},
  onToggleSmMenuClose: () => {},
})

export default MoviesContext
