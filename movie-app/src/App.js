import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';

function App() {
    return (
        <div>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/Checkout" element={<Checkout/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
