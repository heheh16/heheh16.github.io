var forEach = function (array, callback) {
    if (Array.prototype.forEach && array.forEach === Array.prototype.forEach) {
        array.forEach(callback);
    } else {
        if (array.length === +array.length) {
            /** @type {number} */
            var i = 0;
            var length = array.length;
            for (; i < length; i++) {
                callback(array[i], i);
            }
        } else {
            var i;
            for (i in array) {
                if (array.hasOwnProperty(i)) {
                    callback(array[i], i);
                }
            }
        }
    }
};
var normalize = function (pos, size) {
    /** @type {!Array} */
    pos = [pos[0] >>> 16, 65535 & pos[0], pos[1] >>> 16, 65535 & pos[1]];
    /** @type {!Array} */
    size = [size[0] >>> 16, 65535 & size[0], size[1] >>> 16, 65535 & size[1]];
    /** @type {!Array} */
    var n = [0, 0, 0, 0];
    return n[3] += pos[3] + size[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += pos[2] + size[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += pos[1] + size[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += pos[0] + size[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]];
};
/**
 * @param {!Array} e
 * @param {!Array} v
 * @return {?}
 */
var add = function (e, v) {
    /** @type {!Array} */
    e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];
    /** @type {!Array} */
    v = [v[0] >>> 16, 65535 & v[0], v[1] >>> 16, 65535 & v[1]];
    /** @type {!Array} */
    var n = [0, 0, 0, 0];
    return n[3] += e[3] * v[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * v[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += e[3] * v[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * v[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[2] * v[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * v[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] * v[3] + e[1] * v[2] + e[2] * v[1] + e[3] * v[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]];
};
/**
 * @param {!Object} m
 * @param {number} n
 * @return {?}
 */
var walk = function (m, n) {
    return 32 === (n = n % 64) ? [m[1], m[0]] : n < 32 ? [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n] : (n = n - 32, [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n]);
};
/**
 * @param {?} m
 * @param {number} n
 * @return {?}
 */
var merge = function (m, n) {
    return 0 === (n = n % 64) ? m : n < 32 ? [m[0] << n | m[1] >>> 32 - n, m[1] << n] : [m[1] << n - 32, 0];
};
/**
 * @param {!Array} ast
 * @param {!Array} fn
 * @return {?}
 */
var get = function (ast, fn) {
    return [ast[0] ^ fn[0], ast[1] ^ fn[1]];
};
/**
 * @param {!Array} value
 * @return {?}
 */
var table = function (value) {
    return value = get(value, [0, value[0] >>> 1]), value = add(value, [4283543511, 3981806797]), value = get(value, [0, value[0] >>> 1]), value = add(value, [3301882366, 444984403]), value = get(value, [0, value[0] >>> 1]);
};

(function () {
    !function (e, t, a) {
        "use strict";
        "undefined" != typeof window && "function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && module.exports ? module.exports = a() : t.exports ? t.exports = a() : t.AdvancedFingerprint = a()
    }(0, this, function () {
        "use strict";
        var d = function (e, t) {
                e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                var a = [0, 0, 0, 0];
                return a[3] += e[3] + t[3], a[2] += a[3] >>> 16, a[3] &= 65535, a[2] += e[2] + t[2], a[1] += a[2] >>> 16, a[2] &= 65535, a[1] += e[1] + t[1], a[0] += a[1] >>> 16, a[1] &= 65535, a[0] += e[0] + t[0], a[0] &= 65535, [a[0] << 16 | a[1], a[2] << 16 | a[3]]
            },
            g = function (e, t) {
                e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                var a = [0, 0, 0, 0];
                return a[3] += e[3] * t[3], a[2] += a[3] >>> 16, a[3] &= 65535, a[2] += e[2] * t[3], a[1] += a[2] >>> 16, a[2] &= 65535, a[2] += e[3] * t[2], a[1] += a[2] >>> 16, a[2] &= 65535, a[1] += e[1] * t[3], a[0] += a[1] >>> 16, a[1] &= 65535, a[1] += e[2] * t[2], a[0] += a[1] >>> 16, a[1] &= 65535, a[1] += e[3] * t[1], a[0] += a[1] >>> 16, a[1] &= 65535, a[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], a[0] &= 65535, [a[0] << 16 | a[1], a[2] << 16 | a[3]]
            },
            f = function (e, t) {
                return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
            },
            h = function (e, t) {
                return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
            },
            m = function (e, t) {
                return [e[0] ^ t[0], e[1] ^ t[1]]
            },
            T = function (e) {
                return e = m(e, [0, e[0] >>> 1]), e = g(e, [4283543511, 3981806797]), e = m(e, [0, e[0] >>> 1]), e = g(e, [3301882366, 444984403]), e = m(e, [0, e[0] >>> 1])
            },
            l = function (e, t) {
                t = t || 0;
                for (var a = (e = e || "").length % 16, n = e.length - a, r = [0, t], i = [0, t], o = [0, 0], l = [0, 0], s = [2277735313, 289559509], c = [1291169091, 658871167], u = 0; u < n; u += 16) o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24], l = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24], o = g(o, s), o = f(o, 31), o = g(o, c), r = m(r, o), r = f(r, 27), r = d(r, i), r = d(g(r, [0, 5]), [0, 1390208809]), l = g(l, c), l = f(l, 33), l = g(l, s), i = m(i, l), i = f(i, 31), i = d(i, r), i = d(g(i, [0, 5]), [0, 944331445]);
                switch (o = [0, 0], l = [0, 0], a) {
                    case 15:
                        l = m(l, h([0, e.charCodeAt(u + 14)], 48));
                    case 14:
                        l = m(l, h([0, e.charCodeAt(u + 13)], 40));
                    case 13:
                        l = m(l, h([0, e.charCodeAt(u + 12)], 32));
                    case 12:
                        l = m(l, h([0, e.charCodeAt(u + 11)], 24));
                    case 11:
                        l = m(l, h([0, e.charCodeAt(u + 10)], 16));
                    case 10:
                        l = m(l, h([0, e.charCodeAt(u + 9)], 8));
                    case 9:
                        l = m(l, [0, e.charCodeAt(u + 8)]), l = g(l, c), l = f(l, 33), l = g(l, s), i = m(i, l);
                    case 8:
                        o = m(o, h([0, e.charCodeAt(u + 7)], 56));
                    case 7:
                        o = m(o, h([0, e.charCodeAt(u + 6)], 48));
                    case 6:
                        o = m(o, h([0, e.charCodeAt(u + 5)], 40));
                    case 5:
                        o = m(o, h([0, e.charCodeAt(u + 4)], 32));
                    case 4:
                        o = m(o, h([0, e.charCodeAt(u + 3)], 24));
                    case 3:
                        o = m(o, h([0, e.charCodeAt(u + 2)], 16));
                    case 2:
                        o = m(o, h([0, e.charCodeAt(u + 1)], 8));
                    case 1:
                        o = m(o, [0, e.charCodeAt(u)]), o = g(o, s), o = f(o, 31), o = g(o, c), r = m(r, o)
                }
                return r = m(r, [0, e.length]), i = m(i, [0, e.length]), r = d(r, i), i = d(i, r), r = T(r), i = T(i), r = d(r, i), i = d(i, r), ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8)
            },
            e = {
                preprocessor: null,
                audio: {
                    timeout: 1e3,
                    excludeIOS11: !0
                },
                fonts: {
                    swfContainerId: "advancedFingerprint",
                    swfPath: "flash/compiled/FontList.swf",
                    userDefinedFonts: [],
                    extendedJsFonts: !1
                },
                screen: {
                    detectScreenOrientation: !0
                },
                plugins: {
                    sortPluginsFor: [/palemoon/i],
                    excludeIE: !1
                },
                extraComponents: [],
                excludes: {
                    enumerateDevices: !0,
                    pixelRatio: !0,
                    doNotTrack: !0,
                    fontsFlash: !0
                },
                NOT_AVAILABLE: "not available",
                ERROR: "error",
                EXCLUDED: "excluded"
            },
            c = function (e, t) {
                if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) e.forEach(t);
                else if (e.length === +e.length)
                    for (var a = 0, n = e.length; a < n; a++) t(e[a], a, e);
                else
                    for (var r in e) e.hasOwnProperty(r) && t(e[r], r, e)
            },
            s = function (e, n) {
                var r = [];
                return null == e ? r : Array.prototype.map && e.map === Array.prototype.map ? e.map(n) : (c(e, function (e, t, a) {
                    r.push(n(e, t, a))
                }), r)
            },
            a = function () {
                return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
            },
            n = function (e) {
                var t = [window.screen.width, window.screen.height];
                return e.screen.detectScreenOrientation && t.sort().reverse(), t
            },
            r = function (e) {
                if (window.screen.availWidth && window.screen.availHeight) {
                    var t = [window.screen.availHeight, window.screen.availWidth];
                    return e.screen.detectScreenOrientation && t.sort().reverse(), t
                }
                return e.NOT_AVAILABLE
            },
            i = function (e) {
                if (null == navigator.plugins) return e.NOT_AVAILABLE;
                for (var t = [], a = 0, n = navigator.plugins.length; a < n; a++) navigator.plugins[a] && t.push(navigator.plugins[a]);
                return u(e) && (t = t.sort(function (e, t) {
                    return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
                })), s(t, function (e) {
                    var t = s(e, function (e) {
                        return [e.type, e.suffixes]
                    });
                    return [e.name, e.description, t]
                })
            },
            o = function (t) {
                var e = [];
                if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
                    e = s(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function (e) {
                        try {
                            return new window.ActiveXObject(e), e
                        } catch (e) {
                            return t.ERROR
                        }
                    })
                } else e.push(t.NOT_AVAILABLE);
                return navigator.plugins && (e = e.concat(i(t))), e
            },
            u = function (e) {
                for (var t = !1, a = 0, n = e.plugins.sortPluginsFor.length; a < n; a++) {
                    var r = e.plugins.sortPluginsFor[a];
                    if (navigator.userAgent.match(r)) {
                        t = !0;
                        break
                    }
                }
                return t
            },
            p = function (t) {
                try {
                    return !!window.sessionStorage
                } catch (e) {
                    return t.ERROR
                }
            },
            v = function (t) {
                try {
                    return !!window.localStorage
                } catch (e) {
                    return t.ERROR
                }
            },
            A = function (t) {
                try {
                    return !!window.indexedDB
                } catch (e) {
                    return t.ERROR
                }
            },
            S = function (e) {
                return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : e.NOT_AVAILABLE
            },
            C = function (e) {
                return navigator.cpuClass || e.NOT_AVAILABLE
            },
            getOscpu = function (e) {
                return navigator.oscpu || 'not available'
            },
            getJavaEnabled = function (e) {
                return navigator.javaEnabled()
            },
            getAppVersion = function (e) {
                return navigator.appVersion
            },
            getLanguages = function (e) {
                return navigator.languages
            },
            getVendor = function (e) {
                return navigator.vendor
            },
            getVendorSub = function (e) {
                return navigator.vendorSub
            },
            getPluginAvailable = function (e) {
                return void 0 !== navigator.plugins ? 1 : 0
            },
            getAudioFormats = function (e) {
                var audio;
                var audioFormats = ['audio/aac', 'audio/flac', 'audio/mpeg', 'audio/mp4; codecs="mp4a.40.2"',
                    'audio/ogg; codecs="flac"', 'audio/ogg; codecs="vorbis"', 'audio/ogg; codecs="opus"',
                    'audio/wav; codecs="1"', 'audio/webm; codecs="vorbis"', 'audio/webm; codecs="opus"'];
                var statuses = ['maybe', 'probably', ''];
                var audioValues = {};
                if (!audio) {
                    audio = document.createElement('audio')
                }
                audioFormats.map(function (audioFormat) {
                    var value = statuses.indexOf(audio.canPlayType(audioFormat));
                    var audioFormat = audioFormat.replace(/['"\s]+/g, '');
                    audioValues[audioFormat] = value;
                });
                return audioValues;
            },
            getVideoFormats = function (e) {
                var video;
                var videoFormats = ['video/mp4; codecs="flac"', 'video/ogg; codecs="theora"', 'video/ogg; codecs="opus"',
                    'video/webm; codecs="vp9, opus"', 'video/webm; codecs="vp8, vorbis"'];
                var statuses = ['maybe', 'probably', ''];
                var videoValues = {};
                if (!video) {
                    video = document.createElement('video')
                }
                videoFormats.map(function (videoFormat) {
                    var value = statuses.indexOf(video.canPlayType(videoFormat));
                    var videoFormat = videoFormat.replace(/['"\s]+/g, '');
                    videoValues[videoFormat] = value;
                });
                return videoValues;
            },
            getAudioParams = function (e) {
                var n = window.OfflineAudioContext || window.webkitOfflineAudioContext;

                var audioCtx = new n(1, 44100, 44100);

                var oscillator = audioCtx.createOscillator();
                var destination = audioCtx.destination;
                var gainNode = audioCtx.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                var audioParams = {
                    channelCount: oscillator.channelCount,
                    channelCountMode: oscillator.channelCountMode,
                    channelInterpretation: oscillator.channelInterpretation,
                    maxChannelCount: destination.maxChannelCount,
                    numberOfInputs: destination.numberOfInputs,
                    numberOfOutputs: destination.numberOfOutputs,
                    sampleRate: audioCtx.sampleRate,
                    state: audioCtx.state
                };

                return audioParams;
            },
            getMediaDevices = function (e) {
                return new Promise(
                    function (resolve, reject) {
                        var deviceValues = '';
                        navigator.mediaDevices.enumerateDevices()
                            .then(function (devices) {
                                devices.forEach(function (device) {
                                    deviceValues = device.kind + ':' + device.deviceId + ',' + device.label + ';';
                                    resolve(deviceValues);
                                });
                            }).catch(function (e) {
                                console.log('AAAAAAAAAAAAA', e)
                        });
                    })

            },
            getJa3Hash = function (e) {
                return new Promise(
                    function (resolve, reject) {
                        var ja3Hash = '';
                        fetch("https://ja3er.com/json")
                            .then(function (response) { response.json() })
                            .then(function (data) {
                                ja3Hash = resolve(data.ja3_hash)
                            })
                            .catch(function (e) {
                                console.log('AAAAAAAAAAAAA', e)
                            });
                    })
            },
            screenTop = function (e) {
                return window.screenTop
            },
            screenLeft = function (e) {
                return window.screenLeft
            },
            getMimeTypes = function (e) {
                var mimeTypes = [];
                for (var i = 0; i < navigator.mimeTypes.length; i++) {
                    var mt = navigator.mimeTypes[i];
                    mimeTypes.push([mt.description, mt.type, mt.suffixes].join("~~"));
                }
                return mimeTypes;
            },
            getMathConst = function (e) {
                function asinh(x) {
                    if (x === -Infinity) {
                        return x;
                    } else {
                        return Math.log(x + Math.sqrt(x * x + 1));
                    }
                }

                function acosh(x) {
                    return Math.log(x + Math.sqrt(x * x - 1));
                }

                function atanh(x) {
                    return Math.log((1 + x) / (1 - x)) / 2;
                }

                function cbrt(x) {
                    var y = Math.pow(Math.abs(x), 1 / 3);
                    return x < 0 ? -y : y;
                }

                function cosh(x) {
                    var y = Math.exp(x);
                    return (y + 1 / y) / 2;
                }

                function expm1(x) {
                    return Math.exp(x) - 1;
                }

                function log1p(x) {
                    return Math.log(1 + x);
                }

                function sinh(x) {
                    var y = Math.exp(x);
                    return (y - 1 / y) / 2;
                }

                function tanh(x) {
                    if (x === Infinity) {
                        return 1;
                    } else if (x === -Infinity) {
                        return -1;
                    } else {
                        var y = Math.exp(2 * x);
                        return (y - 1) / (y + 1);
                    }
                }

                return [
                    asinh(1),
                    (acosh(1e300) == "Infinity") ? "Infinity" : acosh(1e300),
                    atanh(0.5),
                    expm1(1),
                    cbrt(100),
                    log1p(10),
                    sinh(1),
                    cosh(10),
                    tanh(1)
                ];
            },
            getPermissions = function (e) {
                var permissions = ['accelerometer', 'camera ', 'clipboard-read', 'clipboard-write', 'geolocation',
                    'background-sync', 'magnetometer', 'microphone', 'midi',
                    'notifications', 'payment-handler', 'persistent-storage'];
                var permissionsValues = {};
                permissions.map(function (permission) {
                    navigator.permissions.query({name: permission}).then(function (result) {
                        permissionsValues[permission] = result.state
                    }).catch(function (e) {
                        console.log('AAAAAAAAAAAAA', e)
                    })

                });
                return permissionsValues
            },
            B = function (e) {
                return navigator.platform ? navigator.platform : e.NOT_AVAILABLE
            },
            w = function (e) {
                return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : e.NOT_AVAILABLE
            },
            t = function () {
                var t, e = 0;
                void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
                try {
                    document.createEvent("TouchEvent"), t = !0
                } catch (e) {
                    t = !1
                }
                return [e, t, "ontouchstart" in window]
            },
            load = function (canvasElement) {
                return function (text, a) {
                    a = a || 0;
                    /** @type {number} */
                    var n = (text = text || "").length % 16;
                    /** @type {number} */
                    var removeCount = text.length - n;
                    /** @type {!Array} */
                    var data = [0, a];
                    /** @type {!Array} */
                    var value = [0, a];
                    /** @type {!Array} */
                    var e = [0, 0];
                    /** @type {!Array} */
                    var c = [0, 0];
                    /** @type {!Array} */
                    var g = [2277735313, 289559509];
                    /** @type {!Array} */
                    var v = [1291169091, 658871167];
                    /** @type {number} */
                    var i = 0;
                    for (; i < removeCount; i = i + 16) {
                        /** @type {!Array} */
                        e = [255 & text.charCodeAt(i + 4) | (255 & text.charCodeAt(i + 5)) << 8 | (255 & text.charCodeAt(i + 6)) << 16 | (255 & text.charCodeAt(i + 7)) << 24, 255 & text.charCodeAt(i) | (255 & text.charCodeAt(i + 1)) << 8 | (255 & text.charCodeAt(i + 2)) << 16 | (255 & text.charCodeAt(i + 3)) << 24];
                        /** @type {!Array} */
                        c = [255 & text.charCodeAt(i + 12) | (255 & text.charCodeAt(i + 13)) << 8 | (255 & text.charCodeAt(i + 14)) << 16 | (255 & text.charCodeAt(i + 15)) << 24, 255 & text.charCodeAt(i + 8) | (255 & text.charCodeAt(i + 9)) << 8 | (255 & text.charCodeAt(i + 10)) << 16 | (255 & text.charCodeAt(i + 11)) << 24];
                        e = add(e, g);
                        e = walk(e, 31);
                        e = add(e, v);
                        data = get(data, e);
                        data = walk(data, 27);
                        data = normalize(data, value);
                        data = normalize(add(data, [0, 5]), [0, 1390208809]);
                        c = add(c, v);
                        c = walk(c, 33);
                        c = add(c, g);
                        value = get(value, c);
                        value = walk(value, 31);
                        value = normalize(value, data);
                        value = normalize(add(value, [0, 5]), [0, 944331445]);
                    }
                    switch (e = [0, 0], c = [0, 0], n) {
                        case 15:
                            c = get(c, merge([0, text.charCodeAt(i + 14)], 48));
                        case 14:
                            c = get(c, merge([0, text.charCodeAt(i + 13)], 40));
                        case 13:
                            c = get(c, merge([0, text.charCodeAt(i + 12)], 32));
                        case 12:
                            c = get(c, merge([0, text.charCodeAt(i + 11)], 24));
                        case 11:
                            c = get(c, merge([0, text.charCodeAt(i + 10)], 16));
                        case 10:
                            c = get(c, merge([0, text.charCodeAt(i + 9)], 8));
                        case 9:
                            c = get(c, [0, text.charCodeAt(i + 8)]);
                            c = add(c, v);
                            c = walk(c, 33);
                            c = add(c, g);
                            value = get(value, c);
                        case 8:
                            e = get(e, merge([0, text.charCodeAt(i + 7)], 56));
                        case 7:
                            e = get(e, merge([0, text.charCodeAt(i + 6)], 48));
                        case 6:
                            e = get(e, merge([0, text.charCodeAt(i + 5)], 40));
                        case 5:
                            e = get(e, merge([0, text.charCodeAt(i + 4)], 32));
                        case 4:
                            e = get(e, merge([0, text.charCodeAt(i + 3)], 24));
                        case 3:
                            e = get(e, merge([0, text.charCodeAt(i + 2)], 16));
                        case 2:
                            e = get(e, merge([0, text.charCodeAt(i + 1)], 8));
                        case 1:
                            e = get(e, [0, text.charCodeAt(i)]);
                            e = add(e, g);
                            e = walk(e, 31);
                            e = add(e, v);
                            data = get(data, e);
                    }
                    return data = get(data, [0, text.length]), value = get(value, [0, text.length]), data = normalize(data, value), value = normalize(value, data), data = table(data), value = table(value), data = normalize(data, value), value = normalize(value, data), ("00000000" + (data[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (data[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (value[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (value[1] >>> 0).toString(16)).slice(-8);
                }(canvasElement.toDataURL());
            },
            y = function (e) {
                var t = [],
                    canvasElement = document.createElement("canvas");
                canvasElement.width = 2e3, canvasElement.height = 200, canvasElement.style.display = "inline";
                var ctx = canvasElement.getContext("2d");
                var e = {
                    winding: false,
                    data: ""
                };
                return ctx && canvasElement.toDataURL ? (ctx.rect(0, 0, 10, 10), ctx.rect(2, 2, 6, 6), e.winding = false === ctx.isPointInPath(5, 5, "evenodd"), ctx.textBaseline = "alphabetic", ctx.fillStyle = "#f60", ctx.fillRect(125, 1, 62, 20), ctx.fillStyle = "#069", ctx.font = "11pt no-real-font-123", ctx.fillText("Cwm fjordbank \ud83d\ude03 gly", 2, 15), ctx.fillStyle = "rgba(102, 204, 0, 0.2)", ctx.font = "18pt Arial", ctx.fillText("Cwm fjordbank \ud83d\ude03 gly", 4, 45), ctx.globalCompositeOperation =
                    "multiply", ctx.fillStyle = "rgb(255,0,255)", ctx.beginPath(), ctx.arc(50, 50, 50, 0, 2 * Math.PI, true), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgb(0,255,255)", ctx.beginPath(), ctx.arc(100, 50, 50, 0, 2 * Math.PI, true), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgb(255,255,0)", ctx.beginPath(), ctx.arc(75, 100, 50, 0, 2 * Math.PI, true), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgb(255,0,255)", ctx.arc(75, 75, 75, 0, 2 * Math.PI, true), ctx.arc(75, 75, 25, 0, 2 * Math.PI, true),
                    ctx.fill("evenodd"), e.data = load(canvasElement), e) : e;
            },
            E = function () {
                var o, e = function (e) {
                    return o.clearColor(0, 0, 0, 1), o.enable(o.DEPTH_TEST), o.depthFunc(o.LEQUAL), o.clear(o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT), "[" + e[0] + ", " + e[1] + "]"
                };
                if (!(o = F())) return null;
                var l = [],
                    t = o.createBuffer();
                o.bindBuffer(o.ARRAY_BUFFER, t);
                var a = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                o.bufferData(o.ARRAY_BUFFER, a, o.STATIC_DRAW), t.itemSize = 3, t.numItems = 3;
                var n = o.createProgram(),
                    r = o.createShader(o.VERTEX_SHADER);
                o.shaderSource(r, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"), o.compileShader(r);
                var i = o.createShader(o.FRAGMENT_SHADER);
                o.shaderSource(i, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"), o.compileShader(i), o.attachShader(n, r), o.attachShader(n, i), o.linkProgram(n), o.useProgram(n), n.vertexPosAttrib = o.getAttribLocation(n, "attrVertex"), n.offsetUniform = o.getUniformLocation(n, "uniformOffset"), o.enableVertexAttribArray(n.vertexPosArray), o.vertexAttribPointer(n.vertexPosAttrib, t.itemSize, o.FLOAT, !1, 0, 0), o.uniform2f(n.offsetUniform, 1, 1), o.drawArrays(o.TRIANGLE_STRIP, 0, t.numItems);
                try {
                    l.push(o.canvas.toDataURL())
                } catch (e) {
                }
                l.push("extensions:" + (o.getSupportedExtensions() || []).join(";")), l.push("webgl aliased line width range:" + e(o.getParameter(o.ALIASED_LINE_WIDTH_RANGE))), l.push("webgl aliased point size range:" + e(o.getParameter(o.ALIASED_POINT_SIZE_RANGE))), l.push("webgl alpha bits:" + o.getParameter(o.ALPHA_BITS)), l.push("webgl antialiasing:" + (o.getContextAttributes().antialias ? "yes" : "no")), l.push("webgl blue bits:" + o.getParameter(o.BLUE_BITS)), l.push("webgl depth bits:" + o.getParameter(o.DEPTH_BITS)), l.push("webgl green bits:" + o.getParameter(o.GREEN_BITS)), l.push("webgl max anisotropy:" + function (e) {
                    var t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                    if (t) {
                        var a = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                        return 0 === a && (a = 2), a
                    }
                    return null
                }(o)), l.push("webgl max combined texture image units:" + o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), l.push("webgl max cube map texture size:" + o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE)), l.push("webgl max fragment uniform vectors:" + o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS)), l.push("webgl max render buffer size:" + o.getParameter(o.MAX_RENDERBUFFER_SIZE)), l.push("webgl max texture image units:" + o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS)), l.push("webgl max texture size:" + o.getParameter(o.MAX_TEXTURE_SIZE)), l.push("webgl max varying vectors:" + o.getParameter(o.MAX_VARYING_VECTORS)), l.push("webgl max vertex attribs:" + o.getParameter(o.MAX_VERTEX_ATTRIBS)), l.push("webgl max vertex texture image units:" + o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), l.push("webgl max vertex uniform vectors:" + o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS)), l.push("webgl max viewport dims:" + e(o.getParameter(o.MAX_VIEWPORT_DIMS))), l.push("webgl red bits:" + o.getParameter(o.RED_BITS)), l.push("webgl renderer:" + o.getParameter(o.RENDERER)), l.push("webgl shading language version:" + o.getParameter(o.SHADING_LANGUAGE_VERSION)), l.push("webgl stencil bits:" + o.getParameter(o.STENCIL_BITS)), l.push("webgl vendor:" + o.getParameter(o.VENDOR)), l.push("webgl version:" + o.getParameter(o.VERSION));
                try {
                    var s = o.getExtension("WEBGL_debug_renderer_info");
                    s && (l.push("webgl unmasked vendor:" + o.getParameter(s.UNMASKED_VENDOR_WEBGL)), l.push("webgl unmasked renderer:" + o.getParameter(s.UNMASKED_RENDERER_WEBGL)))
                } catch (e) {
                }
                return o.getShaderPrecisionFormat && c(["FLOAT", "INT"], function (i) {
                    c(["VERTEX", "FRAGMENT"], function (r) {
                        c(["HIGH", "MEDIUM", "LOW"], function (n) {
                            c(["precision", "rangeMin", "rangeMax"], function (e) {
                                var t = o.getShaderPrecisionFormat(o[r + "_SHADER"], o[n + "_" + i])[e];
                                "precision" !== e && (e = "precision " + e);
                                var a = ["webgl ", r.toLowerCase(), " shader ", n.toLowerCase(), " ", i.toLowerCase(), " ", e, ":", t].join("");
                                l.push(a)
                            })
                        })
                    })
                }), l
            },
            M = function () {
                try {
                    var e = F(),
                        t = e.getExtension("WEBGL_debug_renderer_info");
                    return e.getParameter(t.UNMASKED_VENDOR_WEBGL) + "~" + e.getParameter(t.UNMASKED_RENDERER_WEBGL)
                } catch (e) {
                    return null
                }
            },
            x = function () {
                var e = document.createElement("div");
                e.innerHTML = "&nbsp;";
                var t = !(e.className = "adsbox");
                try {
                    document.body.appendChild(e), t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e)
                } catch (e) {
                    t = !1
                }
                return t
            },
            O = function () {
                if (void 0 !== navigator.languages) try {
                    if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0
                } catch (e) {
                    return !0
                }
                return !1
            },
            b = function () {
                return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
            },
            P = function () {
                var e, t = navigator.userAgent.toLowerCase(),
                    a = navigator.oscpu,
                    n = navigator.platform.toLowerCase();
                if (e = 0 <= t.indexOf("windows phone") ? "Windows Phone" : 0 <= t.indexOf("win") ? "Windows" : 0 <= t.indexOf("android") ? "Android" : 0 <= t.indexOf("linux") || 0 <= t.indexOf("cros") ? "Linux" : 0 <= t.indexOf("iphone") || 0 <= t.indexOf("ipad") ? "iOS" : 0 <= t.indexOf("mac") ? "Mac" : "Other", ("ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return !0;
                if (void 0 !== a) {
                    if (0 <= (a = a.toLowerCase()).indexOf("win") && "Windows" !== e && "Windows Phone" !== e) return !0;
                    if (0 <= a.indexOf("linux") && "Linux" !== e && "Android" !== e) return !0;
                    if (0 <= a.indexOf("mac") && "Mac" !== e && "iOS" !== e) return !0;
                    if ((-1 === a.indexOf("win") && -1 === a.indexOf("linux") && -1 === a.indexOf("mac")) != ("Other" === e)) return !0
                }
                return 0 <= n.indexOf("win") && "Windows" !== e && "Windows Phone" !== e || ((0 <= n.indexOf("linux") || 0 <= n.indexOf("android") || 0 <= n.indexOf("pike")) && "Linux" !== e && "Android" !== e || ((0 <= n.indexOf("mac") || 0 <= n.indexOf("ipad") || 0 <= n.indexOf("ipod") || 0 <= n.indexOf("iphone")) && "Mac" !== e && "iOS" !== e || ((n.indexOf("win") < 0 && n.indexOf("linux") < 0 && n.indexOf("mac") < 0 && n.indexOf("iphone") < 0 && n.indexOf("ipad") < 0) !== ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e)))
            },
            L = function () {
                var e, t = navigator.userAgent.toLowerCase(),
                    a = navigator.productSub;
                if (("Chrome" === (e = 0 <= t.indexOf("firefox") ? "Firefox" : 0 <= t.indexOf("opera") || 0 <= t.indexOf("opr") ? "Opera" : 0 <= t.indexOf("chrome") ? "Chrome" : 0 <= t.indexOf("safari") ? "Safari" : 0 <= t.indexOf("trident") ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== a) return !0;
                var n, r = eval.toString().length;
                if (37 === r && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
                if (39 === r && "Internet Explorer" !== e && "Other" !== e) return !0;
                if (33 === r && "Chrome" !== e && "Opera" !== e && "Other" !== e) return !0;
                try {
                    throw "a"
                } catch (e) {
                    try {
                        e.toSource(), n = !0
                    } catch (e) {
                        n = !1
                    }
                }
                return n && "Firefox" !== e && "Other" !== e
            },
            I = function () {
                var e = document.createElement("canvas");
                return !(!e.getContext || !e.getContext("2d"))
            },
            k = function () {
                if (!I()) return !1;
                var e = F();
                return !!window.WebGLRenderingContext && !!e
            },
            R = function () {
                return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
            },
            D = function () {
                return void 0 !== window.swfobject
            },
            N = function () {
                return window.swfobject.hasFlashPlayerVersion("9.0.0")
            },
            _ = function (t, e) {
                var a = "___fp_swf_loaded";
                window[a] = function (e) {
                    t(e)
                };
                var n, r, i = e.fonts.swfContainerId;
                (r = document.createElement("div")).setAttribute("id", n.fonts.swfContainerId), document.body.appendChild(r);
                var o = {
                    onReady: a
                };
                window.swfobject.embedSWF(e.fonts.swfPath, i, "1", "1", "9.0.0", !1, o, {
                    allowScriptAccess: "always",
                    menu: "false"
                }, {})
            },
            F = function () {
                var e = document.createElement("canvas"),
                    t = null;
                try {
                    t = e.getContext("webgl") || e.getContext("experimental-webgl")
                } catch (e) {
                }
                return t || (t = null), t
            },
            G = [{
                key: "userAgent",
                getData: function (e) {
                    e(navigator.userAgent)
                }
            }, {
                key: "webdriver",
                getData: function (e, t) {
                    e(null == navigator.webdriver ? t.NOT_AVAILABLE : navigator.webdriver)
                }
            }, {
                key: "language",
                getData: function (e, t) {
                    e(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || t.NOT_AVAILABLE)
                }
            }, {
                key: "colorDepth",
                getData: function (e, t) {
                    e(window.screen.colorDepth || t.NOT_AVAILABLE)
                }
            }, {
                key: "deviceMemory",
                getData: function (e, t) {
                    e(navigator.deviceMemory || t.NOT_AVAILABLE)
                }
            }, {
                key: "pixelRatio",
                getData: function (e, t) {
                    e(window.devicePixelRatio || t.NOT_AVAILABLE)
                }
            }, {
                key: "hardwareConcurrency",
                getData: function (e, t) {
                    e(S(t))
                }
            }, {
                key: "screenResolution",
                getData: function (e, t) {
                    e(n(t))
                }
            }, {
                key: "screenTop",
                getData: function (e, t) {
                    e(screenTop(t))
                }
            }, {
                key: "screenLeft",
                getData: function (e, t) {
                    e(screenLeft(t))
                }
            }, {
                key: "availableScreenResolution",
                getData: function (e, t) {
                    e(r(t))
                }
            }, {
                key: "timezoneOffset",
                getData: function (e) {
                    e((new Date).getTimezoneOffset())
                }
            }, {
                key: "timezone",
                getData: function (e, t) {
                    window.Intl && window.Intl.DateTimeFormat ? e((new window.Intl.DateTimeFormat).resolvedOptions().timeZone) : e(t.NOT_AVAILABLE)
                }
            }, {
                key: "sessionStorage",
                getData: function (e, t) {
                    e(p(t))
                }
            }, {
                key: "localStorage",
                getData: function (e, t) {
                    e(v(t))
                }
            }, 
            {
                key: "mediaDevices",
                getData: function (e) {
                    getMediaDevices().then(function (data) { e(data) })
                }
                }
                , {
                key: "mimeTypes",
                getData: function (e) {
                    e(getMimeTypes())
                }
            }, {
                key: "mathConst",
                getData: function (e) {
                    e(getMathConst())
                }
            }, {
                key: "indexedDb",
                getData: function (e, t) {
                    e(A(t))
                }
            }, {
                key: "addBehavior",
                getData: function (e) {
                    e(!(!document.body || !document.body.addBehavior))
                }
            }, {
                key: "openDatabase",
                getData: function (e) {
                    e(!!window.openDatabase)
                }
            }, {
                key: "cpuClass",
                getData: function (e, t) {
                    e(C(t))
                }
            }, {
                key: "platform",
                getData: function (e, t) {
                    e(B(t))
                }
            }, {
                key: "permissions",
                getData: function (e, t) {
                    e(getPermissions(t))
                }
            }, {
                key: "doNotTrack",
                getData: function (e, t) {
                    e(w(t))
                }
            }, {
                key: "plugins",
                getData: function (e, t) {
                    R() ? t.plugins.excludeIE ? e(t.EXCLUDED) : e(o(t)) : e(i(t))
                }
            }, {
                key: "canvas",
                getData: function (e, t) {
                    I() ? e(y(t)) : e(t.NOT_AVAILABLE)
                }
            },
                // {
                //     key: "webgl",
                //     getData: function (e, t) {
                //         k() ? e(E()) : e(t.NOT_AVAILABLE)
                //     }},
                {
                    key: "webglVendorAndRenderer",
                    getData: function (e) {
                        k() ? e(M()) : e()
                    }
                },
                {
                    key: "adBlock",
                    getData: function (e) {
                        e(x())
                    }
                }, {
                    key: "hasLiedLanguages",
                    getData: function (e) {
                        e(O())
                    }
                }, {
                    key: "hasLiedResolution",
                    getData: function (e) {
                        e(b())
                    }
                }, {
                    key: "hasLiedOs",
                    getData: function (e) {
                        e(P())
                    }
                }, {
                    key: "oscpu",
                    getData: function (e) {
                        e(getOscpu())
                    }
                }, {
                    key: "isJavaEnabled",
                    getData: function (e) {
                        e(getJavaEnabled())
                    }
                }, {
                    key: "appVersion",
                    getData: function (e) {
                        e(getAppVersion())
                    }
                }, {
                    key: "languages",
                    getData: function (e) {
                        e(getLanguages())
                    }
                }, {
                    key: "pluginsAvailable",
                    getData: function (e) {
                        e(getPluginAvailable())
                    }
                }, {
                    key: "vendor",
                    getData: function (e) {
                        e(getVendor())
                    }
                }, {
                    key: "vendorSub",
                    getData: function (e) {
                        e(getVendorSub())
                    }
                }, {
                    key: "hasLiedBrowser",
                    getData: function (e) {
                        e(L())
                    }
                }, {
                    key: "touchSupport",
                    getData: function (e) {
                        e(t())
                    }
                }, {
                    key: "audioFormats",
                    getData: function (e) {
                        e(getAudioFormats())
                    }
                }, {
                    key: "audioParameters",
                    getData: function (e) {
                        e(getAudioParams())
                    }
                }, {
                    key: "videoFormats",
                    getData: function (e) {
                        e(getVideoFormats())
                    }
                }, {
                    key: "fonts",
                    getData: function (e, t) {
                        var u = ["monospace", "sans-serif", "serif"],
                            d = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
                        t.fonts.extendedJsFonts && (d = d.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"]));
                        d = (d = d.concat(t.fonts.userDefinedFonts)).filter(function (e, t) {
                            return d.indexOf(e) === t
                        });
                        var a = document.getElementsByTagName("body")[0],
                            r = document.createElement("div"),
                            g = document.createElement("div"),
                            n = {},
                            i = {},
                            f = function () {
                                var e = document.createElement("span");
                                return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "72px", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "normal", e.style.lineBreak = "auto", e.style.lineHeight = "normal", e.style.textTransform = "none", e.style.textAlign = "left", e.style.textDecoration = "none", e.style.textShadow = "none", e.style.whiteSpace = "normal", e.style.wordBreak = "normal", e.style.wordSpacing = "normal", e.innerHTML = "mmmmmmmmmmlli", e
                            },
                            o = function (e) {
                                for (var t = !1, a = 0; a < u.length; a++)
                                    if (t = e[a].offsetWidth !== n[u[a]] || e[a].offsetHeight !== i[u[a]]) return t;
                                return t
                            },
                            l = function () {
                                for (var e = [], t = 0, a = u.length; t < a; t++) {
                                    var n = f();
                                    n.style.fontFamily = u[t], r.appendChild(n), e.push(n)
                                }
                                return e
                            }();
                        a.appendChild(r);
                        for (var s = 0, c = u.length; s < c; s++) n[u[s]] = l[s].offsetWidth, i[u[s]] = l[s].offsetHeight;
                        var h = function () {
                            for (var e, t, a, n = {}, r = 0, i = d.length; r < i; r++) {
                                for (var o = [], l = 0, s = u.length; l < s; l++) {
                                    var c = (e = d[r], t = u[l], a = void 0, (a = f()).style.fontFamily = "'" + e + "'," + t, a);
                                    g.appendChild(c), o.push(c)
                                }
                                n[d[r]] = o
                            }
                            return n
                        }();
                        a.appendChild(g);
                        for (var m = [], T = 0, p = d.length; T < p; T++) o(h[d[T]]) && m.push(d[T]);
                        a.removeChild(g), a.removeChild(r), e(m)
                    },
                    pauseBefore: !0
                }, {
                    key: "fontsFlash",
                    getData: function (t, e) {
                        return D() ? N() ? e.fonts.swfPath ? void _(function (e) {
                            t(e)
                        }, e) : t("missing options.fonts.swfPath") : t("flash not installed") : t("swf object not loaded")
                    },
                    pauseBefore: !0
                },
                {
                    key: "audio",
                    getData: function (wfcb) {
                        !function (cb) {
                            if (navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
                                return cb(-1);
                            }
                            var indexedDbProviderTest_Context = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                            if (null == indexedDbProviderTest_Context) {
                                return cb(-2);
                            }
                            var context = new indexedDbProviderTest_Context(1, 44100, 44100);
                            var osc = context.createOscillator();
                            osc.type = "triangle";
                            osc.frequency.setValueAtTime(1e4, context.currentTime);
                            var node = context.createDynamicsCompressor();
                            forEach([["threshold", -50], ["knee", 40], ["ratio", 12], ["reduction", -20], ["attack", 0], ["release", .25]], function (times) {
                                if (void 0 !== node[times[0]] && "function" == typeof node[times[0]].setValueAtTime) {
                                    node[times[0]].setValueAtTime(times[1], context.currentTime);
                                }
                            });
                            osc.connect(node);
                            node.connect(context.destination);
                            osc.start(0);
                            context.startRendering();
                            var autoResumeTimer = setTimeout(function () {
                                return context.oncomplete = function () {
                                }, cb(-3);
                            }, 1e3);

                            context.oncomplete = function (event) {
                                var iconCtx;
                                try {
                                    clearTimeout(autoResumeTimer);
                                    iconCtx = event.renderedBuffer.getChannelData(0).slice(4500, 5e3).reduce(function (htmlbuffer, i) {
                                        return htmlbuffer + Math.abs(i);
                                    }, 0);
                                    osc.disconnect();
                                    node.disconnect();
                                } catch (t) {
                                    return void cb(-4);
                                }
                                cb(iconCtx);
                            };
                        }(wfcb);
                    }
                },
                {
                    key: "enumerateDevices",
                    getData: function (t, e) {
                        if (!a()) return t(e.NOT_AVAILABLE);
                        navigator.mediaDevices.enumerateDevices().then(function (e) {
                            t(e.map(function (e) {
                                return "id=" + e.deviceId + ";gid=" + e.groupId + ";" + e.kind + ";" + e.label
                            }))
                        }).catch(function (e) {
                            t(e)
                        })
                    }
                }
                // , {
                //     key: "ja3Hash",
                //     getData: function (e) {
                //         getJa3Hash().then(data => e(data))
                //     }
                // }
                ],
            U = function (e) {
                throw new Error("")
            };
        return U.get = function (a, n) {
            n ? a || (a = {}) : (n = a, a = {}),
                function (e, t) {
                    if (null == t) return;
                    var a, n;
                    for (n in t) null == (a = t[n]) || Object.prototype.hasOwnProperty.call(e, n) || (e[n] = a)
                }(a, e), a.components = a.extraComponents.concat(G);
            var r = {
                    data: [],
                    addPreprocessedComponent: function (e, t) {
                        "function" == typeof a.preprocessor && (t = a.preprocessor(e, t)), r.data.push({
                            key: e,
                            value: t
                        })
                    }
                },
                i = -1,
                o = function (e) {
                    if ((i += 1) >= a.components.length) n(r.data);
                    else {
                        var t = a.components[i];
                        if (a.excludes[t.key]) o(!1);
                        else {
                            if (!e && t.pauseBefore) return i -= 1, void setTimeout(function () {
                                o(!0)
                            }, 1);
                            try {
                                t.getData(function (e) {
                                    r.addPreprocessedComponent(t.key, e), o(!1)
                                }, a)
                            } catch (e) {
                                r.addPreprocessedComponent(t.key, String(e)), o(!1)
                            }
                        }
                    }
                };
            o(!1)
        }, U.getPromise = function (a) {
            return new Promise(function (e, t) {
                U.get(a, e)
            })
        }, U.getV18 = function (i, o) {
            return null == o && (o = i, i = {}), U.get(i, function (e) {
                for (var t = [], a = 0; a < e.length; a++) {
                    var n = e[a];
                    if (n.value === (i.NOT_AVAILABLE || "not available")) t.push({
                        key: n.key,
                        value: "unknown"
                    });
                    else if ("plugins" === n.key) t.push({
                        key: "plugins",
                        value: s(n.value, function (e) {
                            var t = s(e[2], function (e) {
                                return e.join ? e.join("~") : e
                            }).join(",");
                            return [e[0], e[1], t].join("::")
                        })
                    });
                    else if (-1 !== ["canvas", "webgl"].indexOf(n.key)) t.push({
                        key: n.key,
                        value: n.value.join("~")
                    });
                    else if (-1 !== ["sessionStorage", "localStorage", "indexedDb", "addBehavior", "openDatabase"].indexOf(n.key)) {
                        if (!n.value) continue;
                        t.push({
                            key: n.key,
                            value: 1
                        })
                    } else n.value ? t.push(n.value.join ? {
                        key: n.key,
                        value: n.value.join(";")
                    } : n) : t.push({
                        key: n.key,
                        value: n.value
                    })
                }
                var r = l(s(t, function (e) {
                    return e.value
                }).join("~~~"), 31);
                o(r, t)
            })
        }, U.x64hash128 = l, U.VERSION = "2.1.0", U
    });

})();

function getFinger() {
    console.log("STEP 4");
    return new Promise(
        function (resolve, reject) {
            var scriptName = 'advanced';
            AdvancedFingerprint.getPromise().then(function (components) {
                console.log("STEP 5");
                sendDataToServ(scriptName, components).then(function (fp) {
                    console.log("STEP 6");
                    setFingerToStorage(fp, scriptName).then(function () {
                        console.log("STEP 7");
                        if (fp.length > 0) {
                            resolve(fp)
                        } else {
                            resolve('No Hash')
                        }
                    })
                })
            });
        })
}


