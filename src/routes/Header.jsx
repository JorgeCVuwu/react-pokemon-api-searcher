import { Link } from 'react-router-dom'
import { InputFilter } from '../components/InputFilter.jsx'

import { PokemonSearchProvider } from '../context/pokemonSearch.jsx'

function HeaderComponent () {
  return (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
            </ul>
            <InputFilter name="searchbar" filter="pokemon" pokemonSearcher={false}/>
        </nav>
    </header>
  )
}

export function Header () {
  return (
    <PokemonSearchProvider>
        <HeaderComponent/>
    </PokemonSearchProvider>
  )
}
