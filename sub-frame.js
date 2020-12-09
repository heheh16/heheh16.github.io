function hashSetStorage() {
    console.log("STEP 3");
    getFinger().then(function (advanced_finger) {
    });
}

var hashPlace = document.getElementById(ELEMENT_FOR_HASH);
var btn = document.getElementById('test');

function ready(fn) {
    console.log("STEP 0");
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        window.indexedDB = undefined;
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function init() {
    try {
        console.log("STEP 2");
        if (window.indexedDB !== undefined) {
            var dbInit = window.indexedDB.open("FingerDB", VERSION);
            dbInit.onupgradeneeded = function (event) {
                var db = event.target.result;
                var fingerObjectStore = db.objectStoreNames.contains(VERSION + '_fingerStore') || db.createObjectStore(VERSION + '_fingerStore', {keyPath: "script"});
            };
        }
    } catch (e) {
        console.log('AAAAAAAAAAAAA', e)
    } finally {
        console.log("OOOOOOOOOOOOOOOOO");
        btn.addEventListener('click', hashSetStorage);
        var fingers = {
            localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
            sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
        };
        loadFromIndexedDB(VERSION + '_fingerStore', 'advanced').then(function (indexdb_data) {
            console.log("STEP LAST");
            fingers['indexedDB'] = indexdb_data !== null ? indexdb_data[0] : null;
            var hashPlaceData = fingers.indexedDB || fingers.localStorage || fingers.sessionStorage || 'No hash';
            btn.click()
        })
    }
}

function onReady() {
    console.log("STEP 1");
    init();
}

ready(onReady);

