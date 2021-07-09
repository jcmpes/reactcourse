import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VerifyPage() {
  const { verifyToken } = useParams();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // GET request to backend to verify the user
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}api/v1/verify?vt=${verifyToken}`,
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
      Bienvenido,
      {verified ? (
        <>
          <p>HAS ACTIAVDO TU USUARIO</p>
          <a href="/login">Ir a Log In</a>
        </>
      ) : (
        ' lo sentimos, pero algo no ha ido bien. Tu usuario no esta activado, vuelve a intentarlo.'
      )}
    </div>
  );
}

export default VerifyPage;
