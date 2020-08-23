setFingerToStorage = (finger, script, storageAccessApi) => {
    localStorage.setItem(`finger_${script}`,finger);
};


sendDataToServ = async (fingerprint, script, storageAccessApi) => {
    let old_finger;
    old_finger = localStorage.getItem('finger_' + script) || null;
    const uuid =()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
    const request_obj = {
        "sid": uuid(),
        "old_fingerprint": old_finger,
        "current_fingerprint": fingerprint,
    };
    $.post(SERVER, request_obj);
};

