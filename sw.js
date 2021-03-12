let installDate;

const setData = new Promise((resolve, reject) => {
  installDate = new Date().toUTCString();
  resolve(true);
});

self.addEventListener("install", function (event) {
  event.waitUntil(setData);
});

self.addEventListener("activate", function (event) {});

addEventListener("message", (event) => {
  event.source.postMessage(JSON.stringify({ SwDate: installDate}));
});

