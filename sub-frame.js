function hashSetStorage() {
  getFinger().then(function (advanced_finger) {});
}

var hashPlace = document.getElementById(ELEMENT_FOR_HASH);
var btn = document.getElementById("test");

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    window.indexedDB = undefined;
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function init() {
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((event) => {
        console.log("Service worker registered", event);
      });
    }

    saveCache = () => {
      emptyResp = new Response();
      newResp = new Response(emptyResp, {
        statusText: "CCCCCCCCCCCCCC",
      });

      console.log("AAAAAAAAAAAAA", newResp);
      caches.open("v1").then((cache) => {
        cache.put("/?sid", newResp).then(() => {
          console.log("Data cached");
        });
      });
    };

    getCache = () => {
      caches.open("v1").then((cache) => {
        cache.match("/?sid").then((sid) => {
          console.log(sid);
        });
      });
    };
    if (window.indexedDB !== undefined) {
      var dbInit = window.indexedDB.open("FingerDB", VERSION);
      dbInit.onupgradeneeded = function (event) {
        var db = event.target.result;
        var fingerObjectStore =
          db.objectStoreNames.contains(VERSION + "_fingerStore") ||
          db.createObjectStore(VERSION + "_fingerStore", { keyPath: "script" });
      };
    }
    btn.addEventListener("click", hashSetStorage);
  } catch (e) {
    console.error(e);
  } finally {
    if (!COOKIE_ENABLED) {
      btn.click();
    } else {
      var fingers = {
        localStorage: localStorage.getItem(VERSION + "_finger_advanced"),
        sessionStorage: sessionStorage.getItem(VERSION + "_finger_advanced"),
      };
      loadFromIndexedDB(VERSION + "_fingerStore", "advanced").then(function (
        indexdb_data
      ) {
        fingers["indexedDB"] = indexdb_data !== null ? indexdb_data : null;
        var hashPlaceData =
          fingers.indexedDB ||
          fingers.localStorage ||
          fingers.sessionStorage ||
          "No hash";
        btn.click();
      });
    }
  }
}

function onReady() {
  init();
}

ready(onReady);
