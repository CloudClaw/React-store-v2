import React from 'react';

import 'antd/dist/antd.css';
import styles from './ProductPage.module.scss';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleProduct } from '../../redux/slices/productSlice';
import { SideBar } from '../../components/SideBar/SideBar';

const { Meta } = Card;
const { Content } = Layout;

export const ProductPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const singleProducts = useSelector((state) => state.product.singleProduct);

  React.useEffect(() => {
    try {
      axios
        .get(`https://62cfc4261cc14f8c087ce036.mockapi.io/Shop/${productId}`)
        .then((response) => dispatch(setSingleProduct(response.data)));
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  return (
    <Content>
      <Layout>
        <SideBar />
        {singleProducts && (
          <Card
            className={styles.card}
            cover={<img alt={singleProducts.name} src={singleProducts.img} />}
            actions={[<HeartOutlined key="like" />, <ShoppingCartOutlined key="cart" />]}>
            <Meta title={singleProducts.name} />
            <Meta title={singleProducts.price} description={singleProducts.description} />
          </Card>
        )}
      </Layout>
    </Content>
  );
};
