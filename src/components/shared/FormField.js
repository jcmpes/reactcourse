import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './FormField.module.css';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

function FormField({ label, type, icon, ...props }) {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className={styles.loginContainer}>
      {/* <label className="formField-label"> */}
      {/* <span>{label}</span> */}
      <div className={styles.iconDiv}>
        <span className={styles.iconSpan}>
          <img src={icon} alt="" />
        </span>

        {type === 'password' ? (
          <>
            <input
              className={styles.input}
              {...props}
              type={passwordShown ? 'text' : 'password'}
            />
            {passwordShown ? (
              <i
                className={styles.passwordEye}
                onClick={togglePasswordVisiblity}
              >
                {eyeSlash}
              </i>
            ) : (
              <i
                className={styles.passwordEye}
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </i>
            )}
          </>
        ) : (
          <input className={styles.input} type={type} {...props} />
        )}
      </div>
      {/* </label> */}
    </div>
  );
}

export default FormField;
