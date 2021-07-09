import { useEffect } from "react";
import { useParams } from "react-router-dom";

function VerifyPage () {
  const { verifyToken } = useParams()

  useEffect(() => {
    // GET request to backend to verify the user
    fetch(`${process.env.REACT_APP_API_BASE_URL}api/v1/verify?vt=${verifyToken}`)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="verify-page">
      Hola
    </div>
  )
}

export default VerifyPage;