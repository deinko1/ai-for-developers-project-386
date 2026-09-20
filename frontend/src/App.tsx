import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import About from './pages/About'
import Booking from './pages/Booking'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
      </Route>
    </Routes>
  )
}

export default App
