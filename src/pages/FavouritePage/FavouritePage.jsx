import React from 'react';

import styles from './FavouritePage.module.scss';

import { Layout } from 'antd';
import axios from 'axios';
import { Pagination } from '../../components/Pagination/Pagination';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setProduct } from '../../redux/slices/productSlice';
import { Input } from '../../components/Input/Input';
import { NavLink } from 'react-router-dom';
import { SortBlock } from '../../components/SortBlock/SortBlock';
import { ContentCardSkeleton } from '../../components/ContentCard/ContentCardSkeleton/ContentCardSkeleton/ContentCardSkeleton';

const { Content } = Layout;

export const FavouritePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue.toLowerCase());
  const loading = useSelector((state) => state.product.isLoading);
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
            <SortBlock />
          </div>
          <Content className={styles.content}>
            {loading
              ? [...new Array(10)].map((_, index) => {
                  <ContentCardSkeleton key={index} />;
                })
              : products
                  .filter((item) => item.liked === true)
                  .map((product) => {
                    return (
                      <NavLink to={`/product/${product.id}`}>
                        <ContentCard key={product.name} {...product} />;
                      </NavLink>
                    );
                  })}
          </Content>
        </div>
      </Layout>
    </Content>
  );
};
