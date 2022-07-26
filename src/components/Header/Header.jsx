import React from 'react';

import 'antd/dist/antd.css';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';

import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header: HeaderComponent } = Layout;

export const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <HeaderComponent className={styles.header}>
      <div>
        <img className={styles.logo} src={logo} alt="store" />
      </div>
      <Menu theme="dark" mode="horizontal" style={{ marginLeft: '30px' }}>
        <Menu.Item>
          <NavLink to="/" end>
            Главная
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/favourite">Избранное</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/cart">
            Корзина <span>{cartItems.length > 0 ? `(${totalCount})` : ''}</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </HeaderComponent>
  );
};
