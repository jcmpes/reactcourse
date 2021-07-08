import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        title: 'CourseApp',
        welcome: 'Welcome to ',
        headline: 'We hope you survive the experience.',
        notFound: 'Not found page',
      },
    },
    es: {
      translation: {
        title: 'CourseApp',
        welcome: 'Bienvenido a ',
        headline: 'Esperamos que sobrevivas a la experiencia.',
        notFound: 'Página no encontrada',
      },
    },
  },
});
