const { exec } = require('child_process')
const { createHash } = require('crypto')
const { createReadStream, createWriteStream } = require('fs')
const { mkdir, opendir, readFile, stat, writeFile } = require('fs/promises')
const { join } = require('path')

const raceFulfilled = promises => invertPromise(Promise.all(promises.map(invertPromise)))

const invertPromise = promise => new Promise((resolve, reject) => promise.then(reject, resolve))

const sleepMillis = millis =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve(true)
        }, millis)
    )

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const swap = array[i]
        array[i] = array[j]
        array[j] = swap
    }
    return array
}

const findFirst = (array, filterFn) => {
    for (const element of array) {
        if (filterFn(element)) {
            return element
        }
    }
    return null
}

const firstOrNull = array => (array.length > 0 ? array[0] : null)

const initializeArray = (count, initializer) => {
    const results = []
    for (let i = 0; i < count; i++) {
        results.push(initializer(i))
    }
    return results
}

const takeRandomly = (array, count) => shuffle(array).slice(0, count)

const pluck = (array, key) => array.map(element => element[key])

const randomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const randomBetween = (min, max) => Math.random() * (max - min) + min

const signedRandom = () => Math.random() * 2 - 1

const chance = threshold => Math.random() < threshold

const pick = array => array[Math.floor(array.length * Math.random())]

const last = array => array[array.length - 1]

const pickWeighted = (array, weights, randomNumber) => {
    if (array.length !== weights.length) {
        throw new Error('Array length mismatch')
    }
    let sum = weights.reduce((accumulator, element) => accumulator + element, 0)
    const random = (randomNumber ? randomNumber : Math.random()) * sum
    for (let i = 0; i < array.length; i++) {
        sum -= weights[i]
        if (random >= sum) {
            return array[i]
        }
    }
}

const sortWeighted = (array, weights) => {
    const rolls = weights.map(weight => Math.random() * weight)
    const results = []
    for (let i = 0; i < array; i++) {
        results.push([array[i], rolls[i]])
    }
    return results.sort((a, b) => a[1] - b[1]).map(a => a[0])
}

const getDeep = (object, path) => {
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

const getDeepOrElse = (object, path, fallback) => getDeep(object, path) || fallback

const setDeep = (object, path, value) => {
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

const ensureDeep = (object, path, value) => getDeep(object, path) || setDeep(object, path, value)

const deleteDeep = (object, path) => {
    const location = beforeLast(path, '.')
    const toDelete = afterLast(path, '.')
    const segment = getDeep(object, location)
    delete segment[toDelete]
}

const replaceDeep = (object, path, value) => {
    const existing = getDeep(object, path)
    if (!existing) {
        throw new Error("Key '" + path + "' does not exist.")
    }
    setDeep(object, path, value)
    return existing
}

const getFirstDeep = (object, paths, fallbackToAnyKey) => {
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

const forever = async (callable, millis) => {
    while (true) {
        try {
            await callable()
        } catch (error) {
            console.error('Error in forever:', error)
        }
        await sleepMillis(millis)
    }
}

const readUtf8FileAsync = async path => readFile(path, 'utf8')

const readJsonAsync = async path => JSON.parse(await readUtf8FileAsync(path))

const writeJsonAsync = async (path, object, prettify) => {
    if (prettify) {
        await writeFile(path, JSON.stringify(object, null, 4))
    } else {
        await writeFile(path, JSON.stringify(object))
    }
}

const readLinesAsync = async path => (await readUtf8FileAsync(path)).split('\n')

const readMatchingLines = async (path, filterFn) => (await readLinesAsync(path)).filter(filterFn)

const readNonEmptyLines = async path => readMatchingLines(path, x => x)

async function* walkTreeAsync(path) {
    for await (const directory of await opendir(path)) {
        const entry = join(path, directory.name)
        if (directory.isDirectory()) {
            yield* await walkTreeAsync(entry)
        } else if (directory.isFile()) {
            yield entry
        }
    }
}

const removeLeadingDirectory = (path, directory) => {
    directory = directory.startsWith('./') ? directory.slice(2) : directory
    directory = directory.endsWith('/') ? directory : directory + '/'
    return path.replace(directory, '')
}

const readdirDeepAsync = async (path, cwd) => {
    const entries = []
    for await (const entry of walkTreeAsync(path)) {
        entries.push(cwd ? removeLeadingDirectory(entry, cwd) : entry)
    }
    return entries
}

const existsAsync = async path => {
    try {
        await stat(path)
        return true
    } catch (error) {
        return false
    }
}

const getFileSize = async path => {
    const stats = await stat(path)
    return stats.size
}

const asMegabytes = number => number / 1024 / 1024

const getDirectorySize = async path => {
    let size = 0
    for await (const file of walkTreeAsync(path)) {
        size += await getFileSize(file)
    }
    return size
}

const convertBytes = bytes => {
    if (bytes > 1000000) {
        return (bytes / 1000000).toFixed(3) + 'MB'
    }
    if (bytes > 1000) {
        return (bytes / 1000).toFixed(3) + 'KB'
    }
    return bytes
}

const getChecksum = data => {
    const hash = createHash('sha1')
    hash.update(data)
    return hash.digest('hex')
}

const getChecksumOfFile = async path =>
    new Promise((resolve, reject) => {
        const hash = createHash('sha1')
        const readStream = createReadStream(path)
        readStream.on('error', reject)
        readStream.on('data', chunk => hash.update(chunk))
        readStream.on('end', () => resolve(hash.digest('hex')))
    })

const isObject = value => value !== null && typeof value === 'object'

const isStrictlyObject = value => isObject(value) && !Array.isArray(value)

const isUndefined = value => typeof value === 'undefined'

const isFunction = value => Object.prototype.toString.call(value) === '[object Function]'

const isString = value => Object.prototype.toString.call(value) === '[object String]'

const isNumber = value => !isNaN(value) && String(value) === String(parseFloat(value))

const isDate = value => Object.prototype.toString.call(value) === '[object Date]'

const isBlank = value => !isString(value) || value.trim().length === 0

const alphanumericAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

const hexAlphabet = '0123456789abcdef'

const randomAlphanumericString = length => {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += alphanumericAlphabet[Math.floor(Math.random() * alphanumericAlphabet.length)]
    }
    return buffer
}

const randomHexString = length => {
    let buffer = ''
    for (let i = 0; i < length; i++) {
        buffer += hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)]
    }
    return buffer
}

/**
 * @param {*} string
 * @returns {string}
 */
const asString = string => {
    if (isBlank(string)) {
        throw new TypeError('Expected string, got: ' + string)
    }
    return string
}

/**
 * @param {*} number
 * @returns {number}
 */
const asNumber = number => {
    if (!isNumber(number)) {
        throw new TypeError('Expected number, got: ' + number)
    }
    return number
}

/**
 * @param {*} date
 * @returns {Date}
 */
const asDate = date => {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        return date
    }
    throw new TypeError('Expected date, got: ' + date)
}

const asNullableString = string => {
    if (isBlank(string)) {
        return null
    }
    return string
}

const represent = value => {
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

const loggerGlobalState = {
    fileStream: null
}

const log = (level, module, pieces) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19)
    const message = `${timestamp} ${level} ${module} ${pieces.map(represent).join(' ')}\n`
    process.stdout.write(message)
    if (level === 'ERROR') {
        process.stderr.write(message)
    }
    if (loggerGlobalState.fileStream) {
        loggerGlobalState.fileStream.write(message)
    }
}

const createLogger = module => {
    module = last(module.split(/\\|\//))
    return {
        trace: (...pieces) => {
            log('TRACE', module, pieces)
        },
        info: (...pieces) => {
            log('INFO', module, pieces)
        },
        warn: (...pieces) => {
            log('WARN', module, pieces)
        },
        error: (...pieces) => {
            log('ERROR', module, pieces)
        },
        errorObject: (error, stackTrace) => {
            log('ERROR', module, [expandError(error, stackTrace)])
        }
    }
}

const enableFileLogging = path => {
    loggerGlobalState.fileStream = createWriteStream(path, { flags: 'a' })
}

const expandError = (error, stackTrace) => {
    if (isString(error)) {
        return error
    }
    let buffer = Object.entries(error)
        .map(entry => `${entry[0]}: ${entry[1]}`)
        .join('; ')
    if (stackTrace && error.stack) {
        buffer += `\n${error.stack}`
    }
    return buffer
}

const mergeDeep = (target, source) => {
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
}

const zip = (first, second, reducer) => {
    const result = { ...first }
    for (const entry of Object.entries(second)) {
        if (result[entry[0]]) {
            result[entry[0]] = reducer(result[entry[0]], entry[1])
        } else {
            result[entry[0]] = entry[1]
        }
    }
    return result
}

/**
 * @param {*} value
 * @returns {number}
 */
const asPageNumber = value => {
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

const pushAll = (array, elements) => Array.prototype.push.apply(array, elements)

const unshiftAll = (array, elements) => Array.prototype.unshift.apply(array, elements)

const mapWithIndex = (array, callback) => {
    const results = new Array(array.length)
    for (let i = 0; i < array.length; i++) {
        results[i] = callback(array[i], i)
    }
    return results
}

const mapWithGetters = (object, keys) => {
    const mapped = {}
    for (const key of keys) {
        if (Array.isArray(key)) {
            mapped[key[1]] = object.get(key[0])
        } else {
            mapped[key] = object.get(key)
        }
    }
    return mapped
}

const mapAllWithGetters = (array, keys) => array.map(object => mapWithGetters(object, keys))

const mapAllAsync = async (array, fn) => {
    const mapped = []
    for (const object of array) {
        mapped.push(await fn(object))
    }
    return mapped
}

const glue = (array, glueElement) => {
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

const pageify = (data, totalElements, pageSize, currentPage) => {
    const totalPages = Math.floor(totalElements / pageSize) + 1
    return {
        data,
        pageSize,
        totalPages,
        totalElements,
        currentPage
    }
}

class BadRequestError extends Error {
    constructor() {
        super()
        this.name = 'BadRequestError'
    }
}

class ValidationError extends Error {
    constructor(message, location) {
        super()
        this.name = 'ValidationError'
        this.message = message
        this.location = location
    }
}

class NotFoundError extends Error {
    constructor() {
        super()
        this.name = 'NotFoundError'
    }
}

class ConflictError extends Error {
    constructor(message, location) {
        super()
        this.name = 'ConflictError'
        this.message = message
        this.location = location
    }
}

const asTrue = data => {
    if (!data) {
        throw new BadRequestError()
    }
    return data
}

const asFalse = data => {
    if (data) {
        throw new BadRequestError()
    }
    return data
}

const asEither = (data, values) => {
    if (!values.includes(data)) {
        throw new BadRequestError()
    }
    return data
}

const asFound = data => {
    if (!data) {
        throw new NotFoundError()
    }
    return data
}

const asSame = (data, other, options) => {
    if (data !== other) {
        throw new ValidationError(`Expected ${options.field} fields to be the same.`, options.location)
    }
    return data
}

const asNotConflicting = (data, options) => {
    if (data) {
        throw new ConflictError(`This ${options.field} already exists.`, options.location)
    }
}

const asOnly = array => {
    if (!array) {
        throw new Error('Expected array, was: ' + array)
    }
    if (array.length !== 1) {
        throw new Error('Expected array length to be exactly 1, was: ' + array.length)
    }
    return array[0]
}

const asBetween = (data, minimum, maximum, options) => {
    const number = parseInt(data, 10)
    if (isNaN(number) || number < minimum || number > maximum) {
        throw new ValidationError(
            `Value of ${options.field} is expected to be between ${minimum} and ${maximum}.`,
            options.location
        )
    }
    return number
}

/**
 * @returns {string}
 */
const asLengthBetween = (data, minimum, maximum, options) => {
    if (!isString(data)) {
        throw new ValidationError(options.field, options.location)
    }
    if (data.length < minimum || data.length > maximum) {
        throw new ValidationError(
            `Length of ${options.field} is expected to be between ${minimum} and ${maximum}.`,
            options.location
        )
    }
    return data
}

const scheduleMany = (handlers, dates) => {
    for (let i = 0; i < handlers.length; i++) {
        const handler = handlers[i]
        const date = dates[i]
        const delta = Math.max(0, date.getTime() - Date.now())
        setTimeout(handler, delta)
    }
}

const interpolate = (a, b, t) => a + (b - a) * t

const range = (start, end) => {
    const array = []
    for (let i = start; i <= end; i++) {
        array.push(i)
    }
    return array
}

const includesAny = (string, substrings) => {
    for (const substring of substrings) {
        if (string.includes(substring)) {
            return true
        }
    }
    return false
}

const slugify = string =>
    string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split('')
        .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
        .join('')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

const enumify = string => slugify(string).replace(/-/g, '_').toUpperCase()

const getFuzzyMatchScore = (string, input) => {
    if (input.length === 0) {
        return 0
    }
    const lowercaseString = string.toLowerCase()
    const lowercaseInput = input.toLowerCase()
    if (lowercaseString.startsWith(lowercaseInput)) {
        return 10000 - string.length
    }
    if (lowercaseString.includes(lowercaseInput)) {
        return 5000 - string.length
    }
    const regex = new RegExp('.*' + lowercaseInput.split('').join('.*') + '.*')
    return regex.test(lowercaseString) ? 1000 - string.length : 0
}

const sortByFuzzyScore = (strings, input) =>
    strings
        .filter(a => getFuzzyMatchScore(a, input))
        .sort((a, b) => getFuzzyMatchScore(b, input) - getFuzzyMatchScore(a, input))

const escapeHtml = string => string.replace(/\</g, '&lt;').replace('/>/g', '&gt;')

const htmlEntityMap = {
    '&quot;': '"',
    '&gt;': '>',
    '&lt': '<'
}

const decodeHtmlEntities = string => {
    let buffer = string.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    for (const key of Object.keys(htmlEntityMap)) {
        buffer = buffer.split(key).join(htmlEntityMap[key])
    }
    return buffer
}

const before = (string, searchString) => {
    const position = string.indexOf(searchString)
    return position === -1 ? string : string.slice(0, position)
}

const after = (string, searchString) => {
    const position = string.indexOf(searchString)
    return position === -1 ? string : string.slice(position + searchString.length)
}

const beforeLast = (string, searchString) => {
    const position = string.lastIndexOf(searchString)
    return position === -1 ? string : string.slice(0, position)
}

const afterLast = (string, searchString) => {
    const position = string.lastIndexOf(searchString)
    return position === -1 ? string : string.slice(position + searchString.length)
}

const between = (string, start, end) => before(after(string, start), end)

const betweenWide = (string, start, end) => beforeLast(after(string, start), end)

const betweenNarrow = (string, start, end) => before(afterLast(string, start), end)

const splitOnce = (string, separator) =>
    string.includes(separator) ? [before(string, separator), after(string, separator)] : [string, '']

const randomize = string => string.replace(/\{(.+?)\}/g, (_, group) => pick(group.split('|')))

const shrinkTrim = string => string.replace(/\s+/g, ' ').replace(/\s$|^\s/g, '')

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const csvEscape = string => (string.match(/"|,/) ? `"${string.replace(/"/g, '""')}"` : string)

const expectThrow = async (name, message, callable) => {
    try {
        await callable()
        throw new Error('Expected ' + name + ' ' + message + ' but everything went fine')
    } catch (error) {
        if (error.name !== name || error.message !== message) {
            throw new Error('Expected ' + name + ' ' + message + ' but caught ' + error.name + ' ' + error.message)
        }
    }
}

const waitFor = async (predicate, waitLength, maxWaits) => {
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

const mkdirp = async path => {
    const segments = path.split('/')
    let buffer = ''
    for (const segment of segments) {
        buffer += segment + '/'
        if (!(await existsAsync(buffer))) {
            try {
                await mkdir(buffer)
            } catch (error) {
                if (error.code !== 'EEXIST') {
                    throw error
                }
            }
        }
    }
}

const filterAndRemove = (array, predicate) => {
    const results = []
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) {
            results.push(array.splice(i, 1)[0])
        }
    }
    return results
}

const execAsync = async (command, resolveWithErrors, inherit, options) =>
    new Promise((resolve, reject) => {
        const childProcess = exec(command, options, (error, stdout, stderr) => {
            if (error) {
                if (resolveWithErrors) {
                    resolve({ error, stdout, stderr })
                } else {
                    reject({ error, stdout, stderr })
                }
            } else {
                resolve({ stdout, stderr })
            }
        })
        if (inherit) {
            childProcess.stdout.pipe(process.stdout)
            childProcess.stderr.pipe(process.stderr)
        }
    })

const cloneWithJson = a => JSON.parse(JSON.stringify(a))

const unixTimestamp = optionalTimestamp => Math.ceil((optionalTimestamp || Date.now()) / 1000)

const isoDate = optionalDate => (optionalDate || new Date()).toISOString().slice(0, 10)

const dateTimeSlug = optionalDate => (optionalDate || new Date()).toISOString().slice(0, 19).replace(/T|:/g, '-')

const fromUtcString = string => {
    const date = new Date(string)
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

const getAgo = date => {
    const now = Date.now()
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

const debounce = (longWrapper, millis) => {
    if (Date.now() > longWrapper.value) {
        longWrapper.value = Date.now() + millis
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

const timeSince = (unit, a, optionalB) => {
    a = isDate(a) ? a.getTime() : a
    optionalB = optionalB ? (isDate(optionalB) ? optionalB.getTime() : optionalB) : Date.now()
    return (optionalB - a) / timeUnits[unit]
}

const getPreLine = string => string.replace(/ +/g, ' ').replace(/^ /gm, '')

const containsWord = (string, word) => {
    const slug = slugify(string)
    return slug.startsWith(word + '-') || slug.endsWith('-' + word) || slug.includes('-' + word + '-') || slug === word
}

const containsWords = (string, words) => {
    for (const word of words) {
        if (containsWord(string, word)) {
            return true
        }
    }
    return false
}

const tinyCache = {}

const getCached = async (key, ttlMillis, handler) => {
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

const joinUrl = (...parts) => {
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

const sortObject = object => {
    const keys = Object.keys(object)
    const orderedKeys = keys.sort((a, b) => a.localeCompare(b))
    const sorted = {}
    for (const key of orderedKeys) {
        sorted[key] = sortAny(object[key])
    }
    return sorted
}

const sortArray = array => {
    const result = []
    array
        .sort((a, b) => JSON.stringify(sortAny(a)).localeCompare(JSON.stringify(sortAny(b))))
        .forEach(a => result.push(sortAny(a)))
    return result
}

const sortAny = any => {
    if (Array.isArray(any)) {
        return sortArray(any)
    }
    if (isObject(any)) {
        return sortObject(any)
    }
    return any
}

const deepEquals = (a, b) => JSON.stringify(sortAny(a)) === JSON.stringify(sortAny(b))

const safeParse = stringable => {
    try {
        return JSON.parse(stringable)
    } catch (error) {
        return null
    }
}

const createSequence = () => {
    let value = 0
    return { next: () => value++ }
}

const clamp = (value, lower, upper) => (value < lower ? lower : value > upper ? upper : value)

const getHeapMegabytes = () => {
    const memory = process.memoryUsage()
    return {
        used: (memory.heapUsed / 1024 / 1024).toFixed(3),
        total: (memory.heapTotal / 1024 / 1024).toFixed(3),
        rss: (memory.rss / 1024 / 1024).toFixed(3)
    }
}

const runOn = (object, callable) => {
    callable(object)
    return object
}

const ifPresent = (object, callable) => {
    if (object) {
        callable(object)
    }
}

const mergeArrays = (target, source) => {
    const keys = Object.keys(source)
    for (const key of keys) {
        if (Array.isArray(source[key]) && Array.isArray(target[key])) {
            pushAll(target[key], source[key])
        }
    }
}

const empty = array => {
    array.splice(0, array.length)
    return array
}

const removeEmptyArrays = object => {
    for (const key of Object.keys(object)) {
        if (Array.isArray(object[key]) && object[key].length === 0) {
            delete object[key]
        }
    }
}

const removeEmptyValues = object => {
    for (const entry of Object.entries(object)) {
        if (isUndefined(entry[1]) || entry[1] === null || (isString(entry[1]) && isBlank(entry[1]))) {
            delete object[entry[0]]
        }
    }
}

const mapObject = (object, mapper) => {
    const output = {}
    for (const entry of Object.entries(object)) {
        output[entry[0]] = mapper(entry[1])
    }
    return output
}

const rethrow = async (asyncFn, throwable) => {
    try {
        const returnValue = await asyncFn()
        return returnValue
    } catch (error) {
        throw throwable
    }
}

const getFlatNotation = (prefix, key, bracket) =>
    prefix + (bracket ? '[' + key + ']' : (prefix.length ? '.' : '') + key)

const flattenInner = (target, object, prefix, bracket, arrays) => {
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

const flatten = (object, arrays) => {
    return flattenInner({}, object, '', false, arrays)
}

const unflatten = object => {
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

const match = (value, options, fallback) => (options[value] ? options[value] : fallback)

const indexArray = (array, keyFn, useArrays) => {
    const target = {}
    for (const element of array) {
        const key = keyFn(element)
        if (useArrays) {
            if (!target[key]) {
                target[key] = []
            }
            target[key].push(element)
        } else {
            target[key] = element
        }
    }
    return target
}

const splitBySize = (array, size) => {
    const batches = []
    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size))
    }
    return batches
}

const splitByCount = (array, count) => {
    const size = Math.ceil(array.length / count)
    const batches = []
    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size))
    }
    return batches
}

const tokenizeByLength = (string, length) => {
    const parts = []
    const count = Math.ceil(string.length / length)
    for (let i = 0; i < count; i++) {
        parts.push(string.slice(i * length, i * length + length))
    }
    return parts
}

const tokenizeByCount = (string, count) => {
    const length = Math.ceil(string.length / count)
    return tokenizeByLength(string, length)
}

const makeUnique = (array, fn) => Object.values(indexArray(array, fn, false))

const countUnique = (array, mapper, plain, sort, reverse) => {
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

const sortObjectValues = (object, compareFn) => Object.fromEntries(Object.entries(object).sort(compareFn))

module.exports = {
    Random: {
        inclusiveInt: randomIntInclusive,
        between: randomBetween,
        chance,
        signed: signedRandom
    },
    Arrays: {
        countUnique,
        makeUnique,
        splitBySize,
        splitByCount,
        index: indexArray,
        firstOrNull,
        findFirst,
        shuffle,
        takeRandomly,
        initialize: initializeArray,
        mapWithIndex,
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
        empty
    },
    System: {
        sleepMillis,
        forever,
        scheduleMany,
        waitFor,
        execAsync,
        getHeapMegabytes,
        expandError
    },
    Numbers: {
        clamp,
        range,
        interpolate,
        createSequence
    },
    Promises: {
        raceFulfilled,
        invert: invertPromise
    },
    Dates: {
        getAgo,
        isoDate,
        debounce,
        timeSince,
        dateTimeSlug,
        unixTimestamp,
        fromUtcString
    },
    Objects: {
        safeParse,
        deleteDeep,
        getDeep,
        getDeepOrElse,
        setDeep,
        ensureDeep,
        replaceDeep,
        getFirstDeep,
        mergeDeep,
        mapWithGetters,
        mapAllWithGetters,
        mapAllAsync,
        cloneWithJson,
        sortObject,
        sortArray,
        sortAny,
        deepEquals,
        runOn,
        ifPresent,
        zip,
        removeEmptyArrays,
        removeEmptyValues,
        flatten,
        unflatten,
        match,
        sort: sortObjectValues,
        map: mapObject,
        rethrow
    },
    Pagination: {
        asPageNumber,
        pageify
    },
    Files: {
        existsAsync,
        writeJsonAsync,
        readdirDeepAsync,
        readUtf8FileAsync,
        readJsonAsync,
        readLinesAsync,
        readMatchingLines,
        readNonEmptyLines,
        walkTreeAsync,
        getFileSize,
        asMegabytes,
        getDirectorySize,
        convertBytes,
        getChecksum: getChecksumOfFile,
        mkdirp
    },
    Types: {
        isFunction,
        isObject,
        isStrictlyObject,
        isUndefined,
        isString,
        isNumber,
        isDate,
        isBlank,
        asString,
        asNumber,
        asDate,
        asNullableString
    },
    Strings: {
        tokenizeByCount,
        tokenizeByLength,
        randomAlphanumeric: randomAlphanumericString,
        randomHex: randomHexString,
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
        getChecksum,
        splitOnce,
        randomize,
        shrinkTrim,
        capitalize,
        csvEscape
    },
    Assertions: {
        asTrue,
        asFalse,
        asEither,
        asFound,
        asSame,
        asNotConflicting,
        asOnly,
        asBetween,
        asLengthBetween,
        expectThrow
    },
    Cache: {
        get: getCached
    },
    Logger: {
        create: createLogger,
        enableFileLogging
    }
}
