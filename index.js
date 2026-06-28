'use strict'
var _a
Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Vector = exports.Cache = exports.Assertions = exports.Strings = exports.Types = exports.Objects = exports.Dates = exports.Promises = exports.Numbers = exports.System = exports.Arrays = exports.Random = exports.Elliptic = exports.Binary = exports.Lock = exports.Solver = exports.RollingValueProvider = exports.TrieRouter = exports.AsyncQueue = exports.PubSubChannel = exports.FixedPointNumber = exports.ChunkJoiner = exports.ChunkSplitter = exports.Chunk = exports.Uint8ArrayWriter = exports.Uint8ArrayReader = exports.AsyncLazy = exports.Lazy = exports.Optional = void 0)
async function invertPromise(n) {
	return new Promise((t, e) => n.then(e, t))
}
async function raceFulfilled(n) {
	return invertPromise(Promise.all(n.map(invertPromise)))
}
async function runInParallelBatches(n, t = 1) {
	const e = splitByCount(n, t),
		r = [],
		i = e.map(async o => {
			for (const s of o) r.push(await s())
		})
	return await Promise.all(i), r
}
async function sleepMillis(n) {
	return new Promise(t =>
		setTimeout(() => {
			t(!0)
		}, n)
	)
}
function shuffle(n, t = Math.random) {
	for (let e = n.length - 1; e > 0; e--) {
		const r = Math.floor(t() * (e + 1)),
			i = n[e]
		;(n[e] = n[r]), (n[r] = i)
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
function initializeArray(n, t) {
	const e = []
	for (let r = 0; r < n; r++) e.push(t(r))
	return e
}
function rotate2DArray(n) {
	const t = []
	for (let e = 0; e < n[0].length; e++) {
		t.push([])
		for (let r = 0; r < n.length; r++) t[e].push(n[r][e])
	}
	return t
}
function initialize2DArray(n, t, e) {
	const r = []
	for (let i = 0; i < n; i++) {
		r.push([])
		for (let o = 0; o < t; o++) r[i].push(e)
	}
	return r
}
function containsShape(n, t, e, r) {
	if (e < 0 || r < 0 || r + t[0].length > n[0].length || e + t.length > n.length) return !1
	for (let i = 0; i < t.length; i++) for (let o = 0; o < t[i].length; o++) if (t[i][o] !== void 0 && n[e + i][r + o] !== t[i][o]) return !1
	return !0
}
function pickRandomIndices(n, t, e = Math.random) {
	return shuffle(range(0, n.length - 1), e).slice(0, t)
}
function pluck(n, t) {
	return n.map(e => e[t])
}
function makeSeededRng(n) {
	let t = n,
		e = 3405648695,
		r = 3735928559
	return function () {
		return (t += e), (e ^= t << 7), (t *= r), (r ^= t << 13), (t ^= e ^ r), (t >>> 0) / 4294967296
	}
}
function intBetween(n, t, e = Math.random) {
	return Math.floor(e() * (t - n + 1)) + n
}
function floatBetween(n, t, e = Math.random) {
	return e() * (t - n) + n
}
function signedRandom() {
	return Math.random() * 2 - 1
}
function containsPoint(n, t, e) {
	return t >= n.x && t < n.x + n.width && e >= n.y && e < n.y + n.height
}
function randomPoint(n, t, e, r = Math.random) {
	let i, o
	do (i = intBetween(0, n - 1, r)), (o = intBetween(0, t - 1, r))
	while (e && containsPoint(e, i, o))
	return [i, o]
}
function procs(n, t = Math.random) {
	const e = Math.floor(n),
		r = n - e
	return chance(r, t) ? e + 1 : e
}
function chance(n, t = Math.random) {
	return t() < n
}
function pick(n, t = Math.random) {
	return n[Math.floor(n.length * t())]
}
function pickMany(n, t, e = Math.random) {
	if (t > n.length) throw new Error(`Count (${t}) is greater than array length (${n.length})`)
	return pickRandomIndices(n, t, e).map(i => n[i])
}
function pickManyUnique(n, t, e, r = Math.random) {
	if (t > n.length) throw new Error(`Count (${t}) is greater than array length (${n.length})`)
	const i = []
	for (; i.length < t; ) {
		const o = pick(n, r)
		i.some(s => e(s, o)) || i.push(o)
	}
	return i
}
function pickGuaranteed(n, t, e, r, i, o = Math.random) {
	const s = n.filter(u => u !== t && u !== e),
		c = []
	for (t !== null && c.push(t); s.length && c.length < r; ) {
		const u = exports.Random.intBetween(0, s.length - 1, o)
		i(s[u], c) && c.push(s[u]), s.splice(u, 1)
	}
	return shuffle(c, o), { values: c, indexOfGuaranteed: t !== null ? c.indexOf(t) : -1 }
}
function last(n) {
	if (!n.length) throw Error('Received empty array')
	return n[n.length - 1]
}
function pipe(n, t, e) {
	return e(t.reduce((r, i) => i(r), n))
}
function makePipe(n, t) {
	return e => pipe(e, n, t)
}
function pickWeighted(n, t, e) {
	if ((e === void 0 && (e = Math.random()), n.length !== t.length)) throw new Error('Array length mismatch')
	let r = t.reduce((o, s) => o + s, 0)
	const i = e * r
	for (let o = 0; o < n.length - 1; o++) if (((r -= t[o]), i >= r)) return n[o]
	return last(n)
}
function sortWeighted(n, t, e = Math.random) {
	const r = t.map(o => e() * o),
		i = []
	for (let o = 0; o < n.length; o++) i.push([n[o], r[o]])
	return i.sort((o, s) => s[1] - o[1]).map(o => o[0])
}
function getDeep(n, t) {
	if (n == null) return null
	const e = t.split('.')
	let r = n
	for (const i of e) {
		if (r[i] === null || r[i] === void 0) return null
		r = r[i]
	}
	return r
}
function setDeep(n, t, e) {
	const r = t.split(/\.|\[/)
	let i = n
	for (let o = 0; o < r.length; o++) {
		const s = r[o],
			c = o < r.length - 1 && r[o + 1].includes(']'),
			f = s.includes(']') ? s.replace(/\[|\]/g, '') : s
		if (o === r.length - 1) return (i[f] = e), e
		isObject(i[f]) || (c ? (i[f] = []) : (i[f] = {})), (i = i[f])
	}
	return e
}
function incrementDeep(n, t, e = 1) {
	const r = getDeep(n, t) || 0
	return setDeep(n, t, r + e), r
}
function ensureDeep(n, t, e) {
	return getDeep(n, t) || setDeep(n, t, e)
}
function deleteDeep(n, t) {
	const e = beforeLast(t, '.'),
		r = afterLast(t, '.')
	if (!e || !r) return
	const i = getDeep(n, e)
	i && delete i[r]
}
function replaceDeep(n, t, e) {
	const r = getDeep(n, t)
	if (!r) throw new Error("Key '" + t + "' does not exist.")
	return setDeep(n, t, e), r
}
function getFirstDeep(n, t, e) {
	for (const r of t) {
		const i = getDeep(n, r)
		if (i) return i
	}
	if (e) {
		const r = Object.values(n)
		if (r.length) return r[0]
	}
	return null
}
async function forever(n, t, e) {
	for (;;) {
		try {
			await n()
		} catch (r) {
			e && e('Error in forever', r)
		}
		await sleepMillis(t)
	}
}
function runAndSetInterval(n, t) {
	n()
	const e = setInterval(() => {
		n()
	}, t)
	return () => clearInterval(e)
}
function whereAmI() {
	const n = globalThis.process
	return n ? (n.browser === !0 ? 'browser' : 'node') : 'browser'
}
async function withRetries(n, t, e, r, i, o) {
	let s = null
	for (let c = 0; c <= t; c++)
		try {
			return await n()
		} catch (u) {
			if (((s = u), c === t)) break
			const f = e + (r - e) * (c / (t - 1))
			i && i('Error in withRetries, retrying', { attempt: c + 1, allowedFailures: t, delayMillis: f, error: u }), o && o(), await sleepMillis(f)
		}
	throw s
}
function asMegabytes(n) {
	return n / 1024 / 1024
}
function convertBytes(n, t = 1024) {
	return n >= t * t * t * t ? (n / t / t / t / t).toFixed(3) + ' TB' : n >= t * t * t ? (n / t / t / t).toFixed(3) + ' GB' : n >= t * t ? (n / t / t).toFixed(3) + ' MB' : n >= t ? (n / t).toFixed(3) + ' KB' : n + ' B'
}
function hexToRgb(n) {
	const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n.toLowerCase())
	if (!t) throw new Error('Invalid hex color: ' + n)
	return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
}
function rgbToHex(n) {
	return '#' + n.map(t => t.toString(16).padStart(2, '0')).join('')
}
function haversineDistanceToMeters(n, t, e, r) {
	const o = (n * Math.PI) / 180,
		s = (e * Math.PI) / 180,
		c = ((e - n) * Math.PI) / 180,
		u = ((r - t) * Math.PI) / 180,
		f = Math.sin(c / 2) * Math.sin(c / 2) + Math.cos(o) * Math.cos(s) * Math.sin(u / 2) * Math.sin(u / 2)
	return 6371e3 * (2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)))
}
function roundToNearest(n, t) {
	return Math.round(n / t) * t
}
function formatDistance(n) {
	return n > 1e3 ? (n / 1e3).toFixed(0) + ' km' : n >= 500 ? roundToNearest(n, 100) + ' m' : n >= 100 ? roundToNearest(n, 50) + ' m' : roundToNearest(n, 10) + ' m'
}
function triangularNumber(n) {
	return (n * (n + 1)) / 2
}
function searchFloat(n) {
	const t = n.match(/-?\d+(\.\d+)?/)
	if (!t) throw Error('No float found in ' + n)
	return parseFloat(t[0])
}
function binomialSample(n, t, e = Math.random) {
	const r = n * t,
		i = Math.sqrt(n * t * (1 - t)),
		s = (e() + e() + e() + e() + e() + e() - 3) * Math.SQRT2,
		c = Math.round(r + i * s)
	return Math.max(0, Math.min(n, c))
}
function toSignificantDigits(n, t) {
	if (!n.includes('.')) return n
	if (parseFloat(n) === 0) return '0'
	const [e, r] = n.split('.'),
		i = e.replace('-', ''),
		o = i.length
	if (o >= t) return e
	if (!(i === '0')) {
		const f = t - o,
			l = r.slice(0, f)
		return /[1-9]/.test(l) ? `${e}.${l.replace(/0+$/, '')}` : e
	}
	const c = r.match(/^0*/)?.[0].length ?? 0,
		u = t + c
	return `${e}.${r.slice(0, u)}`
}
function isObject(n, t = !0) {
	return !n || (t && !isUndefined(n._readableState)) || (t && n.constructor && (n.constructor.isBuffer || n.constructor.name == 'AbortController' || n.constructor.name == 'AbortSignal' || n.constructor.name == 'Uint8Array' || n.constructor.name === 'ArrayBuffer' || n.constructor.name === 'ReadableStream')) ? !1 : typeof n == 'object'
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
	return n === void 0
}
function isFunction(n) {
	return Object.prototype.toString.call(n) === '[object Function]' || Object.prototype.toString.call(n) === '[object AsyncFunction]'
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
	unicodeTestingAlphabet = ['\u2014', '\\', '\u6771', '\u4EAC', '\u90FD', '\u{1D586}', '\u{1D587}', '\u{1D588}', '\u{1F47E}', '\u{1F647}', '\u{1F481}', '\u{1F645}', '\u16A0', '\u16C7', '\u16BB', '\u16E6'],
	hexAlphabet = '0123456789abcdef'
function randomLetterString(n, t = Math.random) {
	let e = ''
	for (let r = 0; r < n; r++) e += lowercaseAlphabet[Math.floor(t() * lowercaseAlphabet.length)]
	return e
}
function randomAlphanumericString(n, t = Math.random) {
	let e = ''
	for (let r = 0; r < n; r++) e += alphanumericAlphabet[Math.floor(t() * alphanumericAlphabet.length)]
	return e
}
function randomRichAsciiString(n, t = Math.random) {
	let e = ''
	for (let r = 0; r < n; r++) e += richAsciiAlphabet[Math.floor(t() * richAsciiAlphabet.length)]
	return e
}
function randomUnicodeString(n, t = Math.random) {
	let e = ''
	for (let r = 0; r < n; r++) e += unicodeTestingAlphabet[Math.floor(t() * unicodeTestingAlphabet.length)]
	return e
}
function searchHex(n, t) {
	const e = new RegExp(`[0-9a-f]{${t}}`, 'i'),
		r = n.match(e)
	return r ? r[0] : null
}
function searchSubstring(n, t, e = symbolsArray) {
	const r = splitAll(n, e)
	for (const i of r) if (t(i)) return i
	return null
}
function randomHexString(n, t = Math.random) {
	let e = ''
	for (let r = 0; r < n; r++) e += hexAlphabet[Math.floor(t() * hexAlphabet.length)]
	return e
}
function asIntegerString(n, t) {
	if (!isIntegerString(n)) throw new TypeError(`Expected integer string${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	const e = BigInt(n)
	if (t && ((t.min && e < t.min) || (t.max && e > t.max))) throw RangeError(`Expected integer string${t?.name ? ` for ${t.name}` : ''} in range: ${t.min ?? '-inf'}..${t.max ?? 'inf'}; got: ` + e)
	return n
}
function asString(n, t) {
	if (isBlank(n)) throw new TypeError(`Expected string${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	if (t && ((t.min !== void 0 && n.length < t.min) || (t.max !== void 0 && n.length > t.max))) throw RangeError(`Expected string${t?.name ? ` for ${t.name}` : ''} length in range: ${t.min ?? '-inf'}..${t.max ?? 'inf'}; got: ${n.length}`)
	return n
}
function asHexString(n, t) {
	if (!isHexString(n)) throw new TypeError(`Expected hex string${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	if (t?.strictPrefix && !n.startsWith('0x') && !n.startsWith('0X')) throw new TypeError(`Expected hex string with 0x prefix${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	const e = n.replace(/^0x/i, '')
	if (e.length % 2 !== 0 && !t?.uneven) throw RangeError(`Expected even number of hex digits${t?.name ? ` for ${t.name}` : ''}; got: ` + n)
	if (t && t.byteLength && e.length !== t.byteLength * 2) throw RangeError(`Expected hex string${t?.name ? ` for ${t.name}` : ''} of byte length ${t.byteLength}; got: ` + e)
	return `0x${e}`
}
function asSafeString(n, t) {
	if (
		!asString(n, t)
			.split('')
			.every(e => e === '_' || isLetterOrDigit(e))
	)
		throw new TypeError(`Expected safe string${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function checkLimits(n, t) {
	if ((t.min !== void 0 && n < t.min) || (t.max !== void 0 && n > t.max)) throw RangeError(`Expected value${t?.name ? ` for ${t.name}` : ''} in range: ${t.min ?? '-inf'}..${t.max ?? 'inf'}; got: ${n}`)
}
function asFunction(n, t) {
	if (!isFunction(n)) throw new TypeError(`Expected function${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function asNumber(n, t) {
	if (isNumber(n)) return t && checkLimits(n, t), n
	if (!isString(n) || !n.match(/^-?\d+(\.\d+)?$/)) throw new TypeError(`Expected number${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	const e = parseFloat(n)
	return t && checkLimits(e, t), e
}
function asInteger(n, t) {
	return Math.trunc(asNumber(n, t))
}
function asBoolean(n, t) {
	if (n === 'true') return !0
	if (n === 'false') return !1
	if (!isBoolean(n)) throw new TypeError(`Expected boolean${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function asDate(n, t) {
	if (!isDate(n)) throw new TypeError(`Expected date${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function asNullableString(n) {
	return isBlank(n) ? null : n
}
function asEmptiableString(n, t) {
	if (!isString(n)) throw new TypeError(`Expected string${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function asId(n, t) {
	if (isId(n)) return n
	const e = parseInt(n, 10)
	if (!isId(e)) throw new TypeError(`Expected id${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return e
}
function asTime(n, t) {
	if (!isString(n)) throw new TypeError(`Expected time${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	const e = n.split(':')
	if (e.length !== 2) throw new TypeError(`Expected time${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	const r = parseInt(e[0], 10),
		i = parseInt(e[1], 10)
	if (!isNumber(r) || !isNumber(i) || r < 0 || r > 23 || i < 0 || i > 59) throw new TypeError(`Expected time, got${t?.name ? ` for ${t.name}` : ''}: ` + n)
	return `${String(r).padStart(2, '0')}:${String(i).padStart(2, '0')}`
}
function asArray(n, t) {
	if (!Array.isArray(n)) throw new TypeError(`Expected array${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function asObject(n, t) {
	if (!isStrictlyObject(n)) throw new TypeError(`Expected object${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function asNullableObject(n, t) {
	return n === null ? null : asObject(n, t)
}
function asStringMap(n, t) {
	const e = asObject(n, t)
	for (const r of Object.keys(e)) if (!isString(e[r])) throw new TypeError(`Expected string map${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return e
}
function asNumericDictionary(n, t) {
	const e = asObject(n),
		r = Object.keys(e),
		i = Object.values(e)
	if (!r.every(isString) || !i.every(isNumber)) throw new TypeError(`Expected numeric dictionary${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return e
}
function isUrl(n) {
	return isString(n) && n.match(/^https?:\/\/.+/) !== null
}
function asUrl(n, t) {
	if (!isUrl(n)) throw new TypeError(`Expected url${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	return n
}
function isBigint(n) {
	return typeof n == 'bigint'
}
function asBigint(n, t) {
	if (!isBigint(n)) throw new TypeError(`Expected bigint${t?.name ? ` for ${t.name}` : ''}, got: ` + n)
	if ((t?.min !== void 0 && n < t?.min) || (t?.max !== void 0 && n > t?.max)) throw RangeError(`Expected value${t?.name ? ` for ${t.name}` : ''} in range: ${t.min ?? '-inf'}..${t.max ?? 'inf'}; got: ${n}`)
	return n
}
function isNullable(n, t) {
	return t == null ? !0 : n(t)
}
function asNullable(n, t) {
	return t == null ? null : n(t)
}
function asEmptiable(n, t) {
	return t === '' ? void 0 : n(t)
}
function asOptional(n, t) {
	return t == null ? void 0 : n(t)
}
function enforceObjectShape(n, t) {
	for (const [e, r] of Object.entries(t)) if (!r(n[e])) throw TypeError(`${e} in value does not exist or match shape`)
	for (const e of Object.keys(n)) if (!t[e]) throw TypeError(`${e} exists in value but not in shape`)
	return !0
}
function enforceArrayShape(n, t) {
	return n.every(e => enforceObjectShape(e, t))
}
function represent(n, t = 'json', e = 0) {
	if (n && isFunction(n.represent)) {
		const r = n.represent()
		if (isString(r)) return t === 'json' && e === 0 ? JSON.stringify(r) : r
	}
	if (isObject(n, !1)) {
		if (e > 1) return '[object Object]'
		if (t === 'json') {
			if (Array.isArray(n)) {
				const i = n.map(o => represent(o, 'json', e + 1))
				return e === 0 ? JSON.stringify(i) : i
			}
			const r = {}
			n.message && (r.message = represent(n.message, 'json', e + 1))
			for (const [i, o] of Object.entries(n)) r[i] = represent(o, 'json', e + 1)
			return e === 0 ? JSON.stringify(r) : r
		} else if (t === 'key-value') {
			const r = Object.keys(n)
			return n.message && !r.includes('message') && r.unshift('message'), r.map(i => `${i}=${JSON.stringify(represent(n[i], 'json', e + 1))}`).join(' ')
		}
	}
	return isUndefined(n) && (n = 'undefined'), e === 0 ? JSON.stringify(n) : n
}
function expandError(n, t) {
	if (isString(n)) return n
	const e = Object.keys(n)
	n.message && !e.includes('message') && e.push('message')
	const r = e.map(i => `${i}: ${n[i]}`).join('; ')
	return t && n.stack
		? r +
				`
` +
				n.stack
		: r
}
function deepMergeInPlace(n, t) {
	if (isStrictlyObject(n) && isStrictlyObject(t)) for (const e in t) isStrictlyObject(t[e]) ? (n[e] || (n[e] = {}), deepMergeInPlace(n[e], t[e])) : Array.isArray(t[e]) ? (n[e] = [...t[e]]) : ((t[e] !== null && t[e] !== void 0) || n[e] === null || n[e] === void 0) && (n[e] = t[e])
	return n
}
function deepMerge2(n, t) {
	const e = {}
	return deepMergeInPlace(e, n), deepMergeInPlace(e, t), e
}
function deepMerge3(n, t, e) {
	const r = {}
	return deepMergeInPlace(r, n), deepMergeInPlace(r, t), deepMergeInPlace(r, e), r
}
function zip(n, t) {
	const e = {}
	for (const r of n) for (const i of Object.keys(r)) e[i] ? (e[i] = t(e[i], r[i])) : (e[i] = r[i])
	return e
}
function zipSum(n) {
	return zip(n, (t, e) => t + e)
}
function pushToBucket(n, t, e) {
	n[t] || (n[t] = []), n[t].push(e)
}
function unshiftAndLimit(n, t, e) {
	for (n.unshift(t); n.length > e; ) n.pop()
}
function atRolling(n, t) {
	let e = t % n.length
	return e < 0 && (e += n.length), n[e]
}
function pushAll(n, t) {
	Array.prototype.push.apply(n, t)
}
function unshiftAll(n, t) {
	Array.prototype.unshift.apply(n, t)
}
async function mapAllAsync(n, t) {
	const e = []
	for (const r of n) e.push(await t(r))
	return e
}
function glue(n, t) {
	const e = []
	for (let r = 0; r < n.length; r++) e.push(n[r]), r < n.length - 1 && (isFunction(t) ? e.push(t()) : e.push(t))
	return e
}
function asEqual(n, t) {
	if (n !== t) throw Error(`Expected [${n}] to equal [${t}]`)
	return [n, t]
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
function asEither(n, t) {
	if (!t.includes(n)) throw Error(`Expected any of [${t.join(', ')}], got: [${n}]`)
	return n
}
function scheduleMany(n, t) {
	for (let e = 0; e < n.length; e++) {
		const r = n[e],
			i = t[e],
			o = Math.max(0, i.getTime() - Date.now())
		setTimeout(r, o)
	}
}
function interpolate(n, t, e) {
	return n + (t - n) * e
}
function sum(n) {
	return n.reduce((t, e) => t + e, 0)
}
function average(n) {
	return n.reduce((t, e) => t + e, 0) / n.length
}
function median(n) {
	const t = [...n].sort((r, i) => r - i),
		e = Math.floor(t.length / 2)
	return t.length % 2 === 0 ? (t[e] + t[e - 1]) / 2 : t[e]
}
function getDistanceFromMidpoint(n, t) {
	return n - (t - 1) / 2
}
function range(n, t) {
	const e = []
	for (let r = n; r <= t; r++) e.push(r)
	return e
}
function includesAny(n, t) {
	return t.some(e => n.includes(e))
}
function isChinese(n) {
	return /^[\u4E00-\u9FA5]+$/.test(n)
}
function slugify(n, t = () => !1) {
	return n
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.split('')
		.map(e => (/[a-z0-9]/.test(e) || t(e) ? e : '-'))
		.join('')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
}
function normalForm(n) {
	return slugify(n).replaceAll('-', '')
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
function joinHumanly(n, t = ', ', e = ' and ') {
	return !n || !n.length ? '' : n.length === 1 ? n[0] : n.length === 2 ? `${n[0]}${e}${n[1]}` : `${n.slice(0, n.length - 1).join(t)}${e}${n[n.length - 1]}`
}
function surroundInOut(n, t) {
	return t + n.split('').join(t) + t
}
function enumify(n) {
	return slugify(n).replace(/-/g, '_').toUpperCase()
}
function getFuzzyMatchScore(n, t) {
	if (t.length === 0) return 0
	const e = n.toLowerCase(),
		r = t.toLowerCase()
	return n === t ? 1e4 : e.startsWith(r) ? 1e4 - n.length : e.includes(r) ? 5e3 - n.length : new RegExp('.*' + r.split('').join('.*') + '.*').test(e) ? 1e3 - n.length : 0
}
function sortByFuzzyScore(n, t) {
	return n.filter(e => getFuzzyMatchScore(e, t)).sort((e, r) => getFuzzyMatchScore(r, t) - getFuzzyMatchScore(e, t))
}
function escapeHtml(n) {
	return n.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
const htmlEntityMap = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&gt;': '>', '&lt;': '<' }
function decodeHtmlEntities(n) {
	let t = n.replace(/&#(\d+);/g, (e, r) => String.fromCharCode(r)).replace(/&#x(\d+);/g, (e, r) => String.fromCharCode(parseInt(r, 16)))
	for (const [e, r] of Object.entries(htmlEntityMap)) t = t.replaceAll(e, r)
	return t
}
function before(n, t) {
	const e = n.indexOf(t)
	return e === -1 ? null : n.slice(0, e)
}
function after(n, t) {
	const e = n.indexOf(t)
	return e === -1 ? null : n.slice(e + t.length)
}
function beforeLast(n, t) {
	const e = n.lastIndexOf(t)
	return e === -1 ? null : n.slice(0, e)
}
function afterLast(n, t) {
	const e = n.lastIndexOf(t)
	return e === -1 ? null : n.slice(e + t.length)
}
function betweenWide(n, t, e) {
	const r = beforeLast(n, e)
	return r ? after(r, t) : null
}
function betweenNarrow(n, t, e) {
	const r = after(n, t)
	return r ? before(r, e) : null
}
function splitOnce(n, t, e = !1) {
	const r = e ? n.lastIndexOf(t) : n.indexOf(t)
	return r === -1 ? (e ? [null, n] : [n, null]) : [n.slice(0, r), n.slice(r + t.length)]
}
function splitAll(n, t) {
	let e = [n]
	for (const r of t) e = e.flatMap(i => i.split(r))
	return e.filter(r => r)
}
function getExtension(n) {
	const t = last(n.split(/\\|\//g)),
		e = t.lastIndexOf('.', t.length - 1)
	return e <= 0 ? '' : t.slice(e + 1)
}
function getBasename(n) {
	const t = last(n.split(/\\|\//g)),
		e = t.lastIndexOf('.', t.length - 1)
	return e <= 0 ? t : t.slice(0, e)
}
function normalizeEmail(n) {
	let [t, e] = n.split('@')
	t = shrinkTrim(t.replaceAll('.', '').toLowerCase()).replaceAll(' ', '')
	const [r] = t.split('+')
	if (!r || !e || e.indexOf('.') === -1 || e.indexOf('.') === e.length - 1) throw new Error('Invalid email')
	return (e = shrinkTrim(e.toLowerCase()).replaceAll(' ', '')), `${r}@${e}`
}
function normalizeFilename(n) {
	const t = getBasename(n),
		e = getExtension(n)
	return e ? `${t}.${e}` : t
}
function parseFilename(n) {
	const t = getBasename(n),
		e = getExtension(n)
	return { basename: t, extension: e, filename: e ? `${t}.${e}` : t }
}
function randomize(n, t = Math.random) {
	return n.replace(/\{(.+?)\}/g, (e, r) => pick(r.split('|'), t))
}
function expand(n) {
	const t = /\{(.+?)\}/,
		e = n.match(t)
	if (!e || !e.index) return [n]
	const r = e[1].split(','),
		i = n.slice(0, e.index),
		o = n.slice(e.index + e[0].length)
	let s = []
	for (const c of r) {
		const u = expand(i + c + o)
		s = s.concat(u)
	}
	return s
}
function shrinkTrim(n) {
	return n
		.split(
			`
`
		)
		.map(t => t.trim().replace(/\s+/g, ' '))
		.filter(t => t.length > 0).join(`
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
	const t = n.charCodeAt(0)
	return (t >= 65 && t <= 90) || (t >= 97 && t <= 122)
}
function isDigit(n) {
	if (!n) return !1
	const t = n.charCodeAt(0)
	return t >= 48 && t <= 57
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
function insertString(n, t, e, r, i) {
	return n.slice(0, t) + r + n.slice(t, t + e) + i + n.slice(t + e)
}
function indexOfRegex(n, t, e = 0) {
	const r = t.exec(n.slice(e))
	return r ? { index: r.index, match: r[0] } : null
}
function lineMatches(n, t, e = !0) {
	if (!e) return t.every(i => (i instanceof RegExp ? i.test(n) : n.indexOf(i, 0) !== -1))
	let r = 0
	for (const i of t)
		if (i instanceof RegExp) {
			const o = indexOfRegex(n, i, r)
			if (!o) return !1
			r = o.index + o.match.length
		} else {
			const o = n.indexOf(i, r)
			if (o === -1) return !1
			r = o + i.length
		}
	return !0
}
function linesMatchInOrder(n, t, e = !0) {
	let r = 0
	for (const i of t) {
		let o = !1
		for (; !o && r < n.length; ) lineMatches(n[r], i, e) && (o = !0), r++
		if (!o) return !1
	}
	return !0
}
function csvEscape(n) {
	return n.match(/"|,/) ? `"${n.replace(/"/g, '""')}"` : n
}
function allIndexOf(n, t, e = 0) {
	const r = []
	let i = n.indexOf(t, e)
	for (; i !== -1; ) r.push(i), (i = n.indexOf(t, i + t.length))
	return r
}
function indexOfEarliest(n, t, e = 0) {
	let r = -1
	for (const i of t) {
		const o = n.indexOf(i, e)
		o !== -1 && (r === -1 || o < r) && (r = o)
	}
	return r
}
function indexOfWordBreak(n, t = 0) {
	for (let e = t; e < n.length; e++) if (isWordBreakCharacter(n[e])) return e
	return -1
}
function indexOfHashtag(n, t = 0) {
	for (let e = t; e < n.length; e++) if (n[e] === '#' && isLetterOrDigit(n[e + 1])) return e
	return -1
}
function lastIndexOfBefore(n, t, e = 0) {
	return n.slice(0, e).lastIndexOf(t)
}
function findWeightedPair(n, t = 0, e = '{', r = '}') {
	let i = 1
	for (let o = t; o < n.length; o++)
		if (n.slice(o, o + r.length) === r) {
			if (--i === 0) return o
		} else n.slice(o, o + e.length) === e && i++
	return -1
}
function extractBlock(n, t) {
	const e = t.wordBoundary
		? indexOfEarliest(
				n,
				[
					`${t.opening} `,
					`${t.opening}
`
				],
				t.start || 0
		  )
		: n.indexOf(t.opening, t.start || 0)
	if (e === -1) return null
	const r = findWeightedPair(n, e + t.opening.length, t.opening, t.closing)
	return r === -1 ? null : t.exclusive ? n.slice(e + t.opening.length, r) : n.slice(e, r + t.closing.length)
}
function extractAllBlocks(n, t) {
	const e = []
	let r = t.wordBoundary
		? indexOfEarliest(
				n,
				[
					`${t.opening} `,
					`${t.opening}
`
				],
				t.start || 0
		  )
		: n.indexOf(t.opening, t.start || 0)
	for (;;) {
		if (r === -1) return e
		const i = extractBlock(n, { ...t, start: r })
		if (!i) return e
		e.push(i),
			(r = t.wordBoundary
				? indexOfEarliest(
						n,
						[
							`${t.opening} `,
							`${t.opening}
`
						],
						r + i.length
				  )
				: n.indexOf(t.opening, r + i.length))
	}
}
function replaceBlocks(n, t, e) {
	let r = 0
	for (;;) {
		const i = exports.Strings.extractBlock(n, { ...e, start: r })
		if (!i) return n
		const o = t(i)
		;(r = n.indexOf(i, r) + o.length), (n = n.replace(i, o))
	}
}
function splitFormatting(n, t) {
	const e = []
	let r = 0
	for (; r < n.length; ) {
		const i = n.indexOf(t, r)
		if (i === -1) {
			e.push({ string: n.slice(r), symbol: null })
			break
		}
		const o = n.indexOf(t, i + t.length)
		if ((i > r && o !== -1 && e.push({ string: n.slice(r, i), symbol: null }), o === -1)) {
			e.push({ string: n.slice(r), symbol: null })
			break
		}
		e.push({ string: n.slice(i + t.length, o), symbol: t }), (r = o + t.length)
	}
	return e
}
function splitHashtags(n) {
	const t = []
	let e = 0
	for (; e < n.length; ) {
		const r = indexOfHashtag(n, e)
		if (r === -1) {
			t.push({ string: n.slice(e), symbol: null })
			break
		}
		const i = indexOfWordBreak(n, r + 1)
		if (i === -1) {
			t.push({ string: n.slice(e, r), symbol: null }), t.push({ string: n.slice(r + 1), symbol: '#' })
			break
		}
		r > e && t.push({ string: n.slice(e, r), symbol: null }), t.push({ string: n.slice(r + 1, i), symbol: '#' }), (e = i)
	}
	return t
}
function splitUrls(n) {
	const t = []
	let e = 0
	for (; e < n.length; ) {
		const r = indexOfEarliest(n, ['http://', 'https://'], e)
		if (r === -1) {
			t.push({ string: n.slice(e), symbol: null })
			break
		}
		const i = indexOfEarliest(
			n,
			[
				' ',
				`
`
			],
			r
		)
		if (i === -1) {
			r > e && t.push({ string: n.slice(e, r), symbol: null }), t.push({ string: n.slice(r), symbol: 'http' })
			break
		}
		r > e && t.push({ string: n.slice(e, r), symbol: null }), t.push({ string: n.slice(r, i), symbol: 'http' }), (e = i)
	}
	return t
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
function baseToUint8Array(n, t) {
	const e = '=',
		r = t.length
	let i = 0,
		o = 0
	const s = []
	for (let c = 0; c < n.length; c++) {
		const u = n[c]
		if (u === e) break
		const f = t.indexOf(u)
		if (f === -1) throw new Error(`Invalid character: ${u}`)
		;(o = (o << Math.log2(r)) | f), (i += Math.log2(r)), i >= 8 && ((i -= 8), s.push((o >> i) & 255))
	}
	return new Uint8Array(s)
}
function uint8ArrayToBase(n, t) {
	const e = t.length
	let r = 0,
		i = 0,
		o = ''
	for (let s = 0; s < n.length; s++) for (i = (i << 8) | n[s], r += 8; r >= Math.log2(e); ) (r -= Math.log2(e)), (o += t[(i >> r) & (e - 1)])
	return r > 0 && (o += t[(i << (Math.log2(e) - r)) & (e - 1)]), o.length % 4 !== 0 && (o += '='.repeat(4 - (o.length % 4))), o
}
function hexToUint8Array(n) {
	;(n.startsWith('0x') || n.startsWith('0X')) && (n = n.slice(2))
	const t = n.length / 2,
		e = new Uint8Array(t)
	for (let r = 0; r < t; r++) {
		const i = parseInt(n.slice(r * 2, r * 2 + 2), 16)
		e[r] = i
	}
	return e
}
function uint8ArrayToHex(n) {
	return Array.from(n)
		.map(t => t.toString(16).padStart(2, '0'))
		.join('')
}
function uint8ArrayToBinary(n) {
	return Array.from(n)
		.map(t => t.toString(2).padStart(8, '0'))
		.join('')
}
function binaryToUint8Array(n) {
	const t = Math.ceil(n.length / 8),
		e = new Uint8Array(t)
	for (let r = 0; r < t; r++) {
		const i = parseInt(n.slice(r * 8, r * 8 + 8), 2)
		e[r] = i
	}
	return e
}
function route(n, t) {
	const e = n.split('/').filter(o => o),
		r = t.split('/').filter(o => o)
	if (e.length !== r.length) return null
	const i = {}
	for (let o = 0; o < e.length; o++) {
		const s = e[o]
		if (s.startsWith(':')) i[s.slice(1)] = r[o]
		else if (s !== r[o]) return null
	}
	return i
}
function explodeReplace(n, t, e) {
	const r = []
	for (const i of e) i !== t && r.push(n.replace(t, i))
	return r
}
function generateVariants(n, t, e, r = Math.random) {
	const i = exports.Arrays.shuffle(
			t.map(s => ({
				variants: exports.Arrays.shuffle(
					s.variants.map(c => c),
					r
				),
				avoid: s.avoid
			})),
			r
		),
		o = []
	for (const s of i) {
		const c = s.variants.filter(f => f !== s.avoid),
			u = c.find(f => n.includes(f))
		if (u && (pushAll(o, explodeReplace(n, u, c)), o.length >= e)) break
	}
	if (o.length < e)
		for (const s of i) {
			const c = s.variants.find(u => n.includes(u))
			if (c && (pushAll(o, explodeReplace(n, c, s.variants)), o.length >= e)) break
		}
	return o.slice(0, e)
}
function replaceWord(n, t, e, r = !1) {
	const i = new RegExp(r ? `(?<=\\s|^)${t}(?=\\s|$)` : `\\b${t}\\b`, 'g')
	return n.replace(i, e)
}
function replacePascalCaseWords(n, t) {
	const e = /\b[A-Z][a-zA-Z0-9]*\b/g
	return n.replace(e, r => (r.toUpperCase() === r ? r : t(r)))
}
function stripHtml(n) {
	return n.replace(/<[^>]*>/g, '')
}
function breakLine(n) {
	const t = n.lastIndexOf(' ')
	if (t === -1) return { line: n, rest: '' }
	const e = n.slice(0, t),
		r = n.slice(t + 1)
	return { line: e, rest: r }
}
function measureTextWidth(n, t = {}) {
	return [...n].reduce((e, r) => e + (t[r] || 1), 0)
}
function toLines(n, t, e = {}) {
	const r = []
	let i = '',
		o = 0
	for (let s = 0; s < n.length; s++) {
		const c = n[s],
			u = e[c] || 1
		if (((i += c), (o += u), o > t)) {
			const { line: f, rest: l } = breakLine(i)
			r.push(f),
				(i = l),
				(o = l
					.split('')
					.map(a => e[a] || 1)
					.reduce((a, h) => a + h, 0))
		}
	}
	return i && r.push(i), r
}
function levenshteinDistance(n, t) {
	const e = []
	for (let r = 0; r <= n.length; r++) e[r] = [r]
	for (let r = 0; r <= t.length; r++) e[0][r] = r
	for (let r = 1; r <= n.length; r++)
		for (let i = 1; i <= t.length; i++) {
			const o = n[r - 1] === t[i - 1] ? 0 : 1
			e[r][i] = Math.min(e[r - 1][i] + 1, e[r][i - 1] + 1, e[r - 1][i - 1] + o)
		}
	return e[n.length][t.length]
}
function findCommonPrefix(n) {
	const t = n.reduce((r, i) => (r.length < i.length ? r : i))
	let e = ''
	for (let r = 0; r < t.length; r++) {
		const i = t[r]
		if (n.every(o => o[r] === i)) e += i
		else break
	}
	return e
}
function findCommonDirectory(n) {
	const t = findCommonPrefix(n),
		e = t.lastIndexOf('/')
	return e === -1 ? '' : t.slice(0, e + 1)
}
function containsWord(n, t) {
	return new RegExp(`\\b${t}\\b`).test(n)
}
function containsWords(n, t, e) {
	return e === 'any' ? t.some(r => containsWord(n, r)) : t.every(r => containsWord(n, r))
}
function parseHtmlAttributes(n) {
	const t = {},
		e = n.match(/([a-z\-]+)="([^"]+)"/g)
	if (e)
		for (const r of e) {
			const [i, o] = splitOnce(r, '=')
			t[i] = o.slice(1, o.length - 1)
		}
	return t
}
function readNextWord(n, t, e = []) {
	let r = ''
	for (; t < n.length && (isLetterOrDigit(n[t]) || e.includes(n[t])); ) r += n[t++]
	return r
}
function readWordsAfterAll(n, t, e = []) {
	const r = allIndexOf(n, t),
		i = []
	for (const o of r) i.push(readNextWord(n, o + t.length, e))
	return i
}
function resolveVariables(n, t, e = '$', r = ':') {
	for (const i in t) n = resolveVariableWithDefaultSyntax(n, i, t[i], e, r)
	return (n = resolveRemainingVariablesWithDefaults(n)), n
}
function resolveVariableWithDefaultSyntax(n, t, e, r = '$', i = ':') {
	if (e === '') return n
	let o = n.indexOf(`${r}${t}`)
	for (; o !== -1; ) {
		if (n[o + t.length + 1] === i)
			if (n[o + t.length + 2] === i) n = n.replace(`${r}${t}${i}${i}`, e)
			else {
				const c = readNextWord(n, o + t.length + 2, ['_'])
				n = n.replace(`${r}${t}${i}${c}`, e)
			}
		else n = n.replace(`${r}${t}`, e)
		o = n.indexOf(`${r}${t}`, o + e.length)
	}
	return n
}
function resolveRemainingVariablesWithDefaults(n, t = '$', e = ':') {
	let r = n.indexOf(t)
	for (; r !== -1; ) {
		const i = readNextWord(n, r + 1)
		if (n[r + i.length + 1] === e)
			if (n[r + i.length + 2] === e) n = n.replace(`${t}${i}${e}${e}`, '')
			else {
				const s = readNextWord(n, r + i.length + 2)
				n = n.replace(`${t}${i}${e}${s}`, s)
			}
		r = n.indexOf(t, r + 1)
	}
	return n
}
function resolveMarkdownLinks(n, t) {
	let e = n.indexOf('](')
	for (; e !== -1; ) {
		const r = lastIndexOfBefore(n, '[', e),
			i = n.indexOf(')', e)
		if (r !== -1 && i !== -1) {
			const [o, s] = n.slice(r + 1, i).split(']('),
				c = t(o, s)
			n = n.slice(0, r) + c + n.slice(i + 1)
		}
		e = n.indexOf('](', e + 1)
	}
	return n
}
function toQueryString(n, t = !0) {
	const e = Object.entries(n)
		.filter(([r, i]) => i != null)
		.map(([r, i]) => `${r}=${encodeURIComponent(i)}`)
		.join('&')
	return e ? (t ? '?' : '') + e : ''
}
function parseQueryString(n) {
	const t = {},
		e = n.split('&')
	for (const r of e) {
		const [i, o] = r.split('=')
		i && o && (t[i] = decodeURIComponent(o))
	}
	return t
}
function hasKey(n, t) {
	return Object.prototype.hasOwnProperty.call(n, t)
}
function selectMax(n, t) {
	let e = null,
		r = -1 / 0
	for (const [i, o] of Object.entries(n)) {
		const s = t(o)
		s > r && ((r = s), (e = i))
	}
	return e ? [e, n[e]] : null
}
function reposition(n, t, e, r) {
	const i = n.find(s => s[t] === e),
		o = n.find(s => s[t] === e + r)
	i && o ? ((i[t] = e + r), (o[t] = e)) : i && (i[t] = e + r), n.sort((s, c) => asNumber(s[t]) - asNumber(c[t])), n.forEach((s, c) => (s[t] = c + 1))
}
function unwrapSingleKey(n) {
	const t = Object.keys(n)
	if (t.length === 1) return n[t[0]]
	throw new Error('Expected object to have a single key')
}
function parseKeyValues(n, t = ':') {
	return Object.fromEntries(
		n
			.map(e => splitOnce(e, t))
			.map(e => (e[0] && e[1] ? [shrinkTrim(e[0]), shrinkTrim(e[1])] : null))
			.filter(e => e)
	)
}
function errorMatches(n, t) {
	if (!n) return !1
	const e = n.message
	return typeof e == 'string' && e.includes(t)
}
function buildUrl(n, t, e) {
	return joinUrl([n, t]) + toQueryString(e || {})
}
function parseCsv(n, t = ',', e = '"') {
	const r = []
	let i = '',
		o = !1
	const s = n.split('')
	for (const c of s) c === t && !o ? (r.push(i), (i = '')) : c === e && ((!i && !o) || o) ? (o = !o) : (i += c)
	return r.push(i), r
}
function humanizeProgress(n) {
	return `[${Math.floor(n.progress * 100)}%] ${humanizeTime(n.deltaMs)} out of ${humanizeTime(n.totalTimeMs)} (${humanizeTime(n.remainingTimeMs)} left) [${Math.round(n.baseTimeMs)} ms each]`
}
async function waitFor(n, t) {
	let e = t.requiredConsecutivePasses || 1,
		r = 0
	for (let i = 0; i < t.attempts; i++) {
		try {
			if (await n()) {
				if ((r++, r >= e)) return
			} else r = 0
		} catch {
			r = 0
		}
		i < t.attempts - 1 && (await sleepMillis(t.waitMillis))
	}
	throw Error('Timed out waiting for predicate')
}
function filterAndRemove(n, t) {
	const e = []
	for (let r = n.length - 1; r >= 0; r--) t(n[r]) && e.push(n.splice(r, 1)[0])
	return e
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
	const t = new Date(n)
	return new Date(t.getTime() - t.getTimezoneOffset() * 6e4)
}
function fromMillis(n) {
	return new Date(n)
}
function createTimeDigits(n) {
	return String(Math.floor(n)).padStart(2, '0')
}
function normalizeTime(n) {
	let [t, e] = n.split(':')
	isNumber(parseInt(t, 10)) || (t = '0'), isNumber(parseInt(e, 10)) || (e = '0')
	let r = clamp(asInteger(t), 0, 23),
		i = clamp(asInteger(e), 0, 59)
	return `${createTimeDigits(r)}:${createTimeDigits(i)}`
}
function humanizeTime(n) {
	const t = Math.floor(n / 36e5)
	n = n % 36e5
	const e = Math.floor(n / 6e4)
	n = n % 6e4
	const r = Math.floor(n / 1e3)
	return t ? `${createTimeDigits(t)}:${createTimeDigits(e)}:${createTimeDigits(r)}` : `${createTimeDigits(e)}:${createTimeDigits(r)}`
}
function absoluteDays(n) {
	return Math.floor((isDate(n) ? n.getTime() : n) / 864e5)
}
const DefaultTimestampLabels = { today: (n, t) => createTimeDigits(n) + ':' + createTimeDigits(t), yesterday: () => 'Yesterday', monday: () => 'Mon', tuesday: () => 'Tue', wednesday: () => 'Wed', thursday: () => 'Thu', friday: () => 'Fri', saturday: () => 'Sat', sunday: () => 'Sun', weeks: n => `${n}w` }
function getTimestamp(n, t) {
	const e = new Date(t?.now || Date.now()),
		r = t?.labels || DefaultTimestampLabels,
		i = isDate(n) ? n : new Date(n)
	if (absoluteDays(e) === absoluteDays(i)) return r.today(i.getUTCHours(), i.getUTCMinutes(), i.getUTCHours() > 12)
	if (absoluteDays(e) - absoluteDays(i) === 1) return r.yesterday()
	const o = getDayInfoFromDate(i)
	return absoluteDays(e) - absoluteDays(i) < 7 ? r[o.day]() : r.weeks(Math.round((e.getTime() - i.getTime()) / 6048e5))
}
const DefaultTimeDeltaLabels = { now: () => 'A few seconds', seconds: n => `${n} seconds`, minutes: n => `${n} minutes`, hours: n => `${n} hours`, days: n => `${n} days`, weeks: n => `${n} weeks` }
function getTimeDelta(n, t) {
	const e = t?.now ?? Date.now(),
		r = t?.labels || DefaultTimeDeltaLabels,
		i = exports.Types.isDate(n) ? n.getTime() : n
	let o = (e - i) / 1e3
	return o < 10 ? r.now() : o < 120 ? r.seconds(Math.floor(o)) : ((o /= 60), o < 120 ? r.minutes(Math.floor(o)) : ((o /= 60), o < 48 ? r.hours(Math.floor(o)) : ((o /= 24), o < 14 ? r.days(Math.floor(o)) : ((o /= 7), r.weeks(Math.floor(o))))))
}
function secondsToHumanTime(n, t = DefaultTimeDeltaLabels) {
	return getTimeDelta(0, { now: n * 1e3, labels: t })
}
function countCycles(n, t, e) {
	const i = (e?.now ?? Date.now()) - n,
		o = Math.floor(i / t),
		s = t / (e?.precision ?? 1) - Math.ceil((i % t) / (e?.precision ?? 1))
	return { cycles: o, remaining: s }
}
const throttleTimers = {}
function throttle(n, t) {
	return !throttleTimers[n] || Date.now() > throttleTimers[n] ? ((throttleTimers[n] = Date.now() + t), !0) : !1
}
const timeUnits = { s: 1e3, m: 6e4, h: 36e5, d: 864e5 }
function timeSince(n, t, e) {
	return (t = isDate(t) ? t.getTime() : t), (e = e ? (isDate(e) ? e.getTime() : e) : Date.now()), (e - t) / timeUnits[n]
}
function getProgress(n, t, e, r) {
	r || (r = Date.now())
	const i = t / e,
		o = r - n,
		s = o / t,
		c = s * e,
		u = c - o
	return { deltaMs: o, progress: i, baseTimeMs: s, totalTimeMs: c, remainingTimeMs: u }
}
const dayNumberIndex = { 0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday' }
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
function days(n) {
	return n * 864e5
}
const dateUnits = { ms: 1, milli: 1, millis: 1, millisecond: 1, milliseconds: 1, s: 1e3, sec: 1e3, second: 1e3, seconds: 1e3, m: 6e4, min: 6e4, minute: 6e4, minutes: 6e4, h: 36e5, hour: 36e5, hours: 36e5, d: 864e5, day: 864e5, days: 864e5, w: 6048e5, week: 6048e5, weeks: 6048e5, month: 2592e6, months: 2592e6, y: 31536e6, year: 31536e6, years: 31536e6 }
function makeDate(n) {
	const t = parseFloat(n)
	if (isNaN(t)) throw Error('makeDate got NaN for input')
	const e = n
			.replace(/^-?[0-9.]+/, '')
			.trim()
			.toLowerCase(),
		r = e === '' ? 1 : dateUnits[e]
	if (!r) throw Error(`Unknown unit: "${e}"`)
	return Math.ceil(t * r)
}
const storageUnitExponents = { b: 0, byte: 0, bytes: 0, kb: 1, kilobyte: 1, kilobytes: 1, mb: 2, megabyte: 2, megabytes: 2, gb: 3, gigabyte: 3, gigabytes: 3, tb: 4, terabyte: 4, terabytes: 4 }
function makeStorage(n, t = 1024) {
	const e = parseFloat(n)
	if (isNaN(e)) throw Error('makeStorage got NaN for input')
	const r = n
			.replace(/^-?[0-9.]+/, '')
			.trim()
			.toLowerCase(),
		i = r === '' ? 0 : storageUnitExponents[r]
	if (i == null) throw Error(`Unknown unit: "${r}"`)
	return Math.ceil(e * t ** i)
}
function getPreLine(n) {
	return n.replace(/ +/g, ' ').replace(/^ /gm, '')
}
const tinyCache = new Map()
async function getCached(n, t, e, r) {
	const i = Date.now(),
		o = tinyCache.get(n)
	if (o && o.validUntil > i) return o.value
	r?.onMiss?.()
	try {
		const s = await e()
		return tinyCache.set(n, { value: s, validUntil: i + t }), s
	} catch (s) {
		throw (r?.onFailure?.(s), s)
	}
}
function getCachedDeferred(n, t, e, r) {
	const i = Date.now(),
		o = tinyCache.get(n)
	if (o && o.validUntil > i) return o.value
	r?.onMiss?.()
	const s = e()
	return (
		tinyCache.set(n, { value: s, validUntil: i + t }),
		s.catch(c => {
			tinyCache.delete(n), r?.onFailure?.(c)
		}),
		s
	)
}
function deleteFromCache(n) {
	tinyCache.delete(n)
}
function clearCache() {
	tinyCache.clear()
}
function deleteExpiredFromCache() {
	const n = Date.now()
	for (const [t, e] of tinyCache.entries()) e.validUntil <= n && tinyCache.delete(t)
}
function cacheSize() {
	return tinyCache.size
}
function joinUrl(n, t = !1) {
	;(n = n.filter(o => o)), t && isString(n[1]) && (n[1] = '../' + n[1])
	let e = ''
	isString(n[0]) && n[0].includes('://') && ((e = before(n[0], '://') ?? ''), (n[0] = after(n[0], '://') ?? ''))
	const r = n.map(o => String(o)).flatMap(o => o.split('/')),
		i = []
	for (let o = 0; o < r.length; o++) r[o] !== '.' && (r[o] === '..' ? (!e || i.length > 1) && i.pop() : i.push(r[o]))
	return (e ? e + '://' : '') + i.join('/').replaceAll(/\/{2,}/g, '/')
}
function replaceBetweenStrings(n, t, e, r, i = !0) {
	const o = n.indexOf(t),
		s = n.indexOf(e, o + t.length)
	if (o === -1 || s === -1) throw Error('Start or end not found')
	return i ? n.substring(0, o + t.length) + r + n.substring(s) : n.substring(0, o) + r + n.substring(s + e.length)
}
function describeMarkdown(n) {
	let t = 'p'
	n.startsWith('#') ? ((t = 'h1'), (n = n.slice(1).trim())) : n.startsWith('-') && ((t = 'li'), (n = n.slice(1).trim()))
	const e = n[0] === n[0].toUpperCase(),
		r = /[.?!]$/.test(n),
		i = /:$/.test(n)
	return { type: t, isCapitalized: e, hasPunctuation: r, endsWithColon: i }
}
function isBalanced(n, t = '(', e = ')') {
	let r = 0,
		i = 0
	for (; i < n.length; ) if ((n.startsWith(t, i) ? (r++, (i += t.length)) : n.startsWith(e, i) ? (r--, (i += e.length)) : i++, r < 0)) return !1
	return t === e ? r % 2 === 0 : r === 0
}
function textToFormat(n) {
	n = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	let t = n.length
	for (; (n = n.replace(/(\w+)[\s,']+\w+/g, '$1')), n.length !== t; ) t = n.length
	return (n = n.replaceAll(/[A-Z][a-zA-Z0-9]*/g, 'A')), (n = n.replaceAll(/[a-z][a-zA-Z0-9]*/g, 'a')), (n = n.replaceAll(/[\u4E00-\u9FA5]+/g, 'Z')), n
}
function sortObject(n) {
	const e = Object.keys(n).sort((i, o) => i.localeCompare(o)),
		r = {}
	for (const i of e) r[i] = sortAny(n[i])
	return r
}
function sortArray(n) {
	const t = []
	return n.sort((e, r) => JSON.stringify(sortAny(e)).localeCompare(JSON.stringify(sortAny(r)))).forEach(e => t.push(sortAny(e))), t
}
function sortAny(n) {
	return Array.isArray(n) ? sortArray(n) : isObject(n) ? sortObject(n) : n
}
function deepEquals(n, t) {
	return JSON.stringify(sortAny(n)) === JSON.stringify(sortAny(t))
}
function deepEqualsEvery(...n) {
	for (let t = 1; t < n.length; t++) if (!deepEquals(n[t - 1], n[t])) return !1
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
	let t = 0
	return { next: () => n[t++ % n.length] }
}
function createStatefulToggle(n) {
	let t
	return e => {
		const r = e === n && t !== n
		return (t = e), r
	}
}
function organiseWithLimits(n, t, e, r, i) {
	const o = {}
	for (const s of Object.keys(t)) o[s] = []
	;(o[r] = []), i && (n = n.sort(i))
	for (const s of n) {
		const c = s[e],
			u = t[c] ? c : r
		o[u].length >= t[u] ? o[r].push(s) : o[u].push(s)
	}
	return o
}
function diffKeys(n, t) {
	const e = Object.keys(n),
		r = Object.keys(t)
	return { uniqueToA: e.filter(i => !r.includes(i)), uniqueToB: r.filter(i => !e.includes(i)) }
}
function pickRandomKey(n) {
	const t = Object.keys(n)
	return t[Math.floor(Math.random() * t.length)]
}
function mapRandomKey(n, t) {
	const e = pickRandomKey(n)
	return (n[e] = t(n[e])), e
}
function fromObjectString(n) {
	return (
		(n = n.replace(
			/\r\n/g,
			`
`
		)),
		(n = n.replace(/(\w+)\((.+)\)/g, (t, e, r) => `${e}(${r.replaceAll(',', '&comma;')})`)),
		(n = n.replace(/(,)(\s+})/g, '$2')),
		(n = n.replace(/\.\.\..+?,/g, '')),
		(n = n.replace(/({\s+)([a-zA-Z]\w+),/g, "$1$2: '$2',")),
		(n = n.replace(/(,\s+)([a-zA-Z]\w+),/g, "$1$2: '$2',")),
		(n = n.replace(/:(.+)\?(.+):/g, (t, e, r) => `: (${e.trim()} && ${r.trim()}) ||`)),
		(n = n.replace(/([a-zA-Z0-9]+)( ?: ?{)/g, '"$1"$2')),
		(n = n.replace(/([a-zA-Z0-9]+) ?: ?(.+?)(,|\n|})/g, (t, e, r, i) => `"${e}":"${r.trim()}"${i}`)),
		(n = n.replace(/("'|'")/g, '"')),
		(n = n.replaceAll('&comma;', ',')),
		JSON.parse(n)
	)
}
const thresholds = [1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24, 1e27, 1e30, 1e9, 1e16, 1e18, 1e18, 1e18, 1e33],
	longNumberUnits = ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'gwei', 'bzz', 'btc', 'eth', 'dai', 'decillion'],
	shortNumberUnits = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'gwei', 'bzz', 'eth', 'btc', 'dai', 'D']
function fromDecimals(n, t, e) {
	let r = n.length - t
	if (r <= 0) return '0.' + '0'.repeat(-r) + n + (e ? ' ' + e : '')
	let i = n.substring(0, r),
		o = n.substring(r)
	return i === '' && (i = '0'), i + '.' + o + (e ? ' ' + e : '')
}
function formatNumber(n, t) {
	const e = t?.longForm ?? !1,
		r = t?.unit ? ` ${t.unit}` : '',
		i = e ? longNumberUnits : shortNumberUnits,
		o = t?.precision ?? 1
	if (n < thresholds[0]) return `${n}${r}`
	for (let s = 0; s < thresholds.length - 1; s++) if (n < thresholds[s + 1]) return `${(n / thresholds[s]).toFixed(o)}${e ? ' ' : ''}${i[s]}${r}`
	return `${(n / thresholds[thresholds.length - 1]).toFixed(o)}${e ? ' ' : ''}${i[thresholds.length - 1]}${r}`
}
function makeNumber(n) {
	const t = parseFloat(n)
	if (isNaN(t)) throw Error('makeNumber got NaN for input')
	const e = n.replace(/^-?[0-9.]+/, '').trim(),
		r = shortNumberUnits.findIndex(i => i.toLowerCase() === e.toLowerCase())
	return r === -1 ? t : t * thresholds[r]
}
function clamp(n, t, e) {
	return n < t ? t : n > e ? e : n
}
function increment(n, t, e) {
	const r = n + t
	return r > e ? e : r
}
function decrement(n, t, e) {
	const r = n - t
	return r < e ? e : r
}
function runOn(n, t) {
	return t(n), n
}
function ifPresent(n, t) {
	n && t(n)
}
function mergeArrays(n, t) {
	const e = Object.keys(t)
	for (const r of e) Array.isArray(t[r]) && Array.isArray(n[r]) && pushAll(n[r], t[r])
}
function empty(n) {
	return n.splice(0, n.length), n
}
function removeEmptyArrays(n) {
	for (const t of Object.keys(n)) (isEmptyArray(n[t]) || (Array.isArray(n[t]) && n[t].every(e => e == null))) && delete n[t]
	return n
}
function removeEmptyValues(n) {
	for (const t of Object.entries(n)) (t[1] === null || t[1] === void 0 || (isString(t[1]) && isBlank(t[1]))) && delete n[t[0]]
	return n
}
function filterObjectKeys(n, t) {
	const e = {}
	for (const [r, i] of Object.entries(n)) t(r) && (e[r] = i)
	return e
}
function filterObjectValues(n, t) {
	const e = {}
	for (const [r, i] of Object.entries(n)) t(i) && (e[r] = i)
	return e
}
function mapObject(n, t) {
	const e = {}
	for (const r of Object.entries(n)) e[r[0]] = t(r[1])
	return e
}
function mapIterable(n, t) {
	const e = []
	let r = 0
	for (const i of n) e.push(t(i, r++))
	return e
}
async function rethrow(n, t) {
	try {
		return await n()
	} catch {
		throw t
	}
}
function setSomeOnObject(n, t, e) {
	e != null && (n[t] = e)
}
function setSomeDeep(n, t, e, r) {
	const i = getDeep(e, r)
	i != null && setDeep(n, t, i)
}
function flip(n) {
	const t = {}
	for (const [e, r] of Object.entries(n)) t[r] = e
	return t
}
function getAllPermutations(n) {
	const t = Object.keys(n),
		e = t.map(c => n[c].length),
		r = e.reduce((c, u) => (c *= u))
	let i = 1
	const o = [1]
	for (let c = 0; c < e.length - 1; c++) (i *= e[c]), o.push(i)
	const s = []
	for (let c = 0; c < r; c++) {
		const u = {}
		for (let f = 0; f < t.length; f++) {
			const l = n[t[f]],
				a = Math.floor(c / o[f]) % l.length
			u[t[f]] = l[a]
		}
		s.push(u)
	}
	return s
}
function countTruthyValues(n) {
	return Object.values(n).filter(t => t).length
}
function getFlatNotation(n, t, e) {
	return n + (e ? '[' + t + ']' : (n.length ? '.' : '') + t)
}
function flattenInner(n, t, e, r, i) {
	if (!isObject(t)) return t
	for (const [o, s] of Object.entries(t)) {
		const c = getFlatNotation(e, o, r)
		Array.isArray(s) ? (i ? flattenInner(n, s, c, !0, i) : (n[c] = s.map(u => flattenInner(Array.isArray(u) ? [] : {}, u, '', !1, i)))) : isObject(s) ? flattenInner(n, s, c, !1, i) : (n[c] = s)
	}
	return n
}
function flatten(n, t = !1, e) {
	return flattenInner({}, n, e || '', !1, t)
}
function unflatten(n) {
	if (!isObject(n)) return n
	const t = Array.isArray(n) ? [] : {}
	for (const [e, r] of Object.entries(n))
		Array.isArray(r)
			? setDeep(
					t,
					e,
					r.map(i => unflatten(i))
			  )
			: setDeep(t, e, r)
	return t
}
function match(n, t, e) {
	return t[n] ? t[n] : e
}
function indexArray(n, t) {
	const e = {}
	for (const r of n) {
		const i = t(r)
		e[i] = r
	}
	return e
}
function indexArrayToCollection(n, t) {
	const e = {}
	for (const r of n) {
		const i = t(r)
		e[i] || (e[i] = []), e[i].push(r)
	}
	return e
}
function splitBySize(n, t) {
	const e = []
	for (let r = 0; r < n.length; r += t) e.push(n.slice(r, r + t))
	return e
}
function splitByCount(n, t) {
	const e = Math.ceil(n.length / t),
		r = []
	for (let i = 0; i < n.length; i += e) r.push(n.slice(i, i + e))
	return r
}
function tokenizeByLength(n, t) {
	const e = [],
		r = Math.ceil(n.length / t)
	for (let i = 0; i < r; i++) e.push(n.slice(i * t, i * t + t))
	return e
}
function tokenizeByCount(n, t) {
	const e = Math.ceil(n.length / t)
	return tokenizeByLength(n, e)
}
function makeUnique(n, t) {
	return Object.values(indexArray(n, t))
}
function countUnique(n, t, e, r, i) {
	const o = t ? n.map(t) : n,
		s = {}
	for (const u of o) s[u] = (s[u] || 0) + 1
	const c = r ? sortObjectValues(s, i ? (u, f) => u[1] - f[1] : (u, f) => f[1] - u[1]) : s
	return e ? Object.keys(c) : c
}
function sortObjectValues(n, t) {
	return Object.fromEntries(Object.entries(n).sort(t))
}
function transformToArray(n) {
	const t = [],
		e = Object.keys(n),
		r = n[e[0]].length
	for (let i = 0; i < r; i++) {
		const o = {}
		for (const s of e) o[s] = n[s][i]
		t.push(o)
	}
	return t
}
function incrementMulti(n, t, e = 1) {
	for (const r of n) r[t] += e
}
function setMulti(n, t, e) {
	for (const r of n) r[t] = e
}
function group(n, t) {
	const e = []
	let r = []
	return (
		n.forEach((i, o) => {
			;(o === 0 || !t(i, n[o - 1])) && ((r = []), e.push(r)), r.push(i)
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
function pushToBidirectionalMap(n, t, e, r = 100) {
	if (n.map.has(t)) {
		const i = n.keys.indexOf(t)
		n.keys.splice(i, 1)
	}
	if ((n.map.set(t, e), n.keys.push(t), n.keys.length > r)) {
		const i = n.keys.shift()
		i && n.map.delete(i)
	}
}
function unshiftToBidirectionalMap(n, t, e, r = 100) {
	if (n.map.has(t)) {
		const i = n.keys.indexOf(t)
		n.keys.splice(i, 1)
	}
	if ((n.map.set(t, e), n.keys.unshift(t), n.keys.length > r)) {
		const i = n.keys.shift()
		i && n.map.delete(i)
	}
}
function addToTemporalBidirectionalMap(n, t, e, r, i = 100) {
	pushToBidirectionalMap(n, t, { validUntil: Date.now() + r, data: e }, i)
}
function getFromTemporalBidirectionalMap(n, t) {
	const e = n.map.get(t)
	return e && e.validUntil > Date.now() ? e.data : null
}
class Optional {
	constructor(t) {
		this.value = t
	}
	static of(t) {
		return new Optional(t)
	}
	static empty() {
		return new Optional(null)
	}
	map(t) {
		return new Optional(this.value !== null && this.value !== void 0 ? t(this.value) : null)
	}
	mapAsync(t) {
		return this.value !== null && this.value !== void 0 ? t(this.value).then(e => Optional.of(e)) : Promise.resolve(Optional.empty())
	}
	ifPresent(t) {
		return this.value !== null && this.value !== void 0 && t(this.value), this
	}
	ifPresentAsync(t) {
		return this.value !== null && this.value !== void 0 ? t(this.value).then(() => this) : Promise.resolve(this)
	}
	ifAbsent(t) {
		return (this.value === null || this.value === void 0) && t(), this
	}
	ifAbsentAsync(t) {
		return this.value === null || this.value === void 0 ? t().then(() => this) : Promise.resolve(this)
	}
	getOrFallback(t) {
		return this.value ?? t()
	}
	getOrFallbackAsync(t) {
		return this.value !== null && this.value !== void 0 ? Promise.resolve(this.value) : t()
	}
	getOrThrow() {
		if (this.value === null || this.value === void 0) throw Error('Optional.value is empty')
		return this.value
	}
}
exports.Optional = Optional
class Lazy {
	constructor(t) {
		;(this.supplier = t), (this.value = null)
	}
	get() {
		return this.value || (this.value = this.supplier()), this.value
	}
}
exports.Lazy = Lazy
class AsyncLazy {
	constructor(t) {
		;(this.supplier = t), (this.value = null)
	}
	async get() {
		return this.value || (this.value = await this.supplier()), this.value
	}
}
exports.AsyncLazy = AsyncLazy
function multicall(n) {
	return () => n.forEach(t => t())
}
function maxBy(n, t) {
	return n.reduce((e, r) => (t(e) > t(r) ? e : r))
}
function minBy(n, t) {
	return n.reduce((e, r) => (t(e) < t(r) ? e : r))
}
function allArrayIndexOf(n, t) {
	const e = []
	return (
		n.forEach((r, i) => {
			t(r) && e.push(i)
		}),
		e
	)
}
function findInstance(n, t) {
	const e = n.find(r => r instanceof t)
	return Optional.of(e)
}
function filterInstances(n, t) {
	return n.filter(e => e instanceof t)
}
function interleave(n, t) {
	const e = [],
		r = Math.max(n.length, t.length)
	for (let i = 0; i < r; i++) n[i] && e.push(n[i]), t[i] && e.push(t[i])
	return e
}
function toggle(n, t) {
	return n.includes(t) ? n.filter(e => e !== t) : [...n, t]
}
class Node {
	constructor(t) {
		;(this.value = t), (this.children = [])
	}
}
function createHierarchy(n, t, e, r, i = !1) {
	const o = new Map(),
		s = []
	n.forEach(u => {
		const f = new Node(u)
		o.set(u[t], f)
	}),
		n.forEach(u => {
			const f = o.get(u[t])
			if (!f) return
			const l = u[e]
			if (l) {
				const a = o.get(l)
				a && a.children.push(f)
			} else s.push(f)
		})
	const c = u => {
		u.children.sort((f, l) => {
			const a = f.value[r],
				h = l.value[r]
			return i ? h - a : a - h
		}),
			u.children.forEach(c)
	}
	return s.forEach(c), s
}
function log2Reduce(n, t) {
	if (Math.log2(n.length) % 1 !== 0) throw new Error('Array length must be a power of 2')
	let e = [...n]
	for (; e.length > 1; ) {
		const r = []
		for (let i = 0; i < e.length; i += 2) {
			const o = e[i + 1]
			r.push(t(e[i], o))
		}
		e = r
	}
	return e[0]
}
function concatBytes(...n) {
	const t = n.reduce((i, o) => i + o.length, 0),
		e = new Uint8Array(t)
	let r = 0
	return (
		n.forEach(i => {
			e.set(i, r), (r += i.length)
		}),
		e
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
function numberToUint8(n) {
	return new Uint8Array([n])
}
function uint8ToNumber(n) {
	return n[0]
}
function numberToUint16(n, t) {
	const e = new ArrayBuffer(2)
	return new DataView(e).setUint16(0, n, t === 'LE'), new Uint8Array(e)
}
function uint16ToNumber(n, t) {
	return new DataView(n.buffer).getUint16(n.byteOffset, t === 'LE')
}
function numberToUint32(n, t) {
	const e = new ArrayBuffer(4)
	return new DataView(e).setUint32(0, n, t === 'LE'), new Uint8Array(e)
}
function uint32ToNumber(n, t) {
	return new DataView(n.buffer).getUint32(n.byteOffset, t === 'LE')
}
function numberToUint64(n, t) {
	const e = new ArrayBuffer(8)
	return new DataView(e).setBigUint64(0, BigInt(n), t === 'LE'), new Uint8Array(e)
}
function uint64ToNumber(n, t) {
	return new DataView(n.buffer).getBigUint64(n.byteOffset, t === 'LE')
}
function numberToUint256(n, t) {
	const r = new Uint8Array(32)
	let i = n
	if (t === 'LE') {
		for (let o = 0; o < 32; o++) (r[o] = Number(i & 0xffn)), (i >>= 8n)
		return r
	}
	for (let o = 31; o >= 0; o--) (r[o] = Number(i & 0xffn)), (i >>= 8n)
	return r
}
function uint256ToNumber(n, t) {
	let r = 0n
	if (t === 'LE') {
		for (let i = 31; i >= 0; i--) r = (r << 8n) | BigInt(n[i])
		return r
	}
	for (let i = 0; i < 32; i++) r = (r << 8n) | BigInt(n[i])
	return r
}
function sliceBytes(n, t) {
	const e = []
	let r = 0
	for (const i of t) e.push(n.subarray(r, r + i)), (r += i)
	return e
}
function partition(n, t) {
	const e = []
	for (let r = 0; r < n.length; r += t) e.push(n.subarray(r, r + t))
	return e
}
const IOTA_CONSTANTS = [0, 1, 0, 32898, 2147483648, 32906, 2147483648, 2147516416, 0, 32907, 0, 2147483649, 2147483648, 2147516545, 2147483648, 32777, 0, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 2147483648, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 0, 32778, 2147483648, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 0, 2147483649, 2147483648, 2147516424]
function keccakPermutate(n) {
	for (let t = 0; t < 24; t++) {
		const e = n[0] ^ n[10] ^ n[20] ^ n[30] ^ n[40],
			r = n[1] ^ n[11] ^ n[21] ^ n[31] ^ n[41],
			i = n[2] ^ n[12] ^ n[22] ^ n[32] ^ n[42],
			o = n[3] ^ n[13] ^ n[23] ^ n[33] ^ n[43],
			s = n[4] ^ n[14] ^ n[24] ^ n[34] ^ n[44],
			c = n[5] ^ n[15] ^ n[25] ^ n[35] ^ n[45],
			u = n[6] ^ n[16] ^ n[26] ^ n[36] ^ n[46],
			f = n[7] ^ n[17] ^ n[27] ^ n[37] ^ n[47],
			l = n[8] ^ n[18] ^ n[28] ^ n[38] ^ n[48],
			a = n[9] ^ n[19] ^ n[29] ^ n[39] ^ n[49],
			h = (i << 1) | (o >>> 31),
			p = (o << 1) | (i >>> 31),
			d = l ^ h,
			m = a ^ p,
			w = (s << 1) | (c >>> 31),
			x = (c << 1) | (s >>> 31),
			g = e ^ w,
			y = r ^ x,
			En = (u << 1) | (f >>> 31),
			Sn = (f << 1) | (u >>> 31),
			b = i ^ En,
			A = o ^ Sn,
			Mn = (l << 1) | (a >>> 31),
			kn = (a << 1) | (l >>> 31),
			$ = s ^ Mn,
			E = c ^ kn,
			On = (e << 1) | (r >>> 31),
			Tn = (r << 1) | (e >>> 31),
			S = u ^ On,
			M = f ^ Tn
		;(n[0] ^= d), (n[1] ^= m), (n[2] ^= g), (n[3] ^= y), (n[4] ^= b), (n[5] ^= A), (n[6] ^= $), (n[7] ^= E), (n[8] ^= S), (n[9] ^= M), (n[10] ^= d), (n[11] ^= m), (n[12] ^= g), (n[13] ^= y), (n[14] ^= b), (n[15] ^= A), (n[16] ^= $), (n[17] ^= E), (n[18] ^= S), (n[19] ^= M), (n[20] ^= d), (n[21] ^= m), (n[22] ^= g), (n[23] ^= y), (n[24] ^= b), (n[25] ^= A), (n[26] ^= $), (n[27] ^= E), (n[28] ^= S), (n[29] ^= M), (n[30] ^= d), (n[31] ^= m), (n[32] ^= g), (n[33] ^= y), (n[34] ^= b), (n[35] ^= A), (n[36] ^= $), (n[37] ^= E), (n[38] ^= S), (n[39] ^= M), (n[40] ^= d), (n[41] ^= m), (n[42] ^= g), (n[43] ^= y), (n[44] ^= b), (n[45] ^= A), (n[46] ^= $), (n[47] ^= E), (n[48] ^= S), (n[49] ^= M)
		const k = n[0],
			O = n[1],
			T = (n[2] << 1) | (n[3] >>> 31),
			C = (n[3] << 1) | (n[2] >>> 31),
			R = (n[5] << 30) | (n[4] >>> 2),
			I = (n[4] << 30) | (n[5] >>> 2),
			D = (n[6] << 28) | (n[7] >>> 4),
			P = (n[7] << 28) | (n[6] >>> 4),
			B = (n[8] << 27) | (n[9] >>> 5),
			U = (n[9] << 27) | (n[8] >>> 5),
			j = (n[11] << 4) | (n[10] >>> 28),
			L = (n[10] << 4) | (n[11] >>> 28),
			N = (n[13] << 12) | (n[12] >>> 20),
			v = (n[12] << 12) | (n[13] >>> 20),
			F = (n[14] << 6) | (n[15] >>> 26),
			z = (n[15] << 6) | (n[14] >>> 26),
			W = (n[17] << 23) | (n[16] >>> 9),
			q = (n[16] << 23) | (n[17] >>> 9),
			H = (n[18] << 20) | (n[19] >>> 12),
			V = (n[19] << 20) | (n[18] >>> 12),
			J = (n[20] << 3) | (n[21] >>> 29),
			K = (n[21] << 3) | (n[20] >>> 29),
			Z = (n[22] << 10) | (n[23] >>> 22),
			Q = (n[23] << 10) | (n[22] >>> 22),
			G = (n[25] << 11) | (n[24] >>> 21),
			_ = (n[24] << 11) | (n[25] >>> 21),
			Y = (n[26] << 25) | (n[27] >>> 7),
			X = (n[27] << 25) | (n[26] >>> 7),
			nn = (n[29] << 7) | (n[28] >>> 25),
			tn = (n[28] << 7) | (n[29] >>> 25),
			en = (n[31] << 9) | (n[30] >>> 23),
			rn = (n[30] << 9) | (n[31] >>> 23),
			on = (n[33] << 13) | (n[32] >>> 19),
			sn = (n[32] << 13) | (n[33] >>> 19),
			cn = (n[34] << 15) | (n[35] >>> 17),
			un = (n[35] << 15) | (n[34] >>> 17),
			fn = (n[36] << 21) | (n[37] >>> 11),
			ln = (n[37] << 21) | (n[36] >>> 11),
			an = (n[38] << 8) | (n[39] >>> 24),
			hn = (n[39] << 8) | (n[38] >>> 24),
			dn = (n[40] << 18) | (n[41] >>> 14),
			pn = (n[41] << 18) | (n[40] >>> 14),
			mn = (n[42] << 2) | (n[43] >>> 30),
			gn = (n[43] << 2) | (n[42] >>> 30),
			wn = (n[45] << 29) | (n[44] >>> 3),
			xn = (n[44] << 29) | (n[45] >>> 3),
			yn = (n[47] << 24) | (n[46] >>> 8),
			bn = (n[46] << 24) | (n[47] >>> 8),
			An = (n[48] << 14) | (n[49] >>> 18),
			$n = (n[49] << 14) | (n[48] >>> 18)
		;(n[0] = k ^ (~N & G)), (n[1] = O ^ (~v & _)), (n[2] = N ^ (~G & fn)), (n[3] = v ^ (~_ & ln)), (n[4] = G ^ (~fn & An)), (n[5] = _ ^ (~ln & $n)), (n[6] = fn ^ (~An & k)), (n[7] = ln ^ (~$n & O)), (n[8] = An ^ (~k & N)), (n[9] = $n ^ (~O & v)), (n[10] = D ^ (~H & J)), (n[11] = P ^ (~V & K)), (n[12] = H ^ (~J & on)), (n[13] = V ^ (~K & sn)), (n[14] = J ^ (~on & wn)), (n[15] = K ^ (~sn & xn)), (n[16] = on ^ (~wn & D)), (n[17] = sn ^ (~xn & P)), (n[18] = wn ^ (~D & H)), (n[19] = xn ^ (~P & V)), (n[20] = T ^ (~F & Y)), (n[21] = C ^ (~z & X)), (n[22] = F ^ (~Y & an)), (n[23] = z ^ (~X & hn)), (n[24] = Y ^ (~an & dn)), (n[25] = X ^ (~hn & pn)), (n[26] = an ^ (~dn & T)), (n[27] = hn ^ (~pn & C)), (n[28] = dn ^ (~T & F)), (n[29] = pn ^ (~C & z)), (n[30] = B ^ (~j & Z)), (n[31] = U ^ (~L & Q)), (n[32] = j ^ (~Z & cn)), (n[33] = L ^ (~Q & un)), (n[34] = Z ^ (~cn & yn)), (n[35] = Q ^ (~un & bn)), (n[36] = cn ^ (~yn & B)), (n[37] = un ^ (~bn & U)), (n[38] = yn ^ (~B & j)), (n[39] = bn ^ (~U & L)), (n[40] = R ^ (~W & nn)), (n[41] = I ^ (~q & tn)), (n[42] = W ^ (~nn & en)), (n[43] = q ^ (~tn & rn)), (n[44] = nn ^ (~en & mn)), (n[45] = tn ^ (~rn & gn)), (n[46] = en ^ (~mn & R)), (n[47] = rn ^ (~gn & I)), (n[48] = mn ^ (~R & W)), (n[49] = gn ^ (~I & q)), (n[0] ^= IOTA_CONSTANTS[t * 2]), (n[1] ^= IOTA_CONSTANTS[t * 2 + 1])
	}
}
function bytesToNumbers(n) {
	const t = []
	for (let e = 0; e < n.length; e += 4) t.push(n[e] | (n[e + 1] << 8) | (n[e + 2] << 16) | (n[e + 3] << 24))
	return t
}
function divideToBlocks(n, t) {
	if (!n.length) {
		const i = new Uint8Array(136)
		return (i[0] = t), (i[135] = 128), [bytesToNumbers(i)]
	}
	const e = partition(n, 136),
		r = e[e.length - 1]
	if (r.length < 136) {
		const i = new Uint8Array(136)
		i.set(r), (i[r.length] = t), (i[135] |= 128), (e[e.length - 1] = i)
	}
	if (r.length === 136) {
		const i = new Uint8Array(136)
		;(i[0] = t), (i[135] = 128), e.push(i)
	}
	return e.map(bytesToNumbers)
}
function absorb(n, t) {
	for (const e of t) {
		for (let r = 0; r < 34; r += 2) (n[r] ^= e[r + 1]), (n[r + 1] ^= e[r])
		keccakPermutate(n)
	}
	return n
}
function squeeze(n) {
	return new Uint8Array([n[1], n[1] >> -24, n[1] >> -16, n[1] >> -8, n[0], n[0] >> 8, n[0] >> 16, n[0] >> 24, n[3], n[3] >> -24, n[3] >> -16, n[3] >> -8, n[2], n[2] >> 8, n[2] >> 16, n[2] >> 24, n[5], n[5] >> -24, n[5] >> -16, n[5] >> -8, n[4], n[4] >> 8, n[4] >> 16, n[4] >> 24, n[7], n[7] >> -24, n[7] >> -16, n[7] >> -8, n[6], n[6] >> 8, n[6] >> 16, n[6] >> 24])
}
function squeezeInto(n, t, e) {
	;(t[e] = n[1]), (t[e + 1] = n[1] >> 8), (t[e + 2] = n[1] >> 16), (t[e + 3] = n[1] >> 24), (t[e + 4] = n[0]), (t[e + 5] = n[0] >> 8), (t[e + 6] = n[0] >> 16), (t[e + 7] = n[0] >> 24), (t[e + 8] = n[3]), (t[e + 9] = n[3] >> 8), (t[e + 10] = n[3] >> 16), (t[e + 11] = n[3] >> 24), (t[e + 12] = n[2]), (t[e + 13] = n[2] >> 8), (t[e + 14] = n[2] >> 16), (t[e + 15] = n[2] >> 24), (t[e + 16] = n[5]), (t[e + 17] = n[5] >> 8), (t[e + 18] = n[5] >> 16), (t[e + 19] = n[5] >> 24), (t[e + 20] = n[4]), (t[e + 21] = n[4] >> 8), (t[e + 22] = n[4] >> 16), (t[e + 23] = n[4] >> 24), (t[e + 24] = n[7]), (t[e + 25] = n[7] >> 8), (t[e + 26] = n[7] >> 16), (t[e + 27] = n[7] >> 24), (t[e + 28] = n[6]), (t[e + 29] = n[6] >> 8), (t[e + 30] = n[6] >> 16), (t[e + 31] = n[6] >> 24)
}
function keccak256(n) {
	return squeeze(absorb(new Array(50).fill(0), divideToBlocks(n, 1)))
}
function bmtRoot(n) {
	const t = new Uint8Array(n),
		e = new Array(50).fill(0),
		r = new Uint8Array(136)
	;(r[64] = 1), (r[135] = 128)
	let i = t.length >>> 5
	for (; i > 1; ) {
		const o = i >>> 1
		for (let s = 0; s < o; s++) {
			r.set(t.subarray(s << 6, (s + 1) << 6)), e.fill(0)
			for (let c = 0, u = 0; c < 34; c += 2, u += 8) (e[c] ^= r[u + 4] | (r[u + 5] << 8) | (r[u + 6] << 16) | (r[u + 7] << 24)), (e[c + 1] ^= r[u] | (r[u + 1] << 8) | (r[u + 2] << 16) | (r[u + 3] << 24))
			keccakPermutate(e), squeezeInto(e, t, s << 5)
		}
		i = o
	}
	return t.subarray(0, 32)
}
const SPAN_ENCRYPT_INIT_CTR = 128
function encryptSegments(n, t, e) {
	const r = new Uint8Array(e.length),
		i = new Uint8Array(36)
	i.set(n)
	for (let o = 0, s = 0; s < e.length; o++, s += 32) {
		const c = (t + o) >>> 0
		;(i[32] = c & 255), (i[33] = (c >>> 8) & 255), (i[34] = (c >>> 16) & 255), (i[35] = (c >>> 24) & 255)
		const u = keccak256(keccak256(i)),
			f = Math.min(s + 32, e.length)
		for (let l = s; l < f; l++) r[l] = e[l] ^ u[l - s]
	}
	return r
}
function encryptSpan(n, t) {
	return encryptSegments(n, SPAN_ENCRYPT_INIT_CTR, t)
}
function encryptData(n, t) {
	return encryptSegments(n, 0, t)
}
function decryptChunk(n, t) {
	return { span: uint64ToNumber(encryptSpan(t, n.subarray(0, 8)), 'LE'), data: encryptData(t, n.subarray(8, 4104)) }
}
function sha3_256(n) {
	return squeeze(absorb(new Array(50).fill(0), divideToBlocks(n, 6)))
}
function proximity(n, t) {
	const e = Math.min(n.length, t.length)
	for (let r = 0; r < e; r++) {
		const i = n[r] ^ t[r]
		for (let o = 0; o < 8; o++) if ((i >> (7 - o)) & 1) return r * 8 + o
	}
	return Math.min(n.length, t.length) * 8
}
function commonPrefix(n, t) {
	const e = Math.min(n.length, t.length)
	for (let r = 0; r < e; r++) if (n[r] !== t[r]) return n.subarray(0, r)
	return n.subarray(0, e)
}
function setBit(n, t, e, r) {
	const i = Math.floor(t / 8),
		o = t % 8
	e === 1 ? (n[i] |= 1 << (r === 'BE' ? 7 - o : o)) : (n[i] &= ~(1 << (r === 'BE' ? 7 - o : o)))
}
function getBit(n, t, e) {
	const r = Math.floor(t / 8),
		i = t % 8
	return (n[r] >> (e === 'BE' ? 7 - i : i)) & 1
}
function binaryIndexOf(n, t, e = 0) {
	for (let r = e; r < n.length; r++) for (let i = 0; i < t.length && n[r + i] === t[i]; i++) if (i === t.length - 1) return r
	return -1
}
function binaryPadStart(n, t, e = 0) {
	if (n.length >= t) return n
	const r = new Uint8Array(t)
	return r.fill(e), r.set(n, t - n.length), r
}
function binaryPadStartToMultiple(n, t, e = 0) {
	const r = n.length % t
	return r === 0 ? n : binaryPadStart(n, n.length + t - r, e)
}
function binaryPadEnd(n, t, e = 0) {
	if (n.length >= t) return n
	const r = new Uint8Array(t)
	return r.fill(e), r.set(n, 0), r
}
function binaryPadEndToMultiple(n, t, e = 0) {
	const r = n.length % t
	return r === 0 ? n : binaryPadEnd(n, n.length + t - r, e)
}
function xorCypher(n, t) {
	const e = new Uint8Array(n.length)
	for (let r = 0; r < n.length; r++) e[r] = n[r] ^ t[r % t.length]
	return e
}
function isUtf8(n) {
	for (let t = 0; t < n.length; t++) {
		const e = n[t]
		if (!(e < 128))
			if ((e & 224) === 192) {
				if (t + 1 >= n.length || (n[t + 1] & 192) !== 128) return !1
				t += 1
			} else if ((e & 240) === 224) {
				if (t + 2 >= n.length || (n[t + 1] & 192) !== 128 || (n[t + 2] & 192) !== 128) return !1
				t += 2
			} else if ((e & 248) === 240) {
				if (t + 3 >= n.length || (n[t + 1] & 192) !== 128 || (n[t + 2] & 192) !== 128 || (n[t + 3] & 192) !== 128) return !1
				t += 3
			} else return !1
	}
	return !0
}
function binaryEquals(n, t) {
	if (n.length !== t.length) return !1
	for (let e = 0; e < n.length; e++) if (n[e] !== t[e]) return !1
	return !0
}
function mod(n, t) {
	return ((n % t) + t) % t
}
function modInverse(n, t) {
	n = mod(n, t)
	let [e, r] = [0n, 1n],
		[i, o] = [t, n]
	for (; o !== 0n; ) {
		const s = i / o
		;([e, r] = [r, e - s * r]), ([i, o] = [o, i - s * o])
	}
	if (i > 1n) throw new Error('a is not invertible')
	return e < 0n && (e += t), e
}
function modPow(n, t, e) {
	let r = 1n
	for (n = mod(n, e); t > 0; ) t % 2n === 1n && (r = mod(r * n, e)), (n = mod(n * n, e)), (t = t / 2n)
	return r
}
function modSqrt(n, t) {
	return mod(n, t) === 0n ? 0n : t % 4n === 3n ? modPow(n, (t + 1n) / 4n, t) : null
}
const SECP256K1_P = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,
	SECP256K1_N = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,
	SECP256K1_X = 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
	SECP256K1_Y = 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,
	SECP256K1_BETA = 0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501een
function ellipticDouble(n, t, e) {
	if (t === 0n) return [0n, 0n]
	const r = mod(3n * n * n * modInverse(2n * t, e), e),
		i = mod(r * r - 2n * n, e),
		o = mod(r * (n - i) - t, e)
	return [i, o]
}
function ellipticAdd(n, t, e, r, i) {
	if (n === 0n && t === 0n) return [e, r]
	if (e === 0n && r === 0n) return [n, t]
	if (n === e && t === mod(-r, i)) return [0n, 0n]
	if (n === e && t === r) return ellipticDouble(n, t, i)
	const o = mod((r - t) * modInverse(e - n, i), i),
		s = mod(o * o - n - e, i),
		c = mod(o * (n - s) - t, i)
	return [s, c]
}
function privateKeyToPublicKey(n) {
	if (n <= 0n || n >= SECP256K1_N) throw new Error('Invalid private key')
	return doubleAndAdd(SECP256K1_X, SECP256K1_Y, n)
}
function compressPublicKey(n) {
	const e = n[1] % 2n === 0n ? 2 : 3
	return new Uint8Array([e, ...numberToUint256(n[0], 'BE')])
}
function publicKeyFromCompressed(n) {
	if (n.length !== 33 || (n[0] !== 2 && n[0] !== 3)) throw new Error('Invalid compressed public key')
	const t = uint256ToNumber(n.slice(1), 'BE'),
		e = modSqrt(mod(t ** 3n + 7n, SECP256K1_P), SECP256K1_P)
	if (!e) throw Error('Invalid x: does not correspond to a valid curve point')
	const r = mod(-e, SECP256K1_P),
		i = e % 2n === 0n
	return [t, n[0] === 2 ? (i ? e : r) : i ? r : e]
}
function publicKeyToAddress(n) {
	const t = new Uint8Array(20),
		e = keccak256(concatBytes(numberToUint256(n[0], 'BE'), numberToUint256(n[1], 'BE')))
	return t.set(e.subarray(12)), t
}
function checksumEncode(n) {
	const t = exports.Binary.uint8ArrayToHex(n),
		e = exports.Binary.uint8ArrayToHex(exports.Binary.keccak256(new Uint8Array([...t].map(i => i.charCodeAt(0)))))
	let r = '0x'
	for (let i = 0; i < t.length; i++) parseInt(e[i], 16) > 7 ? (r += t[i].toUpperCase()) : (r += t[i])
	return r
}
function jacobianDouble(n, t, e) {
	if (e === 0n) return [0n, 0n, 0n]
	const r = SECP256K1_P,
		i = (t * t) % r,
		o = (4n * n * i) % r,
		s = (3n * n * n) % r,
		c = mod(s * s - 2n * o, r),
		u = mod(s * (o - c) - 8n * i * i, r),
		f = (2n * t * e) % r
	return [c, u, f]
}
function jacobianAddMixed(n, t, e, r, i) {
	if (e === 0n) return [r, i, 1n]
	const o = SECP256K1_P,
		s = (e * e) % o,
		c = (r * s) % o,
		u = (((i * s) % o) * e) % o,
		f = mod(c - n, o),
		l = mod(u - t, o)
	if (f === 0n) return l === 0n ? jacobianDouble(n, t, e) : [0n, 0n, 0n]
	const a = (f * f) % o,
		h = (f * a) % o,
		p = (n * a) % o,
		d = mod(l * l - h - 2n * p, o),
		m = mod(l * (p - d) - t * h, o),
		w = (f * e) % o
	return [d, m, w]
}
function jacobianToAffine(n, t, e) {
	if (e === 0n) return [0n, 0n]
	const r = SECP256K1_P,
		i = modInverse(e, r),
		o = (i * i) % r
	return [(n * o) % r, (((t * o) % r) * i) % r]
}
function glvDecompose(n) {
	const t = SECP256K1_N,
		e = 0x3086d221a7d46bcde86c90e49284eb15n,
		r = 0xe4437ed6010e88286f547fa90abfe4c3n,
		i = 0x114ca50f7a8e2f3f657c1108d9d44cfd8n,
		o = 0x3086d221a7d46bcde86c90e49284eb15n,
		s = (o * n + t / 2n) / t,
		c = (r * n + t / 2n) / t
	let u = mod(n - s * e - c * i, t),
		f = mod(s * r - c * o, t)
	const l = u > 1n << 128n,
		a = f > 1n << 128n
	return l && (u = t - u), a && (f = t - f), [u, l, f, a]
}
const WNAF_W = 4
function toWNAF(n) {
	const t = 1 << WNAF_W,
		e = t >> 1,
		r = BigInt(t - 1),
		i = []
	for (; n > 0n; ) {
		if (n & 1n) {
			let o = Number(n & r)
			o >= e && (o -= t), i.push(o), (n -= BigInt(o))
		} else i.push(0)
		n >>= 1n
	}
	return i
}
function batchToAffine(n) {
	const t = SECP256K1_P,
		e = n.length
	if (e === 1) return [jacobianToAffine(n[0][0], n[0][1], n[0][2])]
	const r = new Array(e)
	r[0] = n[0][2]
	for (let c = 1; c < e; c++) r[c] = (r[c - 1] * n[c][2]) % t
	let i = modInverse(r[e - 1], t)
	const o = new Array(e)
	for (let c = e - 1; c > 0; c--) {
		const u = (i * r[c - 1]) % t,
			f = (u * u) % t
		;(o[c] = [(n[c][0] * f) % t, (((n[c][1] * f) % t) * u) % t]), (i = (i * n[c][2]) % t)
	}
	const s = (i * i) % t
	return (o[0] = [(n[0][0] * s) % t, (((n[0][1] * s) % t) * i) % t]), o
}
function precomputeOddMultiples(n, t) {
	const e = 1 << (WNAF_W - 2),
		[r, i] = jacobianToAffine(...jacobianDouble(n, t, 1n)),
		o = [[n, t, 1n]]
	for (let s = 1; s < e; s++) {
		const [c, u, f] = o[s - 1]
		o.push(jacobianAddMixed(c, u, f, r, i))
	}
	return batchToAffine(o)
}
function shamirWNAF(n, t, e, r, i, o) {
	const s = toWNAF(n),
		c = toWNAF(r),
		u = precomputeOddMultiples(t, e),
		f = precomputeOddMultiples(i, o),
		l = Math.max(s.length, c.length)
	let a = 0n,
		h = 0n,
		p = 0n
	for (let d = l - 1; d >= 0; d--) {
		;[a, h, p] = jacobianDouble(a, h, p)
		const m = d < s.length ? s[d] : 0
		if (m !== 0) {
			const [x, g] = u[(Math.abs(m) - 1) >> 1]
			;[a, h, p] = jacobianAddMixed(a, h, p, x, m > 0 ? g : SECP256K1_P - g)
		}
		const w = d < c.length ? c[d] : 0
		if (w !== 0) {
			const [x, g] = f[(Math.abs(w) - 1) >> 1]
			;[a, h, p] = jacobianAddMixed(a, h, p, x, w > 0 ? g : SECP256K1_P - g)
		}
	}
	return jacobianToAffine(a, h, p)
}
function doubleAndAdd(n, t, e) {
	const [r, i, o, s] = glvDecompose(e),
		c = i ? SECP256K1_P - t : t,
		u = (SECP256K1_BETA * n) % SECP256K1_P,
		f = s ? SECP256K1_P - t : t
	return shamirWNAF(r, n, c, o, u, f)
}
function signMessage(n, t, e) {
	return signHash(uint256ToNumber(keccak256(n), 'BE'), t, e)
}
function signHash(n, t, e) {
	if (t <= 0n || t >= SECP256K1_N) throw new Error('Invalid private key')
	if ((e || (e = mod(uint256ToNumber(keccak256(concatBytes(keccak256(numberToUint256(t, 'BE')), numberToUint256(n, 'BE'))), 'BE'), SECP256K1_N)), e <= 0n || e >= SECP256K1_N)) throw new Error('Invalid nonce')
	const r = mod(n, SECP256K1_N),
		i = doubleAndAdd(SECP256K1_X, SECP256K1_Y, e),
		o = mod(i[0], SECP256K1_N)
	let s = mod((r + mod(o, SECP256K1_N) * t) * modInverse(e, SECP256K1_N), SECP256K1_N)
	if (o === 0n || s === 0n) throw new Error('Invalid r or s value')
	let c = i[1] % 2n === 0n ? 27n : 28n
	return s > SECP256K1_N / 2n && ((s = SECP256K1_N - s), (c = c === 27n ? 28n : 27n)), [o, s, c]
}
function recoverPublicKey(n, t, e, r) {
	const i = modSqrt(mod(t ** 3n + 7n, SECP256K1_P), SECP256K1_P)
	if (!i) throw new Error('Invalid r: does not correspond to a valid curve point')
	const o = r === 27n ? 0n : 1n,
		s = i % 2n === o ? i : SECP256K1_P - i,
		c = mod(uint256ToNumber(keccak256(n), 'BE'), SECP256K1_N),
		u = doubleAndAdd(t, s, e),
		f = doubleAndAdd(SECP256K1_X, SECP256K1_Y, c),
		l = ellipticAdd(u[0], u[1], f[0], mod(-f[1], SECP256K1_P), SECP256K1_P)
	return doubleAndAdd(l[0], l[1], modInverse(t, SECP256K1_N))
}
function verifySignature(n, t, e, r) {
	const i = mod(uint256ToNumber(keccak256(n), 'BE'), SECP256K1_N),
		o = modInverse(r, SECP256K1_N),
		s = mod(i * o, SECP256K1_N),
		c = mod(e * o, SECP256K1_N),
		u = doubleAndAdd(SECP256K1_X, SECP256K1_Y, s),
		f = doubleAndAdd(t[0], t[1], c),
		l = ellipticAdd(u[0], u[1], f[0], f[1], SECP256K1_P)
	return e === mod(l[0], SECP256K1_N)
}
class Uint8ArrayReader {
	constructor(t) {
		;(this.cursor = 0), (this.buffer = t)
	}
	read(t) {
		const e = this.buffer.subarray(this.cursor, this.cursor + t)
		return (this.cursor += t), e
	}
	max() {
		return this.buffer.length - this.cursor
	}
}
exports.Uint8ArrayReader = Uint8ArrayReader
class Uint8ArrayWriter {
	constructor(t) {
		;(this.buffer = t), (this.cursor = 0)
	}
	write(t) {
		const e = Math.min(this.max(), t.max())
		return this.buffer.set(t.read(e), this.cursor), (this.cursor += e), e
	}
	max() {
		return this.buffer.length - this.cursor
	}
}
exports.Uint8ArrayWriter = Uint8ArrayWriter
class Chunk {
	constructor(t = 0n) {
		;(this.span = t), (this.writer = new Uint8ArrayWriter(new Uint8Array(4096)))
	}
	build() {
		return concatBytes(numberToUint64(this.span, 'LE'), this.writer.buffer)
	}
	hash() {
		const t = new Uint8Array(40)
		return t.set(numberToUint64(this.span, 'LE')), t.set(bmtRoot(this.writer.buffer), 8), Chunk.hashFunction(t)
	}
	encryptedHash(t) {
		t || ((t = new Uint8Array(32)), crypto.getRandomValues(t))
		const e = encryptSpan(t, numberToUint64(this.span, 'LE')),
			r = new Uint8Array(40)
		return r.set(e), r.set(bmtRoot(encryptData(t, this.writer.buffer)), 8), { address: Chunk.hashFunction(r), key: t }
	}
	static encryptSpan(t, e) {
		return encryptSpan(t, e)
	}
	static encryptData(t, e) {
		return encryptData(t, e)
	}
	static decrypt(t, e) {
		return decryptChunk(t, e)
	}
}
;(exports.Chunk = Chunk), (Chunk.hashFunction = keccak256)
class ChunkSplitter {
	constructor(t, e, r = !1, i) {
		;(this.counters = [1]), (this.pending = [[]]), (this.hasParity = [!1]), (this.pendingEntries = []), (this.encrypted = r), (this.refSize = r ? 64 : 32), (this.maxShards = e ?? 4096 / this.refSize), (this.chunks = [new Chunk()]), (this.onBatch = t), (this.onIntermediateChunk = i)
	}
	static async root(t) {
		const e = new _a(_a.NOOP)
		return await e.append(t), e.finalize()
	}
	static async encryptedRoot(t) {
		const e = new _a(_a.NOOP, void 0, !0)
		return await e.append(t), (await e.finalize()).encryptedHash()
	}
	async append(t, e = 0, r = 0n) {
		const i = new Uint8ArrayReader(t)
		for (; i.max() > 0; ) {
			this.chunks[e].writer.max() === 0 && (await this.elevate(e))
			const o = this.chunks[e].writer.write(i)
			r ? (this.chunks[e].span += r) : (this.chunks[0].span += BigInt(o))
		}
	}
	async elevate(t) {
		;(this.counters[t] = ++this.counters[t] % (4096 / this.refSize)), this.pending[t] || (this.pending[t] = []), await this.sealParities(t)
		const e = this.chunks[t].span
		if ((t >= 1 && this.onIntermediateChunk && (this.onIntermediateChunk(this.chunks[t], this.hasParity[t] ?? !1), (this.hasParity[t] = !1)), this.encrypted)) {
			const { address: r, key: i } = this.chunks[t].encryptedHash(),
				o = new Uint8Array(64)
			o.set(r), o.set(i, 32), this.pending[t].push({ entry: { chunk: this.chunks[t], key: i }, ref: o, span: e })
		} else this.pending[t].push({ entry: { chunk: this.chunks[t] }, ref: this.chunks[t].hash(), span: e })
		;(this.chunks[t] = new Chunk()), this.pending[t].length >= this.maxShards && (await this.flushBatch(t))
	}
	async sealParities(t) {
		const e = this.pendingEntries[t]
		if (!e?.length) return
		this.pendingEntries[t] = []
		const r = await this.onBatch(e)
		if (r.length > 0) {
			this.hasParity[t] = !0
			for (const { chunk: i } of r) this.chunks[t].writer.write(new Uint8ArrayReader(i.hash()))
		}
	}
	async flushBatch(t) {
		this.chunks[t + 1] || (this.chunks.push(new Chunk()), this.counters.push(1), this.pending.push([]), this.hasParity.push(!1))
		const e = this.pending[t]
		;(this.pending[t] = []), this.pendingEntries[t + 1] || (this.pendingEntries[t + 1] = []), this.pendingEntries[t + 1].push(...e.map(r => r.entry))
		for (const { ref: r, span: i } of e) await this.append(r, t + 1, i)
	}
	async finalize(t = 0) {
		return this.pending[t]?.length && (await this.flushBatch(t)), this.chunks[t + 1] ? (this.counters[t] === 1 ? (await this.elevate(t + 1), await this.flushBatch(t + 1), (this.chunks[t + 1] = this.chunks[t]), this.finalize(t + 1)) : (await this.elevate(t), await this.flushBatch(t), this.finalize(t + 1))) : (await this.sealParities(t), t >= 1 && this.onIntermediateChunk && this.onIntermediateChunk(this.chunks[t], this.hasParity[t] ?? !1), this.chunks[t])
	}
}
;(exports.ChunkSplitter = ChunkSplitter), (_a = ChunkSplitter), (ChunkSplitter.NOOP = async n => [])
function isAllZero(n) {
	for (let t = 0; t < n.length; t++) if (n[t] !== 0) return !1
	return !0
}
class ChunkJoiner {
	constructor(t, e, r = !1) {
		;(this.fetch = t), (this.onData = e), (this.encrypted = r), (this.refSize = r ? 64 : 32)
	}
	static async collect(t, e) {
		const r = []
		return (
			await new ChunkJoiner(e, async i => {
				r.push(i)
			}).join(t),
			concatBytes(...r)
		)
	}
	static async collectEncrypted(t, e, r) {
		const i = []
		return (
			await new ChunkJoiner(
				r,
				async o => {
					i.push(o)
				},
				!0
			).join(t, e),
			concatBytes(...i)
		)
	}
	async join(t, e) {
		const r = await this.fetch(t)
		let i, o
		if ((this.encrypted && e ? ({ span: i, data: o } = decryptChunk(r, e)) : ((i = uint64ToNumber(r.subarray(0, 8), 'LE')), (o = r.subarray(8, 4104))), i <= 4096n)) await this.onData(o.subarray(0, Number(i)))
		else
			for (let s = 0; s < 4096 / this.refSize; s++) {
				const c = o.subarray(s * this.refSize, (s + 1) * this.refSize),
					u = c.subarray(0, 32)
				if (isAllZero(u)) break
				await this.join(u, this.encrypted ? c.subarray(32, 64) : void 0)
			}
	}
}
exports.ChunkJoiner = ChunkJoiner
class FixedPointNumber {
	constructor(t, e) {
		if (e < 0) throw Error('Scale must be non-negative')
		;(this.value = BigInt(t)), (this.scale = e)
	}
	static cast(t) {
		if (!t) throw Error('Cannot cast falsy value to FixedPointNumber')
		if (t instanceof FixedPointNumber) return t
		const e = asBigint(t.value),
			r = asNumber(t.scale)
		return new FixedPointNumber(e, r)
	}
	static fromDecimalString(t, e) {
		;/e\-\d+$/i.test(t) && (t = parseFloat(t).toFixed(e))
		let [r, i] = t.split('.')
		return (i = (i || '').padEnd(e, '0').slice(0, e)), new FixedPointNumber(BigInt(r + i), e)
	}
	static fromFloat(t, e) {
		return FixedPointNumber.fromDecimalString(t.toString(), e)
	}
	add(t) {
		return this.assertSameScale(t), new FixedPointNumber(this.value + t.value, this.scale)
	}
	subtract(t) {
		return this.assertSameScale(t), new FixedPointNumber(this.value - t.value, this.scale)
	}
	multiply(t) {
		return new FixedPointNumber(this.value * t, this.scale)
	}
	divmod(t) {
		if (t === 0n) throw new Error('Division by zero is not allowed')
		const e = this.value / t,
			r = this.value % t
		return [new FixedPointNumber(e, this.scale), new FixedPointNumber(r, this.scale)]
	}
	exchange(t, e, r) {
		if (t === '*') {
			const o = (this.value * e.value) / 10n ** BigInt(this.scale)
			return new FixedPointNumber(o, r)
		}
		this.assertSameScale(e)
		const i = (this.value * 10n ** BigInt(r)) / e.value
		return new FixedPointNumber(i, r)
	}
	compare(t) {
		return this.assertSameScale(t), this.value > t.value ? 1 : this.value < t.value ? -1 : 0
	}
	toDecimalString() {
		if (this.scale === 0) return this.value.toString()
		const t = this.value.toString(),
			e = t.slice(0, -this.scale) || '0',
			r = t.slice(-this.scale).padStart(this.scale, '0')
		return `${e}.${r}`
	}
	toString() {
		return this.value.toString()
	}
	toJSON() {
		return this.toString()
	}
	toFloat() {
		return parseFloat(this.toDecimalString())
	}
	assertSameScale(t) {
		if (this.scale !== t.scale) throw new Error(`Scale mismatch: expected ${this.scale}, but got ${t.scale}`)
	}
}
exports.FixedPointNumber = FixedPointNumber
function tickPlaybook(n) {
	if (n.length === 0) return null
	const t = n[0]
	return t.ttlMax ? --t.ttl <= 0 && n.shift() : (t.ttlMax = t.ttl), { progress: (t.ttlMax - t.ttl) / t.ttlMax, data: t.data }
}
function getArgument(n, t, e, r) {
	const i = n.findIndex(c => c === `--${t}` || c.startsWith(`--${t}=`)),
		o = n[i]
	if (!o) return (e || {})[r || t || ''] || null
	if (o.includes('=')) return o.split('=')[1]
	const s = n[i + 1]
	return s && !s.startsWith('-') ? s : (e || {})[r || t || ''] || null
}
function getNumberArgument(n, t, e, r) {
	const i = getArgument(n, t, e, r)
	if (!i) return null
	try {
		return makeNumber(i)
	} catch {
		throw new Error(`Invalid number argument ${t}: ${i}`)
	}
}
function getBooleanArgument(n, t, e, r) {
	const i = n.some(u => u.endsWith('-' + t)),
		o = getArgument(n, t, e, r)
	if (!o && i) return !0
	if (!o && !i) return null
	const s = ['true', '1', 'yes', 'y', 'on'],
		c = ['false', '0', 'no', 'n', 'off']
	if (s.includes(o.toLowerCase())) return !0
	if (c.includes(o.toLowerCase())) return !1
	throw Error(`Invalid boolean argument ${t}: ${o}`)
}
function requireStringArgument(n, t, e, r) {
	const i = getArgument(n, t, e, r)
	if (!i) throw new Error(`Missing argument ${t}`)
	return i
}
function requireNumberArgument(n, t, e, r) {
	const i = requireStringArgument(n, t, e, r)
	try {
		return makeNumber(i)
	} catch {
		throw new Error(`Invalid argument ${t}: ${i}`)
	}
}
function bringToFrontInPlace(n, t) {
	const e = n[t]
	n.splice(t, 1), n.unshift(e)
}
function bringToFront(n, t) {
	const e = [...n]
	return bringToFrontInPlace(e, t), e
}
function addPoint(n, t) {
	return { x: n.x + t.x, y: n.y + t.y }
}
function subtractPoint(n, t) {
	return { x: n.x - t.x, y: n.y - t.y }
}
function multiplyPoint(n, t) {
	return { x: n.x * t, y: n.y * t }
}
function normalizePoint(n) {
	const t = Math.sqrt(n.x * n.x + n.y * n.y)
	return { x: n.x / t, y: n.y / t }
}
function pushPoint(n, t, e) {
	return { x: n.x + Math.cos(t) * e, y: n.y + Math.sin(t) * e }
}
function getDistanceBetweenPoints(n, t) {
	return Math.sqrt((n.x - t.x) ** 2 + (n.y - t.y) ** 2)
}
function filterCoordinates(n, t, e = 'row-first') {
	const r = []
	if (e === 'column-first') for (let i = 0; i < n.length; i++) for (let o = 0; o < n[0].length; o++) t(i, o) && r.push({ x: i, y: o })
	else for (let i = 0; i < n[0].length; i++) for (let o = 0; o < n.length; o++) t(o, i) && r.push({ x: o, y: i })
	return r
}
function isHorizontalLine(n, t, e) {
	return n[t + 1]?.[e] && n[t - 1]?.[e] && !n[t][e - 1] && !n[t][e + 1]
}
function isVerticalLine(n, t, e) {
	return n[t][e + 1] && n[t][e - 1] && !n[t - 1]?.[e] && !n[t + 1]?.[e]
}
function isLeftmost(n, t, e) {
	return !n[t - 1]?.[e]
}
function isRightmost(n, t, e) {
	return !n[t + 1]?.[e]
}
function isTopmost(n, t, e) {
	return !n[t][e - 1]
}
function isBottommost(n, t, e) {
	return !n[t][e + 1]
}
function getCorners(n, t, e) {
	const r = []
	return n[t][e] ? (isHorizontalLine(n, t, e) || isVerticalLine(n, t, e) ? [] : (!n[t - 1]?.[e - 1] && isLeftmost(n, t, e) && isTopmost(n, t, e) && r.push({ x: t, y: e }), !n[t + 1]?.[e - 1] && isRightmost(n, t, e) && isTopmost(n, t, e) && r.push({ x: t + 1, y: e }), !n[t - 1]?.[e + 1] && isLeftmost(n, t, e) && isBottommost(n, t, e) && r.push({ x: t, y: e + 1 }), !n[t + 1]?.[e + 1] && isRightmost(n, t, e) && isBottommost(n, t, e) && r.push({ x: t + 1, y: e + 1 }), r)) : (n[t - 1]?.[e] && n[t][e - 1] && r.push({ x: t, y: e }), n[t + 1]?.[e] && n[t][e - 1] && r.push({ x: t + 1, y: e }), n[t - 1]?.[e] && n[t][e + 1] && r.push({ x: t, y: e + 1 }), n[t + 1]?.[e] && n[t][e + 1] && r.push({ x: t + 1, y: e + 1 }), r)
}
function findCorners(n, t, e, r) {
	const i = [
		{ x: 0, y: 0 },
		{ x: e, y: 0 },
		{ x: 0, y: r },
		{ x: e, y: r }
	]
	for (let o = 0; o < n.length; o++)
		for (let s = 0; s < n[0].length; s++) {
			const c = getCorners(n, o, s)
			for (const u of c) i.some(f => f.x === u.x && f.y === u.y) || i.push(u)
		}
	return i.map(o => ({ x: o.x * t, y: o.y * t }))
}
function findLines(n, t) {
	const e = filterCoordinates(n, (u, f) => n[u][f] === 0 && n[u][f + 1] !== 0, 'row-first').map(u => ({ ...u, dx: 1, dy: 0 })),
		r = filterCoordinates(n, (u, f) => n[u][f] === 0 && n[u][f - 1] !== 0, 'row-first').map(u => ({ ...u, dx: 1, dy: 0 })),
		i = filterCoordinates(n, (u, f) => n[u][f] === 0 && n[u - 1]?.[f] !== 0, 'column-first').map(u => ({ ...u, dx: 0, dy: 1 })),
		o = filterCoordinates(n, (u, f) => n[u][f] === 0 && n[u + 1]?.[f] !== 0, 'column-first').map(u => ({ ...u, dx: 0, dy: 1 }))
	e.forEach(u => u.y++), o.forEach(u => u.x++)
	const s = group([...i, ...o], (u, f) => u.x === f.x && u.y - 1 === f.y),
		c = group([...r, ...e], (u, f) => u.y === f.y && u.x - 1 === f.x)
	return [...s, ...c].map(u => ({ start: u[0], end: last(u) })).map(u => ({ start: multiplyPoint(u.start, t), end: multiplyPoint(addPoint(u.end, { x: u.start.dx, y: u.start.dy }), t) }))
}
function getAngleInRadians(n, t) {
	return Math.atan2(t.y - n.y, t.x - n.x)
}
function getSortedRayAngles(n, t) {
	return t.map(e => getAngleInRadians(n, e)).sort((e, r) => e - r)
}
function getLineIntersectionPoint(n, t, e, r) {
	const i = (r.y - e.y) * (t.x - n.x) - (r.x - e.x) * (t.y - n.y)
	if (i === 0) return null
	let o = n.y - e.y,
		s = n.x - e.x
	const c = (r.x - e.x) * o - (r.y - e.y) * s,
		u = (t.x - n.x) * o - (t.y - n.y) * s
	return (o = c / i), (s = u / i), o > 0 && o < 1 && s > 0 && s < 1 ? { x: n.x + o * (t.x - n.x), y: n.y + o * (t.y - n.y) } : null
}
function raycast(n, t, e) {
	const r = [],
		i = pushPoint(n, e, 1e4)
	for (const o of t) {
		const s = getLineIntersectionPoint(n, i, o.start, o.end)
		s && r.push(s)
	}
	return r.length
		? r.reduce((o, s) => {
				const c = getDistanceBetweenPoints(n, s),
					u = getDistanceBetweenPoints(n, o)
				return c < u ? s : o
		  })
		: null
}
function raycastCircle(n, t, e) {
	const i = getSortedRayAngles(n, e),
		o = []
	for (const s of i) {
		const c = raycast(n, t, s - 0.001),
			u = raycast(n, t, s + 0.001)
		c && o.push(c), u && o.push(u)
	}
	return o
}
class PubSubChannel {
	constructor() {
		this.subscribers = []
	}
	subscribe(t) {
		return (
			this.subscribers.push(t),
			() => {
				this.subscribers = this.subscribers.filter(e => e !== t)
			}
		)
	}
	publish(t) {
		this.subscribers.forEach(e => e(t))
	}
	clear() {
		this.subscribers = []
	}
	getSubscriberCount() {
		return this.subscribers.length
	}
}
exports.PubSubChannel = PubSubChannel
class AsyncQueue {
	constructor(t, e) {
		;(this.queue = []), (this.running = 0), (this.onProcessed = new PubSubChannel()), (this.onDrained = new PubSubChannel()), (this.concurrency = t), (this.capacity = e)
	}
	process() {
		if (this.running >= this.concurrency) return
		const t = this.queue.shift()
		t &&
			(this.running++,
			t().finally(() => {
				this.running--, this.process(), this.onProcessed.publish(), this.running === 0 && this.onDrained.publish()
			}))
	}
	enqueue(t) {
		if (this.queue.length < this.capacity) return this.queue.push(t), this.process(), Promise.resolve()
		if (this.onProcessed.getSubscriberCount()) throw Error('Queue capacity is full')
		return new Promise(e => {
			this.onProcessed.subscribe(() => {
				this.queue.length < this.capacity && (this.queue.push(t), this.process(), this.onProcessed.clear(), e())
			})
		})
	}
	drain() {
		if (this.running === 0) return Promise.resolve()
		if (this.onDrained.getSubscriberCount()) throw Error('Already draining')
		return new Promise(t => {
			this.onDrained.subscribe(() => {
				this.onDrained.clear(), t()
			})
		})
	}
}
exports.AsyncQueue = AsyncQueue
class TrieRouter {
	constructor() {
		this.forks = new Map()
	}
	insert(t, e) {
		if (t.length === 0) {
			this.handler = e
			return
		}
		const r = t[0]
		let i = r,
			o
		if ((r.startsWith(':') && ((i = ':'), (o = r.slice(1))), !this.forks.has(i))) {
			const s = new TrieRouter()
			o && (s.variableName = o), this.forks.set(i, s)
		}
		this.forks.get(i).insert(t.slice(1), e)
	}
	async handle(t, e, r, i) {
		if (t.length === 0) return this.handler ? (await this.handler(e, r, i), !0) : !1
		const o = t[0],
			s = this.forks.get(o)
		if (s) return s.handle(t.slice(1), e, r, i)
		const c = this.forks.get(':')
		if (c) return c.variableName && i.set(c.variableName, decodeURIComponent(o)), c.handle(t.slice(1), e, r, i)
		const u = this.forks.get('*')
		return u ? (i.set('wildcard', t.join('/')), u.handler ? (await u.handler(e, r, i), !0) : !1) : !1
	}
}
exports.TrieRouter = TrieRouter
class RollingValueProvider {
	constructor(t) {
		;(this.index = 0), (this.values = t)
	}
	current() {
		return this.values[this.index]
	}
	next() {
		return (this.index = (this.index + 1) % this.values.length), this.values[this.index]
	}
}
exports.RollingValueProvider = RollingValueProvider
class Solver {
	constructor() {
		;(this.status = 'pending'), (this.steps = []), (this.onStatusChange = async () => {}), (this.onStepChange = async () => {}), (this.onFinish = async () => {}), (this.onError = async () => {}), (this.context = new Map())
	}
	getStatus() {
		return this.status
	}
	createInitialState() {
		return Object.fromEntries(this.steps.map(t => [t.name, 'pending']))
	}
	setHooks(t) {
		t.onStatusChange && (this.onStatusChange = t.onStatusChange), t.onStepChange && (this.onStepChange = t.onStepChange), t.onFinish && (this.onFinish = t.onFinish), t.onError && (this.onError = t.onError)
	}
	addStep(t) {
		if (this.steps.find(e => e.name === t.name)) throw Error(`Step with name ${t.name} already exists`)
		this.steps.push(t)
	}
	async execute() {
		if (this.status !== 'pending') throw Error(`Cannot execute solver in status ${this.status}`)
		;(this.status = 'in-progress'), await this.onStatusChange(this.status)
		let t = this.createInitialState()
		for (const e of this.steps)
			try {
				if (e.transientSkipStepName) {
					const i = t[e.transientSkipStepName]
					if (i === 'skipped' || i === 'failed') {
						;(t = { ...t, [e.name]: 'skipped' }), await this.onStepChange(t)
						continue
					}
				}
				if (!(e.precondition ? await e.precondition(this.context) : !0)) {
					;(t = { ...t, [e.name]: 'skipped' }), await this.onStepChange(t)
					continue
				}
				;(t = { ...t, [e.name]: 'in-progress' }), await this.onStepChange(t)
				for (let i = 0; (await e.action(this.context, i)) === 'retry'; i++);
				;(t = { ...t, [e.name]: 'completed' }), await this.onStepChange(t)
			} catch (r) {
				throw ((t = { ...t, [e.name]: 'failed' }), (this.status = 'failed'), await this.onStatusChange(this.status), await this.onStepChange(t), await this.onError(r), r)
			}
		return (this.status = 'completed'), await this.onStatusChange(this.status), await this.onFinish(), this.context
	}
}
exports.Solver = Solver
class Lock {
	constructor(t) {
		;(this.queryFunction = t.queryFunction), (this.lockFunction = t.lockFunction), (this.unlockFunction = t.unlockFunction), (this.timeoutMillis = t.timeoutMillis)
	}
	async couldLock() {
		const t = await this.queryFunction()
		try {
			const e = asInteger(t)
			if (Date.now() < e + this.timeoutMillis) return new Date(e + this.timeoutMillis)
		} catch {}
		return await this.lockFunction(Date.now().toString()), !0
	}
	async unlock() {
		await this.unlockFunction()
	}
}
;(exports.Lock = Lock),
	(exports.Binary = { hexToUint8Array, uint8ArrayToHex, binaryToUint8Array, uint8ArrayToBinary, base64ToUint8Array, uint8ArrayToBase64, base32ToUint8Array, uint8ArrayToBase32, log2Reduce, partition, concatBytes, numberToUint8, uint8ToNumber, numberToUint16, uint16ToNumber, numberToUint32, uint32ToNumber, numberToUint64, uint64ToNumber, numberToUint256, uint256ToNumber, sliceBytes, keccak256, sha3_256, proximity, commonPrefix, setBit, getBit, indexOf: binaryIndexOf, equals: binaryEquals, padStart: binaryPadStart, padStartToMultiple: binaryPadStartToMultiple, padEnd: binaryPadEnd, padEndToMultiple: binaryPadEndToMultiple, xorCypher, isUtf8 }),
	(exports.Elliptic = { privateKeyToPublicKey, compressPublicKey, publicKeyFromCompressed, publicKeyToAddress, signMessage, signHash, verifySignature, recoverPublicKey, checksumEncode }),
	(exports.Random = { intBetween, floatBetween, chance, signed: signedRandom, makeSeededRng, point: randomPoint, procs }),
	(exports.Arrays = { countUnique, makeUnique, splitBySize, splitByCount, index: indexArray, indexCollection: indexArrayToCollection, onlyOrThrow, onlyOrNull, firstOrThrow, firstOrNull, shuffle, initialize: initializeArray, initialize2D: initialize2DArray, rotate2D: rotate2DArray, containsShape, glue, pluck, pick, pickMany, pickManyUnique, pickWeighted, pickRandomIndices, pickGuaranteed, last, pipe, makePipe, sortWeighted, pushAll, unshiftAll, filterAndRemove, merge: mergeArrays, empty, pushToBucket, unshiftAndLimit, atRolling, group, createOscillator, organiseWithLimits, tickPlaybook, getArgument, getBooleanArgument, getNumberArgument, requireStringArgument, requireNumberArgument, bringToFront, bringToFrontInPlace, findInstance, filterInstances, interleave, toggle, createHierarchy, multicall, maxBy, minBy, allIndexOf: allArrayIndexOf }),
	(exports.System = { sleepMillis, forever, scheduleMany, waitFor, expandError, runAndSetInterval, whereAmI, withRetries }),
	(exports.Numbers = { make: makeNumber, sum, average, median, getDistanceFromMidpoint, clamp, range, interpolate, createSequence, increment, decrement, format: formatNumber, fromDecimals, makeStorage, asMegabytes, convertBytes, hexToRgb, rgbToHex, haversineDistanceToMeters, roundToNearest, formatDistance, triangularNumber, searchFloat, binomialSample, toSignificantDigits }),
	(exports.Promises = { raceFulfilled, invert: invertPromise, runInParallelBatches }),
	(exports.Dates = { getTimestamp, getTimeDelta, secondsToHumanTime, countCycles, isoDate, throttle, timeSince, dateTimeSlug, unixTimestamp, fromUtcString, fromMillis, getProgress, humanizeTime, humanizeProgress, createTimeDigits, mapDayNumber, getDayInfoFromDate, getDayInfoFromDateTimeString, seconds, minutes, hours, days, make: makeDate, normalizeTime, absoluteDays }),
	(exports.Objects = { safeParse, deleteDeep, getDeep, setDeep, incrementDeep, ensureDeep, replaceDeep, getFirstDeep, deepMergeInPlace, deepMerge2, deepMerge3, mapAllAsync, cloneWithJson, sortObject, sortArray, sortAny, deepEquals, deepEqualsEvery, runOn, ifPresent, zip, zipSum, removeEmptyArrays, removeEmptyValues, flatten, unflatten, match, sort: sortObjectValues, map: mapObject, mapIterable, filterKeys: filterObjectKeys, filterValues: filterObjectValues, rethrow, setSomeOnObject, setSomeDeep, flip, getAllPermutations, countTruthyValues, transformToArray, setMulti, incrementMulti, createBidirectionalMap, createTemporalBidirectionalMap, pushToBidirectionalMap, unshiftToBidirectionalMap, addToTemporalBidirectionalMap, getFromTemporalBidirectionalMap, createStatefulToggle, diffKeys, pickRandomKey, mapRandomKey, fromObjectString, toQueryString, parseQueryString, hasKey, selectMax, reposition, unwrapSingleKey, parseKeyValues, errorMatches }),
	(exports.Types = { isFunction, isObject, isStrictlyObject, isEmptyArray, isEmptyObject, isUndefined, isString, isNumber, isBoolean, isDate, isBlank, isId, isIntegerString, isHexString, isUrl, isBigint, isNullable, asString, asHexString, asSafeString, asIntegerString, asNumber, asFunction, asInteger, asBoolean, asDate, asNullableString, asEmptiableString, asId, asTime, asArray, asObject, asNullableObject, asStringMap, asNumericDictionary, asUrl, asBigint, asEmptiable, asNullable, asOptional, enforceObjectShape, enforceArrayShape, isPng, isJpg, isWebp, isImage }),
	(exports.Strings = { tokenizeByCount, tokenizeByLength, searchHex, searchSubstring, randomHex: randomHexString, randomLetter: randomLetterString, randomAlphanumeric: randomAlphanumericString, randomRichAscii: randomRichAsciiString, randomUnicode: randomUnicodeString, includesAny, slugify, normalForm, enumify, escapeHtml, decodeHtmlEntities, after, afterLast, before, beforeLast, betweenWide, betweenNarrow, getPreLine, containsWord, containsWords, joinUrl, getFuzzyMatchScore, sortByFuzzyScore, splitOnce, splitAll, randomize, expand, shrinkTrim, capitalize, decapitalize, csvEscape, parseCsv, surroundInOut, getExtension, getBasename, normalizeEmail, normalizeFilename, parseFilename, camelToTitle, slugToTitle, slugToCamel, joinHumanly, findWeightedPair, extractBlock, extractAllBlocks, replaceBlocks, indexOfEarliest, lastIndexOfBefore, parseHtmlAttributes, readNextWord, readWordsAfterAll, resolveVariables, resolveVariableWithDefaultSyntax, resolveRemainingVariablesWithDefaults, isLetter, isDigit, isLetterOrDigit, isValidObjectPathCharacter, insert: insertString, indexOfRegex, allIndexOf, lineMatches, linesMatchInOrder, represent, resolveMarkdownLinks, buildUrl, isChinese, replaceBetweenStrings, describeMarkdown, isBalanced, textToFormat, splitFormatting, splitHashtags, splitUrls, route, explodeReplace, generateVariants, replaceWord, replacePascalCaseWords, stripHtml, breakLine, measureTextWidth, toLines, levenshteinDistance, findCommonPrefix, findCommonDirectory }),
	(exports.Assertions = { asEqual, asTrue, asTruthy, asFalse, asFalsy, asEither }),
	(exports.Cache = { get: getCached, getDeferred: getCachedDeferred, delete: deleteFromCache, deleteExpired: deleteExpiredFromCache, size: cacheSize, clear: clearCache }),
	(exports.Vector = { addPoint, subtractPoint, multiplyPoint, normalizePoint, pushPoint, filterCoordinates, findCorners, findLines, raycast, raycastCircle, getLineIntersectionPoint })
