import React from 'react';
import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header: HeaderComponent } = Layout;

export const Header = () => {
  return (
    <HeaderComponent className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <NavLink to="/" end>
            Главная
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/favourite">Избранное</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/cart">Корзина</NavLink>
        </Menu.Item>
      </Menu>
    </HeaderComponent>
  );
};
