import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './FormField.css';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

function FormField({ label, type, ...props }) {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="formField">
      <label className="formField-label">
        <span>{label}</span>

        {type === 'password' ? (
          <>
            <input
              className="formField-input-password"
              {...props}
              type={passwordShown ? 'text' : 'password'}
            />
            {passwordShown ? (
              <i onClick={togglePasswordVisiblity}>{eyeSlash}</i>
            ) : (
              <i onClick={togglePasswordVisiblity}>{eye}</i>
            )}
          </>
        ) : (
          <input className="formField-input" type={type} {...props} />
        )}
      </label>
    </div>
  );
}

export default FormField;
