import React from 'react'

import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Cart from './pages/Cart.jsx';
import FullPizza from './pages/FullPizza.jsx';

import './scss/app.scss';
import { Routes, Route } from 'react-router';


function App() {

  return (
    <div className="wrapper">
        <Header />
        <div className="content">

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pizza/:id' element={<FullPizza />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
