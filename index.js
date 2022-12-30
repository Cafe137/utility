async function invertPromise(promise) {
    return new Promise((resolve, reject) => promise.then(reject, resolve))
}

async function raceFulfilled(promises) {
    invertPromise(Promise.all(promises.map(invertPromise)))
}

async function runInParallelBatches(promises, concurrency = 1) {
    const batches = splitByCount(promises, concurrency)
    const results = []
    const jobs = batches.map(async batch => {
        for (const promise of batch) {
            results.push(await promise())
        }
    })
    await Promise.all(jobs)
    return results
}

async function sleepMillis(millis) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(true)
        }, millis)
    )
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const swap = array[i]
        array[i] = array[j]
        array[j] = swap
    }
    return array
}

function onlyOrThrow(array) {
    if (array && array.length === 1) {
        return array[0]
    }
    if (array && 'length' in array) {
        throw Error('Expected array to have length 1, got: ' + array.length)
    }
    throw Error('Expected array, got: ' + array)
}

function onlyOrNull(array) {
    if (array && array.length === 1) {
        return array[0]
    }
    return null
}

function firstOrNull(array) {
    return array.length > 0 ? array[0] : null
}

function initializeArray(count, initializer) {
    const results = []
    for (let i = 0; i < count; i++) {
        results.push(initializer(i))
    }
    return results
}

function rotate2DArray(array) {
    const newArray = []
    for (let i = 0; i < array[0].length; i++) {
        newArray.push([])
        for (let j = 0; j < array.length; j++) {
            newArray[i].push(array[j][i])
        }
    }
    return newArray
}

function initialize2DArray(width, height, initialValue) {
    const array = []
    for (let i = 0; i < width; i++) {
        array.push([])
        for (let j = 0; j < height; j++) {
            array[i].push(initialValue)
        }
    }
    return array
}

function containsShape(array2D, shape, x, y) {
    if (x < 0 || y < 0 || y + shape[0].length > array2D[0].length || x + shape.length > array2D.length) {
        return false
    }
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] === undefined) {
                continue
            }
            if (array2D[x + i][y + j] !== shape[i][j]) {
                return false
            }
        }
    }
    return true
}

function takeRandomly(array, count) {
    return shuffle(array).slice(0, count)
}

function pickRandomIndices(array, count) {
    return shuffle(range(0, array.length - 1)).slice(0, count)
}

function pluck(array, key) {
    return array.map(element => element[key])
}

function makeSeededRng(seed) {
    let a = seed
    let b = 0xcafe1337
    let c = 0xdeadbeef
    return function () {
        a += b
        b ^= a << 7
        a *= c
        c ^= a << 13
        a ^= b ^ c
        return (a >>> 0) / 4294967296
    }
}

function randomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min
}

function signedRandom() {
    return Math.random() * 2 - 1
}

function chance(threshold) {
    return Math.random() < threshold
}

function pick(array, generator = Math.random) {
    return array[Math.floor(array.length * generator())]
}

function last(array) {
    return array[array.length - 1]
}

function pickWeighted(array, weights, randomNumber) {
    if (isUndefined(randomNumber)) {
        randomNumber = Math.random()
    }
    if (array.length !== weights.length) {
        throw new Error('Array length mismatch')
    }
    let sum = weights.reduce((accumulator, element) => accumulator + element, 0)
    const random = randomNumber * sum
    for (let i = 0; i < array.length - 1; i++) {
        sum -= weights[i]
        if (random >= sum) {
            return array[i]
        }
    }
    return last(array)
}

function sortWeighted(array, weights) {
    const rolls = weights.map(weight => Math.random() * weight)
    const results = []
    for (let i = 0; i < array.length; i++) {
        results.push([array[i], rolls[i]])
    }
    return results.sort((a, b) => a[1] - b[1]).map(a => a[0])
}

function getDeep(object, path) {
    const parts = path.split('.')
    let buffer = object
    for (const part of parts) {
        if (!buffer[part]) {
            return buffer[part]
        }
        buffer = buffer[part]
    }
    return buffer
}

function getDeepOrElse(object, path, fallback) {
    return getDeep(object, path) || fallback
}

function setDeep(object, path, value) {
    const parts = path.split(/\.|\[/)
    let buffer = object
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        const array = i < parts.length - 1 && parts[i + 1].includes(']')
        const arrayIndex = part.includes(']')
        const normalizedPart = arrayIndex ? part.replace(/\[|\]/g, '') : part
        if (i === parts.length - 1) {
            buffer[normalizedPart] = value
            return value
        }
        if (!isObject(buffer[normalizedPart])) {
            if (array) {
                buffer[normalizedPart] = []
            } else {
                buffer[normalizedPart] = {}
            }
        }
        buffer = buffer[normalizedPart]
    }
    return value
}

function incrementDeep(object, path, amount = 1) {
    const existing = getDeep(object, path) || 0
    setDeep(object, path, existing + amount)
    return existing
}

function ensureDeep(object, path, value) {
    return getDeep(object, path) || setDeep(object, path, value)
}

function deleteDeep(object, path) {
    const location = beforeLast(path, '.')
    const toDelete = afterLast(path, '.')
    const segment = getDeep(object, location)
    delete segment[toDelete]
}

function replaceDeep(object, path, value) {
    const existing = getDeep(object, path)
    if (!existing) {
        throw new Error("Key '" + path + "' does not exist.")
    }
    setDeep(object, path, value)
    return existing
}

function getFirstDeep(object, paths, fallbackToAnyKey) {
    for (const path of paths) {
        const value = getDeep(object, path)
        if (value) {
            return value
        }
    }
    if (fallbackToAnyKey) {
        const values = Object.values(object)
        if (values.length) {
            return values[0]
        }
    }
    return null
}

async function forever(callable, millis) {
    while (true) {
        try {
            await callable()
        } catch (error) {
            console.error('Error in forever:', error)
        }
        await sleepMillis(millis)
    }
}

function asMegabytes(number) {
    return number / 1024 / 1024
}

function convertBytes(bytes) {
    if (bytes > 1000000) {
        return (bytes / 1000000).toFixed(3) + 'MB'
    }
    if (bytes > 1000) {
        return (bytes / 1000).toFixed(3) + 'KB'
    }
    return bytes + ''
}

function isObject(value) {
    return value !== null && typeof value === 'object'
}

function isStrictlyObject(value) {
    return isObject(value) && !Array.isArray(value)
}

function isEmptyArray(value) {
    return Array.isArray(value) && value.length === 0
}

function isEmptyObject(value) {
    return isStrictlyObject(value) && Object.keys(value).length === 0
}

function isUndefined(value) {
    return typeof value === 'undefined'
}

function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]'
}

function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]'
}

function isPromise(value) {
    return value && typeof value.then === 'function'
}

function isNumber(value) {
    return !isNaN(value) && String(value) === String(parseFloat(value))
}

function isBoolean(value) {
    return value === true || value === false
}

function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]'
}

function isBlank(value) {
    return !isString(value) || value.trim().length === 0
}

function isId(value) {
    const numeric = typeof value === 'string' ? parseInt(value, 10) : value
    return Number.isInteger(numeric) && numeric >= 1
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const alphanumericAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const richAsciiAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:<>?,./'
const unicodeTestingAlphabet = ['—', '\\', '東', '京', '都', '𝖆', '𝖇', '𝖈', '👾', '🙇', '💁', '🙅']
const hexAlphabet = '0123456789abcdef'
function randomLetterString(length) {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return buffer
}

function randomAlphanumericString(length) {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += alphanumericAlphabet[Math.floor(Math.random() * alphanumericAlphabet.length)]
    }
    return buffer
}

function randomRichAsciiString(length) {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += richAsciiAlphabet[Math.floor(Math.random() * richAsciiAlphabet.length)]
    }
    return buffer
}

function randomUnicodeString(length) {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += unicodeTestingAlphabet[Math.floor(Math.random() * unicodeTestingAlphabet.length)]
    }
    return buffer
}

function randomHexString(length) {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)]
    }
    return buffer
}

function asString(string) {
    if (isBlank(string)) {
        throw new TypeError('Expected string, got: ' + string)
    }
    return string
}

function asNumber(number) {
    if (!isNumber(number)) {
        throw new TypeError('Expected number, got: ' + number)
    }
    return number
}

function asBoolean(bool) {
    if (!isBoolean(bool)) {
        throw new TypeError('Expected boolean, got: ' + bool)
    }
    return bool
}

function asDate(date) {
    if (!isDate(date)) {
        throw new TypeError('Expected date, got: ' + date)
    }
    return date
}

function asNullableString(string) {
    if (isBlank(string)) {
        return null
    }
    return string
}

function asId(value) {
    if (!isId(value)) {
        throw new TypeError('Expected id, got: ' + value)
    }
    return typeof value === 'string' ? parseInt(value, 10) : value
}

function asArray(value) {
    if (!Array.isArray(value)) {
        throw new TypeError('Expected array, got: ' + value)
    }
    return value
}

function asObject(value) {
    if (!isStrictlyObject(value)) {
        throw new TypeError('Expected object, got: ' + value)
    }
    return value
}

function represent(value) {
    if (isObject(value)) {
        return JSON.stringify(value, null, 4)
    }
    if (value === null) {
        return 'null'
    }
    if (isUndefined(value)) {
        return 'undefined'
    }
    return value
}

function expandError(error, stackTrace) {
    if (isString(error)) {
        return error
    }
    const keys = Object.keys(error)
    if (error.message && !keys.includes('message')) {
        keys.push('message')
    }
    const joined = keys.map(key => `${key}: ${error[key]}`).join('; ')
    return stackTrace && error.stack ? joined + '\n' + error.stack : joined
}

function mergeDeep(target, source) {
    if (isStrictlyObject(target) && isStrictlyObject(source)) {
        for (const key in source) {
            if (isStrictlyObject(source[key])) {
                if (!target[key]) {
                    target[key] = {}
                }
                mergeDeep(target[key], source[key])
            } else if (Array.isArray(source[key])) {
                target[key] = [...source[key]]
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}

function zip(objects, reducer) {
    const result = {}
    for (const object of objects) {
        for (const key of Object.keys(object)) {
            if (result[key]) {
                result[key] = reducer(result[key], object[key])
            } else {
                result[key] = object[key]
            }
        }
    }
    return result
}

function zipSum(objects) {
    return zip(objects, (x, y) => x + y)
}

function asPageNumber(value) {
    let number
    try {
        number = parseInt(value, 10)
    } catch (error) {
        return 1
    }
    if (!number) {
        return 1
    }
    if (number < 1) {
        return 1
    }
    if (number > 99999) {
        return 1
    }
    return number
}

function pushToBucket(object, bucket, item) {
    if (!object[bucket]) {
        object[bucket] = []
    }
    object[bucket].push(item)
}

function unshiftAndLimit(array, item, limit) {
    array.unshift(item)
    while (array.length > limit) {
        array.pop()
    }
}

function atRolling(array, index) {
    let realIndex = index % array.length
    if (realIndex < 0) {
        realIndex += array.length
    }
    return array[realIndex]
}

function pushAll(array, elements) {
    Array.prototype.push.apply(array, elements)
}

function unshiftAll(array, elements) {
    Array.prototype.unshift.apply(array, elements)
}

async function mapAllAsync(array, fn) {
    const mapped = []
    for (const object of array) {
        mapped.push(await fn(object))
    }
    return mapped
}

function glue(array, glueElement) {
    const results = []
    for (let i = 0; i < array.length; i++) {
        results.push(array[i])
        if (i < array.length - 1) {
            if (isFunction(glueElement)) {
                results.push(glueElement())
            } else {
                results.push(glueElement)
            }
        }
    }
    return results
}

function pageify(data, totalElements, pageSize, currentPage) {
    const totalPages = Math.floor(totalElements / pageSize) + 1
    return {
        data,
        pageSize,
        totalPages,
        totalElements,
        currentPage
    }
}

function asEqual(a, b) {
    if (a !== b) {
        throw Error(`Expected [${a}] to equal [${b}]`)
    }
    return [a, b]
}

function asTrue(data) {
    if (data !== true) {
        throw Error(`Expected [true], got [${data}]`)
    }
    return data
}

function asTruthy(data) {
    if (!data) {
        throw Error(`Expected truthy value, got [${data}]`)
    }
    return data
}

function asFalse(data) {
    if (data !== false) {
        throw Error(`Expected [false], got [${data}]`)
    }
    return data
}

function asFalsy(data) {
    if (data) {
        throw Error(`Expected falsy value, got [${data}]`)
    }
    return data
}

function asEither(data, values) {
    if (!values.includes(data)) {
        throw Error(`Expected any of [${values.join(', ')}], got [${data}]`)
    }
    return data
}

function scheduleMany(handlers, dates) {
    for (let i = 0; i < handlers.length; i++) {
        const handler = handlers[i]
        const date = dates[i]
        const delta = Math.max(0, date.getTime() - Date.now())
        setTimeout(handler, delta)
    }
}

function interpolate(a, b, t) {
    return a + (b - a) * t
}

function sum(array) {
    return array.reduce((a, b) => a + b, 0)
}

function average(array) {
    return array.reduce((a, b) => a + b, 0) / array.length
}

function range(start, end) {
    const array = []
    for (let i = start; i <= end; i++) {
        array.push(i)
    }
    return array
}

function includesAny(string, substrings) {
    for (const substring of substrings) {
        if (string.includes(substring)) {
            return true
        }
    }
    return false
}

function slugify(string) {
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split('')
        .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
        .join('')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

function camelToTitle(string) {
    return capitalize(string.replace(/([A-Z])/g, ' $1'))
}

function slugToTitle(string) {
    return string.split('-').map(capitalize).join(' ')
}

function slugToCamel(string) {
    return decapitalize(string.split('-').map(capitalize).join(''))
}

function joinHumanly(parts, separator = ', ', lastSeparator = ' and ') {
    if (!parts || !parts.length) {
        return null
    }
    if (parts.length === 1) {
        return parts[0]
    }
    if (parts.length === 2) {
        return `${parts[0]}${lastSeparator}${parts[1]}`
    }
    return `${parts.slice(0, parts.length - 1).join(separator)}${lastSeparator}${parts[parts.length - 1]}`
}

function surroundInOut(string, filler) {
    return filler + string.split('').join(filler) + filler
}

function enumify(string) {
    return slugify(string).replace(/-/g, '_').toUpperCase()
}

function getFuzzyMatchScore(string, input) {
    if (input.length === 0) {
        return 0
    }
    const lowercaseString = string.toLowerCase()
    const lowercaseInput = input.toLowerCase()
    if (string === input) {
        return 10000
    }
    if (lowercaseString.startsWith(lowercaseInput)) {
        return 10000 - string.length
    }
    if (lowercaseString.includes(lowercaseInput)) {
        return 5000 - string.length
    }
    const regex = new RegExp('.*' + lowercaseInput.split('').join('.*') + '.*')
    return regex.test(lowercaseString) ? 1000 - string.length : 0
}

function sortByFuzzyScore(strings, input) {
    return strings
        .filter(a => getFuzzyMatchScore(a, input))
        .sort((a, b) => getFuzzyMatchScore(b, input) - getFuzzyMatchScore(a, input))
}

function escapeHtml(string) {
    return string.replace(/\</g, '&lt;').replace('/>/g', '&gt;')
}

const htmlEntityMap = {
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&gt;': '>',
    '&lt;': '<'
}
function decodeHtmlEntities(string) {
    let buffer = string
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
        .replace(/&#x(\d+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    for (const [key, value] of Object.entries(htmlEntityMap)) {
        buffer = buffer.replaceAll(key, value)
    }
    return buffer
}

function before(string, searchString) {
    const position = string.indexOf(searchString)
    return position === -1 ? string : string.slice(0, position)
}

function after(string, searchString) {
    const position = string.indexOf(searchString)
    return position === -1 ? string : string.slice(position + searchString.length)
}

function beforeLast(string, searchString) {
    const position = string.lastIndexOf(searchString)
    return position === -1 ? string : string.slice(0, position)
}

function afterLast(string, searchString) {
    const position = string.lastIndexOf(searchString)
    return position === -1 ? string : string.slice(position + searchString.length)
}

function between(string, start, end) {
    return before(after(string, start), end)
}

function betweenWide(string, start, end) {
    return after(beforeLast(string, end), start)
}

function betweenNarrow(string, start, end) {
    return before(after(string, start), end)
}

function splitOnce(string, separator) {
    return string.includes(separator) ? [before(string, separator), after(string, separator)] : [string, '']
}

function getExtension(path) {
    const name = last(path.split(/\\|\//g))
    const lastIndex = name.lastIndexOf('.', name.length - 1)
    return lastIndex <= 0 ? '' : name.slice(lastIndex + 1)
}

function getBasename(path) {
    const name = last(path.split(/\\|\//g))
    const lastIndex = name.lastIndexOf('.', name.length - 1)
    return lastIndex <= 0 ? name : name.slice(0, lastIndex)
}

function normalizeFilename(path) {
    const basename = getBasename(path)
    const extension = getExtension(path)
    return extension ? `${basename}.${extension}` : basename
}

function parseFilename(string) {
    const basename = getBasename(string)
    const extension = getExtension(string)
    return {
        basename,
        extension,
        filename: extension ? `${basename}.${extension}` : basename
    }
}

function randomize(string) {
    return string.replace(/\{(.+?)\}/g, (_, group) => pick(group.split('|')))
}

function shrinkTrim(string) {
    return string.replace(/\s+/g, ' ').replace(/\s$|^\s/g, '')
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function decapitalize(string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
}

function isLetter(character) {
    if (!character) {
        return false
    }
    const code = character.charCodeAt(0)
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
}

function isDigit(character) {
    if (!character) {
        return false
    }
    const code = character.charCodeAt(0)
    return code >= 48 && code <= 57
}

function isLetterOrDigit(character) {
    return isLetter(character) || isDigit(character)
}

function insertString(string, index, length, before, after) {
    return string.slice(0, index) + before + string.slice(index, index + length) + after + string.slice(index + length)
}

function linesMatchOrdered(lines, expectedLines) {
    let lineIndex = 0
    for (let i = 0; i < expectedLines.length; i++) {
        const expectedLine = expectedLines[i]
        let found = false
        while (!found && lineIndex < lines.length) {
            if (lines[lineIndex].includes(expectedLine)) {
                found = true
            }
            lineIndex++
        }
        if (!found) {
            return false
        }
    }
    return true
}

function csvEscape(string) {
    return string.match(/"|,/) ? `"${string.replace(/"/g, '""')}"` : string
}

function findWeightedPair(string, start = 0, opening = '{', closing = '}') {
    let weight = 1
    for (let i = start; i < string.length; i++) {
        if (string[i] === closing) {
            if (--weight === 0) {
                return i
            }
        } else if (string[i] === opening) {
            weight++
        }
    }
    return -1
}

function extractBlock(string, options) {
    const opensAt = string.indexOf(options.opening, options.start || 0)
    if (opensAt === -1) {
        return null
    }
    const closesAt = findWeightedPair(string, opensAt + 1, options.opening, options.closing)
    return closesAt === -1
        ? null
        : options.exclusive
        ? string.slice(opensAt + 1, closesAt)
        : string.slice(opensAt, closesAt + 1)
}

function parseCsv(string, delimiter = ',', quote = '"') {
    const items = []
    let buffer = ''
    let escaped = false
    const characters = string.split('')
    for (const character of characters) {
        if (character === delimiter && !escaped) {
            items.push(buffer)
            buffer = ''
        } else if (character === quote && ((!buffer && !escaped) || escaped)) {
            escaped = !escaped
        } else {
            buffer += character
        }
    }
    items.push(buffer)
    return items
}

function humanizeProgress(state) {
    return `[${Math.floor(state.progress * 100)}%] ${humanizeTime(state.deltaMs)} out of ${humanizeTime(
        state.totalTimeMs
    )} (${humanizeTime(state.remainingTimeMs)} left) [${Math.round(state.baseTimeMs)} ms each]`
}

async function waitFor(predicate, waitLength, maxWaits) {
    for (let i = 0; i < maxWaits; i++) {
        try {
            if (await predicate()) {
                return true
            }
        } catch (error) {}
        if (i < maxWaits - 1) {
            await sleepMillis(waitLength)
        }
    }
    return false
}

function filterAndRemove(array, predicate) {
    const results = []
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) {
            results.push(array.splice(i, 1)[0])
        }
    }
    return results
}

function cloneWithJson(a) {
    return JSON.parse(JSON.stringify(a))
}

function unixTimestamp(optionalTimestamp) {
    return Math.ceil((optionalTimestamp || Date.now()) / 1000)
}

function isoDate(optionalDate) {
    return (optionalDate || new Date()).toISOString().slice(0, 10)
}

function dateTimeSlug(optionalDate) {
    return (optionalDate || new Date()).toISOString().slice(0, 19).replace(/T|:/g, '-')
}

function fromUtcString(string) {
    const date = new Date(string)
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

function createTimeDigits(value) {
    return String(Math.floor(value)).padStart(2, '0')
}

function humanizeTime(millis) {
    let seconds = Math.floor(millis / 1000)
    if (seconds < 60) {
        return `${seconds}s`
    }
    let minutes = seconds / 60
    seconds = seconds % 60
    if (minutes < 60) {
        return `${createTimeDigits(minutes)}:${createTimeDigits(seconds)}`
    }
    const hours = minutes / 60
    minutes = minutes % 60
    return `${createTimeDigits(hours)}:${createTimeDigits(minutes)}:${createTimeDigits(seconds)}`
}

function getAgo(date, now) {
    if (!now) {
        now = Date.now()
    }
    const then = date.getTime()
    let delta = (now - then) / 1000
    if (delta < 10) {
        return 'A few seconds ago'
    }
    if (delta < 120) {
        return delta.toFixed(0) + ' seconds ago'
    }
    delta /= 60
    if (delta < 120) {
        return delta.toFixed(0) + ' minutes ago'
    }
    delta /= 60
    if (delta < 48) {
        return delta.toFixed(0) + ' hours ago'
    }
    delta /= 24
    return delta.toFixed(0) + ' days ago'
}

const throttleTimers = {}
function throttle(identifier, millis) {
    if (!throttleTimers[identifier] || Date.now() > throttleTimers[identifier]) {
        throttleTimers[identifier] = Date.now() + millis
        return true
    }
    return false
}

const timeUnits = {
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000
}
function timeSince(unit, a, optionalB) {
    a = isDate(a) ? a.getTime() : a
    optionalB = optionalB ? (isDate(optionalB) ? optionalB.getTime() : optionalB) : Date.now()
    return (optionalB - a) / timeUnits[unit]
}

function getProgress(startedAt, current, total, now) {
    if (!now) {
        now = Date.now()
    }
    const progress = current / total
    const deltaMs = now - startedAt
    const baseTimeMs = deltaMs / current
    const totalTimeMs = baseTimeMs * total
    const remainingTimeMs = totalTimeMs - deltaMs
    return {
        deltaMs,
        progress,
        baseTimeMs,
        totalTimeMs,
        remainingTimeMs
    }
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
function mapDayNumber(zeroBasedIndex) {
    return {
        zeroBasedIndex,
        day: dayNumberIndex[zeroBasedIndex]
    }
}

function getDayInfoFromDate(date) {
    return mapDayNumber(date.getDay())
}

function getDayInfoFromDateTimeString(dateTimeString) {
    return getDayInfoFromDate(new Date(dateTimeString))
}

function seconds(value) {
    return value * 1000
}

function minutes(value) {
    return value * 60000
}

function hours(value) {
    return value * 3600000
}

function getPreLine(string) {
    return string.replace(/ +/g, ' ').replace(/^ /gm, '')
}

function containsWord(string, word) {
    const slug = slugify(string)
    return slug.startsWith(word + '-') || slug.endsWith('-' + word) || slug.includes('-' + word + '-') || slug === word
}

function containsWords(string, words) {
    for (const word of words) {
        if (containsWord(string, word)) {
            return true
        }
    }
    return false
}

const tinyCache = {}
async function getCached(key, ttlMillis, handler) {
    const now = Date.now()
    const existing = tinyCache[key]
    if (existing && existing.validUntil > now) {
        return existing.value
    }
    const value = await handler()
    const validUntil = now + ttlMillis
    tinyCache[key] = {
        value,
        validUntil
    }
    return value
}

function joinUrl(...parts) {
    let url = parts[0][parts[0].length - 1] === '/' ? parts[0].slice(0, -1) : parts[0]
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i]
        if (part === '/') {
            continue
        }
        const starts = part[0] === '/'
        const ends = part[part.length - 1] === '/'
        url += '/' + part.slice(starts ? 1 : 0, ends ? -1 : undefined)
    }
    return url
}

function sortObject(object) {
    const keys = Object.keys(object)
    const orderedKeys = keys.sort((a, b) => a.localeCompare(b))
    const sorted = {}
    for (const key of orderedKeys) {
        sorted[key] = sortAny(object[key])
    }
    return sorted
}

function sortArray(array) {
    const result = []
    array
        .sort((a, b) => JSON.stringify(sortAny(a)).localeCompare(JSON.stringify(sortAny(b))))
        .forEach(a => result.push(sortAny(a)))
    return result
}

function sortAny(any) {
    if (Array.isArray(any)) {
        return sortArray(any)
    }
    if (isObject(any)) {
        return sortObject(any)
    }
    return any
}

function deepEquals(a, b) {
    return JSON.stringify(sortAny(a)) === JSON.stringify(sortAny(b))
}

function safeParse(stringable) {
    try {
        return JSON.parse(stringable)
    } catch (error) {
        return null
    }
}

function createSequence() {
    let value = 0
    return { next: () => value++ }
}

function createOscillator(values) {
    let index = 0
    return { next: () => values[index++ % values.length] }
}

const thresholds = [1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24, 1e27, 1e30, 1e33]
const longNumberUnits = [
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
    'decillion'
]
const shortNumberUnits = ['K', 'M', 'B', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd']
function formatNumber(number, options) {
    const longFormat = options?.longForm ?? false
    const unitString = options?.unit ? ` ${options.unit}` : ''
    const table = longFormat ? longNumberUnits : shortNumberUnits
    const precision = options?.precision ?? 1
    if (number < thresholds[0]) {
        return `${number}${unitString}`
    }
    for (let i = 0; i < thresholds.length - 1; i++) {
        if (number < thresholds[i + 1]) {
            return `${(number / thresholds[i]).toFixed(precision)}${longFormat ? ' ' : ''}${table[i]}${unitString}`
        }
    }
    return `${(number / thresholds[thresholds.length - 1]).toFixed(precision)}${longFormat ? ' ' : ''}${
        table[thresholds.length - 1]
    }${unitString}`
}

function parseIntOrThrow(numberOrString) {
    if (typeof numberOrString === 'number') {
        if (isNaN(numberOrString)) {
            throw Error('parseIntOrThrow got NaN for input')
        }
        if (!isFinite(numberOrString)) {
            throw Error('parseIntOrThrow got infinite for input')
        }
        return Math.trunc(numberOrString)
    }
    if (typeof numberOrString === 'string') {
        const parsed = parseInt(numberOrString, 10)
        if (isNaN(parsed)) {
            throw Error('parseIntOrThrow parsed NaN for input: ' + numberOrString)
        }
        return parsed
    }
    throw Error('parseIntOrThrow got unsupported input type: ' + typeof numberOrString)
}

function clamp(value, lower, upper) {
    return value < lower ? lower : value > upper ? upper : value
}

function increment(value, change, maximum) {
    const result = value + change
    return result > maximum ? maximum : result
}

function decrement(value, change, minimum) {
    const result = value - change
    return result < minimum ? minimum : result
}

function runOn(object, callable) {
    callable(object)
    return object
}

function ifPresent(object, callable) {
    if (object) {
        callable(object)
    }
}

function mergeArrays(target, source) {
    const keys = Object.keys(source)
    for (const key of keys) {
        if (Array.isArray(source[key]) && Array.isArray(target[key])) {
            pushAll(target[key], source[key])
        }
    }
}

function empty(array) {
    array.splice(0, array.length)
    return array
}

function removeEmptyArrays(object) {
    for (const key of Object.keys(object)) {
        if (isEmptyArray(object[key])) {
            delete object[key]
        }
    }
    return object
}

function removeEmptyValues(object) {
    for (const entry of Object.entries(object)) {
        if (isUndefined(entry[1]) || entry[1] === null || (isString(entry[1]) && isBlank(entry[1]))) {
            delete object[entry[0]]
        }
    }
    return object
}

function filterObjectKeys(object, predicate) {
    const output = {}
    for (const [key, value] of Object.entries(object)) {
        if (predicate(key)) {
            output[key] = value
        }
    }
    return output
}

function filterObjectValues(object, predicate) {
    const output = {}
    for (const [key, value] of Object.entries(object)) {
        if (predicate(value)) {
            output[key] = value
        }
    }
    return output
}

function mapObject(object, mapper) {
    const output = {}
    for (const entry of Object.entries(object)) {
        output[entry[0]] = mapper(entry[1])
    }
    return output
}

async function rethrow(asyncFn, throwable) {
    try {
        const returnValue = await asyncFn()
        return returnValue
    } catch (error) {
        throw throwable
    }
}

function setSomeOnObject(object, key, value) {
    if (typeof value !== 'undefined' && value !== null) {
        object[key] = value
    }
}

function flip(object) {
    const result = {}
    for (const [key, value] of Object.entries(object)) {
        result[value] = key
    }
    return result
}

function getAllPermutations(object) {
    const keys = Object.keys(object)
    const lengths = keys.map(key => object[key].length)
    const count = lengths.reduce((previous, current) => (previous *= current))
    let divisor = 1
    const divisors = [1]
    for (let i = 0; i < lengths.length - 1; i++) {
        divisor *= lengths[i]
        divisors.push(divisor)
    }
    const results = []
    for (let i = 0; i < count; i++) {
        const value = {}
        for (let j = 0; j < keys.length; j++) {
            const array = object[keys[j]]
            const index = Math.floor(i / divisors[j]) % array.length
            value[keys[j]] = array[index]
        }
        results.push(value)
    }
    return results
}

function countTruthyValues(object) {
    return Object.values(object).filter(x => x).length
}

function getFlatNotation(prefix, key, bracket) {
    return prefix + (bracket ? '[' + key + ']' : (prefix.length ? '.' : '') + key)
}

function flattenInner(target, object, prefix, bracket, arrays) {
    if (!isObject(object)) {
        return object
    }
    for (const [key, value] of Object.entries(object)) {
        const notation = getFlatNotation(prefix, key, bracket)
        if (Array.isArray(value)) {
            if (arrays) {
                flattenInner(target, value, notation, true, arrays)
            } else {
                target[notation] = value.map(item =>
                    flattenInner(Array.isArray(item) ? [] : {}, item, '', false, arrays)
                )
            }
        } else if (isObject(value)) {
            flattenInner(target, value, notation, false, arrays)
        } else {
            target[notation] = value
        }
    }
    return target
}

function flatten(object, arrays = false, prefix) {
    return flattenInner({}, object, prefix || '', false, arrays)
}

function unflatten(object) {
    if (!isObject(object)) {
        return object
    }
    const target = Array.isArray(object) ? [] : {}
    for (const [key, value] of Object.entries(object)) {
        if (Array.isArray(value)) {
            setDeep(
                target,
                key,
                value.map(item => unflatten(item))
            )
        } else {
            setDeep(target, key, value)
        }
    }
    return target
}

function match(value, options, fallback) {
    return options[value] ? options[value] : fallback
}

function indexArray(array, keyFn) {
    const target = {}
    for (const element of array) {
        const key = keyFn(element)
        target[key] = element
    }
    return target
}

function indexArrayToCollection(array, keyFn) {
    const target = {}
    for (const element of array) {
        const key = keyFn(element)
        if (!target[key]) {
            target[key] = []
        }
        target[key].push(element)
    }
    return target
}

function splitBySize(array, size) {
    const batches = []
    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size))
    }
    return batches
}

function splitByCount(array, count) {
    const size = Math.ceil(array.length / count)
    const batches = []
    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size))
    }
    return batches
}

function tokenizeByLength(string, length) {
    const parts = []
    const count = Math.ceil(string.length / length)
    for (let i = 0; i < count; i++) {
        parts.push(string.slice(i * length, i * length + length))
    }
    return parts
}

function tokenizeByCount(string, count) {
    const length = Math.ceil(string.length / count)
    return tokenizeByLength(string, length)
}

function makeUnique(array, fn) {
    return Object.values(indexArray(array, fn))
}

function countUnique(array, mapper, plain, sort, reverse) {
    const mapped = mapper ? array.map(mapper) : array
    const object = {}
    for (const item of mapped) {
        object[item] = (object[item] || 0) + 1
    }
    const sorted = sort ? sortObjectValues(object, reverse ? (a, b) => a[1] - b[1] : (a, b) => b[1] - a[1]) : object
    if (plain) {
        return Object.keys(sorted)
    }
    return sorted
}

function sortObjectValues(object, compareFn) {
    return Object.fromEntries(Object.entries(object).sort(compareFn))
}

function transformToArray(objectOfArrays) {
    const array = []
    const keys = Object.keys(objectOfArrays)
    const length = objectOfArrays[keys[0]].length
    for (let i = 0; i < length; i++) {
        const object = {}
        for (const key of keys) {
            object[key] = objectOfArrays[key][i]
        }
        array.push(object)
    }
    return array
}

function incrementMulti(objects, key, step = 1) {
    for (const object of objects) {
        object[key] += step
    }
}

function setMulti(objects, key, value) {
    for (const object of objects) {
        object[key] = value
    }
}

function group(array, groupFn) {
    const groups = []
    let group = []
    if (array.length) {
        groups.push(group)
        group.push(array[0])
    }
    for (let i = 1; i < array.length; i++) {
        const belongsToSameGroup = groupFn(array[i], array[i - 1])
        if (belongsToSameGroup) {
            group.push(array[i])
        } else {
            group = []
            groups.push(group)
            group.push(array[i])
        }
    }
    return groups
}

function createFastIndex() {
    return { index: {}, keys: [] }
}

function pushToFastIndex(object, key, item, limit = 100) {
    if (object.index[key]) {
        const index = object.keys.indexOf(key)
        object.keys.splice(index, 1)
    }
    object.index[key] = item
    object.keys.push(key)
    if (object.keys.length > limit) {
        const oldKey = object.keys.shift()
        oldKey && delete object.index[oldKey]
    }
}

function pushToFastIndexWithExpiracy(object, key, item, expiration, limit = 100) {
    pushToFastIndex(object, key, { validUntil: Date.now() + expiration, data: item }, limit)
}

function getFromFastIndexWithExpiracy(object, key) {
    const item = object.index[key]
    if (item && item.validUntil > Date.now()) {
        return item.data
    }
    return null
}

function makeAsyncQueue(concurrency = 1) {
    const queue = []
    const listeners = []
    let running = 0
    async function runOneTask() {
        if (queue.length > 0 && running < concurrency) {
            running++
            const task = queue.shift()
            try {
                task && (await task())
            } finally {
                if (--running === 0) {
                    while (listeners.length > 0) {
                        listeners.shift()()
                    }
                }
                runOneTask()
            }
        }
    }
    async function drain() {
        if (!running) {
            return Promise.resolve()
        }
        return new Promise(resolve => {
            listeners.push(resolve)
        })
    }
    return {
        enqueue(fn) {
            queue.push(fn)
            runOneTask()
        },
        drain
    }
}

class Maybe {
    constructor(value) {
        this.value = value
    }
    bind(fn) {
        if (this.value === null || this.value === undefined) {
            return new Maybe(null)
        }
        if (isPromise(this.value)) {
            return new Maybe(this.value.then(x => (x !== null && x !== undefined ? fn(x) : null)).catch(() => null))
        }
        try {
            const result = fn(this.value)
            return new Maybe(result)
        } catch (error) {
            return new Maybe(null)
        }
    }
    async valueOf() {
        try {
            return await this.value
        } catch {
            return null
        }
    }
}

exports.Maybe = Maybe
function addPoint(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}

function subtractPoint(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    }
}

function multiplyPoint(point, scalar) {
    return {
        x: point.x * scalar,
        y: point.y * scalar
    }
}

function normalizePoint(point) {
    const length = Math.sqrt(point.x * point.x + point.y * point.y)
    return {
        x: point.x / length,
        y: point.y / length
    }
}

function pushPoint(point, angle, length) {
    return {
        x: point.x + Math.cos(angle) * length,
        y: point.y + Math.sin(angle) * length
    }
}

function getDistanceBetweenPoints(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function filterCoordinates(grid, predicate, direction = 'row-first') {
    const result = []
    if (direction === 'column-first') {
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                if (predicate(x, y)) {
                    result.push({ x, y })
                }
            }
        }
    } else {
        for (let y = 0; y < grid[0].length; y++) {
            for (let x = 0; x < grid.length; x++) {
                if (predicate(x, y)) {
                    result.push({ x, y })
                }
            }
        }
    }
    return result
}

function isHorizontalLine(tiles, x, y) {
    return tiles[x + 1]?.[y] && tiles[x - 1]?.[y] && !tiles[x][y - 1] && !tiles[x][y + 1]
}

function isVerticalLine(tiles, x, y) {
    return tiles[x][y + 1] && tiles[x][y - 1] && !tiles[x - 1]?.[y] && !tiles[x + 1]?.[y]
}

function isLeftmost(tiles, x, y) {
    return !tiles[x - 1]?.[y]
}

function isRightmost(tiles, x, y) {
    return !tiles[x + 1]?.[y]
}

function isTopmost(tiles, x, y) {
    return !tiles[x][y - 1]
}

function isBottommost(tiles, x, y) {
    return !tiles[x][y + 1]
}

function getCorners(tiles, x, y) {
    const corners = []
    if (!tiles[x][y]) {
        if (tiles[x - 1]?.[y] && tiles[x][y - 1]) {
            corners.push({ x, y })
        }
        if (tiles[x + 1]?.[y] && tiles[x][y - 1]) {
            corners.push({ x: x + 1, y })
        }
        if (tiles[x - 1]?.[y] && tiles[x][y + 1]) {
            corners.push({ x, y: y + 1 })
        }
        if (tiles[x + 1]?.[y] && tiles[x][y + 1]) {
            corners.push({ x: x + 1, y: y + 1 })
        }
        return corners
    }
    if (isHorizontalLine(tiles, x, y) || isVerticalLine(tiles, x, y)) {
        return []
    }
    if (!tiles[x - 1]?.[y - 1] && isLeftmost(tiles, x, y) && isTopmost(tiles, x, y)) {
        corners.push({ x, y })
    }
    if (!tiles[x + 1]?.[y - 1] && isRightmost(tiles, x, y) && isTopmost(tiles, x, y)) {
        corners.push({ x: x + 1, y })
    }
    if (!tiles[x - 1]?.[y + 1] && isLeftmost(tiles, x, y) && isBottommost(tiles, x, y)) {
        corners.push({ x, y: y + 1 })
    }
    if (!tiles[x + 1]?.[y + 1] && isRightmost(tiles, x, y) && isBottommost(tiles, x, y)) {
        corners.push({ x: x + 1, y: y + 1 })
    }
    return corners
}

function findCorners(tiles, tileSize, columns, rows) {
    const corners = [
        { x: 0, y: 0 },
        { x: columns, y: 0 },
        { x: 0, y: rows },
        { x: columns, y: rows }
    ]
    for (let x = 0; x < tiles.length; x++) {
        for (let y = 0; y < tiles[0].length; y++) {
            const findings = getCorners(tiles, x, y)
            for (const finding of findings) {
                if (!corners.some(c => c.x === finding.x && c.y === finding.y)) {
                    corners.push(finding)
                }
            }
        }
    }
    return corners.map(corner => ({ x: corner.x * tileSize, y: corner.y * tileSize }))
}

function findLines(grid, tileSize) {
    const upperPoints = filterCoordinates(
        grid,
        (x, y) => Boolean(grid[x][y] === 0 && grid[x][y + 1] !== 0),
        'row-first'
    ).map(point => ({ ...point, dx: 1, dy: 0 }))
    const lowerPoints = filterCoordinates(
        grid,
        (x, y) => Boolean(grid[x][y] === 0 && grid[x][y - 1] !== 0),
        'row-first'
    ).map(point => ({ ...point, dx: 1, dy: 0 }))
    const rightPoints = filterCoordinates(
        grid,
        (x, y) => Boolean(grid[x][y] === 0 && grid[x - 1]?.[y] !== 0),
        'column-first'
    ).map(point => ({ ...point, dx: 0, dy: 1 }))
    const leftPoints = filterCoordinates(
        grid,
        (x, y) => Boolean(grid[x][y] === 0 && grid[x + 1]?.[y] !== 0),
        'column-first'
    ).map(point => ({ ...point, dx: 0, dy: 1 }))
    upperPoints.forEach(vector => vector.y++)
    leftPoints.forEach(vector => vector.x++)
    const verticalLineSegments = group([...rightPoints, ...leftPoints], (current, previous) => {
        return current.x === previous.x && current.y - 1 === previous.y
    })
    const horizontalLineSegments = group([...lowerPoints, ...upperPoints], (current, previous) => {
        return current.y === previous.y && current.x - 1 === previous.x
    })
    return [...verticalLineSegments, ...horizontalLineSegments]
        .map(group => ({
            start: group[0],
            end: last(group)
        }))
        .map(line => ({
            start: multiplyPoint(line.start, tileSize),
            end: multiplyPoint(addPoint(line.end, { x: line.start.dx, y: line.start.dy }), tileSize)
        }))
}

function getAngleInRadians(origin, target) {
    return Math.atan2(target.y - origin.y, target.x - origin.x)
}

function getSortedRayAngles(origin, corners) {
    return corners.map(corner => getAngleInRadians(origin, corner)).sort((a, b) => a - b)
}

function getLineIntersectionPoint(line1Start, line1End, line2Start, line2End) {
    const denominator =
        (line2End.y - line2Start.y) * (line1End.x - line1Start.x) -
        (line2End.x - line2Start.x) * (line1End.y - line1Start.y)
    if (denominator === 0) {
        return null
    }
    let a = line1Start.y - line2Start.y
    let b = line1Start.x - line2Start.x
    const numerator1 = (line2End.x - line2Start.x) * a - (line2End.y - line2Start.y) * b
    const numerator2 = (line1End.x - line1Start.x) * a - (line1End.y - line1Start.y) * b
    a = numerator1 / denominator
    b = numerator2 / denominator
    if (a > 0 && a < 1 && b > 0 && b < 1) {
        return {
            x: line1Start.x + a * (line1End.x - line1Start.x),
            y: line1Start.y + a * (line1End.y - line1Start.y)
        }
    }
    return null
}

function raycast(origin, lines, angle) {
    const matches = []
    const target = pushPoint(origin, angle, 10000)
    for (const line of lines) {
        const intersectionPoint = getLineIntersectionPoint(origin, target, line.start, line.end)
        if (intersectionPoint) {
            matches.push(intersectionPoint)
        }
    }
    if (!matches.length) {
        return null
    }
    return matches.reduce((closest, current) => {
        const currentDistance = getDistanceBetweenPoints(origin, current)
        const closestDistance = getDistanceBetweenPoints(origin, closest)
        return currentDistance < closestDistance ? current : closest
    })
}

function raycastCircle(origin, lines, corners) {
    const OFFSET = 0.001
    const angles = getSortedRayAngles(origin, corners)
    const collisionPoints = []
    for (const angle of angles) {
        const intersectionA = raycast(origin, lines, angle - OFFSET)
        const intersectionB = raycast(origin, lines, angle + OFFSET)
        if (intersectionA) {
            collisionPoints.push(intersectionA)
        }
        if (intersectionB) {
            collisionPoints.push(intersectionB)
        }
    }
    return collisionPoints
}

exports.Random = {
    inclusiveInt: randomIntInclusive,
    between: randomBetween,
    chance,
    signed: signedRandom,
    makeSeededRng
}
exports.Arrays = {
    countUnique,
    makeUnique,
    splitBySize,
    splitByCount,
    index: indexArray,
    indexCollection: indexArrayToCollection,
    onlyOrThrow,
    onlyOrNull,
    firstOrNull,
    shuffle,
    takeRandomly,
    pickRandomIndices,
    initialize: initializeArray,
    initialize2D: initialize2DArray,
    rotate2D: rotate2DArray,
    containsShape,
    glue,
    pluck,
    pick,
    last,
    pickWeighted,
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
    createOscillator
}
exports.System = {
    sleepMillis,
    forever,
    scheduleMany,
    waitFor,
    expandError
}
exports.Numbers = {
    sum,
    average,
    clamp,
    range,
    interpolate,
    createSequence,
    increment,
    decrement,
    format: formatNumber,
    parseIntOrThrow,
    asMegabytes,
    convertBytes
}
exports.Promises = {
    raceFulfilled,
    invert: invertPromise,
    runInParallelBatches,
    makeAsyncQueue
}
exports.Dates = {
    getAgo,
    isoDate,
    throttle,
    timeSince,
    dateTimeSlug,
    unixTimestamp,
    fromUtcString,
    getProgress,
    humanizeTime,
    humanizeProgress,
    createTimeDigits,
    mapDayNumber,
    getDayInfoFromDate,
    getDayInfoFromDateTimeString,
    seconds,
    minutes,
    hours
}
exports.Objects = {
    safeParse,
    deleteDeep,
    getDeep,
    getDeepOrElse,
    setDeep,
    incrementDeep,
    ensureDeep,
    replaceDeep,
    getFirstDeep,
    mergeDeep,
    mapAllAsync,
    cloneWithJson,
    sortObject,
    sortArray,
    sortAny,
    deepEquals,
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
    flip,
    getAllPermutations,
    countTruthyValues,
    transformToArray,
    setMulti,
    incrementMulti,
    createFastIndex,
    pushToFastIndex,
    pushToFastIndexWithExpiracy,
    getFromFastIndexWithExpiracy
}
exports.Pagination = {
    asPageNumber,
    pageify
}
exports.Types = {
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
    asString,
    asNumber,
    asBoolean,
    asDate,
    asNullableString,
    asId,
    asArray,
    asObject
}
exports.Strings = {
    tokenizeByCount,
    tokenizeByLength,
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
    between,
    betweenWide,
    betweenNarrow,
    getPreLine,
    containsWord,
    containsWords,
    joinUrl,
    getFuzzyMatchScore,
    sortByFuzzyScore,
    splitOnce,
    randomize,
    shrinkTrim,
    capitalize,
    decapitalize,
    csvEscape,
    parseCsv,
    surroundInOut,
    getExtension,
    getBasename,
    normalizeFilename,
    parseFilename,
    camelToTitle,
    slugToTitle,
    slugToCamel,
    joinHumanly,
    findWeightedPair,
    extractBlock,
    isLetter,
    isDigit,
    isLetterOrDigit,
    insert: insertString,
    linesMatchOrdered
}
exports.Assertions = {
    asEqual,
    asTrue,
    asTruthy,
    asFalse,
    asFalsy,
    asEither
}
exports.Cache = {
    get: getCached
}
exports.Vector = {
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
}
