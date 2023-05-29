import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/HomePage/Home';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import NotFound from "./components/NotFound";
import Navbar from './components/Navbar';
import {CartProvider} from './components/Context/CartContext';
import {HistoryProvider} from './components/Context/HistoryContext';

/**
 * The main component of the application
 * @returns {JSX.Element}
 */
function App() {
    return (
        <CartProvider>
            <HistoryProvider>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/Checkout" element={<Checkout/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            </HistoryProvider>
        </CartProvider>
    );
}

export default App;
