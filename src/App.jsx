import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

import { Header } from './routes/Header.jsx'
import { PokemonQuery } from './routes/PokemonQuery.jsx'
import { PokemonPage } from './routes/PokemonPage.jsx'
import { NotFound } from './routes/NotFound.jsx'

function Layout () {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PokemonQuery />} />
          <Route path='/pokemon/:name' element={<PokemonPage />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
