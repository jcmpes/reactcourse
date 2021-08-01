import React from 'react';
import { useSelector } from 'react-redux';
import { getCart } from '../../store/selectors';

const ItemsInCart = () => {
  const cart = useSelector(getCart);

  return cart.length > 0 ? (
    <div
      style={{
        fontFamily: 'verdana',
        color: 'white',
        fontSize: '.7rem',
        borderRadius: '50%',
        backgroundColor: 'red',
        padding: '.3rem',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {cart.length}
    </div>
  ) : (
    ''
  );
};

export default ItemsInCart;
