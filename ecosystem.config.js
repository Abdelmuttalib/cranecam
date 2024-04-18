export const apps = [
  {
    name: `cranecam`,
    script: "serve",
    env: {
      PM2_SERVE_PATH: "./dist",
      PM2_SERVE_PORT: 8088,
      PM2_SERVE_SPA: "true",
      VITE_BASE_API_URL: "http://47.97.51.98:6093/api",
      NODE_ENV: "production",
    },
  },
];
