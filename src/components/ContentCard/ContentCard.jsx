import React from 'react';

import 'antd/dist/antd.css';
import styles from './ContentCard.module.scss';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

export const ContentCard = ({ img, price, name }) => {
  return (
    <Card
      className={styles.card}
      cover={<img alt={name} src={img} />}
      actions={[<HeartOutlined key="like" />, <ShoppingCartOutlined key="cart" />]}>
      <Meta title={name} description={price} />
    </Card>
  );
};
