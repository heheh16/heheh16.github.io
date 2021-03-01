self.addEventListener("install", function (event) {
  console.log("AAAAAAAAAAAAAAAAAAAAAA");
  event.waitUntil(
    caches.open("v2").then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});

addEventListener("fetch", (event) => {
  event.waitUntil(
    (async function () {
      // Exit early if we don't have access to the client.
      // Eg, if it's cross-origin.
      if (!event.clientId) return;

      // Get the client.
      const client = await clients.get(event.clientId);
      // Exit early if we don't get the client.
      // Eg, if it closed.
      if (!client) return;

      // Send a message to the client.
      console.log("TTTTTTTTTTTTTTTT", event.request);
      client.postMessage({
        msg: "Hey I just got a fetch from you!",
        url: event.request.url,
      });
    })()
  );
});
