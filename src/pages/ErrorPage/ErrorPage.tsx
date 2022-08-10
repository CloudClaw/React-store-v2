import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage:React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Page not found</h1>
      <br />
      <h2>Please try again later</h2>
      <Link to="/" className="button button--black">
        <Button className={styles.btn}>Вернуться назад</Button>
      </Link>
    </div>
  );
};
