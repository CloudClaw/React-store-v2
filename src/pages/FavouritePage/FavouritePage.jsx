import React from 'react';

import styles from './FavouritePage.module.scss';

import { Layout } from 'antd';
import axios from 'axios';
import { Pagination } from '../../components/Pagination/Pagination';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { Input } from '../../components/Input/Input';
import { ContentCardSkeleton } from '../../components/ContentCard/ContentCardSkeleton/ContentCardSkeleton';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';

const { Content } = Layout;

export const FavouritePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue.toLowerCase());
  const loading = useSelector((state) => state.product.isLoading);
  const currentPage = useSelector((state) => state.product.currentPage);

  const getProduct = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchProducts({
        sortBy,
        order,
        search,
        currentPage,
      }),
    );
  };

  React.useEffect(() => {
    getProduct();
  }, [sortType, searchValue, currentPage]);

  const likeProduct = async (index) => {
    const updatedProduct = JSON.parse(JSON.stringify(products));
    updatedProduct[index].liked = !updatedProduct[index].liked;

    try {
      const response = await axios.put(
        'https://62cfc4261cc14f8c087ce036.mockapi.io/Shop' + '/' + updatedProduct[index].id,
        updatedProduct[index],
      );
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content>
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}>
        <div>
          <Pagination />
          <div className={styles.filterBlock}>
            <Input />
          </div>
          {products.filter((item) => item.liked).length > 0 ? (
            <Content className={styles.content}>
              {loading
                ? [...new Array(10)].map((_, index) => {
                    <ContentCardSkeleton key={index} />;
                  })
                : products
                    .filter((item) => item.liked === true)
                    .map((product, index) => {
                      return (
                        <ContentCard
                          key={product.name}
                          likeProduct={() => likeProduct(index)}
                          {...product}
                        />
                      );
                    })}
            </Content>
          ) : (
            <EmptyCart
              title="Избранных товаров нет 😕"
              desc1="Вероятней всего, вы не добавили товар в избранное."
              desc2="Для того, что бы добавить товар в избранное перейдите на главную страницу."
            />
          )}
        </div>
      </Layout>
    </Content>
  );
};
