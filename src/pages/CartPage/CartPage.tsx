import React from 'react';

import styles from './CartPage.module.scss';

import { Button, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { Input } from '../../components/Input/Input';
import { CartCard } from '../../components/CartCard/CartCard';
import { clearItems, selectCart } from '../../redux/slices/cartSlice';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';
import {useAppDispatch, useAppSelector } from '../../redux/store';

const { Content } = Layout;

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalPrice } = useSelector(selectCart);
  const sortType = useAppSelector((state) => state.filter.sort);
  const searchValue = useAppSelector((state) => state.filter.searchValue.toLowerCase());
  const currentPage = useAppSelector((state) => state.product.currentPage);

  React.useEffect(() => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchProducts({
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
  }, [sortType, searchValue, currentPage]);

  const onClearCart = () => {
    dispatch(clearItems());
  };

  return (
    <Content>
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
          minHeight: '100vh',
        }}>
        <div>
          <div className={styles.filterBlock}>
            <Input />
            {cartItems.length > 0 ? <Button onClick={onClearCart}>Очистить корзину</Button> : ''}
          </div>
          <Content className={styles.content}>
            {cartItems.length > 0 ? (
              cartItems.map((product:any) => {
                return <CartCard key={product.id} {...product} />;
              })
            ) : (
              <EmptyCart
                title="Корзина пустая 😕"
                desc1="Вероятней всего, вы не заказали товар."
                desc2="Для того, чтобы заказать товар, перейди на главную страницу."
              />
            )}
          </Content>
          {cartItems.length > 0 ? (
            <div className={styles.amount}>
              <span>Общая стоимость: {totalPrice}₽</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </Layout>
    </Content>
  );
};
