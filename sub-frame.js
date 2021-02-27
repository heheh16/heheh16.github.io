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
