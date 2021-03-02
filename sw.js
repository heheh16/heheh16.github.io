// let duplicateRequest = false;
// self.addEventListener("install", function (event) {
//   console.log("AAAAAAAAAAAAAAAAAAAAAA");
//   event.waitUntil(
//     caches.open("v2").then(function (cache) {
//       return cache.addAll(["/"]);
//     })
//   );
// });

// addEventListener("fetch", (event) => {
//   event.waitUntil(
//     (async function () {
//       if (
//         event.request.url === "https://jsonplaceholder.typicode.com/todos/1" &&
//         duplicateRequest === false
//       ) {
//         duplicateRequest = true;
//         console.log("SEND REQUEST");
//       } else {
//         console.log("DUPLICATE");
//       }
// if (!event.clientId)
//   return;

// const client = await clients.get(event.clientId);

// if (!client) return;

// console.log("TTTTTTTTTTTTTTTT", event.request);
// console.log("JJJJJJJJJJJJJJJJJ", a);
// client.postMessage({
//   msg: "Hey I just got a fetch from you!",
//   url: event.request.url,
// });
//     })()
//   );
// });

self.addEventListener("install", (event) => {
  console.log("V1 installing…");

  // cache a cat SVG
  event.waitUntil(caches.open("static-v1").then((cache) => cache.add("/")));
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
});

addEventListener("message", async (event) => {
  // event is an ExtendableMessageEvent object
  console.log(`The client sent me a message: ${event.data}`);
  const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const result = await resp.json();
  event.source.postMessage(JSON.stringify(result));
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == "/dog.svg") {
    event.respondWith(caches.match("/cat.svg"));
  }
});
