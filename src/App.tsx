import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

import { Header } from './routes/Header.tsx'
import { PokemonQuery } from './routes/PokemonQuery.tsx'
import { PokemonPage } from './routes/PokemonPage.tsx'
import { NotFound } from './routes/NotFound.tsx'

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
