'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 }),
    (exports.Vector =
        exports.Cache =
        exports.Assertions =
        exports.Strings =
        exports.Types =
        exports.Objects =
        exports.Dates =
        exports.Promises =
        exports.Numbers =
        exports.System =
        exports.Arrays =
        exports.Random =
        exports.Binary =
        exports.PubSubChannel =
        exports.AsyncLazy =
        exports.Lazy =
        exports.Optional =
            void 0)
async function invertPromise(n) {
    return new Promise((e, t) => n.then(t, e))
}
async function raceFulfilled(n) {
    return invertPromise(Promise.all(n.map(invertPromise)))
}
async function runInParallelBatches(n, e = 1) {
    const t = splitByCount(n, e),
        r = [],
        o = t.map(async i => {
            for (const u of i) r.push(await u())
        })
    return await Promise.all(o), r
}
async function sleepMillis(n) {
    return new Promise(e =>
        setTimeout(() => {
            e(!0)
        }, n)
    )
}
function shuffle(n, e = Math.random) {
    for (let t = n.length - 1; t > 0; t--) {
        const r = Math.floor(e() * (t + 1)),
            o = n[t]
        ;(n[t] = n[r]), (n[r] = o)
    }
    return n
}
function onlyOrThrow(n) {
    if (n.length === 1) return n[0]
    throw Error(`Expected exactly one element, actual: ${n.length}`)
}
function onlyOrNull(n) {
    return n.length === 1 ? n[0] : null
}
function firstOrNull(n) {
    return n.length > 0 ? n[0] : null
}
function firstOrThrow(n) {
    if (!n.length) throw Error('Received empty array')
    return n[0]
}
function initializeArray(n, e) {
    const t = []
    for (let r = 0; r < n; r++) t.push(e(r))
    return t
}
function rotate2DArray(n) {
    const e = []
    for (let t = 0; t < n[0].length; t++) {
        e.push([])
        for (let r = 0; r < n.length; r++) e[t].push(n[r][t])
    }
    return e
}
function initialize2DArray(n, e, t) {
    const r = []
    for (let o = 0; o < n; o++) {
        r.push([])
        for (let i = 0; i < e; i++) r[o].push(t)
    }
    return r
}
function containsShape(n, e, t, r) {
    if (t < 0 || r < 0 || r + e[0].length > n[0].length || t + e.length > n.length) return !1
    for (let o = 0; o < e.length; o++)
        for (let i = 0; i < e[o].length; i++) if (e[o][i] !== void 0 && n[t + o][r + i] !== e[o][i]) return !1
    return !0
}
function pickRandomIndices(n, e, t = Math.random) {
    return shuffle(range(0, n.length - 1), t).slice(0, e)
}
function pluck(n, e) {
    return n.map(t => t[e])
}
function makeSeededRng(n) {
    let e = n,
        t = 3405648695,
        r = 3735928559
    return function () {
        return (e += t), (t ^= e << 7), (e *= r), (r ^= e << 13), (e ^= t ^ r), (e >>> 0) / 4294967296
    }
}
function intBetween(n, e, t = Math.random) {
    return Math.floor(t() * (e - n + 1)) + n
}
function floatBetween(n, e, t = Math.random) {
    return t() * (e - n) + n
}
function signedRandom() {
    return Math.random() * 2 - 1
}
function containsPoint(n, e, t) {
    return e >= n.x && e < n.x + n.width && t >= n.y && t < n.y + n.height
}
function randomPoint(n, e, t, r = Math.random) {
    let o, i
    do (o = intBetween(0, n - 1, r)), (i = intBetween(0, e - 1, r))
    while (t && containsPoint(t, o, i))
    return [o, i]
}
function procs(n, e = Math.random) {
    const t = Math.floor(n),
        r = n - t
    return chance(r, e) ? t + 1 : t
}
function chance(n, e = Math.random) {
    return e() < n
}
function pick(n, e = Math.random) {
    return n[Math.floor(n.length * e())]
}
function pickMany(n, e, t = Math.random) {
    if (e > n.length) throw new Error(`Count (${e}) is greater than array length (${n.length})`)
    return pickRandomIndices(n, e, t).map(o => n[o])
}
function pickManyUnique(n, e, t, r = Math.random) {
    if (e > n.length) throw new Error(`Count (${e}) is greater than array length (${n.length})`)
    const o = []
    for (; o.length < e; ) {
        const i = pick(n, r)
        o.some(u => t(u, i)) || o.push(i)
    }
    return o
}
function pickGuaranteed(n, e, t, r, o, i = Math.random) {
    const u = n.filter(c => c !== e && c !== t),
        s = []
    for (e !== null && s.push(e); u.length && s.length < r; ) {
        const c = exports.Random.intBetween(0, u.length - 1, i)
        o(u[c], s) && s.push(u[c]), u.splice(c, 1)
    }
    return shuffle(s, i), { values: s, indexOfGuaranteed: e !== null ? s.indexOf(e) : -1 }
}
function last(n) {
    if (!n.length) throw Error('Received empty array')
    return n[n.length - 1]
}
function pipe(n, e, t) {
    return t(e.reduce((r, o) => o(r), n))
}
function makePipe(n, e) {
    return t => pipe(t, n, e)
}
function pickWeighted(n, e, t) {
    if ((isUndefined(t) && (t = Math.random()), n.length !== e.length)) throw new Error('Array length mismatch')
    let r = e.reduce((i, u) => i + u, 0)
    const o = t * r
    for (let i = 0; i < n.length - 1; i++) if (((r -= e[i]), o >= r)) return n[i]
    return last(n)
}
function sortWeighted(n, e, t = Math.random) {
    const r = e.map(i => t() * i),
        o = []
    for (let i = 0; i < n.length; i++) o.push([n[i], r[i]])
    return o.sort((i, u) => u[1] - i[1]).map(i => i[0])
}
function getDeep(n, e) {
    if (n == null) return null
    const t = e.split('.')
    let r = n
    for (const o of t) {
        if (r[o] === null || r[o] === void 0) return null
        r = r[o]
    }
    return r
}
function setDeep(n, e, t) {
    const r = e.split(/\.|\[/)
    let o = n
    for (let i = 0; i < r.length; i++) {
        const u = r[i],
            s = i < r.length - 1 && r[i + 1].includes(']'),
            f = u.includes(']') ? u.replace(/\[|\]/g, '') : u
        if (i === r.length - 1) return (o[f] = t), t
        isObject(o[f]) || (s ? (o[f] = []) : (o[f] = {})), (o = o[f])
    }
    return t
}
function incrementDeep(n, e, t = 1) {
    const r = getDeep(n, e) || 0
    return setDeep(n, e, r + t), r
}
function ensureDeep(n, e, t) {
    return getDeep(n, e) || setDeep(n, e, t)
}
function deleteDeep(n, e) {
    const t = beforeLast(e, '.'),
        r = afterLast(e, '.')
    if (!t || !r) return
    const o = getDeep(n, t)
    delete o[r]
}
function replaceDeep(n, e, t) {
    const r = getDeep(n, e)
    if (!r) throw new Error("Key '" + e + "' does not exist.")
    return setDeep(n, e, t), r
}
function getFirstDeep(n, e, t) {
    for (const r of e) {
        const o = getDeep(n, r)
        if (o) return o
    }
    if (t) {
        const r = Object.values(n)
        if (r.length) return r[0]
    }
    return null
}
async function forever(n, e, t) {
    for (;;) {
        try {
            await n()
        } catch (r) {
            t && t('Error in forever', r)
        }
        await sleepMillis(e)
    }
}
function runAndSetInterval(n, e) {
    n()
    const t = setInterval(() => {
        n()
    }, e)
    return () => clearInterval(t)
}
function asMegabytes(n) {
    return n / 1024 / 1024
}
function convertBytes(n) {
    return n >= 1024 * 1024 * 1024
        ? (n / 1024 / 1024 / 1024).toFixed(3) + ' GB'
        : n >= 1024 * 1024
        ? (n / 1024 / 1024).toFixed(3) + ' MB'
        : n >= 1024
        ? (n / 1024).toFixed(3) + ' KB'
        : n + ' B'
}
function hexToRgb(n) {
    const e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n.toLowerCase())
    if (!e) throw new Error('Invalid hex color: ' + n)
    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
}
function rgbToHex(n) {
    return '#' + n.map(e => e.toString(16).padStart(2, '0')).join('')
}
function haversineDistanceToMeters(n, e, t, r) {
    const i = (n * Math.PI) / 180,
        u = (t * Math.PI) / 180,
        s = ((t - n) * Math.PI) / 180,
        c = ((r - e) * Math.PI) / 180,
        f = Math.sin(s / 2) * Math.sin(s / 2) + Math.cos(i) * Math.cos(u) * Math.sin(c / 2) * Math.sin(c / 2)
    return 6371e3 * (2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)))
}
function roundToNearest(n, e) {
    return Math.round(n / e) * e
}
function formatDistance(n) {
    return n > 1e3
        ? (n / 1e3).toFixed(0) + ' km'
        : n >= 500
        ? roundToNearest(n, 100) + ' m'
        : n >= 100
        ? roundToNearest(n, 50) + ' m'
        : roundToNearest(n, 10) + ' m'
}
function triangularNumber(n) {
    return (n * (n + 1)) / 2
}
function searchFloat(n) {
    const e = n.match(/-?\d+(\.\d+)?/)
    if (!e) throw Error('No float found in ' + n)
    return parseFloat(e[0])
}
function isObject(n, e = !0) {
    return !n ||
        (e && !isUndefined(n._readableState)) ||
        (e &&
            n.constructor &&
            (n.constructor.isBuffer ||
                n.constructor.name == 'Uint8Array' ||
                n.constructor.name === 'ArrayBuffer' ||
                n.constructor.name === 'ReadableStream'))
        ? !1
        : typeof n == 'object'
}
function isStrictlyObject(n) {
    return isObject(n) && !Array.isArray(n)
}
function isEmptyArray(n) {
    return Array.isArray(n) && n.length === 0
}
function isEmptyObject(n) {
    return isStrictlyObject(n) && Object.keys(n).length === 0
}
function isUndefined(n) {
    return typeof n > 'u'
}
function isFunction(n) {
    return Object.prototype.toString.call(n) === '[object Function]'
}
function isString(n) {
    return Object.prototype.toString.call(n) === '[object String]'
}
function isNumber(n) {
    return typeof n == 'number' && isFinite(n)
}
function isBoolean(n) {
    return n === !0 || n === !1
}
function isDate(n) {
    return Object.prototype.toString.call(n) === '[object Date]'
}
function isBlank(n) {
    return !isString(n) || n.trim().length === 0
}
function isId(n) {
    return isNumber(n) && Number.isInteger(n) && n >= 1
}
function isIntegerString(n) {
    return isString(n) && n.match(/^-?\d+$/) !== null
}
function isHexString(n) {
    return isString(n) && n.match(/^(0x)?[0-9a-f]+$/i) !== null
}
const symbols = '!@#$%^&*()_+-=[]{}|;:<>?,./',
    symbolsArray = '!@#$%^&*()_+-=[]{}|;:<>?,./'.split(''),
    lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz',
    uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numericAlphabet = '1234567890',
    alphanumericAlphabet = lowercaseAlphabet + uppercaseAlphabet + numericAlphabet,
    richAsciiAlphabet = alphanumericAlphabet + symbols,
    unicodeTestingAlphabet = [
        '\u2014',
        '\\',
        '\u6771',
        '\u4EAC',
        '\u90FD',
        '\u{1D586}',
        '\u{1D587}',
        '\u{1D588}',
        '\u{1F47E}',
        '\u{1F647}',
        '\u{1F481}',
        '\u{1F645}',
        '\u16A0',
        '\u16C7',
        '\u16BB',
        '\u16E6'
    ],
    hexAlphabet = '0123456789abcdef'
function randomLetterString(n, e = Math.random) {
    let t = ''
    for (let r = 0; r < n; r++) t += lowercaseAlphabet[Math.floor(e() * lowercaseAlphabet.length)]
    return t
}
function randomAlphanumericString(n, e = Math.random) {
    let t = ''
    for (let r = 0; r < n; r++) t += alphanumericAlphabet[Math.floor(e() * alphanumericAlphabet.length)]
    return t
}
function randomRichAsciiString(n, e = Math.random) {
    let t = ''
    for (let r = 0; r < n; r++) t += richAsciiAlphabet[Math.floor(e() * richAsciiAlphabet.length)]
    return t
}
function randomUnicodeString(n, e = Math.random) {
    let t = ''
    for (let r = 0; r < n; r++) t += unicodeTestingAlphabet[Math.floor(e() * unicodeTestingAlphabet.length)]
    return t
}
function searchHex(n, e) {
    const t = new RegExp(`[0-9a-f]{${e}}`, 'i'),
        r = n.match(t)
    return r ? r[0] : null
}
function searchSubstring(n, e, t = symbolsArray) {
    const r = splitAll(n, t)
    for (const o of r) if (e(o)) return o
    return null
}
function randomHexString(n, e = Math.random) {
    let t = ''
    for (let r = 0; r < n; r++) t += hexAlphabet[Math.floor(e() * hexAlphabet.length)]
    return t
}
function asString(n, e) {
    var t, r
    if (isBlank(n)) throw new TypeError(`Expected string${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    if (e && ((e.min !== void 0 && n.length < e.min) || (e.max !== void 0 && n.length > e.max)))
        throw RangeError(
            `Expected string${e?.name ? ` for ${e.name}` : ''} length in range: ${
                (t = e.min) !== null && t !== void 0 ? t : '-inf'
            }..${(r = e.max) !== null && r !== void 0 ? r : 'inf'}; got: ${n.length}`
        )
    return n
}
function asHexString(n, e) {
    if (!isHexString(n)) throw new TypeError(`Expected hex string${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    const t = n.replace(/^0x/, '')
    if (e && e.byteLength && t.length !== e.byteLength * 2)
        throw RangeError(
            `Expected hex string${e?.name ? ` for ${e.name}` : ''} of byte length ${e.byteLength}; got: ` + t
        )
    return t
}
function asSafeString(n, e) {
    if (
        !asString(n, e)
            .split('')
            .every(t => t === '_' || isLetterOrDigit(t))
    )
        throw new TypeError(`Expected safe string${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function checkLimits(n, e) {
    var t, r
    if ((e.min !== void 0 && n < e.min) || (e.max !== void 0 && n > e.max))
        throw RangeError(
            `Expected value${e?.name ? ` for ${e.name}` : ''} in range: ${
                (t = e.min) !== null && t !== void 0 ? t : '-inf'
            }..${(r = e.max) !== null && r !== void 0 ? r : 'inf'}; got: ${n}`
        )
}
function asNumber(n, e) {
    if (isNumber(n)) return e && checkLimits(n, e), n
    if (!isString(n) || !n.match(/^-?\d+(\.\d+)?$/))
        throw new TypeError(`Expected number${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    const t = parseFloat(n)
    return e && checkLimits(t, e), t
}
function asInteger(n, e) {
    return asNumber(n, e) | 0
}
function asBoolean(n, e) {
    if (n === 'true') return !0
    if (n === 'false') return !1
    if (!isBoolean(n)) throw new TypeError(`Expected boolean${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function asDate(n, e) {
    if (!isDate(n)) throw new TypeError(`Expected date${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function asNullableString(n) {
    return isBlank(n) ? null : n
}
function asEmptiableString(n, e) {
    if (!isString(n)) throw new TypeError(`Expected string${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function asId(n, e) {
    if (isId(n)) return n
    const t = parseInt(n, 10)
    if (!isId(t)) throw new TypeError(`Expected id${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return t
}
function asTime(n, e) {
    if (!isString(n)) throw new TypeError(`Expected time${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    const t = n.split(':')
    if (t.length !== 2) throw new TypeError(`Expected time${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    const r = parseInt(t[0], 10),
        o = parseInt(t[1], 10)
    if (!isNumber(r) || !isNumber(o) || r < 0 || r > 23 || o < 0 || o > 59)
        throw new TypeError(`Expected time, got${e?.name ? ` for ${e.name}` : ''}: ` + n)
    return `${String(r).padStart(2, '0')}:${String(o).padStart(2, '0')}`
}
function asArray(n, e) {
    if (!Array.isArray(n)) throw new TypeError(`Expected array${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function asObject(n, e) {
    if (!isStrictlyObject(n)) throw new TypeError(`Expected object${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function asNullableObject(n, e) {
    return n === null ? null : asObject(n, e)
}
function asNumericDictionary(n, e) {
    const t = asObject(n),
        r = Object.keys(t),
        o = Object.values(t)
    if (!r.every(isString) || !o.every(isNumber))
        throw new TypeError(`Expected numeric dictionary${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return t
}
function isUrl(n) {
    return isString(n) && n.match(/^https?:\/\/.+/) !== null
}
function asUrl(n, e) {
    if (!isUrl(n)) throw new TypeError(`Expected url${e?.name ? ` for ${e.name}` : ''}, got: ` + n)
    return n
}
function isNullable(n, e) {
    return isUndefined(e) || e === null ? !0 : n(e)
}
function asNullable(n, e) {
    return e === null || isUndefined(e) ? null : n(e)
}
function enforceObjectShape(n, e) {
    for (const [t, r] of Object.entries(e)) if (!r(n[t])) throw TypeError(`${t} in value does not exist or match shape`)
    for (const t of Object.keys(n)) if (!e[t]) throw TypeError(`${t} exists in value but not in shape`)
    return !0
}
function enforceArrayShape(n, e) {
    return n.every(t => enforceObjectShape(t, e))
}
function represent(n, e = 'json', t = 0) {
    if (isObject(n, !1)) {
        if (t > 1) return '[object Object]'
        if (e === 'json') {
            if (Array.isArray(n)) {
                const o = n.map(i => represent(i, 'json', t + 1))
                return t === 0 ? JSON.stringify(o) : o
            }
            const r = {}
            n.message && (r.message = represent(n.message, 'json', t + 1))
            for (const [o, i] of Object.entries(n)) r[o] = represent(i, 'json', t + 1)
            return t === 0 ? JSON.stringify(r) : r
        } else if (e === 'key-value') {
            const r = Object.keys(n)
            return (
                n.message && !r.includes('message') && r.unshift('message'),
                r.map(o => `${o}=${JSON.stringify(represent(n[o], 'json', t + 1))}`).join(' ')
            )
        }
    }
    return isUndefined(n) && (n = 'undefined'), t === 0 ? JSON.stringify(n) : n
}
function expandError(n, e) {
    if (isString(n)) return n
    const t = Object.keys(n)
    n.message && !t.includes('message') && t.push('message')
    const r = t.map(o => `${o}: ${n[o]}`).join('; ')
    return e && n.stack
        ? r +
              `
` +
              n.stack
        : r
}
function deepMergeInPlace(n, e) {
    if (isStrictlyObject(n) && isStrictlyObject(e))
        for (const t in e)
            isStrictlyObject(e[t])
                ? (n[t] || (n[t] = {}), deepMergeInPlace(n[t], e[t]))
                : Array.isArray(e[t])
                ? (n[t] = [...e[t]])
                : ((e[t] !== null && e[t] !== void 0) || n[t] === null || n[t] === void 0) && (n[t] = e[t])
    return n
}
function deepMerge2(n, e) {
    const t = {}
    return deepMergeInPlace(t, n), deepMergeInPlace(t, e), t
}
function deepMerge3(n, e, t) {
    const r = {}
    return deepMergeInPlace(r, n), deepMergeInPlace(r, e), deepMergeInPlace(r, t), r
}
function zip(n, e) {
    const t = {}
    for (const r of n) for (const o of Object.keys(r)) t[o] ? (t[o] = e(t[o], r[o])) : (t[o] = r[o])
    return t
}
function zipSum(n) {
    return zip(n, (e, t) => e + t)
}
function pushToBucket(n, e, t) {
    n[e] || (n[e] = []), n[e].push(t)
}
function unshiftAndLimit(n, e, t) {
    for (n.unshift(e); n.length > t; ) n.pop()
}
function atRolling(n, e) {
    let t = e % n.length
    return t < 0 && (t += n.length), n[t]
}
function pushAll(n, e) {
    Array.prototype.push.apply(n, e)
}
function unshiftAll(n, e) {
    Array.prototype.unshift.apply(n, e)
}
async function mapAllAsync(n, e) {
    const t = []
    for (const r of n) t.push(await e(r))
    return t
}
function glue(n, e) {
    const t = []
    for (let r = 0; r < n.length; r++) t.push(n[r]), r < n.length - 1 && (isFunction(e) ? t.push(e()) : t.push(e))
    return t
}
function asEqual(n, e) {
    if (n !== e) throw Error(`Expected [${n}] to equal [${e}]`)
    return [n, e]
}
function asTrue(n) {
    if (n !== !0) throw Error(`Expected [true], got: [${n}]`)
    return n
}
function asTruthy(n) {
    if (!n) throw Error(`Expected truthy value, got: [${n}]`)
    return n
}
function asFalse(n) {
    if (n !== !1) throw Error(`Expected [false], got: [${n}]`)
    return n
}
function asFalsy(n) {
    if (n) throw Error(`Expected falsy value, got: [${n}]`)
    return n
}
function asEither(n, e) {
    if (!e.includes(n)) throw Error(`Expected any of [${e.join(', ')}], got: [${n}]`)
    return n
}
function scheduleMany(n, e) {
    for (let t = 0; t < n.length; t++) {
        const r = n[t],
            o = e[t],
            i = Math.max(0, o.getTime() - Date.now())
        setTimeout(r, i)
    }
}
function interpolate(n, e, t) {
    return n + (e - n) * t
}
function sum(n) {
    return n.reduce((e, t) => e + t, 0)
}
function average(n) {
    return n.reduce((e, t) => e + t, 0) / n.length
}
function median(n) {
    const e = [...n].sort((r, o) => r - o),
        t = Math.floor(e.length / 2)
    return e.length % 2 === 0 ? (e[t] + e[t - 1]) / 2 : e[t]
}
function getDistanceFromMidpoint(n, e) {
    return n - (e - 1) / 2
}
function range(n, e) {
    const t = []
    for (let r = n; r <= e; r++) t.push(r)
    return t
}
function includesAny(n, e) {
    return e.some(t => n.includes(t))
}
function isChinese(n) {
    return /^[\u4E00-\u9FA5]+$/.test(n)
}
function slugify(n, e = () => !1) {
    return n
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split('')
        .map(t => (/[a-z0-9]/.test(t) || e(t) ? t : '-'))
        .join('')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}
function camelToTitle(n) {
    return capitalize(n.replace(/([A-Z])/g, ' $1'))
}
function slugToTitle(n) {
    return n.split('-').map(capitalize).join(' ')
}
function slugToCamel(n) {
    return decapitalize(n.split('-').map(capitalize).join(''))
}
function joinHumanly(n, e = ', ', t = ' and ') {
    return !n || !n.length
        ? ''
        : n.length === 1
        ? n[0]
        : n.length === 2
        ? `${n[0]}${t}${n[1]}`
        : `${n.slice(0, n.length - 1).join(e)}${t}${n[n.length - 1]}`
}
function surroundInOut(n, e) {
    return e + n.split('').join(e) + e
}
function enumify(n) {
    return slugify(n).replace(/-/g, '_').toUpperCase()
}
function getFuzzyMatchScore(n, e) {
    if (e.length === 0) return 0
    const t = n.toLowerCase(),
        r = e.toLowerCase()
    return n === e
        ? 1e4
        : t.startsWith(r)
        ? 1e4 - n.length
        : t.includes(r)
        ? 5e3 - n.length
        : new RegExp('.*' + r.split('').join('.*') + '.*').test(t)
        ? 1e3 - n.length
        : 0
}
function sortByFuzzyScore(n, e) {
    return n.filter(t => getFuzzyMatchScore(t, e)).sort((t, r) => getFuzzyMatchScore(r, e) - getFuzzyMatchScore(t, e))
}
function escapeHtml(n) {
    return n.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
const htmlEntityMap = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&gt;': '>', '&lt;': '<' }
function decodeHtmlEntities(n) {
    let e = n
        .replace(/&#(\d+);/g, (t, r) => String.fromCharCode(r))
        .replace(/&#x(\d+);/g, (t, r) => String.fromCharCode(parseInt(r, 16)))
    for (const [t, r] of Object.entries(htmlEntityMap)) e = e.replaceAll(t, r)
    return e
}
function before(n, e) {
    const t = n.indexOf(e)
    return t === -1 ? null : n.slice(0, t)
}
function after(n, e) {
    const t = n.indexOf(e)
    return t === -1 ? null : n.slice(t + e.length)
}
function beforeLast(n, e) {
    const t = n.lastIndexOf(e)
    return t === -1 ? null : n.slice(0, t)
}
function afterLast(n, e) {
    const t = n.lastIndexOf(e)
    return t === -1 ? null : n.slice(t + e.length)
}
function betweenWide(n, e, t) {
    const r = beforeLast(n, t)
    return r ? after(r, e) : null
}
function betweenNarrow(n, e, t) {
    const r = after(n, e)
    return r ? before(r, t) : null
}
function splitOnce(n, e, t = !1) {
    const r = t ? n.lastIndexOf(e) : n.indexOf(e)
    return r === -1 ? (t ? [null, n] : [n, null]) : [n.slice(0, r), n.slice(r + e.length)]
}
function splitAll(n, e) {
    let t = [n]
    for (const r of e) t = t.flatMap(o => o.split(r))
    return t.filter(r => r)
}
function getExtension(n) {
    const e = last(n.split(/\\|\//g)),
        t = e.lastIndexOf('.', e.length - 1)
    return t <= 0 ? '' : e.slice(t + 1)
}
function getBasename(n) {
    const e = last(n.split(/\\|\//g)),
        t = e.lastIndexOf('.', e.length - 1)
    return t <= 0 ? e : e.slice(0, t)
}
function normalizeEmail(n) {
    let [e, t] = n.split('@')
    e = shrinkTrim(e.replaceAll('.', '').toLowerCase()).replaceAll(' ', '')
    const [r] = e.split('+')
    if (!r || !t || t.indexOf('.') === -1 || t.indexOf('.') === t.length - 1) throw new Error('Invalid email')
    return (t = shrinkTrim(t.toLowerCase()).replaceAll(' ', '')), `${r}@${t}`
}
function normalizeFilename(n) {
    const e = getBasename(n),
        t = getExtension(n)
    return t ? `${e}.${t}` : e
}
function parseFilename(n) {
    const e = getBasename(n),
        t = getExtension(n)
    return { basename: e, extension: t, filename: t ? `${e}.${t}` : e }
}
function randomize(n, e = Math.random) {
    return n.replace(/\{(.+?)\}/g, (t, r) => pick(r.split('|'), e))
}
function expand(n) {
    const e = /\{(.+?)\}/,
        t = n.match(e)
    if (!t || !t.index) return [n]
    const r = t[1].split(','),
        o = n.slice(0, t.index),
        i = n.slice(t.index + t[0].length)
    let u = []
    for (const s of r) {
        const c = expand(o + s + i)
        u = u.concat(c)
    }
    return u
}
function shrinkTrim(n) {
    return n
        .split(
            `
`
        )
        .map(e => e.trim().replace(/\s+/g, ' '))
        .filter(e => e.length > 0).join(`
`)
}
function capitalize(n) {
    return n.charAt(0).toUpperCase() + n.slice(1)
}
function decapitalize(n) {
    return n.charAt(0).toLowerCase() + n.slice(1)
}
function isLetter(n) {
    if (!n) return !1
    const e = n.charCodeAt(0)
    return (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
}
function isDigit(n) {
    if (!n) return !1
    const e = n.charCodeAt(0)
    return e >= 48 && e <= 57
}
function isLetterOrDigit(n) {
    return isLetter(n) || isDigit(n)
}
const wordBreakCharacters = ` 
	\r.,?!:;"'\`(){}[]~@#$%^&*-+=|<>/\\`.split('')
function isWordBreakCharacter(n) {
    return wordBreakCharacters.includes(n)
}
function isValidObjectPathCharacter(n) {
    return isLetterOrDigit(n) || n === '.' || n === '[' || n === ']' || n === '_'
}
function insertString(n, e, t, r, o) {
    return n.slice(0, e) + r + n.slice(e, e + t) + o + n.slice(e + t)
}
function indexOfRegex(n, e, t = 0) {
    const r = e.exec(n.slice(t))
    return r ? { index: r.index, match: r[0] } : null
}
function lineMatches(n, e, t = !0) {
    if (!t) return e.every(o => (o instanceof RegExp ? o.test(n) : n.indexOf(o, 0) !== -1))
    let r = 0
    for (const o of e)
        if (o instanceof RegExp) {
            const i = indexOfRegex(n, o, r)
            if (!i) return !1
            r = i.index + i.match.length
        } else {
            const i = n.indexOf(o, r)
            if (i === -1) return !1
            r = i + o.length
        }
    return !0
}
function linesMatchInOrder(n, e, t = !0) {
    let r = 0
    for (const o of e) {
        let i = !1
        for (; !i && r < n.length; ) lineMatches(n[r], o, t) && (i = !0), r++
        if (!i) return !1
    }
    return !0
}
function csvEscape(n) {
    return n.match(/"|,/) ? `"${n.replace(/"/g, '""')}"` : n
}
function indexOfEarliest(n, e, t = 0) {
    let r = -1
    for (const o of e) {
        const i = n.indexOf(o, t)
        i !== -1 && (r === -1 || i < r) && (r = i)
    }
    return r
}
function indexOfWordBreak(n, e = 0) {
    for (let t = e; t < n.length; t++) if (isWordBreakCharacter(n[t])) return t
    return -1
}
function indexOfHashtag(n, e = 0) {
    for (let t = e; t < n.length; t++) if (n[t] === '#' && isLetterOrDigit(n[t + 1])) return t
    return -1
}
function lastIndexOfBefore(n, e, t = 0) {
    return n.slice(0, t).lastIndexOf(e)
}
function findWeightedPair(n, e = 0, t = '{', r = '}') {
    let o = 1
    for (let i = e; i < n.length; i++)
        if (n.slice(i, i + r.length) === r) {
            if (--o === 0) return i
        } else n.slice(i, i + t.length) === t && o++
    return -1
}
function extractBlock(n, e) {
    const t = e.wordBoundary
        ? indexOfEarliest(
              n,
              [
                  `${e.opening} `,
                  `${e.opening}
`
              ],
              e.start || 0
          )
        : n.indexOf(e.opening, e.start || 0)
    if (t === -1) return null
    const r = findWeightedPair(n, t + e.opening.length, e.opening, e.closing)
    return r === -1 ? null : e.exclusive ? n.slice(t + e.opening.length, r) : n.slice(t, r + e.closing.length)
}
function extractAllBlocks(n, e) {
    const t = []
    let r = e.wordBoundary
        ? indexOfEarliest(
              n,
              [
                  `${e.opening} `,
                  `${e.opening}
`
              ],
              e.start || 0
          )
        : n.indexOf(e.opening, e.start || 0)
    for (;;) {
        if (r === -1) return t
        const o = extractBlock(n, Object.assign(Object.assign({}, e), { start: r }))
        if (!o) return t
        t.push(o),
            (r = e.wordBoundary
                ? indexOfEarliest(
                      n,
                      [
                          `${e.opening} `,
                          `${e.opening}
`
                      ],
                      r + o.length
                  )
                : n.indexOf(e.opening, r + o.length))
    }
}
function replaceBlocks(n, e, t) {
    let r = 0
    for (;;) {
        const o = exports.Strings.extractBlock(n, Object.assign(Object.assign({}, t), { start: r }))
        if (!o) return n
        const i = e(o)
        ;(r = n.indexOf(o, r) + i.length), (n = n.replace(o, i))
    }
}
function splitFormatting(n, e) {
    const t = []
    let r = 0
    for (; r < n.length; ) {
        const o = n.indexOf(e, r)
        if (o === -1) {
            t.push({ string: n.slice(r), symbol: null })
            break
        }
        const i = n.indexOf(e, o + e.length)
        if ((o > r && i !== -1 && t.push({ string: n.slice(r, o), symbol: null }), i === -1)) {
            t.push({ string: n.slice(r), symbol: null })
            break
        }
        t.push({ string: n.slice(o + e.length, i), symbol: e }), (r = i + e.length)
    }
    return t
}
function splitHashtags(n) {
    const e = []
    let t = 0
    for (; t < n.length; ) {
        const r = indexOfHashtag(n, t)
        if (r === -1) {
            e.push({ string: n.slice(t), symbol: null })
            break
        }
        const o = indexOfWordBreak(n, r + 1)
        if (o === -1) {
            e.push({ string: n.slice(t, r), symbol: null }), e.push({ string: n.slice(r + 1), symbol: '#' })
            break
        }
        r > t && e.push({ string: n.slice(t, r), symbol: null }),
            e.push({ string: n.slice(r + 1, o), symbol: '#' }),
            (t = o)
    }
    return e
}
function splitUrls(n) {
    const e = []
    let t = 0
    for (; t < n.length; ) {
        const r = indexOfEarliest(n, ['http://', 'https://'], t)
        if (r === -1) {
            e.push({ string: n.slice(t), symbol: null })
            break
        }
        const o = indexOfEarliest(
            n,
            [
                ' ',
                `
`
            ],
            r
        )
        if (o === -1) {
            r > t && e.push({ string: n.slice(t, r), symbol: null }), e.push({ string: n.slice(r), symbol: 'http' })
            break
        }
        r > t && e.push({ string: n.slice(t, r), symbol: null }),
            e.push({ string: n.slice(r, o), symbol: 'http' }),
            (t = o)
    }
    return e
}
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
function base64ToUint8Array(n) {
    return baseToUint8Array(n, BASE64_CHARS)
}
function uint8ArrayToBase64(n) {
    return uint8ArrayToBase(n, BASE64_CHARS)
}
function base32ToUint8Array(n) {
    return baseToUint8Array(n, BASE32_CHARS)
}
function uint8ArrayToBase32(n) {
    return uint8ArrayToBase(n, BASE32_CHARS)
}
function baseToUint8Array(n, e) {
    const t = '=',
        r = e.length
    let o = 0,
        i = 0
    const u = []
    for (let s = 0; s < n.length; s++) {
        const c = n[s]
        if (c === t) break
        const f = e.indexOf(c)
        if (f === -1) throw new Error(`Invalid character: ${c}`)
        ;(i = (i << Math.log2(r)) | f), (o += Math.log2(r)), o >= 8 && ((o -= 8), u.push((i >> o) & 255))
    }
    return new Uint8Array(u)
}
function uint8ArrayToBase(n, e) {
    const t = e.length
    let r = 0,
        o = 0,
        i = ''
    for (let u = 0; u < n.length; u++)
        for (o = (o << 8) | n[u], r += 8; r >= Math.log2(t); ) (r -= Math.log2(t)), (i += e[(o >> r) & (t - 1)])
    return (
        r > 0 && (i += e[(o << (Math.log2(t) - r)) & (t - 1)]),
        i.length % 4 !== 0 && (i += '='.repeat(4 - (i.length % 4))),
        i
    )
}
function hexToUint8Array(n) {
    n.startsWith('0x') && (n = n.slice(2))
    const e = n.length / 2,
        t = new Uint8Array(e)
    for (let r = 0; r < e; r++) {
        const o = parseInt(n.slice(r * 2, r * 2 + 2), 16)
        t[r] = o
    }
    return t
}
function uint8ArrayToHex(n) {
    return Array.from(n)
        .map(e => e.toString(16).padStart(2, '0'))
        .join('')
}
function route(n, e) {
    const t = n.split('/').filter(i => i),
        r = e.split('/').filter(i => i)
    if (t.length !== r.length) return null
    const o = {}
    for (let i = 0; i < t.length; i++) {
        const u = t[i]
        if (u.startsWith(':')) o[u.slice(1)] = r[i]
        else if (u !== r[i]) return null
    }
    return o
}
function explodeReplace(n, e, t) {
    const r = []
    for (const o of t) o !== e && r.push(n.replace(e, o))
    return r
}
function generateVariants(n, e, t, r = Math.random) {
    const o = exports.Arrays.shuffle(
            e.map(u => ({
                variants: exports.Arrays.shuffle(
                    u.variants.map(s => s),
                    r
                ),
                avoid: u.avoid
            })),
            r
        ),
        i = []
    for (const u of o) {
        const s = u.variants.filter(f => f !== u.avoid),
            c = s.find(f => n.includes(f))
        if (c && (pushAll(i, explodeReplace(n, c, s)), i.length >= t)) break
    }
    if (i.length < t)
        for (const u of o) {
            const s = u.variants.find(c => n.includes(c))
            if (s && (pushAll(i, explodeReplace(n, s, u.variants)), i.length >= t)) break
        }
    return i.slice(0, t)
}
function hashCode(n) {
    let e = 0
    for (let t = 0; t < n.length; t++) (e = (e << 5) - e + n.charCodeAt(t)), (e |= 0)
    return e
}
function replaceWord(n, e, t, r = !1) {
    const o = new RegExp(r ? `(?<=\\s|^)${e}(?=\\s|$)` : `\\b${e}\\b`, 'g')
    return n.replace(o, t)
}
function replacePascalCaseWords(n, e) {
    const t = /\b[A-Z][a-zA-Z0-9]*\b/g
    return n.replace(t, r => (r.toUpperCase() === r ? r : e(r)))
}
function stripHtml(n) {
    return n.replace(/<[^>]*>/g, '')
}
function breakLine(n) {
    const e = n.lastIndexOf(' ')
    if (e === -1) return { line: n, rest: '' }
    const t = n.slice(0, e),
        r = n.slice(e + 1)
    return { line: t, rest: r }
}
function measureTextWidth(n, e = {}) {
    return [...n].reduce((t, r) => t + (e[r] || 1), 0)
}
function toLines(n, e, t = {}) {
    const r = []
    let o = '',
        i = 0
    for (let u = 0; u < n.length; u++) {
        const s = n[u],
            c = t[s] || 1
        if (((o += s), (i += c), i > e)) {
            const { line: f, rest: l } = breakLine(o)
            r.push(f),
                (o = l),
                (i = l
                    .split('')
                    .map(a => t[a] || 1)
                    .reduce((a, h) => a + h, 0))
        }
    }
    return o && r.push(o), r
}
function levenshteinDistance(n, e) {
    const t = []
    for (let r = 0; r <= n.length; r++) t[r] = [r]
    for (let r = 0; r <= e.length; r++) t[0][r] = r
    for (let r = 1; r <= n.length; r++)
        for (let o = 1; o <= e.length; o++) {
            const i = n[r - 1] === e[o - 1] ? 0 : 1
            t[r][o] = Math.min(t[r - 1][o] + 1, t[r][o - 1] + 1, t[r - 1][o - 1] + i)
        }
    return t[n.length][e.length]
}
function containsWord(n, e) {
    return new RegExp(`\\b${e}\\b`).test(n)
}
function containsWords(n, e, t) {
    return t === 'any' ? e.some(r => containsWord(n, r)) : e.every(r => containsWord(n, r))
}
function parseHtmlAttributes(n) {
    const e = {},
        t = n.match(/([a-z\-]+)="([^"]+)"/g)
    if (t)
        for (const r of t) {
            const [o, i] = splitOnce(r, '=')
            e[o] = i.slice(1, i.length - 1)
        }
    return e
}
function readNextWord(n, e, t = []) {
    let r = ''
    for (; e < n.length && (isLetterOrDigit(n[e]) || t.includes(n[e])); ) r += n[e++]
    return r
}
function resolveVariables(n, e, t = '$', r = ':') {
    for (const o in e) n = resolveVariableWithDefaultSyntax(n, o, e[o], t, r)
    return (n = resolveRemainingVariablesWithDefaults(n)), n
}
function resolveVariableWithDefaultSyntax(n, e, t, r = '$', o = ':') {
    if (t === '') return n
    let i = n.indexOf(`${r}${e}`)
    for (; i !== -1; ) {
        if (n[i + e.length + 1] === o)
            if (n[i + e.length + 2] === o) n = n.replace(`${r}${e}${o}${o}`, t)
            else {
                const s = readNextWord(n, i + e.length + 2, ['_'])
                n = n.replace(`${r}${e}${o}${s}`, t)
            }
        else n = n.replace(`${r}${e}`, t)
        i = n.indexOf(`${r}${e}`, i + t.length)
    }
    return n
}
function resolveRemainingVariablesWithDefaults(n, e = '$', t = ':') {
    let r = n.indexOf(e)
    for (; r !== -1; ) {
        const o = readNextWord(n, r + 1)
        if (n[r + o.length + 1] === t)
            if (n[r + o.length + 2] === t) n = n.replace(`${e}${o}${t}${t}`, '')
            else {
                const u = readNextWord(n, r + o.length + 2)
                n = n.replace(`${e}${o}${t}${u}`, u)
            }
        r = n.indexOf(e, r + 1)
    }
    return n
}
function resolveMarkdownLinks(n, e) {
    let t = n.indexOf('](')
    for (; t !== -1; ) {
        const r = lastIndexOfBefore(n, '[', t),
            o = n.indexOf(')', t)
        if (r !== -1 && o !== -1) {
            const [i, u] = n.slice(r + 1, o).split(']('),
                s = e(i, u)
            n = n.slice(0, r) + s + n.slice(o + 1)
        }
        t = n.indexOf('](', t + 1)
    }
    return n
}
function toQueryString(n, e = !0) {
    const t = Object.entries(n)
        .filter(([r, o]) => o != null)
        .map(([r, o]) => `${r}=${encodeURIComponent(o)}`)
        .join('&')
    return t ? (e ? '?' : '') + t : ''
}
function parseQueryString(n) {
    const e = {},
        t = n.split('&')
    for (const r of t) {
        const [o, i] = r.split('=')
        o && i && (e[o] = decodeURIComponent(i))
    }
    return e
}
function hasKey(n, e) {
    return Object.prototype.hasOwnProperty.call(n, e)
}
function selectMax(n, e) {
    let t = null,
        r = -1 / 0
    for (const [o, i] of Object.entries(n)) {
        const u = e(i)
        u > r && ((r = u), (t = o))
    }
    return t ? [t, n[t]] : null
}
function reposition(n, e, t, r) {
    const o = n.find(u => u[e] === t),
        i = n.find(u => u[e] === t + r)
    o && i ? ((o[e] = t + r), (i[e] = t)) : o && (o[e] = t + r),
        n.sort((u, s) => asNumber(u[e]) - asNumber(s[e])),
        n.forEach((u, s) => (u[e] = s + 1))
}
function unwrapSingleKey(n) {
    const e = Object.keys(n)
    if (e.length === 1) return n[e[0]]
    throw new Error('Expected object to have a single key')
}
function parseKeyValues(n, e = ':') {
    return Object.fromEntries(
        n
            .map(t => splitOnce(t, e))
            .map(t => (t[0] && t[1] ? [shrinkTrim(t[0]), shrinkTrim(t[1])] : null))
            .filter(t => t)
    )
}
function buildUrl(n, e, t) {
    return joinUrl(n, e) + toQueryString(t || {})
}
function parseCsv(n, e = ',', t = '"') {
    const r = []
    let o = '',
        i = !1
    const u = n.split('')
    for (const s of u) s === e && !i ? (r.push(o), (o = '')) : s === t && ((!o && !i) || i) ? (i = !i) : (o += s)
    return r.push(o), r
}
function humanizeProgress(n) {
    return `[${Math.floor(n.progress * 100)}%] ${humanizeTime(n.deltaMs)} out of ${humanizeTime(
        n.totalTimeMs
    )} (${humanizeTime(n.remainingTimeMs)} left) [${Math.round(n.baseTimeMs)} ms each]`
}
async function waitFor(n, e, t) {
    for (let r = 0; r < t; r++) {
        try {
            if (await n()) return !0
        } catch {}
        r < t - 1 && (await sleepMillis(e))
    }
    return !1
}
function filterAndRemove(n, e) {
    const t = []
    for (let r = n.length - 1; r >= 0; r--) e(n[r]) && t.push(n.splice(r, 1)[0])
    return t
}
function cloneWithJson(n) {
    return JSON.parse(JSON.stringify(n))
}
function unixTimestamp(n) {
    return Math.ceil((n || Date.now()) / 1e3)
}
function isoDate(n) {
    return (n || new Date()).toISOString().slice(0, 10)
}
function dateTimeSlug(n) {
    return (n || new Date()).toISOString().slice(0, 19).replace(/T|:/g, '-')
}
function fromUtcString(n) {
    const e = new Date(n)
    return new Date(e.getTime() - e.getTimezoneOffset() * 6e4)
}
function fromMillis(n) {
    return new Date(n)
}
function createTimeDigits(n) {
    return String(Math.floor(n)).padStart(2, '0')
}
function normalizeTime(n) {
    let [e, t] = n.split(':')
    isNumber(parseInt(e, 10)) || (e = '0'), isNumber(parseInt(t, 10)) || (t = '0')
    let r = clamp(asInteger(e), 0, 23),
        o = clamp(asInteger(t), 0, 59)
    return `${createTimeDigits(r)}:${createTimeDigits(o)}`
}
function humanizeTime(n) {
    const e = Math.floor(n / 36e5)
    n = n % 36e5
    const t = Math.floor(n / 6e4)
    n = n % 6e4
    const r = Math.floor(n / 1e3)
    return e
        ? `${createTimeDigits(e)}:${createTimeDigits(t)}:${createTimeDigits(r)}`
        : `${createTimeDigits(t)}:${createTimeDigits(r)}`
}
function absoluteDays(n) {
    return Math.floor((isDate(n) ? n.getTime() : n) / 864e5)
}
const DefaultTimestampLabels = {
    today: (n, e) => createTimeDigits(n) + ':' + createTimeDigits(e),
    yesterday: () => 'Yesterday',
    monday: () => 'Mon',
    tuesday: () => 'Tue',
    wednesday: () => 'Wed',
    thursday: () => 'Thu',
    friday: () => 'Fri',
    saturday: () => 'Sat',
    sunday: () => 'Sun',
    weeks: n => `${n}w`
}
function getTimestamp(n, e) {
    const t = new Date(e?.now || Date.now()),
        r = e?.labels || DefaultTimestampLabels,
        o = isDate(n) ? n : new Date(n)
    if (absoluteDays(t) === absoluteDays(o)) return r.today(o.getUTCHours(), o.getUTCMinutes(), o.getUTCHours() > 12)
    if (absoluteDays(t) - absoluteDays(o) === 1) return r.yesterday()
    const i = getDayInfoFromDate(o)
    return absoluteDays(t) - absoluteDays(o) < 7
        ? r[i.day]()
        : r.weeks(Math.round((t.getTime() - o.getTime()) / 6048e5))
}
const DefaultTimeDeltaLabels = {
    now: () => 'A few seconds',
    seconds: n => `${n} seconds`,
    minutes: n => `${n} minutes`,
    hours: n => `${n} hours`,
    days: n => `${n} days`,
    weeks: n => `${n} weeks`
}
function getTimeDelta(n, e) {
    var t
    const r = (t = e?.now) !== null && t !== void 0 ? t : Date.now(),
        o = e?.labels || DefaultTimeDeltaLabels,
        i = exports.Types.isDate(n) ? n.getTime() : n
    let u = (r - i) / 1e3
    return u < 10
        ? o.now()
        : u < 120
        ? o.seconds(Math.floor(u))
        : ((u /= 60),
          u < 120
              ? o.minutes(Math.floor(u))
              : ((u /= 60),
                u < 48
                    ? o.hours(Math.floor(u))
                    : ((u /= 24), u < 14 ? o.days(Math.floor(u)) : ((u /= 7), o.weeks(Math.floor(u))))))
}
function secondsToHumanTime(n, e = DefaultTimeDeltaLabels) {
    return getTimeDelta(0, { now: n * 1e3, labels: e })
}
function countCycles(n, e, t) {
    var r, o, i
    const s = ((r = t?.now) !== null && r !== void 0 ? r : Date.now()) - n,
        c = Math.floor(s / e),
        f =
            e / ((o = t?.precision) !== null && o !== void 0 ? o : 1) -
            Math.ceil((s % e) / ((i = t?.precision) !== null && i !== void 0 ? i : 1))
    return { cycles: c, remaining: f }
}
const throttleTimers = {}
function throttle(n, e) {
    return !throttleTimers[n] || Date.now() > throttleTimers[n] ? ((throttleTimers[n] = Date.now() + e), !0) : !1
}
const timeUnits = { s: 1e3, m: 6e4, h: 36e5, d: 864e5 }
function timeSince(n, e, t) {
    return (
        (e = isDate(e) ? e.getTime() : e), (t = t ? (isDate(t) ? t.getTime() : t) : Date.now()), (t - e) / timeUnits[n]
    )
}
function getProgress(n, e, t, r) {
    r || (r = Date.now())
    const o = e / t,
        i = r - n,
        u = i / e,
        s = u * t,
        c = s - i
    return { deltaMs: i, progress: o, baseTimeMs: u, totalTimeMs: s, remainingTimeMs: c }
}
const dayNumberIndex = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
}
function mapDayNumber(n) {
    return { zeroBasedIndex: n, day: dayNumberIndex[n] }
}
function getDayInfoFromDate(n) {
    return mapDayNumber(n.getDay())
}
function getDayInfoFromDateTimeString(n) {
    return getDayInfoFromDate(new Date(n))
}
function seconds(n) {
    return n * 1e3
}
function minutes(n) {
    return n * 6e4
}
function hours(n) {
    return n * 36e5
}
const dateUnits = [
    ['ms', 1],
    ['milli', 1],
    ['millis', 1],
    ['millisecond', 1],
    ['milliseconds', 1],
    ['s', 1e3],
    ['sec', 1e3],
    ['second', 1e3],
    ['seconds', 1e3],
    ['m', 6e4],
    ['min', 6e4],
    ['minute', 6e4],
    ['minutes', 6e4],
    ['h', 36e5],
    ['hour', 36e5],
    ['hours', 36e5],
    ['d', 864e5],
    ['day', 864e5],
    ['days', 864e5],
    ['w', 6048e5],
    ['week', 6048e5],
    ['weeks', 6048e5]
]
function makeDate(n) {
    const e = parseFloat(n)
    if (isNaN(e)) throw Error('makeDate got NaN for input')
    const t = n.replace(/^-?[0-9.]+/, '').trim(),
        r = dateUnits.findIndex(o => o[0] === t.toLowerCase())
    return r === -1 ? e : e * dateUnits[r][1]
}
function getPreLine(n) {
    return n.replace(/ +/g, ' ').replace(/^ /gm, '')
}
const tinyCache = {}
async function getCached(n, e, t) {
    const r = Date.now(),
        o = tinyCache[n]
    if (o && o.validUntil > r) return o.value
    const i = await t(),
        u = r + e
    return (tinyCache[n] = { value: i, validUntil: u }), i
}
function invalidateCache(n) {
    delete tinyCache[n]
}
function joinUrl(...n) {
    return n
        .filter(e => e)
        .join('/')
        .replace(/(?<!:)\/+/g, '/')
}
function replaceBetweenStrings(n, e, t, r, o = !0) {
    const i = n.indexOf(e),
        u = n.indexOf(t, i + e.length)
    if (i === -1 || u === -1) throw Error('Start or end not found')
    return o ? n.substring(0, i + e.length) + r + n.substring(u) : n.substring(0, i) + r + n.substring(u + t.length)
}
function describeMarkdown(n) {
    let e = 'p'
    n.startsWith('#')
        ? ((e = 'h1'), (n = n.slice(1).trim()))
        : n.startsWith('-') && ((e = 'li'), (n = n.slice(1).trim()))
    const t = n[0] === n[0].toUpperCase(),
        r = /[.?!]$/.test(n),
        o = /:$/.test(n)
    return { type: e, isCapitalized: t, hasPunctuation: r, endsWithColon: o }
}
function isBalanced(n, e = '(', t = ')') {
    let r = 0,
        o = 0
    for (; o < n.length; )
        if ((n.startsWith(e, o) ? (r++, (o += e.length)) : n.startsWith(t, o) ? (r--, (o += t.length)) : o++, r < 0))
            return !1
    return e === t ? r % 2 === 0 : r === 0
}
function textToFormat(n) {
    n = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    let e = n.length
    for (; (n = n.replace(/(\w+)[\s,']+\w+/g, '$1')), n.length !== e; ) e = n.length
    return (
        (n = n.replaceAll(/[A-Z][a-zA-Z0-9]*/g, 'A')),
        (n = n.replaceAll(/[a-z][a-zA-Z0-9]*/g, 'a')),
        (n = n.replaceAll(/[\u4E00-\u9FA5]+/g, 'Z')),
        n
    )
}
function sortObject(n) {
    const t = Object.keys(n).sort((o, i) => o.localeCompare(i)),
        r = {}
    for (const o of t) r[o] = sortAny(n[o])
    return r
}
function sortArray(n) {
    const e = []
    return (
        n
            .sort((t, r) => JSON.stringify(sortAny(t)).localeCompare(JSON.stringify(sortAny(r))))
            .forEach(t => e.push(sortAny(t))),
        e
    )
}
function sortAny(n) {
    return Array.isArray(n) ? sortArray(n) : isObject(n) ? sortObject(n) : n
}
function deepEquals(n, e) {
    return JSON.stringify(sortAny(n)) === JSON.stringify(sortAny(e))
}
function deepEqualsEvery(...n) {
    for (let e = 1; e < n.length; e++) if (!deepEquals(n[e - 1], n[e])) return !1
    return !0
}
function safeParse(n) {
    try {
        return JSON.parse(n)
    } catch {
        return null
    }
}
function createSequence() {
    let n = 0
    return { next: () => n++ }
}
function createOscillator(n) {
    let e = 0
    return { next: () => n[e++ % n.length] }
}
function createStatefulToggle(n) {
    let e
    return t => {
        const r = t === n && e !== n
        return (e = t), r
    }
}
function organiseWithLimits(n, e, t, r, o) {
    const i = {}
    for (const u of Object.keys(e)) i[u] = []
    ;(i[r] = []), o && (n = n.sort(o))
    for (const u of n) {
        const s = u[t],
            c = e[s] ? s : r
        i[c].length >= e[c] ? i[r].push(u) : i[c].push(u)
    }
    return i
}
function diffKeys(n, e) {
    const t = Object.keys(n),
        r = Object.keys(e)
    return { uniqueToA: t.filter(o => !r.includes(o)), uniqueToB: r.filter(o => !t.includes(o)) }
}
function pickRandomKey(n) {
    const e = Object.keys(n)
    return e[Math.floor(Math.random() * e.length)]
}
function mapRandomKey(n, e) {
    const t = pickRandomKey(n)
    return (n[t] = e(n[t])), t
}
function fromObjectString(n) {
    return (
        (n = n.replace(
            /\r\n/g,
            `
`
        )),
        (n = n.replace(/(\w+)\((.+)\)/g, (e, t, r) => `${t}(${r.replaceAll(',', '&comma;')})`)),
        (n = n.replace(/(,)(\s+})/g, '$2')),
        (n = n.replace(/\.\.\..+?,/g, '')),
        (n = n.replace(/({\s+)([a-zA-Z]\w+),/g, "$1$2: '$2',")),
        (n = n.replace(/(,\s+)([a-zA-Z]\w+),/g, "$1$2: '$2',")),
        (n = n.replace(/:(.+)\?(.+):/g, (e, t, r) => `: (${t.trim()} && ${r.trim()}) ||`)),
        (n = n.replace(/([a-zA-Z0-9]+)( ?: ?{)/g, '"$1"$2')),
        (n = n.replace(/([a-zA-Z0-9]+) ?: ?(.+?)(,|\n|})/g, (e, t, r, o) => `"${t}":"${r.trim()}"${o}`)),
        (n = n.replace(/("'|'")/g, '"')),
        (n = n.replaceAll('&comma;', ',')),
        JSON.parse(n)
    )
}
const thresholds = [1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24, 1e27, 1e30, 1e9, 1e16, 1e18, 1e18, 1e18, 1e33],
    longNumberUnits = [
        'thousand',
        'million',
        'billion',
        'trillion',
        'quadrillion',
        'quintillion',
        'sextillion',
        'septillion',
        'octillion',
        'nonillion',
        'gwei',
        'bzz',
        'btc',
        'eth',
        'dai',
        'decillion'
    ],
    shortNumberUnits = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'gwei', 'bzz', 'eth', 'btc', 'dai', 'D']
function fromDecimals(n, e, t) {
    let r = n.length - e
    if (r <= 0) return '0.' + '0'.repeat(-r) + n + (t ? ' ' + t : '')
    let o = n.substring(0, r),
        i = n.substring(r)
    return o === '' && (o = '0'), o + '.' + i + (t ? ' ' + t : '')
}
function formatNumber(n, e) {
    var t, r
    const o = (t = e?.longForm) !== null && t !== void 0 ? t : !1,
        i = e?.unit ? ` ${e.unit}` : '',
        u = o ? longNumberUnits : shortNumberUnits,
        s = (r = e?.precision) !== null && r !== void 0 ? r : 1
    if (n < thresholds[0]) return `${n}${i}`
    for (let c = 0; c < thresholds.length - 1; c++)
        if (n < thresholds[c + 1]) return `${(n / thresholds[c]).toFixed(s)}${o ? ' ' : ''}${u[c]}${i}`
    return `${(n / thresholds[thresholds.length - 1]).toFixed(s)}${o ? ' ' : ''}${u[thresholds.length - 1]}${i}`
}
function makeNumber(n) {
    const e = parseFloat(n)
    if (isNaN(e)) throw Error('makeNumber got NaN for input')
    const t = n.replace(/^-?[0-9.]+/, '').trim(),
        r = shortNumberUnits.findIndex(o => o.toLowerCase() === t.toLowerCase())
    return r === -1 ? e : e * thresholds[r]
}
function clamp(n, e, t) {
    return n < e ? e : n > t ? t : n
}
function increment(n, e, t) {
    const r = n + e
    return r > t ? t : r
}
function decrement(n, e, t) {
    const r = n - e
    return r < t ? t : r
}
function runOn(n, e) {
    return e(n), n
}
function ifPresent(n, e) {
    n && e(n)
}
function mergeArrays(n, e) {
    const t = Object.keys(e)
    for (const r of t) Array.isArray(e[r]) && Array.isArray(n[r]) && pushAll(n[r], e[r])
}
function empty(n) {
    return n.splice(0, n.length), n
}
function removeEmptyArrays(n) {
    for (const e of Object.keys(n))
        (isEmptyArray(n[e]) || (Array.isArray(n[e]) && n[e].every(t => t == null))) && delete n[e]
    return n
}
function removeEmptyValues(n) {
    for (const e of Object.entries(n))
        (isUndefined(e[1]) || e[1] === null || (isString(e[1]) && isBlank(e[1]))) && delete n[e[0]]
    return n
}
function filterObjectKeys(n, e) {
    const t = {}
    for (const [r, o] of Object.entries(n)) e(r) && (t[r] = o)
    return t
}
function filterObjectValues(n, e) {
    const t = {}
    for (const [r, o] of Object.entries(n)) e(o) && (t[r] = o)
    return t
}
function mapObject(n, e) {
    const t = {}
    for (const r of Object.entries(n)) t[r[0]] = e(r[1])
    return t
}
async function rethrow(n, e) {
    try {
        return await n()
    } catch {
        throw e
    }
}
function setSomeOnObject(n, e, t) {
    typeof t < 'u' && t !== null && (n[e] = t)
}
function setSomeDeep(n, e, t, r) {
    const o = getDeep(t, r)
    typeof o > 'u' || o === null || setDeep(n, e, o)
}
function flip(n) {
    const e = {}
    for (const [t, r] of Object.entries(n)) e[r] = t
    return e
}
function getAllPermutations(n) {
    const e = Object.keys(n),
        t = e.map(s => n[s].length),
        r = t.reduce((s, c) => (s *= c))
    let o = 1
    const i = [1]
    for (let s = 0; s < t.length - 1; s++) (o *= t[s]), i.push(o)
    const u = []
    for (let s = 0; s < r; s++) {
        const c = {}
        for (let f = 0; f < e.length; f++) {
            const l = n[e[f]],
                a = Math.floor(s / i[f]) % l.length
            c[e[f]] = l[a]
        }
        u.push(c)
    }
    return u
}
function countTruthyValues(n) {
    return Object.values(n).filter(e => e).length
}
function getFlatNotation(n, e, t) {
    return n + (t ? '[' + e + ']' : (n.length ? '.' : '') + e)
}
function flattenInner(n, e, t, r, o) {
    if (!isObject(e)) return e
    for (const [i, u] of Object.entries(e)) {
        const s = getFlatNotation(t, i, r)
        Array.isArray(u)
            ? o
                ? flattenInner(n, u, s, !0, o)
                : (n[s] = u.map(c => flattenInner(Array.isArray(c) ? [] : {}, c, '', !1, o)))
            : isObject(u)
            ? flattenInner(n, u, s, !1, o)
            : (n[s] = u)
    }
    return n
}
function flatten(n, e = !1, t) {
    return flattenInner({}, n, t || '', !1, e)
}
function unflatten(n) {
    if (!isObject(n)) return n
    const e = Array.isArray(n) ? [] : {}
    for (const [t, r] of Object.entries(n))
        Array.isArray(r)
            ? setDeep(
                  e,
                  t,
                  r.map(o => unflatten(o))
              )
            : setDeep(e, t, r)
    return e
}
function match(n, e, t) {
    return e[n] ? e[n] : t
}
function indexArray(n, e) {
    const t = {}
    for (const r of n) {
        const o = e(r)
        t[o] = r
    }
    return t
}
function indexArrayToCollection(n, e) {
    const t = {}
    for (const r of n) {
        const o = e(r)
        t[o] || (t[o] = []), t[o].push(r)
    }
    return t
}
function splitBySize(n, e) {
    const t = []
    for (let r = 0; r < n.length; r += e) t.push(n.slice(r, r + e))
    return t
}
function splitByCount(n, e) {
    const t = Math.ceil(n.length / e),
        r = []
    for (let o = 0; o < n.length; o += t) r.push(n.slice(o, o + t))
    return r
}
function tokenizeByLength(n, e) {
    const t = [],
        r = Math.ceil(n.length / e)
    for (let o = 0; o < r; o++) t.push(n.slice(o * e, o * e + e))
    return t
}
function tokenizeByCount(n, e) {
    const t = Math.ceil(n.length / e)
    return tokenizeByLength(n, t)
}
function makeUnique(n, e) {
    return Object.values(indexArray(n, e))
}
function countUnique(n, e, t, r, o) {
    const i = e ? n.map(e) : n,
        u = {}
    for (const c of i) u[c] = (u[c] || 0) + 1
    const s = r ? sortObjectValues(u, o ? (c, f) => c[1] - f[1] : (c, f) => f[1] - c[1]) : u
    return t ? Object.keys(s) : s
}
function sortObjectValues(n, e) {
    return Object.fromEntries(Object.entries(n).sort(e))
}
function transformToArray(n) {
    const e = [],
        t = Object.keys(n),
        r = n[t[0]].length
    for (let o = 0; o < r; o++) {
        const i = {}
        for (const u of t) i[u] = n[u][o]
        e.push(i)
    }
    return e
}
function incrementMulti(n, e, t = 1) {
    for (const r of n) r[e] += t
}
function setMulti(n, e, t) {
    for (const r of n) r[e] = t
}
function group(n, e) {
    const t = []
    let r = []
    return (
        n.forEach((o, i) => {
            ;(i === 0 || !e(o, n[i - 1])) && ((r = []), t.push(r)), r.push(o)
        }),
        t
    )
}
function createBidirectionalMap() {
    return { map: new Map(), keys: [] }
}
function createTemporalBidirectionalMap() {
    return { map: new Map(), keys: [] }
}
function pushToBidirectionalMap(n, e, t, r = 100) {
    if (n.map.has(e)) {
        const o = n.keys.indexOf(e)
        n.keys.splice(o, 1)
    }
    if ((n.map.set(e, t), n.keys.push(e), n.keys.length > r)) {
        const o = n.keys.shift()
        o && n.map.delete(o)
    }
}
function unshiftToBidirectionalMap(n, e, t, r = 100) {
    if (n.map.has(e)) {
        const o = n.keys.indexOf(e)
        n.keys.splice(o, 1)
    }
    if ((n.map.set(e, t), n.keys.unshift(e), n.keys.length > r)) {
        const o = n.keys.shift()
        o && n.map.delete(o)
    }
}
function addToTemporalBidirectionalMap(n, e, t, r, o = 100) {
    pushToBidirectionalMap(n, e, { validUntil: Date.now() + r, data: t }, o)
}
function getFromTemporalBidirectionalMap(n, e) {
    const t = n.map.get(e)
    return t && t.validUntil > Date.now() ? t.data : null
}
function makeAsyncQueue(n = 1) {
    const e = [],
        t = []
    let r = 0
    async function o() {
        if (e.length > 0 && r < n) {
            r++
            const u = e.shift()
            try {
                u && (await u())
            } finally {
                if (--r === 0) for (; t.length > 0; ) t.shift()()
                o()
            }
        }
    }
    async function i() {
        return r
            ? new Promise(u => {
                  t.push(u)
              })
            : Promise.resolve()
    }
    return {
        enqueue(u) {
            e.push(u), o()
        },
        drain: i
    }
}
class Optional {
    constructor(e) {
        this.value = e
    }
    static of(e) {
        return new Optional(e)
    }
    static empty() {
        return new Optional(null)
    }
    map(e) {
        return new Optional(this.value ? e(this.value) : null)
    }
    ifPresent(e) {
        return this.value && e(this.value), this
    }
    orElse(e) {
        var t
        ;((t = this.value) !== null && t !== void 0) || e()
    }
}
exports.Optional = Optional
class Lazy {
    constructor(e) {
        ;(this.supplier = e), (this.value = null)
    }
    get() {
        return this.value || (this.value = this.supplier()), this.value
    }
}
exports.Lazy = Lazy
class AsyncLazy {
    constructor(e) {
        ;(this.supplier = e), (this.value = null)
    }
    async get() {
        return this.value || (this.value = await this.supplier()), this.value
    }
}
exports.AsyncLazy = AsyncLazy
function multicall(n) {
    return () => n.forEach(e => e())
}
function findInstance(n, e) {
    const t = n.find(r => r instanceof e)
    return Optional.of(t)
}
function filterInstances(n, e) {
    return n.filter(t => t instanceof e)
}
function interleave(n, e) {
    const t = [],
        r = Math.max(n.length, e.length)
    for (let o = 0; o < r; o++) n[o] && t.push(n[o]), e[o] && t.push(e[o])
    return t
}
function toggle(n, e) {
    return n.includes(e) ? n.filter(t => t !== e) : [...n, e]
}
class Node {
    constructor(e) {
        ;(this.value = e), (this.children = [])
    }
}
function createHierarchy(n, e, t, r, o = !1) {
    const i = new Map(),
        u = []
    n.forEach(c => {
        const f = new Node(c)
        i.set(c[e], f)
    }),
        n.forEach(c => {
            const f = i.get(c[e])
            if (!f) return
            const l = c[t]
            if (l) {
                const a = i.get(l)
                a && a.children.push(f)
            } else u.push(f)
        })
    const s = c => {
        c.children.sort((f, l) => {
            const a = f.value[r],
                h = l.value[r]
            return o ? h - a : a - h
        }),
            c.children.forEach(s)
    }
    return u.forEach(s), u
}
function log2Reduce(n, e) {
    if (Math.log2(n.length) % 1 !== 0) throw new Error('Array length must be a power of 2')
    let t = [...n]
    for (; t.length > 1; ) {
        const r = []
        for (let o = 0; o < t.length; o += 2) {
            const i = t[o + 1]
            r.push(e(t[o], i))
        }
        t = r
    }
    return t[0]
}
function partition(n, e) {
    if (n.length % e !== 0) throw Error('Bytes length must be a multiple of size')
    const t = []
    for (let r = 0; r < n.length; r += e) t.push(n.subarray(r, r + e))
    return t
}
function concatBytes(...n) {
    const e = n.reduce((o, i) => o + i.length, 0),
        t = new Uint8Array(e)
    let r = 0
    return (
        n.forEach(o => {
            t.set(o, r), (r += o.length)
        }),
        t
    )
}
function isPng(n) {
    return n[0] === 137 && n[1] === 80 && n[2] === 78 && n[3] === 71
}
function isJpg(n) {
    return n[0] === 255 && n[1] === 216
}
function isWebp(n) {
    return n[8] === 87 && n[9] === 69 && n[10] === 66 && n[11] === 80
}
function isImage(n) {
    return isPng(n) || isJpg(n) || isWebp(n)
}
function numberToUint64LE(n) {
    const e = new ArrayBuffer(8)
    return new DataView(e).setBigUint64(0, BigInt(n), !0), new Uint8Array(e)
}
function uint64LEToNumber(n) {
    const e = new DataView(n.buffer)
    return Number(e.getBigUint64(0, !0))
}
function numberToUint64BE(n) {
    const e = new ArrayBuffer(8)
    return new DataView(e).setBigUint64(0, BigInt(n), !1), new Uint8Array(e)
}
function uint64BEToNumber(n) {
    const e = new DataView(n.buffer)
    return Number(e.getBigUint64(0, !1))
}
class Uint8ArrayReader {
    constructor(e) {
        ;(this.cursor = 0), (this.buffer = e)
    }
    read(e) {
        const t = this.buffer.subarray(this.cursor, this.cursor + e)
        return (this.cursor += e), t
    }
    max() {
        return this.buffer.length - this.cursor
    }
}
class Uint8ArrayWriter {
    constructor(e) {
        ;(this.buffer = e), (this.cursor = 0)
    }
    write(e) {
        const t = Math.min(this.max(), e.max())
        return this.buffer.set(e.read(t), this.cursor), (this.cursor += t), t
    }
    max() {
        return this.buffer.length - this.cursor
    }
}
class Chunk {
    constructor(e, t, r = 0) {
        ;(this.span = r), (this.writer = new Uint8ArrayWriter(new Uint8Array(e))), (this.hashFn = t)
    }
    build() {
        return concatBytes(numberToUint64LE(this.span), this.writer.buffer)
    }
    hash() {
        const e = log2Reduce(partition(this.writer.buffer, 32), this.hashFn)
        return this.hashFn(numberToUint64LE(this.span), e)
    }
}
function merkleStart(n, e) {
    return [new Chunk(n, e)]
}
async function merkleElevate(n, e, t) {
    await e(n[t]),
        n[t + 1] || n.push(new Chunk(n[t].writer.buffer.length, n[t].hashFn, n[t].span)),
        merkleAppend(n, n[t].hash(), e, t + 1),
        (n[t] = new Chunk(n[t].writer.buffer.length, n[t].hashFn))
}
async function merkleAppend(n, e, t, r = 0) {
    n[r].writer.max() === 0 && (await merkleElevate(n, t, r))
    const o = new Uint8ArrayReader(e)
    for (; o.max() !== 0; ) {
        const i = n[r].writer.write(o)
        if (r === 0) for (let u = 0; u < n.length; u++) n[u].span += i
        n[r].writer.max() === 0 && o.max() > 0 && (await merkleElevate(n, t, r))
    }
    return n
}
async function merkleFinalize(n, e, t = 0) {
    return n[t + 1] ? (await merkleElevate(n, e, t), merkleFinalize(n, e, t + 1)) : (await e(n[t]), n[t])
}
function tickPlaybook(n) {
    if (n.length === 0) return null
    const e = n[0]
    return (
        e.ttlMax ? --e.ttl <= 0 && n.shift() : (e.ttlMax = e.ttl),
        { progress: (e.ttlMax - e.ttl) / e.ttlMax, data: e.data }
    )
}
function getArgument(n, e, t, r) {
    const o = n.findIndex(s => s === `--${e}` || s.startsWith(`--${e}=`)),
        i = n[o]
    if (!i) return (t || {})[r || e || ''] || null
    if (i.includes('=')) return i.split('=')[1]
    const u = n[o + 1]
    return u && !u.startsWith('-') ? u : (t || {})[r || e || ''] || null
}
function getNumberArgument(n, e, t, r) {
    const o = getArgument(n, e, t, r)
    if (!o) return null
    try {
        return makeNumber(o)
    } catch {
        throw new Error(`Invalid number argument ${e}: ${o}`)
    }
}
function getBooleanArgument(n, e, t, r) {
    const o = n.some(c => c.endsWith('-' + e)),
        i = getArgument(n, e, t, r)
    if (!i && o) return !0
    if (!i && !o) return null
    const u = ['true', '1', 'yes', 'y', 'on'],
        s = ['false', '0', 'no', 'n', 'off']
    if (u.includes(i.toLowerCase())) return !0
    if (s.includes(i.toLowerCase())) return !1
    throw Error(`Invalid boolean argument ${e}: ${i}`)
}
function requireStringArgument(n, e, t, r) {
    const o = getArgument(n, e, t, r)
    if (!o) throw new Error(`Missing argument ${e}`)
    return o
}
function requireNumberArgument(n, e, t, r) {
    const o = requireStringArgument(n, e, t, r)
    try {
        return makeNumber(o)
    } catch {
        throw new Error(`Invalid argument ${e}: ${o}`)
    }
}
function bringToFrontInPlace(n, e) {
    const t = n[e]
    n.splice(e, 1), n.unshift(t)
}
function bringToFront(n, e) {
    const t = [...n]
    return bringToFrontInPlace(t, e), t
}
function addPoint(n, e) {
    return { x: n.x + e.x, y: n.y + e.y }
}
function subtractPoint(n, e) {
    return { x: n.x - e.x, y: n.y - e.y }
}
function multiplyPoint(n, e) {
    return { x: n.x * e, y: n.y * e }
}
function normalizePoint(n) {
    const e = Math.sqrt(n.x * n.x + n.y * n.y)
    return { x: n.x / e, y: n.y / e }
}
function pushPoint(n, e, t) {
    return { x: n.x + Math.cos(e) * t, y: n.y + Math.sin(e) * t }
}
function getDistanceBetweenPoints(n, e) {
    return Math.sqrt((n.x - e.x) ** 2 + (n.y - e.y) ** 2)
}
function filterCoordinates(n, e, t = 'row-first') {
    const r = []
    if (t === 'column-first')
        for (let o = 0; o < n.length; o++) for (let i = 0; i < n[0].length; i++) e(o, i) && r.push({ x: o, y: i })
    else for (let o = 0; o < n[0].length; o++) for (let i = 0; i < n.length; i++) e(i, o) && r.push({ x: i, y: o })
    return r
}
function isHorizontalLine(n, e, t) {
    var r, o
    return (
        ((r = n[e + 1]) === null || r === void 0 ? void 0 : r[t]) &&
        ((o = n[e - 1]) === null || o === void 0 ? void 0 : o[t]) &&
        !n[e][t - 1] &&
        !n[e][t + 1]
    )
}
function isVerticalLine(n, e, t) {
    var r, o
    return (
        n[e][t + 1] &&
        n[e][t - 1] &&
        !(!((r = n[e - 1]) === null || r === void 0) && r[t]) &&
        !(!((o = n[e + 1]) === null || o === void 0) && o[t])
    )
}
function isLeftmost(n, e, t) {
    var r
    return !(!((r = n[e - 1]) === null || r === void 0) && r[t])
}
function isRightmost(n, e, t) {
    var r
    return !(!((r = n[e + 1]) === null || r === void 0) && r[t])
}
function isTopmost(n, e, t) {
    return !n[e][t - 1]
}
function isBottommost(n, e, t) {
    return !n[e][t + 1]
}
function getCorners(n, e, t) {
    var r, o, i, u, s, c, f, l
    const a = []
    return n[e][t]
        ? isHorizontalLine(n, e, t) || isVerticalLine(n, e, t)
            ? []
            : (!(!((s = n[e - 1]) === null || s === void 0) && s[t - 1]) &&
                  isLeftmost(n, e, t) &&
                  isTopmost(n, e, t) &&
                  a.push({ x: e, y: t }),
              !(!((c = n[e + 1]) === null || c === void 0) && c[t - 1]) &&
                  isRightmost(n, e, t) &&
                  isTopmost(n, e, t) &&
                  a.push({ x: e + 1, y: t }),
              !(!((f = n[e - 1]) === null || f === void 0) && f[t + 1]) &&
                  isLeftmost(n, e, t) &&
                  isBottommost(n, e, t) &&
                  a.push({ x: e, y: t + 1 }),
              !(!((l = n[e + 1]) === null || l === void 0) && l[t + 1]) &&
                  isRightmost(n, e, t) &&
                  isBottommost(n, e, t) &&
                  a.push({ x: e + 1, y: t + 1 }),
              a)
        : (!((r = n[e - 1]) === null || r === void 0) && r[t] && n[e][t - 1] && a.push({ x: e, y: t }),
          !((o = n[e + 1]) === null || o === void 0) && o[t] && n[e][t - 1] && a.push({ x: e + 1, y: t }),
          !((i = n[e - 1]) === null || i === void 0) && i[t] && n[e][t + 1] && a.push({ x: e, y: t + 1 }),
          !((u = n[e + 1]) === null || u === void 0) && u[t] && n[e][t + 1] && a.push({ x: e + 1, y: t + 1 }),
          a)
}
function findCorners(n, e, t, r) {
    const o = [
        { x: 0, y: 0 },
        { x: t, y: 0 },
        { x: 0, y: r },
        { x: t, y: r }
    ]
    for (let i = 0; i < n.length; i++)
        for (let u = 0; u < n[0].length; u++) {
            const s = getCorners(n, i, u)
            for (const c of s) o.some(f => f.x === c.x && f.y === c.y) || o.push(c)
        }
    return o.map(i => ({ x: i.x * e, y: i.y * e }))
}
function findLines(n, e) {
    const t = filterCoordinates(n, (c, f) => n[c][f] === 0 && n[c][f + 1] !== 0, 'row-first').map(c =>
            Object.assign(Object.assign({}, c), { dx: 1, dy: 0 })
        ),
        r = filterCoordinates(n, (c, f) => n[c][f] === 0 && n[c][f - 1] !== 0, 'row-first').map(c =>
            Object.assign(Object.assign({}, c), { dx: 1, dy: 0 })
        ),
        o = filterCoordinates(
            n,
            (c, f) => {
                var l
                return n[c][f] === 0 && ((l = n[c - 1]) === null || l === void 0 ? void 0 : l[f]) !== 0
            },
            'column-first'
        ).map(c => Object.assign(Object.assign({}, c), { dx: 0, dy: 1 })),
        i = filterCoordinates(
            n,
            (c, f) => {
                var l
                return n[c][f] === 0 && ((l = n[c + 1]) === null || l === void 0 ? void 0 : l[f]) !== 0
            },
            'column-first'
        ).map(c => Object.assign(Object.assign({}, c), { dx: 0, dy: 1 }))
    t.forEach(c => c.y++), i.forEach(c => c.x++)
    const u = group([...o, ...i], (c, f) => c.x === f.x && c.y - 1 === f.y),
        s = group([...r, ...t], (c, f) => c.y === f.y && c.x - 1 === f.x)
    return [...u, ...s]
        .map(c => ({ start: c[0], end: last(c) }))
        .map(c => ({
            start: multiplyPoint(c.start, e),
            end: multiplyPoint(addPoint(c.end, { x: c.start.dx, y: c.start.dy }), e)
        }))
}
function getAngleInRadians(n, e) {
    return Math.atan2(e.y - n.y, e.x - n.x)
}
function getSortedRayAngles(n, e) {
    return e.map(t => getAngleInRadians(n, t)).sort((t, r) => t - r)
}
function getLineIntersectionPoint(n, e, t, r) {
    const o = (r.y - t.y) * (e.x - n.x) - (r.x - t.x) * (e.y - n.y)
    if (o === 0) return null
    let i = n.y - t.y,
        u = n.x - t.x
    const s = (r.x - t.x) * i - (r.y - t.y) * u,
        c = (e.x - n.x) * i - (e.y - n.y) * u
    return (
        (i = s / o),
        (u = c / o),
        i > 0 && i < 1 && u > 0 && u < 1 ? { x: n.x + i * (e.x - n.x), y: n.y + i * (e.y - n.y) } : null
    )
}
function raycast(n, e, t) {
    const r = [],
        o = pushPoint(n, t, 1e4)
    for (const i of e) {
        const u = getLineIntersectionPoint(n, o, i.start, i.end)
        u && r.push(u)
    }
    return r.length
        ? r.reduce((i, u) => {
              const s = getDistanceBetweenPoints(n, u),
                  c = getDistanceBetweenPoints(n, i)
              return s < c ? u : i
          })
        : null
}
function raycastCircle(n, e, t) {
    const o = getSortedRayAngles(n, t),
        i = []
    for (const u of o) {
        const s = raycast(n, e, u - 0.001),
            c = raycast(n, e, u + 0.001)
        s && i.push(s), c && i.push(c)
    }
    return i
}
class PubSubChannel {
    constructor() {
        this.subscribers = []
    }
    subscribe(e) {
        return (
            this.subscribers.push(e),
            () => {
                this.subscribers = this.subscribers.filter(t => t !== e)
            }
        )
    }
    publish(e) {
        this.subscribers.forEach(t => t(e))
    }
}
;(exports.PubSubChannel = PubSubChannel),
    (exports.Binary = {
        hexToUint8Array,
        uint8ArrayToHex,
        base64ToUint8Array,
        uint8ArrayToBase64,
        base32ToUint8Array,
        uint8ArrayToBase32,
        log2Reduce,
        partition,
        concatBytes,
        merkleStart,
        merkleAppend,
        merkleFinalize,
        numberToUint64LE,
        uint64LEToNumber,
        numberToUint64BE,
        uint64BEToNumber
    }),
    (exports.Random = {
        intBetween,
        floatBetween,
        chance,
        signed: signedRandom,
        makeSeededRng,
        point: randomPoint,
        procs
    }),
    (exports.Arrays = {
        countUnique,
        makeUnique,
        splitBySize,
        splitByCount,
        index: indexArray,
        indexCollection: indexArrayToCollection,
        onlyOrThrow,
        onlyOrNull,
        firstOrThrow,
        firstOrNull,
        shuffle,
        initialize: initializeArray,
        initialize2D: initialize2DArray,
        rotate2D: rotate2DArray,
        containsShape,
        glue,
        pluck,
        pick,
        pickMany,
        pickManyUnique,
        pickWeighted,
        pickRandomIndices,
        pickGuaranteed,
        last,
        pipe,
        makePipe,
        sortWeighted,
        pushAll,
        unshiftAll,
        filterAndRemove,
        merge: mergeArrays,
        empty,
        pushToBucket,
        unshiftAndLimit,
        atRolling,
        group,
        createOscillator,
        organiseWithLimits,
        tickPlaybook,
        getArgument,
        getBooleanArgument,
        getNumberArgument,
        requireStringArgument,
        requireNumberArgument,
        bringToFront,
        bringToFrontInPlace,
        findInstance,
        filterInstances,
        interleave,
        toggle,
        createHierarchy,
        multicall
    }),
    (exports.System = { sleepMillis, forever, scheduleMany, waitFor, expandError, runAndSetInterval }),
    (exports.Numbers = {
        make: makeNumber,
        sum,
        average,
        median,
        getDistanceFromMidpoint,
        clamp,
        range,
        interpolate,
        createSequence,
        increment,
        decrement,
        format: formatNumber,
        fromDecimals,
        asMegabytes,
        convertBytes,
        hexToRgb,
        rgbToHex,
        haversineDistanceToMeters,
        roundToNearest,
        formatDistance,
        triangularNumber,
        searchFloat
    }),
    (exports.Promises = { raceFulfilled, invert: invertPromise, runInParallelBatches, makeAsyncQueue }),
    (exports.Dates = {
        getTimestamp,
        getTimeDelta,
        secondsToHumanTime,
        countCycles,
        isoDate,
        throttle,
        timeSince,
        dateTimeSlug,
        unixTimestamp,
        fromUtcString,
        fromMillis,
        getProgress,
        humanizeTime,
        humanizeProgress,
        createTimeDigits,
        mapDayNumber,
        getDayInfoFromDate,
        getDayInfoFromDateTimeString,
        seconds,
        minutes,
        hours,
        make: makeDate,
        normalizeTime,
        absoluteDays
    }),
    (exports.Objects = {
        safeParse,
        deleteDeep,
        getDeep,
        setDeep,
        incrementDeep,
        ensureDeep,
        replaceDeep,
        getFirstDeep,
        deepMergeInPlace,
        deepMerge2,
        deepMerge3,
        mapAllAsync,
        cloneWithJson,
        sortObject,
        sortArray,
        sortAny,
        deepEquals,
        deepEqualsEvery,
        runOn,
        ifPresent,
        zip,
        zipSum,
        removeEmptyArrays,
        removeEmptyValues,
        flatten,
        unflatten,
        match,
        sort: sortObjectValues,
        map: mapObject,
        filterKeys: filterObjectKeys,
        filterValues: filterObjectValues,
        rethrow,
        setSomeOnObject,
        setSomeDeep,
        flip,
        getAllPermutations,
        countTruthyValues,
        transformToArray,
        setMulti,
        incrementMulti,
        createBidirectionalMap,
        createTemporalBidirectionalMap,
        pushToBidirectionalMap,
        unshiftToBidirectionalMap,
        addToTemporalBidirectionalMap,
        getFromTemporalBidirectionalMap,
        createStatefulToggle,
        diffKeys,
        pickRandomKey,
        mapRandomKey,
        fromObjectString,
        toQueryString,
        parseQueryString,
        hasKey,
        selectMax,
        reposition,
        unwrapSingleKey,
        parseKeyValues
    }),
    (exports.Types = {
        isFunction,
        isObject,
        isStrictlyObject,
        isEmptyArray,
        isEmptyObject,
        isUndefined,
        isString,
        isNumber,
        isBoolean,
        isDate,
        isBlank,
        isId,
        isIntegerString,
        isHexString,
        isUrl,
        isNullable,
        asString,
        asHexString,
        asSafeString,
        asNumber,
        asInteger,
        asBoolean,
        asDate,
        asNullableString,
        asEmptiableString,
        asId,
        asTime,
        asArray,
        asObject,
        asNullableObject,
        asNumericDictionary,
        asUrl,
        asNullable,
        enforceObjectShape,
        enforceArrayShape,
        isPng,
        isJpg,
        isWebp,
        isImage
    }),
    (exports.Strings = {
        tokenizeByCount,
        tokenizeByLength,
        searchHex,
        searchSubstring,
        randomHex: randomHexString,
        randomLetter: randomLetterString,
        randomAlphanumeric: randomAlphanumericString,
        randomRichAscii: randomRichAsciiString,
        randomUnicode: randomUnicodeString,
        includesAny,
        slugify,
        enumify,
        escapeHtml,
        decodeHtmlEntities,
        after,
        afterLast,
        before,
        beforeLast,
        betweenWide,
        betweenNarrow,
        getPreLine,
        containsWord,
        containsWords,
        joinUrl,
        getFuzzyMatchScore,
        sortByFuzzyScore,
        splitOnce,
        splitAll,
        randomize,
        expand,
        shrinkTrim,
        capitalize,
        decapitalize,
        csvEscape,
        parseCsv,
        surroundInOut,
        getExtension,
        getBasename,
        normalizeEmail,
        normalizeFilename,
        parseFilename,
        camelToTitle,
        slugToTitle,
        slugToCamel,
        joinHumanly,
        findWeightedPair,
        extractBlock,
        extractAllBlocks,
        replaceBlocks,
        indexOfEarliest,
        lastIndexOfBefore,
        parseHtmlAttributes,
        readNextWord,
        resolveVariables,
        resolveVariableWithDefaultSyntax,
        resolveRemainingVariablesWithDefaults,
        isLetter,
        isDigit,
        isLetterOrDigit,
        isValidObjectPathCharacter,
        insert: insertString,
        indexOfRegex,
        lineMatches,
        linesMatchInOrder,
        represent,
        resolveMarkdownLinks,
        buildUrl,
        isChinese,
        replaceBetweenStrings,
        describeMarkdown,
        isBalanced,
        textToFormat,
        splitFormatting,
        splitHashtags,
        splitUrls,
        route,
        explodeReplace,
        generateVariants,
        hashCode,
        replaceWord,
        replacePascalCaseWords,
        stripHtml,
        breakLine,
        measureTextWidth,
        toLines,
        levenshteinDistance
    }),
    (exports.Assertions = { asEqual, asTrue, asTruthy, asFalse, asFalsy, asEither }),
    (exports.Cache = { get: getCached, invalidate: invalidateCache }),
    (exports.Vector = {
        addPoint,
        subtractPoint,
        multiplyPoint,
        normalizePoint,
        pushPoint,
        filterCoordinates,
        findCorners,
        findLines,
        raycast,
        raycastCircle,
        getLineIntersectionPoint
    })
