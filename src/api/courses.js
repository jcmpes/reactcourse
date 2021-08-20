import client from './client';

// Get Courses
export const getCourses = (filters) => {
  const { title, username, category, price, limit, skip, sort } = filters;
  let query = '?';
  if (title) {
    query += `&title=${title}`;
  }
  if (username) {
    query += `&user=${username}`;
  }
  if (category) {
    query += `&category=${category}`;
  }
  if (price) {
    query +=
      price[0] === 0 && price[1] === 600
        ? ''
        : `&price=${price[0]}-${price[1]}`;
  }
  if (limit) {
    query += `&limit=${limit}`;
  }
  if (skip) {
    query += `&skip=${skip}`;
  }
  if (sort) {
    query += `&sort=${sort}`;
  }
  return client.get(`/api/v1/courses${query}`);
};

// Get course detail
export const getCourse = (courseSlug) => {
  return client.get(`/api/v1/courses/${courseSlug}`);
};

// Post a new course
export const postCourse = async (courseDetails) => {
  return client.post('/api/v1/courses/', courseDetails);
};

// Edit an existing course
export const editCourse = async (newCourseDetails) => {
  return client.put('/api/v1/courses/', newCourseDetails);
};

// Get categories
export const getCategoriesApiCall = () => {
  return client.get('/api/v1/categories');
};

// Filter coures
export const filterCourses = (text) => {
  return client.get(`/api/v1/courses?title=${text}`);
};

//Mark as fav
export const addFav = (course) => {
  return client.post(`/api/v1/aboutme/newfav/${course}`);
};

//Mark as unfav
export const removeFav = (course) => {
  return client.post(`/api/v1/aboutme/removefav/${course}`);
};

export const userCourses = (userId, setData) => {
  return client
    .get(`/api/v1/user/${userId}`)
    .then((data) => setData(data.courses));
};
