import { Link } from 'react-router-dom'
import { InputFilter } from '../components/InputFilter.js'

import { PokemonSearchProvider } from '../context/pokemonSearch.js'

function HeaderComponent () {
  return (
    <header className='header-container'>
      <nav className='header-nav'>
        <ul>
          <li><Link to='/'>Home</Link></li>
        </ul>
        <InputFilter name='searchbar' filter='pokemon-species' pokemonSearcher={false} />
      </nav>
    </header>
  )
}

export function Header () {
  return (
    <PokemonSearchProvider>
      <HeaderComponent />
    </PokemonSearchProvider>
  )
}
