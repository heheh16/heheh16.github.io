function hashSetStorage() {
    getFinger().then(function (advanced_finger) {
        console.log('OOOOOOOOOO', advanced_finger)
        hashPlace.innerHTML = advanced_finger
    });
}

var hashPlace = document.getElementById(ELEMENT_FOR_HASH);
var btn = document.getElementById('test');

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function init() {
    try {
        var dbInit = window.indexedDB.open("FingerDB", VERSION);
        dbInit.onupgradeneeded = function (event) {
            var db = event.target.result;
            var fingerObjectStore = db.objectStoreNames.contains(VERSION + '_fingerStore') || db.createObjectStore(VERSION + '_fingerStore', {keyPath: "script"});
        };
    } catch (e) {
        console.error(e)
    } finally {
        btn.addEventListener('click', hashSetStorage);
        var fingers = {
            localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
            sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
            indexedDB: null //await loadFromIndexedDB(VERSION + '_fingerStore', 'advanced')
        };
        var hashPlaceData = fingers.indexedDB || fingers.localStorage || fingers.sessionStorage || 'No hash';
        hashPlace.innerHTML = hashPlaceData;
        btn.click()
    }
}

function onReady() {
    init();
}

ready(onReady);

