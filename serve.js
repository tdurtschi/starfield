const browserSync = require("browser-sync").create();
browserSync.init({
  server: true,
  files: ["./*.html", "./*.js"],
});
