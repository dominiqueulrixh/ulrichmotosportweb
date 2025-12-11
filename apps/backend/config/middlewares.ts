export default ({ env }) => {
  const allowedOrigins = env.array(
    'CORS_ORIGIN',
    'http://localhost:5173,http://localhost:8081,http://localhost:1337,https://ulrich-motosport.ch,https://admin.ulrich-motosport.ch'
  );

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: allowedOrigins,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
