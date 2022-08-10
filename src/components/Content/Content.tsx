import React from 'react';

import styles from './Content.module.scss';

import { Layout } from 'antd';
import axios from 'axios';
import { Pagination } from '../Pagination/Pagination';
import { ContentCard } from '../ContentCard/ContentCard';
import { SideBar } from '../SideBar/SideBar';
import { fetchProducts, selectProduct } from '../../redux/slices/productSlice';
import { Input } from '../Input/Input';
import { useLocation } from 'react-router-dom';
import { SortBlock } from '../SortBlock/SortBlock';
import { ContentCardSkeleton } from '../ContentCard/ContentCardSkeleton/ContentCardSkeleton';
import { selectFilterSearch, selectSort } from '../../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const { Content: ContentBlock } = Layout;

export const Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const products = useAppSelector(selectProduct);
  const sortType = useAppSelector(selectSort);
  const searchValue = useAppSelector(selectFilterSearch);
  const currentPage = useAppSelector((state) => state.product.currentPage);
  const loading = useAppSelector((state) => state.product.isLoading);

  const getProduct = async () => {
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
  };

  const getProductsForPages = () => {
    switch (location.pathname) {
      case '/smartphones':
        return products.filter((product) => product.category === 'smartphone');

      case '/pads':
        return products.filter((product) => product.category === 'pad');

      case '/pcs':
        return products.filter((product) => product.category === 'pc');

      default:
        return products;
    }
  };

  React.useEffect(() => {
    getProduct();
  }, [sortType, searchValue, currentPage]);

  const likeProduct = async (index:number) => {
    const updatedProduct = JSON.parse(JSON.stringify(products));
    updatedProduct[index].liked = !updatedProduct[index].liked;

    try {
      await axios.put(
        'https://62cfc4261cc14f8c087ce036.mockapi.io/Shop' + '/' + updatedProduct[index].id,
        updatedProduct[index],
      );
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContentBlock>
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}>
        <SideBar />
        <div>
          <Pagination />
          <div className={styles.filterBlock}>
            <Input />
            <SortBlock />
          </div>
          <ContentBlock className={styles.content}>
            {loading
              ? [...new Array(15)].map((_, index) => {
                  return <ContentCardSkeleton key={index} />;
                })
              : getProductsForPages().map((product:any, index:number) => {
                  return (
                    <ContentCard
                      likeProduct={() => likeProduct(index)}
                      key={product.name}
                      {...product}
                    />
                  );
                })}
          </ContentBlock>
        </div>
      </Layout>
    </ContentBlock>
  );
};
