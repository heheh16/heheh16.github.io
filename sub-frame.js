hashSetStorage = async () => {
    const advanced_finger = await getFinger();
    hashPlace.innerHTML = advanced_finger
};

const hashPlace = document.getElementById(ELEMENT_FOR_HASH);
const btn = document.getElementById('test');

ready = (fn) => {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

init = async () => {
    try {
        const dbInit = window.indexedDB.open("FingerDB", VERSION);
        dbInit.onupgradeneeded = function (event) {
            const db = event.target.result;
            const fingerObjectStore = db.objectStoreNames.contains(`${VERSION}_fingerStore`) || db.createObjectStore(`${VERSION}_fingerStore`, {keyPath: "script"});
        };
    } catch (e) {
        console.error(e)
    } finally {
        btn.addEventListener('click', hashSetStorage);
        let fingers = {
            localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
            sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
            indexedDB: await loadFromIndexedDB('fingerStore', 'advanced')
        };
        const hashPlaceData = fingers.indexedDB || fingers.localStorage || fingers.sessionStorage || 'No hash';
        hashPlace.innerHTML = hashPlaceData;
        btn.click()
    }
};

function onReady() {
    init();
}

ready(onReady);

