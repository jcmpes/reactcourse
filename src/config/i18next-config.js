import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lgn: 'en',
  fallbacking: 'en',
  resources: {
    en: {
      translation: {
        title: 'Welcome to CourseApp',
      },
    },
    es: {
      translation: {
        title: 'Bienvenido a CourseApp',
      },
    },
  },
});
