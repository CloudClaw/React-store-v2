import React from 'react';

import 'antd/dist/antd.css';
import styles from './Input.module.scss';

import { useDispatch } from 'react-redux';
import { Input as InputField } from 'antd';
import { setValue } from '../../redux/slices/filterSlice';

export const Input: React.FC = () => {
  const dispatch = useDispatch();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(e.target.value));
  };

  return (
    <InputField.Group className={styles.input} compact>
      <InputField.Search onChange={onChangeValue} allowClear placeholder="Введите название" />
    </InputField.Group>
  );
};
