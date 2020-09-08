function saveToIndexDB(finger, script) {
    try {
        if (!window.indexedDB) {
            return
        }
        var request = window.indexedDB.open("FingerDB", VERSION);

        request.onerror = function (event) {
        };
        request.onsuccess = function (event) {
            var db = event.target.result;
            var finger_data = {
                script: script,
                finger: finger
            };
            var fingerObjectStore = db.transaction(VERSION + '_fingerStore', "readwrite").objectStore(VERSION + '_fingerStore');
            fingerObjectStore.put(finger_data);
        };
    } catch (e) {

    }
}

function setFingerToStorage(finger, script, components) {
    return new Promise(
        function (resolve, reject) {
            localStorage.setItem(VERSION + '_finger_' + script, finger);
            localStorage.setItem(VERSION + '_finger_components_' + script, JSON.stringify(components));
            sessionStorage.setItem(VERSION + '_finger_' + script, finger);
            document.cookie = Cookies.set(VERSION + '_finger_' + script, finger, {SameSite: 'None'});
            saveToIndexDB(finger, script);
            resolve(null)
        })
}


function loadFromIndexedDB() {
    return new Promise(
        function (resolve, reject) {
            try {
                var dbRequest = window.indexedDB.open("FingerDB", VERSION);
                dbRequest.onerror = function (event) {
                    resolve(null);
                };
                dbRequest.onsuccess = function (event) {
                    var db = event.target.result;
                    try {
                        var fingerObjectStore = db.transaction(VERSION + '_fingerStore', "readwrite").objectStore(VERSION + '_fingerStore');
                        var objectRequest = fingerObjectStore.get('advanced');
                        objectRequest.onsuccess = function (event) {
                            if (objectRequest.result) resolve(objectRequest.result.finger);
                            else resolve(null);
                        };
                    } catch (e) {
                        resolve(null)
                    }
                };
            } catch (e) {
                resolve(null)
            }
        }
    );
}

function checkElementsEquality(val1, val2) {
    if (Array.isArray(val1) && Array.isArray(val2)) {
        for (let i = 0; i < val2.length; i++) {
            if (Array.isArray(val1[i]) && Array.isArray(val2[i])) {
                for (let j = 0; j < val2[i].length; j++) {
                    if (Array.isArray(val1[i][j]) && Array.isArray(val2[i][j])) {
                        for (let t = 0; t < val2[i][j].length; t++) {
                            if (Array.isArray(val1[i][j][t]) && Array.isArray(val2[i][j][t])) {
                                for (let q = 0; q < val2[i][j][t].length; q++) {
                                    if (val1[i][j][t][q] !== val2[i][j][t][q]) {
                                        return false
                                    }
                                }
                            } else {
                                if (val1[i][j][t] !== val2[i][j][t]) {
                                    return false
                            }
                            }
                        }
                    } else {
                        if (val1[i][j] !== val2[i][j]) {
                            return false
                        }
                    }
                }
            } else {
                if (val1[i] !== val2[i]) {
                    return false
                }
            }
        }
    } else if (Array.isArray(val1) === false && Array.isArray(val2) === false) {
        var keys = Object.keys(val2);
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (val1[key] !== val2[key]) {
                return false
            }
        }
    } else if (typeof (val1) === "string" && typeof (val2) === "string") {
        return val1 === val2
    } else if (typeof (val1) === "number" && typeof (val2) === "number") {
        return val1 === val2
    } else {
        return val1 === val2
    }
}

function sendDataToServ(fingerprint, script, components) {
    return new Promise(
        function (resolve, reject) {
            var uuid = function uuid() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
                    return (
                        c ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
                    ).toString(16);
                });
            };

            var browserData = {
                'hash': fingerprint,
                'changes': 'No changes'
            };
            var fingers = {
                localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
                sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
                cookies: Cookies.get('finger_advanced')
            };
            loadFromIndexedDB(VERSION + '_fingerStore', 'advanced').then(function (indexdb_finger) {
                fingers['indexedDB'] = indexdb_finger;
                var request_obj = {
                    "sid": uuid(),
                    "old_fingerprint_localstorage": fingers.localStorage || null,
                    "old_fingerprint_sessionstorage": fingers.sessionStorage || null,
                    "old_fingerprint_indexdb": fingers.indexedDB || null,
                    "old_fingerprint_cookies": fingers.cookies || null,
                    "current_fingerprint": fingerprint,
                    "browser_data": browserData
                };

                if (fingerprint !== request_obj.old_fingerprint_localstorage) {
                    var prev_components = JSON.parse(localStorage.getItem(VERSION + '_finger_components_' + script));
                    var changes = [];
                    for (let i = 0; i < components.length; i++) {
                        var prev_comp_item = prev_components[i];
                        var current_comp_item = components[i];
                        var equality = checkElementsEquality(prev_comp_item.value, current_comp_item.value);
                        if (equality === false) {
                            changes.push(current_comp_item.key.toUpperCase() + ': ' + current_comp_item.value);
                        }
                    }
                    if(changes.length > 0) {
                        request_obj['browser_data']['changes'] = changes.join('----------')
                    }
                }

                console.log(request_obj);
                fetch(SERVER, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request_obj)
                });
                resolve(null)
            })
        })

}

