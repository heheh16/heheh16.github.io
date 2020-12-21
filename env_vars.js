function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)) {
        return decodeURIComponent(name[1]);
    }
}

var SERVER_GEN = 'https://door.semantiqo.com/id/';
var SERVER_DATA_TO = "https://sonar.semantiqo.com/i/cook/save.php?s=" + get('s');
var ELEMENT_FOR_HASH = 'a1';
var VERSION = 18;
