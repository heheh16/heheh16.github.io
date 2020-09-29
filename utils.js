function saveHashToIndexDB(finger, script) {
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

function saveSidToIndexDB(uuid, script) {
    try {
        if (!window.indexedDB) {
            return
        }
        var request = window.indexedDB.open("FingerDB", VERSION);

        request.onerror = function (event) {
        };
        request.onsuccess = function (event) {
            var db = event.target.result;
            var sidData = {
                script: script,
                sid: uuid
            };
            var sidObjectStore = db.transaction(VERSION + '_fingerStore_sid', "readwrite").objectStore(VERSION + '_fingerStore_sid');
            sidObjectStore.put(sidData);
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
            saveHashToIndexDB(finger, script);
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
                        var sidObjectStore = db.transaction(VERSION + '_fingerStore_sid', "readwrite").objectStore(VERSION + '_fingerStore_sid');
                        var objectRequest = fingerObjectStore.get('advanced');
                        var sidRequest = sidObjectStore.get('advanced');
                        objectRequest.onsuccess = function (event) {
                            sidRequest.onsuccess = function (event) {
                                if (objectRequest.result !== undefined) {
                                    resolve([objectRequest.result.finger, sidRequest.result !== undefined ? sidRequest.result.sid : null]);
                                } else resolve([null, null]);
                            }
                        };
                    } catch (e) {
                        resolve([null, null])
                    }
                };
            } catch (e) {
                resolve([null, null])
            }
        }
    );
}

function checkElementsEquality(val1, val2) {
    if (Array.isArray(val1) && Array.isArray(val2)) {
        for (var i = 0; i < val2.length; i++) {
            if (Array.isArray(val1[i]) && Array.isArray(val2[i])) {
                for (var j = 0; j < val2[i].length; j++) {
                    if (Array.isArray(val1[i][j]) && Array.isArray(val2[i][j])) {
                        for (var t = 0; t < val2[i][j].length; t++) {
                            if (Array.isArray(val1[i][j][t]) && Array.isArray(val2[i][j][t])) {
                                for (var q = 0; q < val2[i][j][t].length; q++) {
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
    } else if (typeof (val1) === "object" && typeof (val2) === "object") {
        var keys = Object.keys(val2);
        for (var i = 0; i < keys.length; i++) {
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


            var changesData = 'No changes';

            var fingers = {
                localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
                sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
                cookies: Cookies.get('finger_advanced')
            };
            loadFromIndexedDB(VERSION + '_fingerStore', 'advanced').then(function (indexdb_data) {
                fingers['indexedDB'] = indexdb_data !== null ? indexdb_data[0] : null;
                var indexDbSid = indexdb_data !== null ? indexdb_data[1] : null;
                var localStorageSid = localStorage.getItem(VERSION + '_finger_sid_' + script);
                var sessionStorageSid = sessionStorage.getItem(VERSION + '_finger_sid_' + script);
                var cookiesSid = Cookies.get(VERSION + '_finger_sid_' + script);
                var session_id = localStorageSid || sessionStorageSid || cookiesSid || indexDbSid;
                if (session_id === null) {
                    session_id = uuid();
                    localStorage.setItem(VERSION + '_finger_sid_' + script, session_id);
                    sessionStorage.setItem(VERSION + '_finger_sid_' + script, session_id);
                    document.cookie = Cookies.set(VERSION + '_finger_sid_' + script, session_id, {SameSite: 'None'});
                    saveSidToIndexDB(session_id, script);
                }

                var prev_components = localStorage.getItem(VERSION + '_finger_components_' + script);

                var firstString = ssdeep.digest(JSON.stringify(components));
                similarity = 100;
                var secondString = null;
                if (prev_components !== null) {
                    secondString = ssdeep.digest(prev_components);
                    var similarity = ssdeep.similarity(firstString, secondString);
                }

                var browser_data = [];

                components.map(function (component) {
                    var key = component.key;
                    var value = component.value;
                    if(typeof(value) === 'object') {
                        value = JSON.stringify(value)
                    }
                    browser_data.push(key+ ':' + value);
                });

                browser_data = browser_data.join('|||');




                var request_obj = {
                    "sid": session_id,
                    "browser_data": browser_data,
                };

                console.log(request_obj);

                var prevCompObj = JSON.parse(prev_components);
                if (fingerprint !== request_obj.old_fingerprint_localstorage && prevCompObj !== null) {
                    var changes = [];
                    for (var i = 0; i < components.length; i++) {
                        var prev_comp_item = prevCompObj[i];
                        var current_comp_item = components[i];
                        var equality = checkElementsEquality(prev_comp_item.value, current_comp_item.value);
                        if (equality === false) {
                            var change = current_comp_item.value;
                            if (typeof (change) === 'object') {
                                change = JSON.stringify(change)
                            }
                            changes.push(current_comp_item.key.toUpperCase() + ': ' + change + '/' + prev_comp_item.value);
                        }
                    }
                    if (changes.length > 0) {
                        changesData = changes.join('----------')
                    }
                }
                //request_obj["changes"] = changesData;

                fetch(SERVER_GEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request_obj)
                }).then(resp => {
                    hashPlace.innerHTML = resp;
                    fetch(SERVER_DATA_TO, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(resp)
                    });
                    resolve(null)
                });
            })
        })

}

