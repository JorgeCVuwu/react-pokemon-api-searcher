import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { PokemonQuery } from './routes/PokemonQuery.jsx'

function App () {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li><Link to=''>Home</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<PokemonQuery/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
