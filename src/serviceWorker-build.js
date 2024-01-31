const workboxBuild = require("workbox-build");

const buildSW = () => {
  // The build is expected to fail if the
  // sw install rules couldn't be generated.
  // Add a catch block to handle this scenario.
  return workboxBuild
    .injectManifest({
      swSrc: "src/serviceWorker-custom.js", // custom sw rule

      swDest: "build/sw.js", // sw output file (auto-generated

      globDirectory: "build",

      modifyURLPrefix: {
        "/": "/dashboard/",
        "": "/dashboard/",
      },

      globPatterns: [
        "**/*.{js,css,png,svg,jpg,jpeg,txt,json,woff,ttf,eot,ico}",
      ],

      maximumFileSizeToCacheInBytes: 5 * 1024 * 102 * 4,
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.info(`${count} files will be precached,
                  totaling ${size / (1024 * 1024)} MBs.`);
    });
};

buildSW();
