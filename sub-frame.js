function hashSetStorage() {
    getFinger().then(function (advanced_finger) {
    });
}

var hashPlace = document.getElementById(ELEMENT_FOR_HASH);
var btn = document.getElementById('test');

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        window.indexedDB = undefined;
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function init() {
    try {
        if(window.indexedDB !== undefined) {
            var dbInit = window.indexedDB.open("FingerDB", VERSION);
            dbInit.onupgradeneeded = function (event) {
                var db = event.target.result;
                var fingerObjectStore = db.objectStoreNames.contains(VERSION + '_fingerStore') || db.createObjectStore(VERSION + '_fingerStore', {keyPath: "script"});
                var sidObjectStore = db.objectStoreNames.contains(VERSION + '_fingerStore_sid') || db.createObjectStore(VERSION + '_fingerStore_sid', {keyPath: "script"});
            };
        }
    } catch (e) {
    } finally {
        btn.addEventListener('click', hashSetStorage);
        var fingers = {
            localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
            sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
        };
        loadFromIndexedDB(VERSION + '_fingerStore', 'advanced').then(function (indexdb_data) {
            fingers['indexedDB'] = indexdb_data !== null ? indexdb_data[0] : null;
            var hashPlaceData = fingers.indexedDB || fingers.localStorage || fingers.sessionStorage || 'No hash';
            btn.click()
        })
    }
}

function onReady() {
    var suite = new Benchmark.Suite;

    // add tests
    suite.add('String#indexOf', function() {
            'Hello World!'.indexOf('o') > -1;
        })
        .on('complete', function() {
            console.log('BBBBBBBBBBBBBB', this[0]);
            console.log('BBBBBBBBBBBBBB', JSON.parse(localStorage.getItem('bench')));
            document.querySelector('#benchData').innerHTML = `Now: ${JSON.stringify(this[0])}; Prev: ${localStorage.getItem('bench')}`;
            localStorage.setItem('bench', JSON.stringify(this[0]))
        })
        // run async
        .run({ 'async': true });
    init();
}



ready(onReady);

