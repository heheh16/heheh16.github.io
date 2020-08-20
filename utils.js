setFingerToStorage = (finger, script, storageAccessApi) => {
    Cookies.set('finger_' + script, finger);
    var data = Cookies.get('finger_' + script) || '(none)';
    var updateEvent = new CustomEvent('uid:updated', {
        bubbles: true,
        cancelable: false,
        detail: {
            finger_advanced: data,
        },
    });
    hashPlace.dispatchEvent(updateEvent);
};


sendDataToServ = (fingerprint, script, destination, storageAccessApi) => {
    let old_finger;
    if (storageAccessApi) {
        old_finger = Cookies.get('finger_' + script) || null
    }
    const request_obj = {
        "sid": old_finger,
        "old_fingerprint": old_finger,
        "current_fingerprint": fingerprint,
    };
    console.log('SEND DATA', request_obj)
    // $.post(destination, request_obj);
};

