import React from 'react';
import './App.css';
import Services from './components/Services';
import Payments from './components/Payments';
import Order from './components/Order';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { OrderProvider } from './OrderContext';

function App() {
    return (
        <OrderProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1>Sklep Online</h1>
                        <nav>
                            <ul>
                                <li><Link to="/">Usługi</Link></li>
                                <li><Link to="/payments">Płatności</Link></li>
                                <li><Link to="/order">Zamówienie</Link></li>
                            </ul>
                        </nav>
                    </header>
                    <Routes>
                        <Route path="/" element={<Services />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/order" element={<Order />} />
                    </Routes>
                </div>
            </Router>
        </OrderProvider>
    );
}

export default App;