setFingerToStorage = (finger, script, storageAccessApi) => {
    Cookies.set('finger_' + script, finger);
    var data ='(none)';
    var updateEvent = new CustomEvent('uid:updated', {
        bubbles: true,
        cancelable: false,
        detail: {
            finger_advanced: data,
        },
    });
    hashPlace.dispatchEvent(updateEvent);
};


sendDataToServ = async (fingerprint, script, storageAccessApi) => {
    let old_finger;
    old_finger = Cookies.get('finger_' + script) || null;
    const uuid =()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
    console.log(SERVER);
    const request_obj = {
        "sid": uuid(),
        "old_fingerprint": old_finger,
        "current_fingerprint": fingerprint,
    };
    console.log('SEND DATA', request_obj)
    // $.post(SERVER, request_obj);
};

