import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';

function VerifyPage() {
  const { verifyToken } = useParams();
  const [verified, setVerified] = useState(false);

  const { t } = useTranslation(['global']);

  useEffect(() => {
    // GET request to backend to verify the user
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/verify?vt=${verifyToken}`,
    )
      .then((response) => {
        if (response.status === 200) {
          setVerified(true);
        }
      })
      .catch((err) => console.log(err));
  }, [verifyToken]);
  return (
    <Layout>
      <div className="verify-page">
        {verified ? (
          <>
            <p>
              {t('activation succeded')}
              <a href="/login">{t('log in your account')}</a>
            </p>
          </>
        ) : (
          <p>{t('activation failed')}</p>
        )}
      </div>
    </Layout>
  );
}

export default VerifyPage;
