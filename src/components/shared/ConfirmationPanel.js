import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmationPanel = ({ okAction, cancelAction, message, subtitle }) => {
  const { t } = useTranslation(['global']);

  return (
    <div
      style={{
        color: 'white',
        backgroundColor: '#ff6666',
        width: 300,
        left: '50%',
        zIndex: 3,
        position: 'absolute',
        top: '50vh',
        marginLeft: '-150px',
        padding: 10,
        borderStyle: 'solid',
        borderRadius: '20px',
        borderWidth: '2px',
        borderColor: 'red',
      }}
    >
      <div style={{ paddingBottom: 10, fontSize: 19, textAlign: 'center' }}>
        {message}
        <br />
        <span style={{ fontSize: 14, textAlign: 'center' }}>{subtitle}</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <button onClick={cancelAction}>{t('Cancel')}</button>
        <button className="delete-button-panel" onClick={okAction}>
          {t('Sure')}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPanel;
