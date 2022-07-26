import React from 'react';

import styles from './CartPage.module.scss';

import { Button, Layout } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setProduct } from '../../redux/slices/productSlice';
import { Input } from '../../components/Input/Input';
import { CartCard } from '../../components/CartCard/CartCard';
import { clearItems } from '../../redux/slices/cartSlice';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';

const { Content } = Layout;

export const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue.toLowerCase());
  const currentPage = useSelector((state) => state.product.currentPage);

  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-') ? 'desc' : 'asc';
  const search = searchValue ? `search=${searchValue}` : '';

  React.useEffect(() => {
    try {
      axios
        .get(
          `https://62cfc4261cc14f8c087ce036.mockapi.io/Shop?page=${currentPage}&limit=10&sortBy=${sortBy}&order=${order}&${search}`,
        )
        .then((response) => {
          dispatch(setProduct(response.data));
          dispatch(setIsLoading(false));
        });
    } catch (error) {
      console.log(error);
    }
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
              cartItems.map((product) => {
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
