import React from 'react';

import { Pagination as PagePagination } from 'antd';
import 'antd/dist/antd.css';
import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setIsCurrentPage } from '../../redux/slices/productSlice';

export const Pagination = () => {
  const dispatch = useDispatch();
  const onChangePage = (event) => {
    dispatch(setIsCurrentPage(event));
  };

  return (
    <PagePagination
      onChange={onChangePage}
      className={styles.pagination}
      defaultPageSize={10}
      defaultCurrent={1}
      total={30}
    />
  );
};
