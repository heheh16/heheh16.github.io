saveToIndexDB=(finger,script)=> {
    try {
        if (!window.indexedDB) {
            return
        }
        const request = window.indexedDB.open("FingerDB", 3);

        request.onerror = function(event) {
        };
        request.onsuccess = function(event) {
            const db = event.target.result;
            const finger_data = {
                script: script,
                finger: finger
            };
            const fingerObjectStore = db.transaction("fingerStore", "readwrite").objectStore("fingerStore");
            fingerObjectStore.put(finger_data);
        };
    }
    catch (e) {

    }
};

setFingerToStorage = (finger, script) => {
        localStorage.setItem(`finger_${script}`,finger);
        sessionStorage.setItem(`finger_${script}`,finger);
        document.cookie =  Cookies.set(`finger_${script}`, finger, {SameSite:'None'});
        saveToIndexDB(finger, script);
};



function loadFromIndexedDB(){
        return new Promise(
            function(resolve, reject) {
                try {
                    const dbRequest = window.indexedDB.open("FingerDB", 3);
                    dbRequest.onerror = function(event) {
                        resolve(null);
                    };
                    dbRequest.onsuccess = function(event) {
                        const db = event.target.result;
                        try {
                            const fingerObjectStore = db.transaction("fingerStore", "readwrite").objectStore("fingerStore");
                            const objectRequest = fingerObjectStore.get('advanced');
                            objectRequest.onsuccess = function(event) {
                                if (objectRequest.result) resolve(objectRequest.result.finger);
                                else resolve(null);
                            };
                        } catch (e) {
                            resolve(null)
                        }
                    };
                }
                catch (e) {
                    resolve(null)
                }
            }
        );
}

sendDataToServ = async (fingerprint, script, components) => {
    const uuid =()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
    let browserData = {
        'userAgent': components[0].value,
        'webglVendorAndRenderer': components[24].value,
        'appVersion': components[31].value,
        'hash': fingerprint
    };
    let fingers = {
        localStorage: localStorage.getItem('finger_advanced'),
        sessionStorage: sessionStorage.getItem('finger_advanced'),
        indexedDB: await loadFromIndexedDB('fingerStore', 'advanced'),
        cookies: Cookies.get('finger_advanced')
    };
    const request_obj = {
        "sid": uuid(),
        "old_fingerprint_localstorage": fingers.localStorage || null,
        "old_fingerprint_sessionstorage": fingers.sessionStorage || null,
        "old_fingerprint_indexdb": fingers.indexedDB || null,
        "old_fingerprint_cookies": fingers.cookies || null,
        "current_fingerprint": fingerprint,
        "browser_data": browserData
    };
    console.log(request_obj);
    $.post(SERVER, request_obj);
};

