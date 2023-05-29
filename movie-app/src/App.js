import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/HomePage/Home';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import NotFound from "./components/NotFound";
import Navbar from './components/Navbar';
import {CartProvider} from './components/HomePage/CartContext';

function App() {
    return (
        <CartProvider>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/Checkout" element={<Checkout/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
