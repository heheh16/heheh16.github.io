function hashSetStorage() {
  debugPrint(function () {
    console.log("3.CALL GET FINGER FUNCTION");
  });
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
      debugPrint(function () {
        console.log("2.INDEX DB INITIALIZATION");
      });
      var dbInit = window.indexedDB.open("FingerDB", VERSION);
      dbInit.onupgradeneeded = function (event) {
        var db = event.target.result;
        var fingerObjectStore =
          db.objectStoreNames.contains(VERSION + "_fingerStore") ||
          db.createObjectStore(VERSION + "_fingerStore", { keyPath: "script" });
      };
    }
  } catch (e) {
    debugPrint(function () {
      console.error(e);
    });
  } finally {
    btn.addEventListener("click", hashSetStorage);
    var fingers = {
      localStorage: localStorage.getItem(VERSION + "_finger_advanced"),
      sessionStorage: sessionStorage.getItem(VERSION + "_finger_advanced"),
      cookies: Cookies.get(VERSION + "finger_advanced"),
    };
    loadFromIndexedDB(VERSION + "_fingerStore", "advanced").then(function (
      indexdb_data
    ) {
      fingers["indexedDB"] = indexdb_data !== null ? indexdb_data[0] : null;
      debugPrint(function () {
        console.log("3.HASHES FROM STORAGES:");
        console.log("INDEX DB:", fingers.indexedDB);
        console.log("LOCAL STORAGE:", fingers.localStorage);
        console.log("SESSION STORAGE:", fingers.sessionStorage);
        console.log("COOKIES:", fingers.cookies);
      });
      var hashPlaceData =
        fingers.indexedDB ||
        fingers.localStorage ||
        fingers.sessionStorage ||
        fingers.cookies ||
        "No hash";
      btn.click();
    });
  }
}

function onReady() {
  debugPrint(function () {
    console.log("1.APP STARTED");
  });
  init();
}

ready(onReady);
