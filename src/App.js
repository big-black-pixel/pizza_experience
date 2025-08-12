import React from 'react'

import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Cart from './pages/Cart.jsx';

import './scss/app.scss';
import { Routes, Route } from 'react-router';

export const SearchContext = React.createContext('')

function App() {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
