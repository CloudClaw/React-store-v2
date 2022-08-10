import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyCart.module.scss';

import cartEmptyImg from '../../assets/empty-cart.png';

type EmptyCartProps = {
	title:string;
	desc1: string;
	desc2: string;
}

export const EmptyCart:React.FC<EmptyCartProps> = ({ title, desc1, desc2 }) => {
  return (
    <>
      <div className={styles.cartEmpty}>
        <h2>
          {title}
        </h2>
        <p>
          {desc1}
          <br />
          {desc2}
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <Button>Вернуться назад</Button>
        </Link>
      </div>
    </>
  );
};
