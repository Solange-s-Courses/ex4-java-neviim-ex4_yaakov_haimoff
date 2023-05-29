import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Search/Home';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Navbar from './components/Navbar';
import {CartProvider} from './components/Search/CartContext';

function App() {
    return (
        <div>
            <CartProvider>
                <Navbar/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Cart" element={<Cart/>}/>
                        <Route path="/Checkout" element={<Checkout/>}/>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </div>
    );
}

export default App;
