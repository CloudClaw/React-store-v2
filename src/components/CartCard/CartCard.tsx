import React from 'react';

import styles from './CartCard.module.scss';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem, minusItem } from '../../redux/slices/cartSlice';

type CartCardProps = {
	id: number;
	img: string;
	price: number;
	name: string;
	count: number;
	index: number;
}

export const CartCard: React.FC<CartCardProps> = ({ id, img, price, name, count }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addToCart({
			id,
      } as CartItem),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <img className={styles.cardImg} src={img} alt="img" />
        <span className={styles.cardSpan}>{name}</span>
        <span className={styles.cardSpan}>{price} ₽</span>
      </div>
      <div className={styles.buttons}>
        <PlusOutlined className={styles.plus} onClick={onClickPlus} />
        <span className={styles.countSpan}>{count}</span>
        <MinusOutlined className={styles.minus} onClick={onClickMinus} />
      </div>
    </div>
  );
};
