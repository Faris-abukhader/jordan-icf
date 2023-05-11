// next.config.js
module.exports = {
    images: {
      domains: ['user-images.githubusercontent.com','github.com'],
    },
    env:{
      PUBLIC_SECRET:process.env.PUBLIC_SECRET
    }
  }
  