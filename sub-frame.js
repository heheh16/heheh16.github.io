Cookies.defaults = {
    expires: 365,
    path: '',
    domain: window.location.hostname.split('.').slice(-2).join('.'),
};

hashSetStorage = async () => {
    const advanced_finger = await getFinger(true);
    hashPlace.innerHTML = advanced_finger
};
hashSetStorageUnsupported = async () => {
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

function storageAccessAPISupported() {
    return (
        'hasStorageAccess' in document &&
        'requestStorageAccess' in document
    );
}

function accessStorage(fn) {
    document.hasStorageAccess()
        .then(function (hasAccess) {
            if (hasAccess) {
                console.info('Storage API Access already granted');
                fn();
                return;
            }

            console.info('no existing Storage API Access ...');
            console.info('requesting Storage API Access ...');

            document.requestStorageAccess()
                .then(function () {
                    console.info('Storage API Access granted.');
                    fn();
                    return;
                }, function () {
                    console.warn('Storage API Access denied.');
                });
        }, function (reason) {
            console.warn('something went wrong ...');
            console.log(reason);
        });
}

function init() {
    var data = Cookies.get('finger_advanced') || 'No hash';
    var updateEvent = new CustomEvent('hashPlace:updated', {
        bubbles: true,
        cancelable: false,
        detail: {
            hashPlace: data,
        },
    });
    hashPlace.dispatchEvent(updateEvent);
    hashPlace.innerHTML = data;
    btn.click()
}

function attachEventHandlers() {
    if (!storageAccessAPISupported()) {
        btn.addEventListener('click', hashSetStorageUnsupported);
    } else {
        btn.addEventListener('click', accessStorage.bind(null, hashSetStorage));
    }
}

function onReady() {
    console.log('READY');
    attachEventHandlers();
    init();
}

ready(onReady);

