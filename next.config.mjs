await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;