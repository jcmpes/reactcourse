import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyPage () {
  const { verifyToken } = useParams()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    // GET request to backend to verify the user
    fetch(`${process.env.REACT_APP_API_BASE_URL}api/v1/verify?vt=${verifyToken}`)
      .then(response => { 
        if (response.status === 200) {
          setVerified(true)
        }})
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="verify-page">
      Hola,
      {verified ? ' ESTAS VERIFICADO' : ' no verificado'}
    </div>
  )
}

export default VerifyPage;