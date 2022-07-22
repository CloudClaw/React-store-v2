import React from 'react';

import 'antd/dist/antd.css';
import styles from './SortBlock.module.scss';

import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice';

const { Option } = Select;

export const SortBlock = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const handleChangeSort = (value) => {
    dispatch(setSort(value));
  };

  const list = [
    { name: 'возростанию цены', sortProperty: 'price' },
    { name: 'убыванию цены', sortProperty: '-price' },
    { name: 'по алфавиту', sortProperty: 'name' },
  ];

  return (
    <Select className={styles.sort} defaultValue="Сортировать по:" onChange={handleChangeSort}>
      {list.map((sort) => {
        return (
          <Option key={sort.name} value={sort.sortProperty}>
            {sort.name}
          </Option>
        );
      })}
    </Select>
  );
};
