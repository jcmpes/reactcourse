import client from "./client"

// Get Courses
export const getCourses = () => {
  return client
    .get('/api/v1/courses')
    // Temporary fix to populate all courses with username
    // if the course author is not in the DB anymore.
    .then((data) => {
      data.map(course => {
        if (!course.user) {
          course.user = { username: 'Anonymous user' }
          return course;
        }
        return course
      })
    })
    .catch((error) => console.log('Error', error));
};

// Get course detail
export const getCourse = (courseSlug) => {
  return client
    .get(`/api/v1/courses/${courseSlug}`)
    .then((data) => data)
    .catch(err => console.log('Error getting course: ', err))
}

// Post a new course
export const postCourse = async (courseDetails) => {
  return client
    .post('/api/v1/courses/', courseDetails)
    .then((data) => data)
    .catch(err => err)
}

// Get categories
export const getCategoriesApiCall = () => {
  return client
    .get('/api/v1/categories')
    .then((data) => data)
    .catch(err => console.log('Error getting categories: ', err))
}

