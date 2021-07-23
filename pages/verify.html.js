import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation'


function VerifyPage() {
  const { verifyToken } = useRouter().query;
  const [verified, setVerified] = useState(false);
  const { t } = useTranslation('common')

  
  useEffect(() => {
    // GET request to backend to verify the user
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/verify?vt=${verifyToken}`,
    )
      .then((response) => {
        if (response.status === 200) {
          setVerified(true);
        }
      })
      .catch((err) => console.log(err));
  }, [verifyToken]);
  return (
      <div className="verify-page">
        {verified ? (
          <>
            <p>
              {t('activation succeded') + ' '}
              <Link href="/login">
                <a>{t('log in your account')}</a>
              </Link>
            </p>
          </>
        ) : (
          <p>{t('activation failed')}</p>
        )}
      </div>
  );
}

export default VerifyPage;