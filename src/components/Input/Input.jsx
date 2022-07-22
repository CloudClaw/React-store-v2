import React from 'react';

import 'antd/dist/antd.css';
import styles from './Input.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Input as InputField } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { setValue } from '../../redux/slices/filterSlice';

export const Input = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.filter.searchValue);

  const onChangeValue = (e) => {
    dispatch(setValue(e.target.value));
  };

  return (
    <InputField.Group className={styles.input} compact>
      <InputField.Search onChange={onChangeValue} allowClear placeholder="Введите название" />
    </InputField.Group>
  );
};
