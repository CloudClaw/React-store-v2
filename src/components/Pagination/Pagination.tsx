import React from 'react';

import { Pagination as PagePagination } from 'antd';
import 'antd/dist/antd.css';
import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setIsCurrentPage } from '../../redux/slices/productSlice';
import { useAppSelector } from '../../redux/store';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useAppSelector((state) => state.product.currentPage);
  const onChangePage = (page:number) => {
    dispatch(setIsCurrentPage(page));
  };

  return (
    <PagePagination
      current={currentPage}
      onChange={onChangePage}
      className={styles.pagination}
      defaultPageSize={10}
      total={30}
    />
  );
};
