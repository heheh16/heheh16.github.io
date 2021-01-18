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
            var getRequest = fingerObjectStore.get("advanced");
            getRequest.onsuccess = function() {
                if (!obj) {
                    fingerObjectStore.put(finger_data);
                } else {
                    var obj = getRequest.result;
                    obj.finger = finger;
                    fingerObjectStore.put(obj);
                }
                
            };
        };
    } catch (e) {
    }
}

function setFingerToStorage(finger, script) {
    return new Promise(
        function (resolve) {
            if (COOKIE_ENABLED) {
                localStorage.setItem(VERSION + '_finger_' + script, finger);
                sessionStorage.setItem(VERSION + '_finger_' + script, finger);
                document.cookie = Cookies.set(VERSION + '_finger_' + script, finger, {SameSite: 'None'});
                saveHashToIndexDB(finger, script);
            }
            resolve(null)
        })
}


function loadFromIndexedDB() {
    return new Promise(
        function (resolve) {
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
                            if (objectRequest.result !== undefined) {
                                resolve(objectRequest.result.finger);
                            } else resolve(null);
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

function sendToServerGen(data, prevId) {
    var xhr = new XMLHttpRequest();
    var body = JSON.stringify(data);
    xhr.open("POST", SERVER_GEN, true);
    xhr.setRequestHeader('Device_id', prevId);
    xhr.setRequestHeader('Content-Type', 'application/json');
    return new Promise(function (resolve) {
        xhr.send(body);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    resolve(this.response);
                }
            }
        }
    });
}

function sendDataToClientServ(fp_data) {
    setTimeout(function () {
    var xhr = new XMLHttpRequest();
    var body = 'json=' + JSON.stringify(fp_data);

        xhr.open("POST", SERVER_DATA_TO  + "&fp=" + window.fp_pro, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
            }
        }
    }
    }, 1500);

}


function sendDataToServ(script, components) {
    return new Promise(
        function (resolve) {
            var browser_data = {};
            components.map(function (component, index) {
                var key = component.key;
                var value = component.value;
                browser_data[index+1] = value;
            });
            var request_obj = {
                "browser_data": browser_data,
                "id": null
            };
            if (COOKIE_ENABLED) {
                var fingers = {
                    localStorage: localStorage.getItem(VERSION + '_finger_advanced'),
                    sessionStorage: sessionStorage.getItem(VERSION + '_finger_advanced'),
                    cookies: Cookies.get('finger_advanced')
                };
                loadFromIndexedDB(VERSION + '_fingerStore', 'advanced').then(function (indexdb_data) {
                    fingers['indexedDB'] = indexdb_data !== null ? indexdb_data : null;
                    var prevId = fingers.localStorage || fingers.sessionStorage || fingers.cookies || fingers.indexedDB || null;
                    request_obj["id"] = prevId;
                    sendToServerGen(request_obj, prevId).then(function (fp) {
                        hashPlace.innerHTML = fp;
                        sendDataToClientServ({device_id: fp});
                        resolve(fp)
                    })
                })
            } else {
                sendToServerGen(request_obj, null).then(function (fp) {
                        hashPlace.innerHTML = fp;
                        sendDataToClientServ({device_id: fp});
                        resolve(fp)
                    })
            }
        })

}



