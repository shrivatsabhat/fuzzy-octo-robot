import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Nav } from './components/nav'
import Home from './page/home'
import NoMatch from './page/NoMatch'
import Provider from './central-context'

function App() {

  return (
    <Provider>
      <Routes >
        <Route path='/' element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
