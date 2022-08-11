import React from 'react';

import 'antd/dist/antd.css';
import styles from './SortBlock.module.scss';

import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice';

const { Option } = Select;

export const SortBlock: React.FC = React.memo(() => {

  const dispatch = useDispatch();
  const handleChangeSort = React.useCallback((value: string) => {
    dispatch(setSort(value));
  },[]);

  const list:{
	name: string;
	sortProperty: string;}[] = [
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
});
