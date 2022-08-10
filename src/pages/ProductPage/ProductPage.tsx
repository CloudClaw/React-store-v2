import React from 'react';

import 'antd/dist/antd.css';
import styles from './ProductPage.module.scss';

import { Button, Card, Layout } from 'antd';
import { useDispatch } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleProduct } from '../../redux/slices/productSlice';
import { useAppSelector } from '../../redux/store';

const { Meta } = Card;
const { Content } = Layout;

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const singleProducts = useAppSelector((state) => state.product.singleProduct);

  React.useEffect(() => {
    try {
      axios
        .get(`https://62cfc4261cc14f8c087ce036.mockapi.io/Shop/${productId}`)
        .then((response) => dispatch(setSingleProduct(response.data)));
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Content style={{ minHeight: '100vh' }}>
      <Layout style={{ minHeight: '100vh' }}>
        {singleProducts && (
          <Card
            className={styles.card}>
            <div className={styles.info}>
              <div className={styles.pic}>
                <Meta avatar={<img src={singleProducts.img} alt={singleProducts.name} />} />
              </div>
              <div className={styles.description}>
                <Meta title={singleProducts.name} />
                <Meta title={singleProducts.price} description={singleProducts.description} />
                <Button onClick={goBack} className={styles.btn}>
                  Назад
                </Button>
              </div>
            </div>
          </Card>
        )}
      </Layout>
    </Content>
  );
};
