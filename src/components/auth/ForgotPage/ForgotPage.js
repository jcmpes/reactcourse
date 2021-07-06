import { useDispatch } from "react-redux";
import { forgotPasswordAction } from "../../../store/actions";
import ForgotForm from "./ForgotForm";

const ForgotPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = email => {
    dispatch(forgotPasswordAction(email));
  };

  return (
    <ForgotForm onSubmit={handleSubmit}/>
  )
};

export default ForgotPage;