function saveToIndexDB(finger, script) {
    try {
        if (!window.indexedDB) {
            return;
        }

        var request = window.indexedDB.open("FingerDB", VERSION);

        request.onerror = function (event) {};

        request.onsuccess = function (event) {
            var db = event.target.result;
            var finger_data = {
                script: script,
                finger: finger
            };
            var fingerObjectStore = db.transaction(VERSION + '_fingerStore', "readwrite").objectStore(VERSION + '_fingerStore');
            fingerObjectStore.put(finger_data);
        };
    } catch (e) {}
}

function setFingerToStorage(finger, script) {
    localStorage.setItem(VERSION + '_finger_${script}', finger);
    sessionStorage.setItem(VERSION + "_finger_" + script, finger);
    document.cookie = Cookies.set(VERSION + "_finger_" + script, finger, {
        SameSite: 'None'
    });
    saveToIndexDB(finger, script);
}

function loadFromIndexedDB() {
    return new Promise(function (resolve, reject) {
        try {
            var dbRequest = window.indexedDB.open("FingerDB", VERSION);

            dbRequest.onerror = function (event) {
                resolve(null);
            };

            dbRequest.onsuccess = function (event) {
                var db = event.target.result;

                try {
                    var fingerObjectStore = db.transaction(VERSION + "_fingerStore", "readwrite").objectStore(VERSION + "_fingerStore");
                    var objectRequest = fingerObjectStore.get('advanced');

                    objectRequest.onsuccess = function (event) {
                        if (objectRequest.result) resolve(objectRequest.result.finger);else resolve(null);
                    };
                } catch (e) {
                    resolve(null);
                }
            };
        } catch (e) {
            resolve(null);
        }
    });
}

sendDataToServ = async function sendDataToServ(fingerprint, script, components) {
    var uuid = function uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    };

    var browserData = {
        'userAgent': components[0].value,
        'webglVendorAndRenderer': components[24].value,
        'appVersion': components[31].value,
        'hash': fingerprint
    };
    var fingers = {
        localStorage: localStorage.getItem('finger_advanced'),
        sessionStorage: sessionStorage.getItem('finger_advanced'),
        indexedDB: await loadFromIndexedDB('fingerStore', 'advanced'),
        cookies: Cookies.get('finger_advanced')
    };
    var request_obj = {
        "sid": uuid(),
        "old_fingerprint_localstorage": fingers.localStorage || null,
        "old_fingerprint_sessionstorage": fingers.sessionStorage || null,
        "old_fingerprint_indexdb": fingers.indexedDB || null,
        "old_fingerprint_cookies": fingers.cookies || null,
        "current_fingerprint": fingerprint,
        "browser_data": browserData
    };
    // await fetch(SERVER, {
    //     method: 'POST',
    //     // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(request_obj) // body data type must match "Content-Type" header
    //
    // });
};