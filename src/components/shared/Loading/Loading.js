import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ isLoading }) => {
  return isLoading ? (
    <div className={styles.container}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Loading;
