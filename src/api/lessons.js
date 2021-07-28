import client from './client';

// Get lesson detail
export const getLesson = (lessonSlug) => {
  return client
    .get(`/api/v1/lessons/${lessonSlug}`)
    .then((data) => data)
    .catch((err) => console.log('Error getting course: ', err));
};