import './App.css'
import HeroSection from './components/HeroSection.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import Navbar from './components/Navbar.jsx'
import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './components/Error.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={ <HeroSection></HeroSection> } />
        <Route path="/category/:type" element={ <ItemListContainer greeting="Nuestros Cafés de tipo "/> } />
        <Route path="/item/:id" element={ <ItemDetailContainer></ItemDetailContainer> } />
        <Route path="*" element={ <Error></Error> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
