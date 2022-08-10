import React from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
		<Outlet/>
      <Footer />
    </>
  );
};
