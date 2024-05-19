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
        exports.Optional =
            void 0)
async function invertPromise(t) {
    return new Promise((n, e) => t.then(e, n))
}
async function raceFulfilled(t) {
    return invertPromise(Promise.all(t.map(invertPromise)))
}
async function runInParallelBatches(t, n = 1) {
    const e = splitByCount(t, n),
        r = [],
        o = e.map(async i => {
            for (const s of i) r.push(await s())
        })
    return await Promise.all(o), r
}
async function sleepMillis(t) {
    return new Promise(n =>
        setTimeout(() => {
            n(!0)
        }, t)
    )
}
function shuffle(t, n = Math.random) {
    for (let e = t.length - 1; e > 0; e--) {
        const r = Math.floor(n() * (e + 1)),
            o = t[e]
        ;(t[e] = t[r]), (t[r] = o)
    }
    return t
}
function onlyOrThrow(t) {
    if (t.length === 1) return t[0]
    throw Error(`Expected exactly one element, actual: ${t.length}`)
}
function onlyOrNull(t) {
    return t.length === 1 ? t[0] : null
}
function firstOrNull(t) {
    return t.length > 0 ? t[0] : null
}
function firstOrThrow(t) {
    if (!t.length) throw Error('Received empty array')
    return t[0]
}
function initializeArray(t, n) {
    const e = []
    for (let r = 0; r < t; r++) e.push(n(r))
    return e
}
function rotate2DArray(t) {
    const n = []
    for (let e = 0; e < t[0].length; e++) {
        n.push([])
        for (let r = 0; r < t.length; r++) n[e].push(t[r][e])
    }
    return n
}
function initialize2DArray(t, n, e) {
    const r = []
    for (let o = 0; o < t; o++) {
        r.push([])
        for (let i = 0; i < n; i++) r[o].push(e)
    }
    return r
}
function containsShape(t, n, e, r) {
    if (e < 0 || r < 0 || r + n[0].length > t[0].length || e + n.length > t.length) return !1
    for (let o = 0; o < n.length; o++)
        for (let i = 0; i < n[o].length; i++) if (n[o][i] !== void 0 && t[e + o][r + i] !== n[o][i]) return !1
    return !0
}
function pickRandomIndices(t, n, e = Math.random) {
    return shuffle(range(0, t.length - 1), e).slice(0, n)
}
function pluck(t, n) {
    return t.map(e => e[n])
}
function makeSeededRng(t) {
    let n = t,
        e = 3405648695,
        r = 3735928559
    return function () {
        return (n += e), (e ^= n << 7), (n *= r), (r ^= n << 13), (n ^= e ^ r), (n >>> 0) / 4294967296
    }
}
function intBetween(t, n, e = Math.random) {
    return Math.floor(e() * (n - t + 1)) + t
}
function floatBetween(t, n, e = Math.random) {
    return e() * (n - t) + t
}
function signedRandom() {
    return Math.random() * 2 - 1
}
function containsPoint(t, n, e) {
    return n >= t.x && n < t.x + t.width && e >= t.y && e < t.y + t.height
}
function randomPoint(t, n, e, r = Math.random) {
    let o, i
    do (o = intBetween(0, t - 1, r)), (i = intBetween(0, n - 1, r))
    while (e && containsPoint(e, o, i))
    return [o, i]
}
function chance(t, n = Math.random) {
    return n() < t
}
function pick(t, n = Math.random) {
    return t[Math.floor(t.length * n())]
}
function pickMany(t, n, e = Math.random) {
    if (n > t.length) throw new Error(`Count (${n}) is greater than array length (${t.length})`)
    return pickRandomIndices(t, n, e).map(o => t[o])
}
function pickManyUnique(t, n, e, r = Math.random) {
    if (n > t.length) throw new Error(`Count (${n}) is greater than array length (${t.length})`)
    const o = []
    for (; o.length < n; ) {
        const i = pick(t, r)
        o.some(s => e(s, i)) || o.push(i)
    }
    return o
}
function pickGuaranteed(t, n, e, r, o, i = Math.random) {
    const s = t.filter(u => u !== n && u !== e),
        c = []
    for (n !== null && c.push(n); s.length && c.length < r; ) {
        const u = exports.Random.intBetween(0, s.length - 1, i)
        o(s[u], c) && c.push(s[u]), s.splice(u, 1)
    }
    return shuffle(c, i), { values: c, indexOfGuaranteed: n !== null ? c.indexOf(n) : -1 }
}
function last(t) {
    if (!t.length) throw Error('Received empty array')
    return t[t.length - 1]
}
function pipe(t, n, e) {
    return e(n.reduce((r, o) => o(r), t))
}
function makePipe(t, n) {
    return e => pipe(e, t, n)
}
function pickWeighted(t, n, e) {
    if ((isUndefined(e) && (e = Math.random()), t.length !== n.length)) throw new Error('Array length mismatch')
    let r = n.reduce((i, s) => i + s, 0)
    const o = e * r
    for (let i = 0; i < t.length - 1; i++) if (((r -= n[i]), o >= r)) return t[i]
    return last(t)
}
function sortWeighted(t, n, e = Math.random) {
    const r = n.map(i => e() * i),
        o = []
    for (let i = 0; i < t.length; i++) o.push([t[i], r[i]])
    return o.sort((i, s) => s[1] - i[1]).map(i => i[0])
}
function getDeep(t, n) {
    if (t == null) return null
    const e = n.split('.')
    let r = t
    for (const o of e) {
        if (r[o] === null || r[o] === void 0) return null
        r = r[o]
    }
    return r
}
function setDeep(t, n, e) {
    const r = n.split(/\.|\[/)
    let o = t
    for (let i = 0; i < r.length; i++) {
        const s = r[i],
            c = i < r.length - 1 && r[i + 1].includes(']'),
            f = s.includes(']') ? s.replace(/\[|\]/g, '') : s
        if (i === r.length - 1) return (o[f] = e), e
        isObject(o[f]) || (c ? (o[f] = []) : (o[f] = {})), (o = o[f])
    }
    return e
}
function incrementDeep(t, n, e = 1) {
    const r = getDeep(t, n) || 0
    return setDeep(t, n, r + e), r
}
function ensureDeep(t, n, e) {
    return getDeep(t, n) || setDeep(t, n, e)
}
function deleteDeep(t, n) {
    const e = beforeLast(n, '.'),
        r = afterLast(n, '.')
    if (!e || !r) return
    const o = getDeep(t, e)
    delete o[r]
}
function replaceDeep(t, n, e) {
    const r = getDeep(t, n)
    if (!r) throw new Error("Key '" + n + "' does not exist.")
    return setDeep(t, n, e), r
}
function getFirstDeep(t, n, e) {
    for (const r of n) {
        const o = getDeep(t, r)
        if (o) return o
    }
    if (e) {
        const r = Object.values(t)
        if (r.length) return r[0]
    }
    return null
}
async function forever(t, n, e) {
    for (;;) {
        try {
            await t()
        } catch (r) {
            e && e('Error in forever', r)
        }
        await sleepMillis(n)
    }
}
function asMegabytes(t) {
    return t / 1024 / 1024
}
function convertBytes(t) {
    return t >= 1024 * 1024 * 1024
        ? (t / 1024 / 1024 / 1024).toFixed(3) + ' GB'
        : t >= 1024 * 1024
        ? (t / 1024 / 1024).toFixed(3) + ' MB'
        : t >= 1024
        ? (t / 1024).toFixed(3) + ' KB'
        : t + ' B'
}
function hexToRgb(t) {
    const n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t.toLowerCase())
    if (!n) throw new Error('Invalid hex color: ' + t)
    return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
}
function rgbToHex(t) {
    return '#' + t.map(n => n.toString(16).padStart(2, '0')).join('')
}
function haversineDistanceToMeters(t, n, e, r) {
    const i = (t * Math.PI) / 180,
        s = (e * Math.PI) / 180,
        c = ((e - t) * Math.PI) / 180,
        u = ((r - n) * Math.PI) / 180,
        f = Math.sin(c / 2) * Math.sin(c / 2) + Math.cos(i) * Math.cos(s) * Math.sin(u / 2) * Math.sin(u / 2)
    return 6371e3 * (2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)))
}
function roundToNearest(t, n) {
    return Math.round(t / n) * n
}
function formatDistance(t) {
    return t > 1e3
        ? (t / 1e3).toFixed(0) + ' km'
        : t >= 500
        ? roundToNearest(t, 100) + ' m'
        : t >= 100
        ? roundToNearest(t, 50) + ' m'
        : roundToNearest(t, 10) + ' m'
}
function isObject(t, n = !0) {
    return !t ||
        (n && !isUndefined(t._readableState)) ||
        (n &&
            t.constructor &&
            (t.constructor.isBuffer || t.constructor.name == 'Uint8Array' || t.constructor.name === 'ArrayBuffer'))
        ? !1
        : typeof t == 'object'
}
function isStrictlyObject(t) {
    return isObject(t) && !Array.isArray(t)
}
function isEmptyArray(t) {
    return Array.isArray(t) && t.length === 0
}
function isEmptyObject(t) {
    return isStrictlyObject(t) && Object.keys(t).length === 0
}
function isUndefined(t) {
    return typeof t > 'u'
}
function isFunction(t) {
    return Object.prototype.toString.call(t) === '[object Function]'
}
function isString(t) {
    return Object.prototype.toString.call(t) === '[object String]'
}
function isNumber(t) {
    return typeof t == 'number' && isFinite(t)
}
function isBoolean(t) {
    return t === !0 || t === !1
}
function isDate(t) {
    return Object.prototype.toString.call(t) === '[object Date]'
}
function isBlank(t) {
    return !isString(t) || t.trim().length === 0
}
function isId(t) {
    return isNumber(t) && Number.isInteger(t) && t >= 1
}
function isIntegerString(t) {
    return isString(t) && t.match(/^-?\d+$/) !== null
}
function isHexString(t) {
    return isString(t) && t.match(/^(0x)?[0-9a-f]+$/i) !== null
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
        '\u{1F645}'
    ],
    hexAlphabet = '0123456789abcdef'
function randomLetterString(t, n = Math.random) {
    let e = ''
    for (let r = 0; r < t; r++) e += lowercaseAlphabet[Math.floor(n() * lowercaseAlphabet.length)]
    return e
}
function randomAlphanumericString(t, n = Math.random) {
    let e = ''
    for (let r = 0; r < t; r++) e += alphanumericAlphabet[Math.floor(n() * alphanumericAlphabet.length)]
    return e
}
function randomRichAsciiString(t, n = Math.random) {
    let e = ''
    for (let r = 0; r < t; r++) e += richAsciiAlphabet[Math.floor(n() * richAsciiAlphabet.length)]
    return e
}
function randomUnicodeString(t, n = Math.random) {
    let e = ''
    for (let r = 0; r < t; r++) e += unicodeTestingAlphabet[Math.floor(n() * unicodeTestingAlphabet.length)]
    return e
}
function searchHex(t, n) {
    const e = new RegExp(`[0-9a-f]{${n}}`, 'i'),
        r = t.match(e)
    return r ? r[0] : null
}
function searchSubstring(t, n, e = symbolsArray) {
    const r = splitAll(t, e)
    for (const o of r) if (n(o)) return o
    return null
}
function randomHexString(t, n = Math.random) {
    let e = ''
    for (let r = 0; r < t; r++) e += hexAlphabet[Math.floor(n() * hexAlphabet.length)]
    return e
}
function asString(t) {
    if (isBlank(t)) throw new TypeError('Expected string, got: ' + t)
    return t
}
function asSafeString(t) {
    if (
        !asString(t)
            .split('')
            .every(n => n === '_' || isLetterOrDigit(n))
    )
        throw new TypeError('Expected safe string, got: ' + t)
    return t
}
function asNumber(t) {
    if (isNumber(t)) return t
    if (!isString(t) || !t.match(/^-?\d+(\.\d+)?$/)) throw new TypeError('Expected number, got: ' + t)
    return parseFloat(t)
}
function asInteger(t) {
    return asNumber(t) | 0
}
function asBoolean(t) {
    if (t === 'true') return !0
    if (t === 'false') return !1
    if (!isBoolean(t)) throw new TypeError('Expected boolean, got: ' + t)
    return t
}
function asDate(t) {
    if (!isDate(t)) throw new TypeError('Expected date, got: ' + t)
    return t
}
function asNullableString(t) {
    return isBlank(t) ? null : t
}
function asEmptiableString(t) {
    if (!isString(t)) throw new TypeError('Expected string, got: ' + t)
    return t
}
function asId(t) {
    if (isId(t)) return t
    const n = parseInt(t, 10)
    if (!isId(n)) throw new TypeError('Expected id, got: ' + t)
    return n
}
function asTime(t) {
    if (!isString(t)) throw new TypeError('Expected time, got: ' + t)
    const n = t.split(':')
    if (n.length !== 2) throw new TypeError('Expected time, got: ' + t)
    const e = parseInt(n[0], 10),
        r = parseInt(n[1], 10)
    if (!isNumber(e) || !isNumber(r) || e < 0 || e > 23 || r < 0 || r > 59)
        throw new TypeError('Expected time, got: ' + t)
    return `${String(e).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}
function asArray(t) {
    if (!Array.isArray(t)) throw new TypeError('Expected array, got: ' + t)
    return t
}
function asObject(t) {
    if (!isStrictlyObject(t)) throw new TypeError('Expected object, got: ' + t)
    return t
}
function asNullableObject(t) {
    return t === null ? null : asObject(t)
}
function asNumericDictionary(t) {
    const n = asObject(t),
        e = Object.keys(n),
        r = Object.values(n)
    if (!e.every(isString) || !r.every(isNumber)) throw new TypeError('Expected numeric dictionary, got: ' + t)
    return n
}
function isUrl(t) {
    return isString(t) && t.match(/^https?:\/\/.+/) !== null
}
function asUrl(t) {
    if (!isUrl(t)) throw new TypeError('Expected url, got: ' + t)
    return t
}
function isNullable(t, n) {
    return isUndefined(n) || n === null ? !0 : t(n)
}
function asNullable(t, n) {
    return n === null || isUndefined(n) ? null : t(n)
}
function enforceObjectShape(t, n) {
    for (const [e, r] of Object.entries(n)) if (!r(t[e])) throw TypeError(`${e} in value does not exist or match shape`)
    for (const e of Object.keys(t)) if (!n[e]) throw TypeError(`${e} exists in value but not in shape`)
    return !0
}
function enforceArrayShape(t, n) {
    return t.every(e => enforceObjectShape(e, n))
}
function represent(t, n = 'json', e = 0) {
    if (isObject(t, !1)) {
        if (e > 1) return '[object Object]'
        if (n === 'json') {
            if (Array.isArray(t)) {
                const o = t.map(i => represent(i, 'json', e + 1))
                return e === 0 ? JSON.stringify(o) : o
            }
            const r = {}
            t.message && (r.message = represent(t.message, 'json', e + 1))
            for (const [o, i] of Object.entries(t)) r[o] = represent(i, 'json', e + 1)
            return e === 0 ? JSON.stringify(r) : r
        } else if (n === 'key-value') {
            const r = Object.keys(t)
            return (
                t.message && !r.includes('message') && r.unshift('message'),
                r.map(o => `${o}=${JSON.stringify(represent(t[o], 'json', e + 1))}`).join(' ')
            )
        }
    }
    return isUndefined(t) && (t = 'undefined'), e === 0 ? JSON.stringify(t) : t
}
function expandError(t, n) {
    if (isString(t)) return t
    const e = Object.keys(t)
    t.message && !e.includes('message') && e.push('message')
    const r = e.map(o => `${o}: ${t[o]}`).join('; ')
    return n && t.stack
        ? r +
              `
` +
              t.stack
        : r
}
function deepMergeInPlace(t, n) {
    if (isStrictlyObject(t) && isStrictlyObject(n))
        for (const e in n)
            isStrictlyObject(n[e])
                ? (t[e] || (t[e] = {}), deepMergeInPlace(t[e], n[e]))
                : Array.isArray(n[e])
                ? (t[e] = [...n[e]])
                : ((n[e] !== null && n[e] !== void 0) || t[e] === null || t[e] === void 0) && (t[e] = n[e])
    return t
}
function deepMerge2(t, n) {
    const e = {}
    return deepMergeInPlace(e, t), deepMergeInPlace(e, n), e
}
function deepMerge3(t, n, e) {
    const r = {}
    return deepMergeInPlace(r, t), deepMergeInPlace(r, n), deepMergeInPlace(r, e), r
}
function zip(t, n) {
    const e = {}
    for (const r of t) for (const o of Object.keys(r)) e[o] ? (e[o] = n(e[o], r[o])) : (e[o] = r[o])
    return e
}
function zipSum(t) {
    return zip(t, (n, e) => n + e)
}
function pushToBucket(t, n, e) {
    t[n] || (t[n] = []), t[n].push(e)
}
function unshiftAndLimit(t, n, e) {
    for (t.unshift(n); t.length > e; ) t.pop()
}
function atRolling(t, n) {
    let e = n % t.length
    return e < 0 && (e += t.length), t[e]
}
function pushAll(t, n) {
    Array.prototype.push.apply(t, n)
}
function unshiftAll(t, n) {
    Array.prototype.unshift.apply(t, n)
}
async function mapAllAsync(t, n) {
    const e = []
    for (const r of t) e.push(await n(r))
    return e
}
function glue(t, n) {
    const e = []
    for (let r = 0; r < t.length; r++) e.push(t[r]), r < t.length - 1 && (isFunction(n) ? e.push(n()) : e.push(n))
    return e
}
function asEqual(t, n) {
    if (t !== n) throw Error(`Expected [${t}] to equal [${n}]`)
    return [t, n]
}
function asTrue(t) {
    if (t !== !0) throw Error(`Expected [true], got: [${t}]`)
    return t
}
function asTruthy(t) {
    if (!t) throw Error(`Expected truthy value, got: [${t}]`)
    return t
}
function asFalse(t) {
    if (t !== !1) throw Error(`Expected [false], got: [${t}]`)
    return t
}
function asFalsy(t) {
    if (t) throw Error(`Expected falsy value, got: [${t}]`)
    return t
}
function asEither(t, n) {
    if (!n.includes(t)) throw Error(`Expected any of [${n.join(', ')}], got: [${t}]`)
    return t
}
function scheduleMany(t, n) {
    for (let e = 0; e < t.length; e++) {
        const r = t[e],
            o = n[e],
            i = Math.max(0, o.getTime() - Date.now())
        setTimeout(r, i)
    }
}
function interpolate(t, n, e) {
    return t + (n - t) * e
}
function sum(t) {
    return t.reduce((n, e) => n + e, 0)
}
function average(t) {
    return t.reduce((n, e) => n + e, 0) / t.length
}
function median(t) {
    const n = [...t].sort((r, o) => r - o),
        e = Math.floor(n.length / 2)
    return n.length % 2 === 0 ? (n[e] + n[e - 1]) / 2 : n[e]
}
function getDistanceFromMidpoint(t, n) {
    return t - (n - 1) / 2
}
function range(t, n) {
    const e = []
    for (let r = t; r <= n; r++) e.push(r)
    return e
}
function includesAny(t, n) {
    return n.some(e => t.includes(e))
}
function isChinese(t) {
    return /^[\u4E00-\u9FA5]+$/.test(t)
}
function slugify(t, n = () => !1) {
    return t
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split('')
        .map(e => (/[a-z0-9]/.test(e) || n(e) ? e : '-'))
        .join('')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}
function camelToTitle(t) {
    return capitalize(t.replace(/([A-Z])/g, ' $1'))
}
function slugToTitle(t) {
    return t.split('-').map(capitalize).join(' ')
}
function slugToCamel(t) {
    return decapitalize(t.split('-').map(capitalize).join(''))
}
function joinHumanly(t, n = ', ', e = ' and ') {
    return !t || !t.length
        ? ''
        : t.length === 1
        ? t[0]
        : t.length === 2
        ? `${t[0]}${e}${t[1]}`
        : `${t.slice(0, t.length - 1).join(n)}${e}${t[t.length - 1]}`
}
function surroundInOut(t, n) {
    return n + t.split('').join(n) + n
}
function enumify(t) {
    return slugify(t).replace(/-/g, '_').toUpperCase()
}
function getFuzzyMatchScore(t, n) {
    if (n.length === 0) return 0
    const e = t.toLowerCase(),
        r = n.toLowerCase()
    return t === n
        ? 1e4
        : e.startsWith(r)
        ? 1e4 - t.length
        : e.includes(r)
        ? 5e3 - t.length
        : new RegExp('.*' + r.split('').join('.*') + '.*').test(e)
        ? 1e3 - t.length
        : 0
}
function sortByFuzzyScore(t, n) {
    return t.filter(e => getFuzzyMatchScore(e, n)).sort((e, r) => getFuzzyMatchScore(r, n) - getFuzzyMatchScore(e, n))
}
function escapeHtml(t) {
    return t.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
const htmlEntityMap = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&gt;': '>', '&lt;': '<' }
function decodeHtmlEntities(t) {
    let n = t
        .replace(/&#(\d+);/g, (e, r) => String.fromCharCode(r))
        .replace(/&#x(\d+);/g, (e, r) => String.fromCharCode(parseInt(r, 16)))
    for (const [e, r] of Object.entries(htmlEntityMap)) n = n.replaceAll(e, r)
    return n
}
function before(t, n) {
    const e = t.indexOf(n)
    return e === -1 ? null : t.slice(0, e)
}
function after(t, n) {
    const e = t.indexOf(n)
    return e === -1 ? null : t.slice(e + n.length)
}
function beforeLast(t, n) {
    const e = t.lastIndexOf(n)
    return e === -1 ? null : t.slice(0, e)
}
function afterLast(t, n) {
    const e = t.lastIndexOf(n)
    return e === -1 ? null : t.slice(e + n.length)
}
function betweenWide(t, n, e) {
    const r = beforeLast(t, e)
    return r ? after(r, n) : null
}
function betweenNarrow(t, n, e) {
    const r = after(t, n)
    return r ? before(r, e) : null
}
function splitOnce(t, n, e = !1) {
    const r = e ? t.lastIndexOf(n) : t.indexOf(n)
    return r === -1 ? (e ? [null, t] : [t, null]) : [t.slice(0, r), t.slice(r + n.length)]
}
function splitAll(t, n) {
    let e = [t]
    for (const r of n) e = e.flatMap(o => o.split(r))
    return e.filter(r => r)
}
function getExtension(t) {
    const n = last(t.split(/\\|\//g)),
        e = n.lastIndexOf('.', n.length - 1)
    return e <= 0 ? '' : n.slice(e + 1)
}
function getBasename(t) {
    const n = last(t.split(/\\|\//g)),
        e = n.lastIndexOf('.', n.length - 1)
    return e <= 0 ? n : n.slice(0, e)
}
function normalizeEmail(t) {
    let [n, e] = t.split('@')
    n = n.replaceAll('.', '').toLowerCase()
    const [r] = n.split('+')
    if (!r || !e || e.indexOf('.') === -1 || e.indexOf('.') === e.length - 1) throw new Error('Invalid email')
    return `${r}@${e.toLowerCase()}`
}
function normalizeFilename(t) {
    const n = getBasename(t),
        e = getExtension(t)
    return e ? `${n}.${e}` : n
}
function parseFilename(t) {
    const n = getBasename(t),
        e = getExtension(t)
    return { basename: n, extension: e, filename: e ? `${n}.${e}` : n }
}
function randomize(t, n = Math.random) {
    return t.replace(/\{(.+?)\}/g, (e, r) => pick(r.split('|'), n))
}
function expand(t) {
    const n = /\{(.+?)\}/,
        e = t.match(n)
    if (!e || !e.index) return [t]
    const r = e[1].split(','),
        o = t.slice(0, e.index),
        i = t.slice(e.index + e[0].length)
    let s = []
    for (const c of r) {
        const u = expand(o + c + i)
        s = s.concat(u)
    }
    return s
}
function shrinkTrim(t) {
    return t.replace(/\s+/g, ' ').replace(/\s$|^\s/g, '')
}
function capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1)
}
function decapitalize(t) {
    return t.charAt(0).toLowerCase() + t.slice(1)
}
function isLetter(t) {
    if (!t) return !1
    const n = t.charCodeAt(0)
    return (n >= 65 && n <= 90) || (n >= 97 && n <= 122)
}
function isDigit(t) {
    if (!t) return !1
    const n = t.charCodeAt(0)
    return n >= 48 && n <= 57
}
function isLetterOrDigit(t) {
    return isLetter(t) || isDigit(t)
}
const wordBreakCharacters = ` 
	\r.,?!:;"'\`(){}[]~@#$%^&*-+=|<>/\\`.split('')
function isWordBreakCharacter(t) {
    return wordBreakCharacters.includes(t)
}
function isValidObjectPathCharacter(t) {
    return isLetterOrDigit(t) || t === '.' || t === '[' || t === ']' || t === '_'
}
function insertString(t, n, e, r, o) {
    return t.slice(0, n) + r + t.slice(n, n + e) + o + t.slice(n + e)
}
function indexOfRegex(t, n, e = 0) {
    const r = n.exec(t.slice(e))
    return r ? { index: r.index, match: r[0] } : null
}
function lineMatches(t, n, e = !0) {
    if (!e) return n.every(o => (o instanceof RegExp ? o.test(t) : t.indexOf(o, 0) !== -1))
    let r = 0
    for (const o of n)
        if (o instanceof RegExp) {
            const i = indexOfRegex(t, o, r)
            if (!i) return !1
            r = i.index + i.match.length
        } else {
            const i = t.indexOf(o, r)
            if (i === -1) return !1
            r = i + o.length
        }
    return !0
}
function linesMatchInOrder(t, n, e = !0) {
    let r = 0
    for (const o of n) {
        let i = !1
        for (; !i && r < t.length; ) lineMatches(t[r], o, e) && (i = !0), r++
        if (!i) return !1
    }
    return !0
}
function csvEscape(t) {
    return t.match(/"|,/) ? `"${t.replace(/"/g, '""')}"` : t
}
function indexOfEarliest(t, n, e = 0) {
    let r = -1
    for (const o of n) {
        const i = t.indexOf(o, e)
        i !== -1 && (r === -1 || i < r) && (r = i)
    }
    return r
}
function indexOfWordBreak(t, n = 0) {
    for (let e = n; e < t.length; e++) if (isWordBreakCharacter(t[e])) return e
    return -1
}
function indexOfHashtag(t, n = 0) {
    for (let e = n; e < t.length; e++) if (t[e] === '#' && isLetterOrDigit(t[e + 1])) return e
    return -1
}
function lastIndexOfBefore(t, n, e = 0) {
    return t.slice(0, e).lastIndexOf(n)
}
function findWeightedPair(t, n = 0, e = '{', r = '}') {
    let o = 1
    for (let i = n; i < t.length; i++)
        if (t.slice(i, i + r.length) === r) {
            if (--o === 0) return i
        } else t.slice(i, i + e.length) === e && o++
    return -1
}
function extractBlock(t, n) {
    const e = n.wordBoundary
        ? indexOfEarliest(
              t,
              [
                  `${n.opening} `,
                  `${n.opening}
`
              ],
              n.start || 0
          )
        : t.indexOf(n.opening, n.start || 0)
    if (e === -1) return null
    const r = findWeightedPair(t, e + n.opening.length, n.opening, n.closing)
    return r === -1 ? null : n.exclusive ? t.slice(e + n.opening.length, r) : t.slice(e, r + n.closing.length)
}
function extractAllBlocks(t, n) {
    const e = []
    let r = n.wordBoundary
        ? indexOfEarliest(
              t,
              [
                  `${n.opening} `,
                  `${n.opening}
`
              ],
              n.start || 0
          )
        : t.indexOf(n.opening, n.start || 0)
    for (;;) {
        if (r === -1) return e
        const o = extractBlock(t, Object.assign(Object.assign({}, n), { start: r }))
        if (!o) return e
        e.push(o),
            (r = n.wordBoundary
                ? indexOfEarliest(
                      t,
                      [
                          `${n.opening} `,
                          `${n.opening}
`
                      ],
                      r + o.length
                  )
                : t.indexOf(n.opening, r + o.length))
    }
}
function replaceBlocks(t, n, e) {
    let r = 0
    for (;;) {
        const o = exports.Strings.extractBlock(t, Object.assign(Object.assign({}, e), { start: r }))
        if (!o) return t
        const i = n(o)
        ;(r = t.indexOf(o, r) + i.length), (t = t.replace(o, i))
    }
}
function splitFormatting(t, n) {
    const e = []
    let r = 0
    for (; r < t.length; ) {
        const o = t.indexOf(n, r)
        if (o === -1) {
            e.push({ string: t.slice(r), symbol: null })
            break
        }
        const i = t.indexOf(n, o + n.length)
        if ((o > r && i !== -1 && e.push({ string: t.slice(r, o), symbol: null }), i === -1)) {
            e.push({ string: t.slice(r), symbol: null })
            break
        }
        e.push({ string: t.slice(o + n.length, i), symbol: n }), (r = i + n.length)
    }
    return e
}
function splitHashtags(t) {
    const n = []
    let e = 0
    for (; e < t.length; ) {
        const r = indexOfHashtag(t, e)
        if (r === -1) {
            n.push({ string: t.slice(e), symbol: null })
            break
        }
        const o = indexOfWordBreak(t, r + 1)
        if (o === -1) {
            n.push({ string: t.slice(e, r), symbol: null }), n.push({ string: t.slice(r + 1), symbol: '#' })
            break
        }
        r > e && n.push({ string: t.slice(e, r), symbol: null }),
            n.push({ string: t.slice(r + 1, o), symbol: '#' }),
            (e = o)
    }
    return n
}
function splitUrls(t) {
    const n = []
    let e = 0
    for (; e < t.length; ) {
        const r = indexOfEarliest(t, ['http://', 'https://'], e)
        if (r === -1) {
            n.push({ string: t.slice(e), symbol: null })
            break
        }
        const o = indexOfEarliest(
            t,
            [
                ' ',
                `
`
            ],
            r
        )
        if (o === -1) {
            r > e && n.push({ string: t.slice(e, r), symbol: null }), n.push({ string: t.slice(r), symbol: 'http' })
            break
        }
        r > e && n.push({ string: t.slice(e, r), symbol: null }),
            n.push({ string: t.slice(r, o), symbol: 'http' }),
            (e = o)
    }
    return n
}
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
function base64ToUint8Array(t) {
    let n = 0
    t.charAt(t.length - 1) === '=' && (n++, t.charAt(t.length - 2) === '=' && n++)
    const e = (t.length * 6) / 8 - n,
        r = new Uint8Array(e)
    let o = 0,
        i = 0
    for (; o < t.length; ) {
        const s = BASE64_CHARS.indexOf(t.charAt(o++)),
            c = BASE64_CHARS.indexOf(t.charAt(o++)),
            u = BASE64_CHARS.indexOf(t.charAt(o++)),
            f = BASE64_CHARS.indexOf(t.charAt(o++)),
            l = (s << 2) | (c >> 4),
            a = ((c & 15) << 4) | (u >> 2),
            h = ((u & 3) << 6) | f
        ;(r[i++] = l), i < e && (r[i++] = a), i < e && (r[i++] = h)
    }
    return r
}
function uint8ArrayToBase64(t) {
    let n = '',
        e = 0
    for (let r = 0; r < t.length; r += 3) {
        const o = t[r],
            i = t[r + 1],
            s = t[r + 2],
            c = o >> 2,
            u = ((o & 3) << 4) | (i >> 4),
            f = ((i & 15) << 2) | (s >> 6),
            l = s & 63
        ;(n += BASE64_CHARS[c] + BASE64_CHARS[u]),
            r + 1 < t.length ? (n += BASE64_CHARS[f]) : e++,
            r + 2 < t.length ? (n += BASE64_CHARS[l]) : e++
    }
    return e && (n += e === 1 ? '=' : '=='), n
}
function hexToUint8Array(t) {
    t.startsWith('0x') && (t = t.slice(2))
    const n = t.length / 2,
        e = new Uint8Array(n)
    for (let r = 0; r < n; r++) {
        const o = parseInt(t.slice(r * 2, r * 2 + 2), 16)
        e[r] = o
    }
    return e
}
function uint8ArrayToHex(t) {
    return Array.from(t)
        .map(n => n.toString(16).padStart(2, '0'))
        .join('')
}
function route(t, n) {
    const e = t.split('/').filter(i => i),
        r = n.split('/').filter(i => i)
    if (e.length !== r.length) return null
    const o = {}
    for (let i = 0; i < e.length; i++) {
        const s = e[i]
        if (s.startsWith(':')) o[s.slice(1)] = r[i]
        else if (s !== r[i]) return null
    }
    return o
}
function explodeReplace(t, n, e) {
    const r = []
    for (const o of e) o !== n && r.push(t.replace(n, o))
    return r
}
function generateVariants(t, n, e, r = Math.random) {
    const o = exports.Arrays.shuffle(
            n.map(s => ({
                variants: exports.Arrays.shuffle(
                    s.variants.map(c => c),
                    r
                ),
                avoid: s.avoid
            })),
            r
        ),
        i = []
    for (const s of o) {
        const c = s.variants.filter(f => f !== s.avoid),
            u = c.find(f => t.includes(f))
        if (u && (pushAll(i, explodeReplace(t, u, c)), i.length >= e)) break
    }
    if (i.length < e)
        for (const s of o) {
            const c = s.variants.find(u => t.includes(u))
            if (c && (pushAll(i, explodeReplace(t, c, s.variants)), i.length >= e)) break
        }
    return i.slice(0, e)
}
function hashCode(t) {
    let n = 0
    for (let e = 0; e < t.length; e++) (n = (n << 5) - n + t.charCodeAt(e)), (n |= 0)
    return n
}
function replaceWord(t, n, e, r = !1) {
    const o = new RegExp(r ? `(?<=\\s|^)${n}(?=\\s|$)` : `\\b${n}\\b`, 'g')
    return t.replace(o, e)
}
function replacePascalCaseWords(t, n) {
    const e = /\b[A-Z][a-zA-Z0-9]*\b/g
    return t.replace(e, r => (r.toUpperCase() === r ? r : n(r)))
}
function stripHtml(t) {
    return t.replace(/<[^>]*>/g, '')
}
function breakLine(t) {
    const n = t.lastIndexOf(' ')
    if (n === -1) return { line: t, rest: '' }
    const e = t.slice(0, n),
        r = t.slice(n + 1)
    return { line: e, rest: r }
}
function toLines(t, n, e = {}) {
    const r = []
    let o = '',
        i = 0
    for (let s = 0; s < t.length; s++) {
        const c = t[s],
            u = e[c] || 1
        if (((o += c), (i += u), i > n)) {
            const { line: f, rest: l } = breakLine(o)
            r.push(f),
                (o = l),
                (i = l
                    .split('')
                    .map(a => e[a] || 1)
                    .reduce((a, h) => a + h, 0))
        }
    }
    return o && r.push(o), r
}
function levenshteinDistance(t, n) {
    const e = []
    for (let r = 0; r <= t.length; r++) e[r] = [r]
    for (let r = 0; r <= n.length; r++) e[0][r] = r
    for (let r = 1; r <= t.length; r++)
        for (let o = 1; o <= n.length; o++) {
            const i = t[r - 1] === n[o - 1] ? 0 : 1
            e[r][o] = Math.min(e[r - 1][o] + 1, e[r][o - 1] + 1, e[r - 1][o - 1] + i)
        }
    return e[t.length][n.length]
}
function containsWord(t, n) {
    return new RegExp(`\\b${n}\\b`).test(t)
}
function containsWords(t, n, e) {
    return e === 'any' ? n.some(r => containsWord(t, r)) : n.every(r => containsWord(t, r))
}
function parseHtmlAttributes(t) {
    const n = {},
        e = t.match(/([a-z\-]+)="([^"]+)"/g)
    if (e)
        for (const r of e) {
            const [o, i] = splitOnce(r, '=')
            n[o] = i.slice(1, i.length - 1)
        }
    return n
}
function readNextWord(t, n, e = []) {
    let r = ''
    for (; n < t.length && (isLetterOrDigit(t[n]) || e.includes(t[n])); ) r += t[n++]
    return r
}
function resolveVariables(t, n, e = '$', r = ':') {
    for (const o in n) t = resolveVariableWithDefaultSyntax(t, o, n[o], e, r)
    return (t = resolveRemainingVariablesWithDefaults(t)), t
}
function resolveVariableWithDefaultSyntax(t, n, e, r = '$', o = ':') {
    if (e === '') return t
    let i = t.indexOf(`${r}${n}`)
    for (; i !== -1; ) {
        if (t[i + n.length + 1] === o)
            if (t[i + n.length + 2] === o) t = t.replace(`${r}${n}${o}${o}`, e)
            else {
                const c = readNextWord(t, i + n.length + 2, ['_'])
                t = t.replace(`${r}${n}${o}${c}`, e)
            }
        else t = t.replace(`${r}${n}`, e)
        i = t.indexOf(`${r}${n}`, i + e.length)
    }
    return t
}
function resolveRemainingVariablesWithDefaults(t, n = '$', e = ':') {
    let r = t.indexOf(n)
    for (; r !== -1; ) {
        const o = readNextWord(t, r + 1)
        if (t[r + o.length + 1] === e)
            if (t[r + o.length + 2] === e) t = t.replace(`${n}${o}${e}${e}`, '')
            else {
                const s = readNextWord(t, r + o.length + 2)
                t = t.replace(`${n}${o}${e}${s}`, s)
            }
        r = t.indexOf(n, r + 1)
    }
    return t
}
function resolveMarkdownLinks(t, n) {
    let e = t.indexOf('](')
    for (; e !== -1; ) {
        const r = lastIndexOfBefore(t, '[', e),
            o = t.indexOf(')', e)
        if (r !== -1 && o !== -1) {
            const [i, s] = t.slice(r + 1, o).split(']('),
                c = n(i, s)
            t = t.slice(0, r) + c + t.slice(o + 1)
        }
        e = t.indexOf('](', e + 1)
    }
    return t
}
function toQueryString(t, n = !0) {
    const e = Object.entries(t)
        .filter(([r, o]) => o != null)
        .map(([r, o]) => `${r}=${encodeURIComponent(o)}`)
        .join('&')
    return e ? (n ? '?' : '') + e : ''
}
function parseQueryString(t) {
    const n = {},
        e = t.split('&')
    for (const r of e) {
        const [o, i] = r.split('=')
        o && i && (n[o] = decodeURIComponent(i))
    }
    return n
}
function hasKey(t, n) {
    return Object.prototype.hasOwnProperty.call(t, n)
}
function selectMax(t, n) {
    let e = null,
        r = -1 / 0
    for (const [o, i] of Object.entries(t)) {
        const s = n(i)
        s > r && ((r = s), (e = o))
    }
    return e ? [e, t[e]] : null
}
function reposition(t, n, e, r) {
    const o = t.find(s => s[n] === e),
        i = t.find(s => s[n] === e + r)
    o && i ? ((o[n] = e + r), (i[n] = e)) : o && (o[n] = e + r),
        t.sort((s, c) => asNumber(s[n]) - asNumber(c[n])),
        t.forEach((s, c) => (s[n] = c + 1))
}
function buildUrl(t, n, e) {
    return joinUrl(t, n) + toQueryString(e || {})
}
function parseCsv(t, n = ',', e = '"') {
    const r = []
    let o = '',
        i = !1
    const s = t.split('')
    for (const c of s) c === n && !i ? (r.push(o), (o = '')) : c === e && ((!o && !i) || i) ? (i = !i) : (o += c)
    return r.push(o), r
}
function humanizeProgress(t) {
    return `[${Math.floor(t.progress * 100)}%] ${humanizeTime(t.deltaMs)} out of ${humanizeTime(
        t.totalTimeMs
    )} (${humanizeTime(t.remainingTimeMs)} left) [${Math.round(t.baseTimeMs)} ms each]`
}
async function waitFor(t, n, e) {
    for (let r = 0; r < e; r++) {
        try {
            if (await t()) return !0
        } catch {}
        r < e - 1 && (await sleepMillis(n))
    }
    return !1
}
function filterAndRemove(t, n) {
    const e = []
    for (let r = t.length - 1; r >= 0; r--) n(t[r]) && e.push(t.splice(r, 1)[0])
    return e
}
function cloneWithJson(t) {
    return JSON.parse(JSON.stringify(t))
}
function unixTimestamp(t) {
    return Math.ceil((t || Date.now()) / 1e3)
}
function isoDate(t) {
    return (t || new Date()).toISOString().slice(0, 10)
}
function dateTimeSlug(t) {
    return (t || new Date()).toISOString().slice(0, 19).replace(/T|:/g, '-')
}
function fromUtcString(t) {
    const n = new Date(t)
    return new Date(n.getTime() - n.getTimezoneOffset() * 6e4)
}
function fromMillis(t) {
    return new Date(t)
}
function createTimeDigits(t) {
    return String(Math.floor(t)).padStart(2, '0')
}
function humanizeTime(t) {
    const n = Math.floor(t / 36e5)
    t = t % 36e5
    const e = Math.floor(t / 6e4)
    t = t % 6e4
    const r = Math.floor(t / 1e3)
    return n
        ? `${createTimeDigits(n)}:${createTimeDigits(e)}:${createTimeDigits(r)}`
        : `${createTimeDigits(e)}:${createTimeDigits(r)}`
}
function absoluteDays(t) {
    return Math.floor((isDate(t) ? t.getTime() : t) / 864e5)
}
const DefaultTimestampTranslations = {
    today: (t, n) => createTimeDigits(t) + ':' + createTimeDigits(n),
    yesterday: () => 'Yesterday',
    monday: () => 'Mon',
    tuesday: () => 'Tue',
    wednesday: () => 'Wed',
    thursday: () => 'Thu',
    friday: () => 'Fri',
    saturday: () => 'Sat',
    sunday: () => 'Sun',
    weeks: t => `${t}w`
}
function getTimestamp(t, n) {
    const e = new Date(n?.now || Date.now()),
        r = n?.translations || DefaultTimestampTranslations,
        o = isDate(t) ? t : new Date(t)
    if (absoluteDays(e) === absoluteDays(o)) return r.today(o.getUTCHours(), o.getUTCMinutes(), o.getUTCHours() > 12)
    if (absoluteDays(e) - absoluteDays(o) === 1) return r.yesterday()
    const i = getDayInfoFromDate(o)
    return absoluteDays(e) - absoluteDays(o) < 7
        ? r[i.day]()
        : r.weeks(Math.round((e.getTime() - o.getTime()) / 6048e5))
}
const DefaultAgoTranslations = {
    now: () => 'A few seconds ago',
    seconds: t => `${t} seconds ago`,
    minutes: t => `${t} minutes ago`,
    hours: t => `${t} hours ago`,
    days: t => `${t} days ago`,
    weeks: t => `${t} weeks ago`
}
function getAgo(t, n) {
    const e = n?.now || Date.now(),
        r = n?.translations || DefaultAgoTranslations,
        o = exports.Types.isDate(t) ? t.getTime() : t
    let i = (e - o) / 1e3
    return i < 10
        ? r.now()
        : i < 120
        ? r.seconds(Math.floor(i))
        : ((i /= 60),
          i < 120
              ? r.minutes(Math.floor(i))
              : ((i /= 60),
                i < 48
                    ? r.hours(Math.floor(i))
                    : ((i /= 24), i < 14 ? r.days(Math.floor(i)) : ((i /= 7), r.weeks(Math.floor(i))))))
}
function countCycles(t, n, e) {
    var r, o, i
    const c = ((r = e?.now) !== null && r !== void 0 ? r : Date.now()) - t,
        u = Math.floor(c / n),
        f =
            n / ((o = e?.precision) !== null && o !== void 0 ? o : 1) -
            Math.ceil((c % n) / ((i = e?.precision) !== null && i !== void 0 ? i : 1))
    return { cycles: u, remaining: f }
}
const throttleTimers = {}
function throttle(t, n) {
    return !throttleTimers[t] || Date.now() > throttleTimers[t] ? ((throttleTimers[t] = Date.now() + n), !0) : !1
}
const timeUnits = { s: 1e3, m: 6e4, h: 36e5, d: 864e5 }
function timeSince(t, n, e) {
    return (
        (n = isDate(n) ? n.getTime() : n), (e = e ? (isDate(e) ? e.getTime() : e) : Date.now()), (e - n) / timeUnits[t]
    )
}
function getProgress(t, n, e, r) {
    r || (r = Date.now())
    const o = n / e,
        i = r - t,
        s = i / n,
        c = s * e,
        u = c - i
    return { deltaMs: i, progress: o, baseTimeMs: s, totalTimeMs: c, remainingTimeMs: u }
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
function mapDayNumber(t) {
    return { zeroBasedIndex: t, day: dayNumberIndex[t] }
}
function getDayInfoFromDate(t) {
    return mapDayNumber(t.getDay())
}
function getDayInfoFromDateTimeString(t) {
    return getDayInfoFromDate(new Date(t))
}
function seconds(t) {
    return t * 1e3
}
function minutes(t) {
    return t * 6e4
}
function hours(t) {
    return t * 36e5
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
function makeDate(t) {
    const n = parseFloat(t)
    if (isNaN(n)) throw Error('makeDate got NaN for input')
    const e = t.replace(/^-?[0-9.]+/, '').trim(),
        r = dateUnits.findIndex(o => o[0] === e.toLowerCase())
    return r === -1 ? n : n * dateUnits[r][1]
}
function getPreLine(t) {
    return t.replace(/ +/g, ' ').replace(/^ /gm, '')
}
const tinyCache = {}
async function getCached(t, n, e) {
    const r = Date.now(),
        o = tinyCache[t]
    if (o && o.validUntil > r) return o.value
    const i = await e(),
        s = r + n
    return (tinyCache[t] = { value: i, validUntil: s }), i
}
function joinUrl(...t) {
    return t
        .filter(n => n)
        .join('/')
        .replace(/(?<!:)\/+/g, '/')
}
function replaceBetweenStrings(t, n, e, r, o = !0) {
    const i = t.indexOf(n),
        s = t.indexOf(e, i + n.length)
    if (i === -1 || s === -1) throw Error('Start or end not found')
    return o ? t.substring(0, i + n.length) + r + t.substring(s) : t.substring(0, i) + r + t.substring(s + e.length)
}
function describeMarkdown(t) {
    let n = 'p'
    t.startsWith('#')
        ? ((n = 'h1'), (t = t.slice(1).trim()))
        : t.startsWith('-') && ((n = 'li'), (t = t.slice(1).trim()))
    const e = t[0] === t[0].toUpperCase(),
        r = /[.?!]$/.test(t),
        o = /:$/.test(t)
    return { type: n, isCapitalized: e, hasPunctuation: r, endsWithColon: o }
}
function isBalanced(t, n = '(', e = ')') {
    let r = 0,
        o = 0
    for (; o < t.length; )
        if ((t.startsWith(n, o) ? (r++, (o += n.length)) : t.startsWith(e, o) ? (r--, (o += e.length)) : o++, r < 0))
            return !1
    return n === e ? r % 2 === 0 : r === 0
}
function textToFormat(t) {
    t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    let n = t.length
    for (; (t = t.replace(/(\w+)[\s,']+\w+/g, '$1')), t.length !== n; ) n = t.length
    return (
        (t = t.replaceAll(/[A-Z][a-zA-Z0-9]*/g, 'A')),
        (t = t.replaceAll(/[a-z][a-zA-Z0-9]*/g, 'a')),
        (t = t.replaceAll(/[\u4E00-\u9FA5]+/g, 'Z')),
        t
    )
}
function sortObject(t) {
    const e = Object.keys(t).sort((o, i) => o.localeCompare(i)),
        r = {}
    for (const o of e) r[o] = sortAny(t[o])
    return r
}
function sortArray(t) {
    const n = []
    return (
        t
            .sort((e, r) => JSON.stringify(sortAny(e)).localeCompare(JSON.stringify(sortAny(r))))
            .forEach(e => n.push(sortAny(e))),
        n
    )
}
function sortAny(t) {
    return Array.isArray(t) ? sortArray(t) : isObject(t) ? sortObject(t) : t
}
function deepEquals(t, n) {
    return JSON.stringify(sortAny(t)) === JSON.stringify(sortAny(n))
}
function deepEqualsEvery(...t) {
    for (let n = 1; n < t.length; n++) if (!deepEquals(t[n - 1], t[n])) return !1
    return !0
}
function safeParse(t) {
    try {
        return JSON.parse(t)
    } catch {
        return null
    }
}
function createSequence() {
    let t = 0
    return { next: () => t++ }
}
function createOscillator(t) {
    let n = 0
    return { next: () => t[n++ % t.length] }
}
function createStatefulToggle(t) {
    let n
    return e => {
        const r = e === t && n !== t
        return (n = e), r
    }
}
function organiseWithLimits(t, n, e, r, o) {
    const i = {}
    for (const s of Object.keys(n)) i[s] = []
    ;(i[r] = []), o && (t = t.sort(o))
    for (const s of t) {
        const c = s[e],
            u = n[c] ? c : r
        i[u].length >= n[u] ? i[r].push(s) : i[u].push(s)
    }
    return i
}
function diffKeys(t, n) {
    const e = Object.keys(t),
        r = Object.keys(n)
    return { uniqueToA: e.filter(o => !r.includes(o)), uniqueToB: r.filter(o => !e.includes(o)) }
}
function pickRandomKey(t) {
    const n = Object.keys(t)
    return n[Math.floor(Math.random() * n.length)]
}
function mapRandomKey(t, n) {
    const e = pickRandomKey(t)
    return (t[e] = n(t[e])), e
}
function fromObjectString(t) {
    return (
        (t = t.replace(
            /\r\n/g,
            `
`
        )),
        (t = t.replace(/(\w+)\((.+)\)/g, (n, e, r) => `${e}(${r.replaceAll(',', '&comma;')})`)),
        (t = t.replace(/(,)(\s+})/g, '$2')),
        (t = t.replace(/\.\.\..+?,/g, '')),
        (t = t.replace(/({\s+)([a-zA-Z]\w+),/g, "$1$2: '$2',")),
        (t = t.replace(/(,\s+)([a-zA-Z]\w+),/g, "$1$2: '$2',")),
        (t = t.replace(/:(.+)\?(.+):/g, (n, e, r) => `: (${e.trim()} && ${r.trim()}) ||`)),
        (t = t.replace(/([a-zA-Z0-9]+)( ?: ?{)/g, '"$1"$2')),
        (t = t.replace(/([a-zA-Z0-9]+) ?: ?(.+?)(,|\n|})/g, (n, e, r, o) => `"${e}":"${r.trim()}"${o}`)),
        (t = t.replace(/("'|'")/g, '"')),
        (t = t.replaceAll('&comma;', ',')),
        JSON.parse(t)
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
function formatNumber(t, n) {
    var e, r
    const o = (e = n?.longForm) !== null && e !== void 0 ? e : !1,
        i = n?.unit ? ` ${n.unit}` : '',
        s = o ? longNumberUnits : shortNumberUnits,
        c = (r = n?.precision) !== null && r !== void 0 ? r : 1
    if (t < thresholds[0]) return `${t}${i}`
    for (let u = 0; u < thresholds.length - 1; u++)
        if (t < thresholds[u + 1]) return `${(t / thresholds[u]).toFixed(c)}${o ? ' ' : ''}${s[u]}${i}`
    return `${(t / thresholds[thresholds.length - 1]).toFixed(c)}${o ? ' ' : ''}${s[thresholds.length - 1]}${i}`
}
function makeNumber(t) {
    const n = parseFloat(t)
    if (isNaN(n)) throw Error('makeNumber got NaN for input')
    const e = t.replace(/^-?[0-9.]+/, '').trim(),
        r = shortNumberUnits.findIndex(o => o.toLowerCase() === e.toLowerCase())
    return r === -1 ? n : n * thresholds[r]
}
function clamp(t, n, e) {
    return t < n ? n : t > e ? e : t
}
function increment(t, n, e) {
    const r = t + n
    return r > e ? e : r
}
function decrement(t, n, e) {
    const r = t - n
    return r < e ? e : r
}
function runOn(t, n) {
    return n(t), t
}
function ifPresent(t, n) {
    t && n(t)
}
function mergeArrays(t, n) {
    const e = Object.keys(n)
    for (const r of e) Array.isArray(n[r]) && Array.isArray(t[r]) && pushAll(t[r], n[r])
}
function empty(t) {
    return t.splice(0, t.length), t
}
function removeEmptyArrays(t) {
    for (const n of Object.keys(t))
        (isEmptyArray(t[n]) || (Array.isArray(t[n]) && t[n].every(e => e == null))) && delete t[n]
    return t
}
function removeEmptyValues(t) {
    for (const n of Object.entries(t))
        (isUndefined(n[1]) || n[1] === null || (isString(n[1]) && isBlank(n[1]))) && delete t[n[0]]
    return t
}
function filterObjectKeys(t, n) {
    const e = {}
    for (const [r, o] of Object.entries(t)) n(r) && (e[r] = o)
    return e
}
function filterObjectValues(t, n) {
    const e = {}
    for (const [r, o] of Object.entries(t)) n(o) && (e[r] = o)
    return e
}
function mapObject(t, n) {
    const e = {}
    for (const r of Object.entries(t)) e[r[0]] = n(r[1])
    return e
}
async function rethrow(t, n) {
    try {
        return await t()
    } catch {
        throw n
    }
}
function setSomeOnObject(t, n, e) {
    typeof e < 'u' && e !== null && (t[n] = e)
}
function setSomeDeep(t, n, e, r) {
    const o = getDeep(e, r)
    typeof o > 'u' || o === null || setDeep(t, n, o)
}
function flip(t) {
    const n = {}
    for (const [e, r] of Object.entries(t)) n[r] = e
    return n
}
function getAllPermutations(t) {
    const n = Object.keys(t),
        e = n.map(c => t[c].length),
        r = e.reduce((c, u) => (c *= u))
    let o = 1
    const i = [1]
    for (let c = 0; c < e.length - 1; c++) (o *= e[c]), i.push(o)
    const s = []
    for (let c = 0; c < r; c++) {
        const u = {}
        for (let f = 0; f < n.length; f++) {
            const l = t[n[f]],
                a = Math.floor(c / i[f]) % l.length
            u[n[f]] = l[a]
        }
        s.push(u)
    }
    return s
}
function countTruthyValues(t) {
    return Object.values(t).filter(n => n).length
}
function getFlatNotation(t, n, e) {
    return t + (e ? '[' + n + ']' : (t.length ? '.' : '') + n)
}
function flattenInner(t, n, e, r, o) {
    if (!isObject(n)) return n
    for (const [i, s] of Object.entries(n)) {
        const c = getFlatNotation(e, i, r)
        Array.isArray(s)
            ? o
                ? flattenInner(t, s, c, !0, o)
                : (t[c] = s.map(u => flattenInner(Array.isArray(u) ? [] : {}, u, '', !1, o)))
            : isObject(s)
            ? flattenInner(t, s, c, !1, o)
            : (t[c] = s)
    }
    return t
}
function flatten(t, n = !1, e) {
    return flattenInner({}, t, e || '', !1, n)
}
function unflatten(t) {
    if (!isObject(t)) return t
    const n = Array.isArray(t) ? [] : {}
    for (const [e, r] of Object.entries(t))
        Array.isArray(r)
            ? setDeep(
                  n,
                  e,
                  r.map(o => unflatten(o))
              )
            : setDeep(n, e, r)
    return n
}
function match(t, n, e) {
    return n[t] ? n[t] : e
}
function indexArray(t, n) {
    const e = {}
    for (const r of t) {
        const o = n(r)
        e[o] = r
    }
    return e
}
function indexArrayToCollection(t, n) {
    const e = {}
    for (const r of t) {
        const o = n(r)
        e[o] || (e[o] = []), e[o].push(r)
    }
    return e
}
function splitBySize(t, n) {
    const e = []
    for (let r = 0; r < t.length; r += n) e.push(t.slice(r, r + n))
    return e
}
function splitByCount(t, n) {
    const e = Math.ceil(t.length / n),
        r = []
    for (let o = 0; o < t.length; o += e) r.push(t.slice(o, o + e))
    return r
}
function tokenizeByLength(t, n) {
    const e = [],
        r = Math.ceil(t.length / n)
    for (let o = 0; o < r; o++) e.push(t.slice(o * n, o * n + n))
    return e
}
function tokenizeByCount(t, n) {
    const e = Math.ceil(t.length / n)
    return tokenizeByLength(t, e)
}
function makeUnique(t, n) {
    return Object.values(indexArray(t, n))
}
function countUnique(t, n, e, r, o) {
    const i = n ? t.map(n) : t,
        s = {}
    for (const u of i) s[u] = (s[u] || 0) + 1
    const c = r ? sortObjectValues(s, o ? (u, f) => u[1] - f[1] : (u, f) => f[1] - u[1]) : s
    return e ? Object.keys(c) : c
}
function sortObjectValues(t, n) {
    return Object.fromEntries(Object.entries(t).sort(n))
}
function transformToArray(t) {
    const n = [],
        e = Object.keys(t),
        r = t[e[0]].length
    for (let o = 0; o < r; o++) {
        const i = {}
        for (const s of e) i[s] = t[s][o]
        n.push(i)
    }
    return n
}
function incrementMulti(t, n, e = 1) {
    for (const r of t) r[n] += e
}
function setMulti(t, n, e) {
    for (const r of t) r[n] = e
}
function group(t, n) {
    const e = []
    let r = []
    return (
        t.forEach((o, i) => {
            ;(i === 0 || !n(o, t[i - 1])) && ((r = []), e.push(r)), r.push(o)
        }),
        e
    )
}
function createBidirectionalMap() {
    return { map: new Map(), keys: [] }
}
function createTemporalBidirectionalMap() {
    return { map: new Map(), keys: [] }
}
function pushToBidirectionalMap(t, n, e, r = 100) {
    if (t.map.has(n)) {
        const o = t.keys.indexOf(n)
        t.keys.splice(o, 1)
    }
    if ((t.map.set(n, e), t.keys.push(n), t.keys.length > r)) {
        const o = t.keys.shift()
        o && t.map.delete(o)
    }
}
function unshiftToBidirectionalMap(t, n, e, r = 100) {
    if (t.map.has(n)) {
        const o = t.keys.indexOf(n)
        t.keys.splice(o, 1)
    }
    if ((t.map.set(n, e), t.keys.unshift(n), t.keys.length > r)) {
        const o = t.keys.shift()
        o && t.map.delete(o)
    }
}
function addToTemporalBidirectionalMap(t, n, e, r, o = 100) {
    pushToBidirectionalMap(t, n, { validUntil: Date.now() + r, data: e }, o)
}
function getFromTemporalBidirectionalMap(t, n) {
    const e = t.map.get(n)
    return e && e.validUntil > Date.now() ? e.data : null
}
function makeAsyncQueue(t = 1) {
    const n = [],
        e = []
    let r = 0
    async function o() {
        if (n.length > 0 && r < t) {
            r++
            const s = n.shift()
            try {
                s && (await s())
            } finally {
                if (--r === 0) for (; e.length > 0; ) e.shift()()
                o()
            }
        }
    }
    async function i() {
        return r
            ? new Promise(s => {
                  e.push(s)
              })
            : Promise.resolve()
    }
    return {
        enqueue(s) {
            n.push(s), o()
        },
        drain: i
    }
}
class Optional {
    constructor(n) {
        this.value = n
    }
    static of(n) {
        return new Optional(n)
    }
    static empty() {
        return new Optional(null)
    }
    map(n) {
        return new Optional(this.value ? n(this.value) : null)
    }
    ifPresent(n) {
        return this.value && n(this.value), this
    }
    orElse(n) {
        var e
        ;((e = this.value) !== null && e !== void 0) || n()
    }
}
exports.Optional = Optional
function findInstance(t, n) {
    const e = t.find(r => r instanceof n)
    return Optional.of(e)
}
function filterInstances(t, n) {
    return t.filter(e => e instanceof n)
}
function interleave(t, n) {
    const e = [],
        r = Math.max(t.length, n.length)
    for (let o = 0; o < r; o++) t[o] && e.push(t[o]), n[o] && e.push(n[o])
    return e
}
function toggle(t, n) {
    return t.includes(n) ? t.filter(e => e !== n) : [...t, n]
}
class Node {
    constructor(n) {
        ;(this.value = n), (this.children = [])
    }
}
function createHierarchy(t, n, e, r, o = !1) {
    const i = new Map(),
        s = []
    t.forEach(u => {
        const f = new Node(u)
        i.set(u[n], f)
    }),
        t.forEach(u => {
            const f = i.get(u[n])
            if (!f) return
            const l = u[e]
            if (l) {
                const a = i.get(l)
                a && a.children.push(f)
            } else s.push(f)
        })
    const c = u => {
        u.children.sort((f, l) => {
            const a = f.value[r],
                h = l.value[r]
            return o ? h - a : a - h
        }),
            u.children.forEach(c)
    }
    return s.forEach(c), s
}
function log2Reduce(t, n) {
    if (Math.log2(t.length) % 1 !== 0) throw new Error('Array length must be a power of 2')
    let e = [...t]
    for (; e.length > 1; ) {
        const r = []
        for (let o = 0; o < e.length; o += 2) {
            const i = e[o + 1]
            r.push(n(e[o], i))
        }
        e = r
    }
    return e[0]
}
function partition(t, n) {
    if (t.length % n !== 0) throw Error('Bytes length must be a multiple of size')
    const e = []
    for (let r = 0; r < t.length; r += n) e.push(t.subarray(r, r + n))
    return e
}
function concatBytes(...t) {
    const n = t.reduce((o, i) => o + i.length, 0),
        e = new Uint8Array(n)
    let r = 0
    return (
        t.forEach(o => {
            e.set(o, r), (r += o.length)
        }),
        e
    )
}
class Uint8ArrayReader {
    constructor(n) {
        ;(this.cursor = 0), (this.buffer = n)
    }
    read(n) {
        const e = this.buffer.subarray(this.cursor, this.cursor + n)
        return (this.cursor += n), e
    }
    max() {
        return this.buffer.length - this.cursor
    }
}
class Uint8ArrayWriter {
    constructor(n) {
        ;(this.buffer = n), (this.cursor = 0)
    }
    write(n) {
        const e = Math.min(this.max(), n.max())
        return this.buffer.set(n.read(e), this.cursor), (this.cursor += e), e
    }
    max() {
        return this.buffer.length - this.cursor
    }
}
class Chunk {
    constructor(n, e, r = 0) {
        ;(this.span = r), (this.writer = new Uint8ArrayWriter(new Uint8Array(n))), (this.hashFn = e)
    }
    buildSpan() {
        const n = new Uint8Array(8)
        return new DataView(n.buffer).setBigUint64(0, BigInt(this.span), !0), n
    }
    build() {
        return concatBytes(this.buildSpan(), this.writer.buffer)
    }
    hash() {
        const n = log2Reduce(partition(this.writer.buffer, 32), this.hashFn)
        return this.hashFn(this.buildSpan(), n)
    }
}
function merkleStart(t, n) {
    return [new Chunk(t, n)]
}
async function merkleElevate(t, n, e) {
    await n(t[e]),
        t[e + 1] || t.push(new Chunk(t[e].writer.buffer.length, t[e].hashFn, t[e].span)),
        merkleAppend(t, t[e].hash(), n, e + 1),
        (t[e] = new Chunk(t[e].writer.buffer.length, t[e].hashFn))
}
async function merkleAppend(t, n, e, r = 0) {
    t[r].writer.max() === 0 && (await merkleElevate(t, e, r))
    const o = new Uint8ArrayReader(n)
    for (; o.max() !== 0; ) {
        const i = t[r].writer.write(o)
        if (r === 0) for (let s = 0; s < t.length; s++) t[s].span += i
        t[r].writer.max() === 0 && o.max() > 0 && (await merkleElevate(t, e, r))
    }
    return t
}
async function merkleFinalize(t, n, e = 0) {
    return t[e + 1] ? (await merkleElevate(t, n, e), merkleFinalize(t, n, e + 1)) : (await n(t[e]), t[e])
}
function tickPlaybook(t) {
    if (t.length === 0) return null
    const n = t[0]
    return (
        n.ttlMax ? --n.ttl <= 0 && t.shift() : (n.ttlMax = n.ttl),
        { progress: (n.ttlMax - n.ttl) / n.ttlMax, data: n.data }
    )
}
function getArgument(t, n, e, r) {
    const o = t.findIndex(c => c === `--${n}` || c.startsWith(`--${n}=`)),
        i = t[o]
    if (!i) return (e || {})[r || n || ''] || null
    if (i.includes('=')) return i.split('=')[1]
    const s = t[o + 1]
    return s && !s.startsWith('-') ? s : (e || {})[r || n || ''] || null
}
function getNumberArgument(t, n, e, r) {
    const o = getArgument(t, n, e, r)
    if (!o) return null
    try {
        return makeNumber(o)
    } catch {
        throw new Error(`Invalid number argument ${n}: ${o}`)
    }
}
function getBooleanArgument(t, n, e, r) {
    const o = t.some(u => u.endsWith('-' + n)),
        i = getArgument(t, n, e, r)
    if (!i && o) return !0
    if (!i && !o) return null
    const s = ['true', '1', 'yes', 'y', 'on'],
        c = ['false', '0', 'no', 'n', 'off']
    if (s.includes(i.toLowerCase())) return !0
    if (c.includes(i.toLowerCase())) return !1
    throw Error(`Invalid boolean argument ${n}: ${i}`)
}
function requireStringArgument(t, n, e, r) {
    const o = getArgument(t, n, e, r)
    if (!o) throw new Error(`Missing argument ${n}`)
    return o
}
function requireNumberArgument(t, n, e, r) {
    const o = requireStringArgument(t, n, e, r)
    try {
        return makeNumber(o)
    } catch {
        throw new Error(`Invalid argument ${n}: ${o}`)
    }
}
function bringToFrontInPlace(t, n) {
    const e = t[n]
    t.splice(n, 1), t.unshift(e)
}
function bringToFront(t, n) {
    const e = [...t]
    return bringToFrontInPlace(e, n), e
}
function addPoint(t, n) {
    return { x: t.x + n.x, y: t.y + n.y }
}
function subtractPoint(t, n) {
    return { x: t.x - n.x, y: t.y - n.y }
}
function multiplyPoint(t, n) {
    return { x: t.x * n, y: t.y * n }
}
function normalizePoint(t) {
    const n = Math.sqrt(t.x * t.x + t.y * t.y)
    return { x: t.x / n, y: t.y / n }
}
function pushPoint(t, n, e) {
    return { x: t.x + Math.cos(n) * e, y: t.y + Math.sin(n) * e }
}
function getDistanceBetweenPoints(t, n) {
    return Math.sqrt((t.x - n.x) ** 2 + (t.y - n.y) ** 2)
}
function filterCoordinates(t, n, e = 'row-first') {
    const r = []
    if (e === 'column-first')
        for (let o = 0; o < t.length; o++) for (let i = 0; i < t[0].length; i++) n(o, i) && r.push({ x: o, y: i })
    else for (let o = 0; o < t[0].length; o++) for (let i = 0; i < t.length; i++) n(i, o) && r.push({ x: i, y: o })
    return r
}
function isHorizontalLine(t, n, e) {
    var r, o
    return (
        ((r = t[n + 1]) === null || r === void 0 ? void 0 : r[e]) &&
        ((o = t[n - 1]) === null || o === void 0 ? void 0 : o[e]) &&
        !t[n][e - 1] &&
        !t[n][e + 1]
    )
}
function isVerticalLine(t, n, e) {
    var r, o
    return (
        t[n][e + 1] &&
        t[n][e - 1] &&
        !(!((r = t[n - 1]) === null || r === void 0) && r[e]) &&
        !(!((o = t[n + 1]) === null || o === void 0) && o[e])
    )
}
function isLeftmost(t, n, e) {
    var r
    return !(!((r = t[n - 1]) === null || r === void 0) && r[e])
}
function isRightmost(t, n, e) {
    var r
    return !(!((r = t[n + 1]) === null || r === void 0) && r[e])
}
function isTopmost(t, n, e) {
    return !t[n][e - 1]
}
function isBottommost(t, n, e) {
    return !t[n][e + 1]
}
function getCorners(t, n, e) {
    var r, o, i, s, c, u, f, l
    const a = []
    return t[n][e]
        ? isHorizontalLine(t, n, e) || isVerticalLine(t, n, e)
            ? []
            : (!(!((c = t[n - 1]) === null || c === void 0) && c[e - 1]) &&
                  isLeftmost(t, n, e) &&
                  isTopmost(t, n, e) &&
                  a.push({ x: n, y: e }),
              !(!((u = t[n + 1]) === null || u === void 0) && u[e - 1]) &&
                  isRightmost(t, n, e) &&
                  isTopmost(t, n, e) &&
                  a.push({ x: n + 1, y: e }),
              !(!((f = t[n - 1]) === null || f === void 0) && f[e + 1]) &&
                  isLeftmost(t, n, e) &&
                  isBottommost(t, n, e) &&
                  a.push({ x: n, y: e + 1 }),
              !(!((l = t[n + 1]) === null || l === void 0) && l[e + 1]) &&
                  isRightmost(t, n, e) &&
                  isBottommost(t, n, e) &&
                  a.push({ x: n + 1, y: e + 1 }),
              a)
        : (!((r = t[n - 1]) === null || r === void 0) && r[e] && t[n][e - 1] && a.push({ x: n, y: e }),
          !((o = t[n + 1]) === null || o === void 0) && o[e] && t[n][e - 1] && a.push({ x: n + 1, y: e }),
          !((i = t[n - 1]) === null || i === void 0) && i[e] && t[n][e + 1] && a.push({ x: n, y: e + 1 }),
          !((s = t[n + 1]) === null || s === void 0) && s[e] && t[n][e + 1] && a.push({ x: n + 1, y: e + 1 }),
          a)
}
function findCorners(t, n, e, r) {
    const o = [
        { x: 0, y: 0 },
        { x: e, y: 0 },
        { x: 0, y: r },
        { x: e, y: r }
    ]
    for (let i = 0; i < t.length; i++)
        for (let s = 0; s < t[0].length; s++) {
            const c = getCorners(t, i, s)
            for (const u of c) o.some(f => f.x === u.x && f.y === u.y) || o.push(u)
        }
    return o.map(i => ({ x: i.x * n, y: i.y * n }))
}
function findLines(t, n) {
    const e = filterCoordinates(t, (u, f) => t[u][f] === 0 && t[u][f + 1] !== 0, 'row-first').map(u =>
            Object.assign(Object.assign({}, u), { dx: 1, dy: 0 })
        ),
        r = filterCoordinates(t, (u, f) => t[u][f] === 0 && t[u][f - 1] !== 0, 'row-first').map(u =>
            Object.assign(Object.assign({}, u), { dx: 1, dy: 0 })
        ),
        o = filterCoordinates(
            t,
            (u, f) => {
                var l
                return t[u][f] === 0 && ((l = t[u - 1]) === null || l === void 0 ? void 0 : l[f]) !== 0
            },
            'column-first'
        ).map(u => Object.assign(Object.assign({}, u), { dx: 0, dy: 1 })),
        i = filterCoordinates(
            t,
            (u, f) => {
                var l
                return t[u][f] === 0 && ((l = t[u + 1]) === null || l === void 0 ? void 0 : l[f]) !== 0
            },
            'column-first'
        ).map(u => Object.assign(Object.assign({}, u), { dx: 0, dy: 1 }))
    e.forEach(u => u.y++), i.forEach(u => u.x++)
    const s = group([...o, ...i], (u, f) => u.x === f.x && u.y - 1 === f.y),
        c = group([...r, ...e], (u, f) => u.y === f.y && u.x - 1 === f.x)
    return [...s, ...c]
        .map(u => ({ start: u[0], end: last(u) }))
        .map(u => ({
            start: multiplyPoint(u.start, n),
            end: multiplyPoint(addPoint(u.end, { x: u.start.dx, y: u.start.dy }), n)
        }))
}
function getAngleInRadians(t, n) {
    return Math.atan2(n.y - t.y, n.x - t.x)
}
function getSortedRayAngles(t, n) {
    return n.map(e => getAngleInRadians(t, e)).sort((e, r) => e - r)
}
function getLineIntersectionPoint(t, n, e, r) {
    const o = (r.y - e.y) * (n.x - t.x) - (r.x - e.x) * (n.y - t.y)
    if (o === 0) return null
    let i = t.y - e.y,
        s = t.x - e.x
    const c = (r.x - e.x) * i - (r.y - e.y) * s,
        u = (n.x - t.x) * i - (n.y - t.y) * s
    return (
        (i = c / o),
        (s = u / o),
        i > 0 && i < 1 && s > 0 && s < 1 ? { x: t.x + i * (n.x - t.x), y: t.y + i * (n.y - t.y) } : null
    )
}
function raycast(t, n, e) {
    const r = [],
        o = pushPoint(t, e, 1e4)
    for (const i of n) {
        const s = getLineIntersectionPoint(t, o, i.start, i.end)
        s && r.push(s)
    }
    return r.length
        ? r.reduce((i, s) => {
              const c = getDistanceBetweenPoints(t, s),
                  u = getDistanceBetweenPoints(t, i)
              return c < u ? s : i
          })
        : null
}
function raycastCircle(t, n, e) {
    const o = getSortedRayAngles(t, e),
        i = []
    for (const s of o) {
        const c = raycast(t, n, s - 0.001),
            u = raycast(t, n, s + 0.001)
        c && i.push(c), u && i.push(u)
    }
    return i
}
;(exports.Binary = {
    hexToUint8Array,
    uint8ArrayToHex,
    base64ToUint8Array,
    uint8ArrayToBase64,
    log2Reduce,
    partition,
    concatBytes,
    merkleStart,
    merkleAppend,
    merkleFinalize
}),
    (exports.Random = { intBetween, floatBetween, chance, signed: signedRandom, makeSeededRng, point: randomPoint }),
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
        createHierarchy
    }),
    (exports.System = { sleepMillis, forever, scheduleMany, waitFor, expandError }),
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
        asMegabytes,
        convertBytes,
        hexToRgb,
        rgbToHex,
        haversineDistanceToMeters,
        roundToNearest,
        formatDistance
    }),
    (exports.Promises = { raceFulfilled, invert: invertPromise, runInParallelBatches, makeAsyncQueue }),
    (exports.Dates = {
        getTimestamp,
        getAgo,
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
        make: makeDate
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
        reposition
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
        enforceArrayShape
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
        toLines,
        levenshteinDistance
    }),
    (exports.Assertions = { asEqual, asTrue, asTruthy, asFalse, asFalsy, asEither }),
    (exports.Cache = { get: getCached }),
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
