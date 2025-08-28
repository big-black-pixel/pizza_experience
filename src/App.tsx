
import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Cart from './pages/Cart.tsx';
import FullPizza from './pages/FullPizza.tsx';

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
