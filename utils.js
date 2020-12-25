function saveHashToIndexDB(finger, script) {
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
        finger: finger,
      };
      var fingerObjectStore = db
        .transaction(VERSION + "_fingerStore", "readwrite")
        .objectStore(VERSION + "_fingerStore");
      var getRequest = fingerObjectStore.get("advanced");
      getRequest.onsuccess = (_) => {
        try {
          if (!obj) {
            fingerObjectStore.put(finger_data);
          } else {
            var obj = getRequest.result;
            obj.finger = finger;
            fingerObjectStore.put(obj);
          }
        } catch (e) {
          debugPrint(function () {
            console.error(e);
          });
        }
      };
    };
  } catch (e) {
    debugPrint(function () {
      console.error(e);
    });
  }
}

function setFingerToStorage(finger, script) {
  return new Promise(function (resolve) {
    localStorage.setItem(VERSION + "_finger_" + script, finger);
    sessionStorage.setItem(VERSION + "_finger_" + script, finger);
    document.cookie = Cookies.set(VERSION + "_finger_" + script, finger, {
      SameSite: "None",
    });
    saveHashToIndexDB(finger, script);
    debugPrint(function () {
      console.log("9. HASH SAVED TO STORAGES");
    });
    resolve(null);
  });
}

function loadFromIndexedDB() {
  return new Promise(function (resolve) {
    try {
      var dbRequest = window.indexedDB.open("FingerDB", VERSION);
      dbRequest.onerror = function (event) {
        resolve(null);
      };
      dbRequest.onsuccess = function (event) {
        var db = event.target.result;
        try {
          var fingerObjectStore = db
            .transaction(VERSION + "_fingerStore", "readwrite")
            .objectStore(VERSION + "_fingerStore");
          var objectRequest = fingerObjectStore.get("advanced");
          objectRequest.onsuccess = function (event) {
            if (objectRequest.result !== undefined) {
              resolve(objectRequest.result.finger);
            } else resolve(null);
          };
        } catch (e) {
          debugPrint(function () {
            console.error(e);
          });
          resolve(null);
        }
      };
    } catch (e) {
      debugPrint(function () {
        console.error(e);
      });
      resolve(null);
    }
  });
}

function sendToServerGen(data, prevId) {
  debugPrint(function () {
    console.log("6. DATA SEND TO GENERATE HASH");
  });
  var xhr = new XMLHttpRequest();
  var body = JSON.stringify(data);
  xhr.open("POST", SERVER_GEN, true);
  xhr.setRequestHeader("Device_id", prevId);
  xhr.setRequestHeader("Content-Type", "application/json");
  return new Promise(function (resolve) {
    xhr.send(body);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          resolve(this.response);
        }
      }
    };
  });
}

function sendDataToClientServ(fp_data) {
  var xhr = new XMLHttpRequest();
  var body = "json=" + JSON.stringify(fp_data);
  xhr.open("POST", SERVER_DATA_TO, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(body);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        debugPrint(function () {
          console.log("8. HASH SENT TO CLIENT");
        });
      }
    }
  };
}

function debugPrint(messageFunction) {
  if (DEBUG) {
    messageFunction();
  }
}

function sendDataToServ(components) {
  debugPrint(function () {
    console.log("AVAILABLE BROWSE DATA:");
    console.log(components);
  });
  return new Promise(function (resolve) {
    var fingers = {
      localStorage: localStorage.getItem(VERSION + "_finger_advanced"),
      sessionStorage: sessionStorage.getItem(VERSION + "_finger_advanced"),
      cookies: Cookies.get(VERSION + "finger_advanced"),
    };
    loadFromIndexedDB(VERSION + "_fingerStore", "advanced").then(function (
      indexdb_data
    ) {
      fingers["indexedDB"] = indexdb_data !== null ? indexdb_data : null;
      var permissions =
        components.find((item) => item.key === "permissions").value || [];
      getGrantedData(permissions).then(function (data) {
        debugPrint(function () {
          console.log("5. DATA COLLECTED FROM GRANTS");
          console.log("DATA FROM GRANTS:");
          console.log(data);
        });
        var geolocation = data.geolocation;
        var browser_data = {};
        components.map(function (component, index) {
          var value = component.value;
          browser_data[index + 1] = value;
        });
        var prevId =
          fingers.localStorage ||
          fingers.sessionStorage ||
          fingers.cookies ||
          fingers.indexedDB ||
          null;
        var request_obj = {
          browser_data: browser_data,
          id: prevId,
          geo: geolocation,
        };
        debugPrint(function () {
          console.log("BODY FOR HASH GENERATION:");
          console.log(request_obj);
        });
        sendToServerGen(request_obj, prevId).then(function (fp) {
          hashPlace.innerHTML = fp;
          debugPrint(function () {
            console.log("7. HASH RETURNED AS RESPONSE");
            console.log("HASH: ", fp);
          });
          sendDataToClientServ({ device_id: fp });
          resolve(fp);
        });
      });
    });
  });
}
