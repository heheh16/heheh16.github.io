var info = {};

function checkGeo() {
  return new Promise(function (resolve) {
    var lat, long;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log("TTTTTTTTTTTTTT");
      info["geolocation"] = {
        lat: lat,
        long: long,
      };
      resolve({
        key: "geolocation",
        value: {
          lat: lat,
          long: long,
        },
      });
    });
  });
}

var permissionsStatuses = {
  Granted: "granted",
  Prompt: "prompt",
};

var grantedAccessFuncs = {
  geolocation: checkGeo,
};

function getGrantedData(permissions) {
  console.log("YYYYYYYYYYYYYYYYY", Object.entries(permissions));
  return new Promise(function (resolve) {
    var promises = [];
    var grantedAccesses = [];
    Object.entries(permissions).forEach((permission) => {
      if (
        permission[1] === permissionsStatuses.Granted &&
        Object.keys(grantedAccessFuncs).includes(permission[0])
      ) {
        grantedAccesses.push(permission[0]);
      }
    });

    grantedAccesses.forEach(function (access) {
      promises.push(
        grantedAccessFuncs[access]().then(function (data) {
          info[data.key] = data.value;
        })
      );
    });
    Promise.all(promises).then(function () {
      resolve(info);
    });
  });
}
