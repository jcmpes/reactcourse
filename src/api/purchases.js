import client from './client';

// Post a new purchase
export const purchase = async (courseId, paymentCode) => {
  console.log(`cacacacacaac ${courseId}`);
  const formData = {
    purchasedCourses: [courseId],
    paymentCode,
  };

  client
    .post('/api/v1/purchases', formData)
    .then(console.log)
    .catch((err) => {
      console.log('err');
    });
};
