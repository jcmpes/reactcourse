import React from 'react';
import styles from './CourseSkeleton.module.css';

export const CourseSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.loadwrapper}>
          <div className={styles.activity}></div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginRight: '2rem',
        }}
      >
        <div
          style={{
            margin: '15px',
            backgroundColor: 'lightgray',
            width: '100%',
            borderRadius: '20px',
            height: '3rem',
          }}
        ></div>
        <div
          style={{
            margin: '15px',
            backgroundColor: 'lightgray',
            width: '50%',
            borderRadius: '20px',
            height: '3rem',
          }}
        ></div>

        <div
          style={{
            margin: '15px',
            backgroundColor: 'lightgray',
            width: '80%',
            borderRadius: '20px',
            height: '3rem',
          }}
        ></div>
      </div>
    </div>
  );
};
