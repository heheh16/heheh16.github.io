var normalize = function(pos, size) {
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
var add = function(e, v) {
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
var walk = function(m, n) {
    return 32 === (n = n % 64) ? [m[1], m[0]] : n < 32 ? [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n] : (n = n - 32, [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n]);
};
/**
 * @param {?} m
 * @param {number} n
 * @return {?}
 */
var merge = function(m, n) {
    return 0 === (n = n % 64) ? m : n < 32 ? [m[0] << n | m[1] >>> 32 - n, m[1] << n] : [m[1] << n - 32, 0];
};
/**
 * @param {!Array} ast
 * @param {!Array} fn
 * @return {?}
 */
var get = function(ast, fn) {
    return [ast[0] ^ fn[0], ast[1] ^ fn[1]];
};
/**
 * @param {!Array} value
 * @return {?}
 */
var table = function(value) {
    return value = get(value, [0, value[0] >>> 1]), value = add(value, [4283543511, 3981806797]), value = get(value, [0, value[0] >>> 1]), value = add(value, [3301882366, 444984403]), value = get(value, [0, value[0] >>> 1]);
};