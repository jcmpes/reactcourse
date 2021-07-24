const nextTranslate = require('next-translate')

module.exports = {
  ...nextTranslate(),
  i18n: undefined,
  images: {
    domains: ['final-project-web-x.s3.amazonaws.com', 'localhost'],
    loader: "imgix",
    path: ""
  }
}