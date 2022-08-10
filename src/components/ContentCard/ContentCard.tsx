import React from 'react';

import 'antd/dist/antd.css';
import styles from './ContentCard.module.scss';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { ReactComponent as Cart } from '../../assets/cart.svg';

import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const { Meta } = Card;
type ContentCardProps = {
	id: number;
	img: string;
	price: number;
	name: string;
	likeProduct: () => void;
	liked: boolean;
	cart: boolean;
	count: number;
	index: number;
}

export const ContentCard: React.FC<ContentCardProps> = ({ id, img, price, name, likeProduct, liked, cart, count, index }) => {
  const dispatch = useDispatch();

  const customFillingLike = liked ? 'crimson' : 'black';
  const customFillingCart = cart ? 'crimson' : 'black';

  const onClickAddToCart = () => {
    const item = {
      id,
      name,
      price,
      img,
		count,
		index
    };
    dispatch(addToCart(item));
  };

  return (
    <Card
      className={styles.card}
      cover={<img alt={name} src={img} />}
      actions={[
        <Heart className={styles.svgLike} onClick={likeProduct} fill={customFillingLike} />,
        <Cart className={styles.svgCart} onClick={onClickAddToCart} fill={customFillingCart} />,
      ]}>
      <NavLink to={`/product/${id}`}>
        <Meta title={name} description={price} />
      </NavLink>
    </Card>
  );
};
