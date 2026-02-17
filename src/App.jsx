import './App.css'
import HeroSection from './components/HeroSection.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import Navbar from './components/Navbar.jsx'
import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './components/Error.jsx'
import { CartProvider } from './context/CartContext'
import CartDetail from './components/CartDetail'
import Checkout from './components/Checkout'

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={ <HeroSection></HeroSection> } />
          <Route path="/store" element={ <ItemListContainer/> } />
          <Route path="/store/category/:type" element={ <ItemListContainer greeting="Nuestros Cafés de tipo "/> } />
          <Route path="/item/:id" element={ <ItemDetailContainer></ItemDetailContainer> } />
          <Route path="/cart" element={ <CartDetail/> } />
          <Route path="/checkout" element={ <Checkout/> } />
          <Route path="*" element={ <Error></Error> } />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App;
