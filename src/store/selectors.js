export const getAuth = (state) => state.auth;

export const getIsLogged = (state) => state.auth.isLogged;

export const getUi = (state) => state.ui;

export const getCourseDetail = (state, courseSlug) =>
  state.courses.data.find((item) => item.slug === courseSlug);

export const getUI = (state) => state.ui;

export const getCategories = (state) => state.categories.data;

export const getLevels = (state) => state.levels.data;

export const getUsername = (state) => state.auth.username;

export const getAvatar = (state) => state.auth.avatar;

export const getFilters = (state) => state.courses.filters;

export const getCart = (state) => state.auth.cart;

export const totalInChart = (state) => {
  let total = 0;
  state.auth.cart.forEach((element) => {
    total += element.coursePrice;
  });
  return total;
};

export const isInCart = (state) => (item) => {
  const inCart = state.auth.cart.filter((id) => {
    return id.courseId === item;
  });

  return inCart.length > 0;
};

export const getIdsInCart = (state) => {
  const ids = state.auth.cart.map((item) => {
    return item.courseId;
  });
  return ids;
};
