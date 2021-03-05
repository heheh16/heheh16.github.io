let installDate, id;

const setData = new Promise((resolve, reject) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", installDate);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", id);
  const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    function (c) {
      return (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16);
    }
  );
  id = uuid;
  installDate = new Date().toUTCString();
  resolve(true);
});

self.addEventListener("install", function (event) {
  event.waitUntil(setData);
});

self.addEventListener("activate", function (event) {});

addEventListener("message", (event) => {
  event.source.postMessage(JSON.stringify({ SwDate: installDate, SwId: id }));
});
