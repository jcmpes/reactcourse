import client from './client';

// Post a new purchase
export const purchase = async (purchasedCourses, paymentCode) => {
  const formData = {
    purchasedCourses,
    paymentCode,
  };
  client
    .post('/api/v1/purchases', formData)
    .then(console.log)
    .catch((err) => {
      console.log(err);
    });
};
