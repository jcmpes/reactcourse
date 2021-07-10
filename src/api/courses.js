import client from './client';

// Get Courses
export const getCourses = () => {
  return client
    .get('/api/v1/courses')
    .then((data) => data)
    .catch((error) => console.log('Error', error));
};
