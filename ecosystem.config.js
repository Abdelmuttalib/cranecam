export const apps = [
  {
    name: `cranecam`,
    script: "serve",
    env: {
      PM2_SERVE_PATH: "./dist",
      PM2_SERVE_PORT: 8088,
      PM2_SERVE_SPA: "true",
      NODE_ENV: "production",
    },
  },
];
