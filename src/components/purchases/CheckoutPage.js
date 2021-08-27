import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { getIdsInCart } from '../../store/selectors';
import styles from './CheckoutPage.module.css';
import CheckoutForm from './CheckoutForm';
import { useHistory } from 'react-router-dom';
import backIcon from '../../assets/svg/back.svg';

require('dotenv').config()

const CheckoutPage = () => {
  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // loadStripe is initialized with your real test publishable API key.
  const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  const allCourses = useSelector(getIdsInCart);

  const history = useHistory();

  return (
    <>
      <div className={styles.stripeCardContainer}>
        <div className={styles.goBack} onClick={() => history.goBack()}>
          <img src={backIcon} alt="back" width="35" />
        </div>
        <Elements stripe={promise}>
          <CheckoutForm class={styles.checkoutForm} items={allCourses} />
        </Elements>
      </div>

    </>
  );
};

export default CheckoutPage;