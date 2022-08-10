import React from 'react';

import './App.scss';
import 'antd/dist/antd.css';

import { MainPage } from './pages/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavouritePage } from './pages/FavouritePage/FavouritePage';
import { CartPage } from './pages/CartPage/CartPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="smartphones" element={<MainPage />} />
          <Route path="pcs" element={<MainPage />} />
          <Route path="pads" element={<MainPage />} />
          <Route path="favourite" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
