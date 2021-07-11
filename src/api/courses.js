import client from "./client"

// Get Courses
export const getCourses = () => {
  return client
    .get('/api/v1/courses')
    .then((data) => data)
    .catch((error) => console.log('Error', error));
};

// Get course detail
export const getCourse = (courseId) => {
  return client
    .get(`/api/v1/courses/${courseId}`)
    .then((data) => data)
    .catch(err => console.log('Error getting course: ', err))
}

