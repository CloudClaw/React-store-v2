import React from 'react';

import 'antd/dist/antd.css';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';

import { Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/slices/cartSlice';

const { Header: HeaderComponent } = Layout;

export const Header = () => {
  const { cartItems } = useSelector(selectCart);
  const totalCount = cartItems.reduce((sum: number, item: any) => sum + item.count, 0);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const cartJson = JSON.stringify(cartItems);
      localStorage.setItem('cart', cartJson);
    }
    isMounted.current = true;
  }, [cartItems]);

  return (
    <HeaderComponent className={styles.header}>
      <div>
        <img className={styles.logo} src={logo} alt="store" />
      </div>
      <Menu theme="dark" mode="horizontal" style={{ marginLeft: '30px' }}>
			<div className='btn-div'>
			<Button type='primary' >
          <Link to="/" >
            Главная
          </Link>
        </Button>
        <Button type='primary' style={{ marginLeft: '30px' }}>
          <Link to="/favourite">Избранное</Link>
        </Button>
        <Button type='primary' style={{ marginLeft: '30px' }}>
          <Link to="/cart">
            Корзина <span>{cartItems.length > 0 ? `(${totalCount})` : ''}</span>
          </Link>
        </Button>
			</div> 
      </Menu>
    </HeaderComponent>
  );
};
