import client from './client';

// Get lesson detail
export const getLesson = (courseSlug, lessonSlug) => {
  return client
    .get(`/api/v1/courses/${courseSlug}/${lessonSlug}`)
    .then((data) => data)
    .catch((err) => console.log('Error getting course: ', err));
};
