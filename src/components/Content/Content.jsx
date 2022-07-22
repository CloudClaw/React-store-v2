import React from 'react';

import styles from './Content.module.scss';

import { Layout } from 'antd';
import axios from 'axios';
import { Pagination } from '../Pagination/Pagination';
import { ContentCard } from '../ContentCard/ContentCard';
import { SideBar } from '../SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../redux/slices/productSlice';
import { Input } from '../Input/Input';
import { NavLink, useLocation } from 'react-router-dom';
import { SortBlock } from '../SortBlock/SortBlock';
import { ContentCardSkeleton } from '../ContentCard/ContentCardSkeleton/ContentCardSkeleton/ContentCardSkeleton';

const { Content: ContentBlock } = Layout;

export const Content = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.product.products);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue.toLowerCase());
  const currentPage = useSelector((state) => state.product.currentPage);

  const [loading, setLoading] = React.useState(true);

  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-') ? 'desc' : 'asc';
  const search = searchValue ? `search=${searchValue}` : '';

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
    try {
      axios
        .get(
          `https://62cfc4261cc14f8c087ce036.mockapi.io/Shop?page=${currentPage}&limit=10&sortBy=${sortBy}&order=${order}&${search}`,
        )
        .then((response) => {
          dispatch(setProduct(response.data));
			 setLoading(false)
        });
    } catch (error) {
      console.log(error);
    }
  }, [sortType, searchValue, currentPage]);

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
              ? [...new Array(10)].map((_, index) => {
                  return <ContentCardSkeleton key={index} />;
                })
              : getProductsForPages().map((product, index) => {
                  return (
                    <NavLink to={`/product/${product.id}`}>
                      <ContentCard key={product.name} {...product} />;
                    </NavLink>
                  );
                })}
          </ContentBlock>
        </div>
      </Layout>
    </ContentBlock>
  );
};
