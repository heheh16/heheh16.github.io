hashSetStorage= async () => {
    const advanced_finger = await getFinger(false);
    hashPlace.innerHTML = advanced_finger
};

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
    const data = localStorage.getItem('finger_advanced') || 'No hash';
    hashPlace.innerHTML = data;
    btn.addEventListener('click', hashSetStorage);
    btn.click()
}

function onReady() {
    init();
}

ready(onReady);

