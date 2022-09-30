/// <reference types="node" />
import * as ChildProcess from 'child_process';
import { ExecOptions } from 'child_process';
declare type Indexable = number | string;
declare type CafeObject<T = unknown> = Record<string, T>;
declare function invertPromise<T>(promise: Promise<T>): Promise<unknown>;
declare function raceFulfilled<T>(promises: Promise<T>[]): Promise<void>;
declare function runInParallelBatches<T>(promises: (() => Promise<T>)[], concurrency?: number): Promise<T[]>;
declare function sleepMillis(millis: number): Promise<unknown>;
declare function shuffle<T>(array: T[]): T[];
declare function onlyOrThrow<T>(array: T[]): T;
declare function onlyOrNull<T>(array: T[]): T | null;
declare function firstOrNull<T>(array: T[]): T | null;
declare function initializeArray<T>(count: number, initializer: (index: number) => T): T[];
declare function takeRandomly<T>(array: T[], count: number): T[];
declare function pickRandomIndices<T>(array: T[], count: number): number[];
declare function pluck<T, K extends keyof T>(array: T[], key: K): T[K][];
declare function makeSeededRng(seed: number): () => number;
declare function randomIntInclusive(min: number, max: number): number;
declare function randomBetween(min: number, max: number): number;
declare function signedRandom(): number;
declare function chance(threshold: number): boolean;
declare function pick<T>(array: T[]): T;
declare function last<T>(array: T[]): T;
declare function pickWeighted<T>(array: T[], weights: number[], randomNumber?: number): T;
declare function sortWeighted<T>(array: T[], weights: number[]): T[];
declare function getDeep(object: CafeObject, path: string): unknown;
declare function getDeepOrElse(object: CafeObject, path: string, fallback: unknown): unknown;
declare function setDeep<T>(object: CafeObject, path: string, value: T): T;
declare function incrementDeep(object: CafeObject, path: string, amount?: number): number;
declare function ensureDeep(object: CafeObject, path: string, value: unknown): unknown;
declare function deleteDeep(object: CafeObject, path: string): void;
declare function replaceDeep(object: CafeObject, path: string, value: unknown): unknown;
declare function getFirstDeep(object: CafeObject, paths: string[], fallbackToAnyKey?: boolean): unknown;
declare function forever(callable: (() => Promise<void>) | (() => void), millis: number): Promise<never>;
declare function readUtf8FileAsync(path: string): Promise<string>;
declare function readJsonAsync(path: string): Promise<CafeObject>;
declare function writeJsonAsync(path: string, object: CafeObject, prettify?: boolean): Promise<void>;
declare function readLinesAsync(path: string): Promise<string[]>;
declare function readMatchingLines(path: string, filterFn: (matcher: string) => boolean): Promise<string[]>;
declare function readNonEmptyLines(path: string): Promise<string[]>;
declare function readCsv(path: string, skip?: number, delimiter?: string, quote?: string): Promise<string[][]>;
declare function walkTreeAsync(path: string): AsyncIterable<string>;
declare function readdirDeepAsync(path: string, cwd?: string): Promise<string[]>;
declare function existsAsync(path: string): Promise<boolean>;
declare function getFileSize(path: string): Promise<number>;
declare function asMegabytes(number: number): number;
declare function getDirectorySize(path: string): Promise<number>;
declare function convertBytes(bytes: number): string;
declare function getChecksum(data: string): string;
declare function getChecksumOfFile(path: string): Promise<string>;
declare function isObject(value: any): value is object;
declare function isStrictlyObject(value: any): value is object;
declare function isEmptyArray(value: any): boolean;
declare function isEmptyObject(value: any): boolean;
declare function isUndefined(value: any): value is undefined;
declare function isFunction(value: any): value is Function;
declare function isString(value: any): value is string;
declare function isNumber(value: any): value is number;
declare function isDate(value: any): value is Date;
declare function isBlank(value: any): boolean;
declare function isId(value: any): value is number | string;
declare function randomLetterString(length: number): string;
declare function randomAlphanumericString(length: number): string;
declare function randomRichAsciiString(length: number): string;
declare function randomUnicodeString(length: number): string;
declare function randomHexString(length: number): string;
declare function asString(string: any): string;
declare function asNumber(number: any): number;
declare function asDate(date: any): Date;
declare function asNullableString(string: any): string | null;
declare function asId(value: any): number;
declare function asArray(value: any): unknown[];
declare function asObject(value: any): Record<string, unknown>;
declare function createLogger(module: string): {
    trace: (...pieces: any[]) => void;
    info: (...pieces: any[]) => void;
    warn: (...pieces: any[]) => void;
    error: (...pieces: any[]) => void;
    errorObject: (error: any, stackTrace?: boolean) => void;
};
declare function enableFileLogging(path: string): void;
declare function expandError(error: any, stackTrace?: boolean): string;
declare function mergeDeep(target: CafeObject, source: CafeObject): CafeObject;
declare function zip<T>(objects: CafeObject<T>[], reducer: (a: T, b: T) => T): CafeObject<T>;
declare function zipSum(objects: CafeObject<number>[]): CafeObject<number>;
declare function asPageNumber(value: any): number;
declare function pushToBucket<T>(object: Record<string, T[]>, bucket: string, item: T): void;
declare function unshiftAndLimit<T>(array: T[], item: T, limit: number): void;
declare function atRolling<T>(array: T[], index: number): T;
declare function pushAll<T>(array: T[], elements: T[]): void;
declare function unshiftAll<T>(array: T[], elements: T[]): void;
declare function mapAllAsync<T, K>(array: T[], fn: (value: T) => Promise<K>): Promise<K[]>;
declare function glue<T, K>(array: T[], glueElement: K | (() => K)): (T | K)[];
interface Page<T> {
    data: T[];
    pageSize: number;
    totalPages: number;
    totalElements: number;
    currentPage: number;
}
declare function pageify<T>(data: T[], totalElements: number, pageSize: number, currentPage: number): Page<T>;
declare function asEqual<A>(a: A, b: A): [A, A];
declare function asTrue(data: any): true;
declare function asTruthy<T>(data: T): T;
declare function asFalse(data: any): false;
declare function asFalsy<T>(data: T): T;
declare function asEither(data: string, values: string[]): string;
declare function scheduleMany<T>(handlers: (() => T)[], dates: Date[]): void;
declare function interpolate(a: number, b: number, t: number): number;
declare function sum(array: number[]): number;
declare function average(array: number[]): number;
declare function range(start: number, end: number): number[];
declare function includesAny(string: string, substrings: string[]): boolean;
declare function slugify(string: string): string;
declare function camelToTitle(string: string): string;
declare function slugToTitle(string: string): string;
declare function slugToCamel(string: string): string;
declare function joinHumanly(parts: string[], separator?: string, lastSeparator?: string): null | string;
declare function surroundInOut(string: string, filler: string): string;
declare function enumify(string: string): string;
declare function getFuzzyMatchScore(string: string, input: string): number;
declare function sortByFuzzyScore(strings: string[], input: string): string[];
declare function escapeHtml(string: string): string;
declare function decodeHtmlEntities(string: string): string;
declare function before(string: string, searchString: string): string;
declare function after(string: string, searchString: string): string;
declare function beforeLast(string: string, searchString: string): string;
declare function afterLast(string: string, searchString: string): string;
declare function between(string: string, start: string, end: string): string;
declare function betweenWide(string: string, start: string, end: string): string;
declare function betweenNarrow(string: string, start: string, end: string): string;
declare function splitOnce(string: string, separator: string): [string, string];
declare function getExtension(path: string): string;
declare function getBasename(path: string): string;
declare function normalizeFilename(path: string): string;
interface ParsedFilename {
    basename: string;
    extension: string;
    filename: string;
}
declare function parseFilename(string: string): ParsedFilename;
declare function randomize(string: string): string;
declare function shrinkTrim(string: string): string;
declare function capitalize(string: string): string;
declare function decapitalize(string: string): string;
declare function isLetter(character: string): boolean;
declare function isDigit(character: string): boolean;
declare function isLetterOrDigit(character: string): boolean;
declare function insertString(string: string, index: number, length: number, before: string, after: string): string;
declare function csvEscape(string: string): string;
declare function findWeightedPair(string: string, start?: number, opening?: string, closing?: string): number;
interface BlockExtractionOptions {
    start?: number;
    opening: string;
    closing: string;
    exclusive?: boolean;
}
declare function extractBlock(string: string, options: BlockExtractionOptions): string | null;
declare function parseCsv(string: string, delimiter?: string, quote?: string): string[];
declare function humanizeProgress(state: Progress): string;
declare function waitFor(predicate: () => Promise<boolean>, waitLength: number, maxWaits: number): Promise<boolean>;
declare function mkdirp(path: string): Promise<void>;
declare function filterAndRemove<T>(array: T[], predicate: (item: T) => boolean): T[];
declare function execAsync(command: string, resolveWithErrors?: boolean, inherit?: boolean, options?: ExecOptions): Promise<{
    stdout: string | Buffer;
    stderr: string | Buffer;
    error?: string | Error;
}>;
declare function runProcess(command: string, args: string[], options: ChildProcess.SpawnOptions, onStdout: (chunk: string) => void, onStderr: (chunk: string) => void): Promise<number>;
declare function cloneWithJson<T>(a: T): T;
declare function unixTimestamp(optionalTimestamp?: number): number;
declare function isoDate(optionalDate?: Date): string;
declare function dateTimeSlug(optionalDate?: Date): string;
declare function fromUtcString(string: string): Date;
declare function createTimeDigits(value: number): string;
declare function humanizeTime(millis: number): string;
declare function getAgo(date: Date, now?: number): string;
declare function throttle(identifier: string, millis: number): boolean;
declare function timeSince(unit: 's' | 'm' | 'h' | 'd', a: Date | number, optionalB?: Date | number): number;
interface Progress {
    deltaMs: number;
    progress: number;
    baseTimeMs: number;
    totalTimeMs: number;
    remainingTimeMs: number;
}
declare function getProgress(startedAt: number, current: number, total: number, now?: number): Progress;
declare const dayNumberIndex: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
};
interface DayInfo {
    zeroBasedIndex: number;
    day: string;
}
declare function mapDayNumber(zeroBasedIndex: keyof typeof dayNumberIndex): DayInfo;
declare function getDayInfoFromDate(date: Date): DayInfo;
declare function getDayInfoFromDateTimeString(dateTimeString: string): DayInfo;
declare function seconds(value: number): number;
declare function minutes(value: number): number;
declare function hours(value: number): number;
declare function getPreLine(string: string): string;
declare function containsWord(string: string, word: string): boolean;
declare function containsWords(string: string, words: string[]): boolean;
declare function getCached<T>(key: string, ttlMillis: number, handler: () => Promise<T>): Promise<T>;
declare function joinUrl(...parts: string[]): string;
declare function sortObject<T>(object: CafeObject<T>): CafeObject<T>;
declare function sortArray<T>(array: T[]): T[];
declare function sortAny(any: unknown): unknown;
declare function deepEquals(a: unknown, b: unknown): boolean;
declare function safeParse(stringable: string): CafeObject | null;
interface NumberFormatOptions {
    precision?: number;
    longForm?: boolean;
    unit?: null | string;
}
declare function formatNumber(number: number, options?: NumberFormatOptions): string;
declare function parseIntOrThrow(numberOrString: any): number;
declare function clamp(value: number, lower: number, upper: number): number;
declare function increment(value: number, change: number, maximum: number): number;
declare function decrement(value: number, change: number, minimum: number): number;
interface HeapMegabytes {
    used: string;
    total: string;
    rss: string;
}
declare function getHeapMegabytes(): HeapMegabytes;
declare function runOn<T>(object: T, callable: (object: T) => void): T;
declare function ifPresent<T>(object: T, callable: (object: T) => void): void;
declare function mergeArrays(target: CafeObject<unknown[]>, source: CafeObject<unknown[]>): void;
declare function empty<T>(array: T[]): T[];
declare function removeEmptyArrays(object: CafeObject): CafeObject;
declare function removeEmptyValues(object: CafeObject): CafeObject;
declare function filterObjectKeys<T>(object: CafeObject<T>, predicate: (key: string) => boolean): CafeObject<T>;
declare function filterObjectValues<T>(object: CafeObject<T>, predicate: (value: T) => boolean): CafeObject<T>;
declare function mapObject<T, K>(object: CafeObject<T>, mapper: (value: T) => K): CafeObject<K>;
declare function rethrow<T>(asyncFn: () => Promise<T>, throwable: Error): Promise<T>;
declare function setSomeOnObject(object: CafeObject, key: string, value: unknown): void;
declare function flip(object: Record<string, Indexable>): CafeObject;
declare function getAllPermutations(object: CafeObject<unknown[]>): CafeObject[];
declare function countTruthyValues(object: CafeObject): number;
declare function flatten(object: CafeObject, arrays?: boolean, prefix?: string): CafeObject | Array<unknown>;
declare function unflatten(object: CafeObject): CafeObject;
declare function match(value: string, options: CafeObject<string>, fallback: string): string;
declare function indexArray<T>(array: T[], keyFn: (item: T) => Indexable): CafeObject<T>;
declare function indexArrayToCollection<T>(array: T[], keyFn: (item: T) => Indexable): CafeObject<T[]>;
declare function splitBySize<T>(array: T[], size: number): T[][];
declare function splitByCount<T>(array: T[], count: number): T[][];
declare function tokenizeByLength(string: string, length: number): string[];
declare function tokenizeByCount(string: string, count: number): string[];
declare function makeUnique<T>(array: T[], fn: (item: T) => string): T[];
declare function countUnique(array: string[], mapper?: (item: string) => string, plain?: boolean, sort?: boolean, reverse?: boolean): CafeObject<number> | string[];
declare function sortObjectValues<T>(object: CafeObject<T>, compareFn: (a: [string, T], b: [string, T]) => number): CafeObject<T>;
declare function transformToArray<T>(objectOfArrays: CafeObject<T[]>): CafeObject[];
declare function incrementMulti<T>(objects: T[], key: keyof T, step?: number): void;
declare function setMulti<T, K extends keyof T>(objects: T[], key: K, value: T[K]): void;
interface Index<T> {
    index: CafeObject<T>;
    keys: string[];
}
interface FastIndexItem<T> {
    validUntil: number;
    data: T;
}
interface FastIndex<T> {
    index: CafeObject<FastIndexItem<T>>;
    keys: string[];
}
declare function createFastIndex<T>(): FastIndex<T>;
declare function pushToFastIndex<T>(object: Index<T>, key: string, item: T, limit?: number): void;
declare function pushToFastIndexWithExpiracy<T>(object: FastIndex<T>, key: string, item: unknown, expiration: number, limit?: number): void;
declare function getFromFastIndexWithExpiracy<T>(object: FastIndex<T>, key: string): T | null;
declare function makeAsyncQueue(concurrency?: number): {
    enqueue(fn: () => Promise<void>): void;
    drain: () => Promise<void>;
};
export declare class Maybe<T> {
    private value;
    constructor(value: T | null);
    bind<K>(fn: (value: T) => K): Maybe<Awaited<K>>;
    valueOf(): Promise<T | null>;
}
export declare const Random: {
    inclusiveInt: typeof randomIntInclusive;
    between: typeof randomBetween;
    chance: typeof chance;
    signed: typeof signedRandom;
    makeSeededRng: typeof makeSeededRng;
};
export declare const Arrays: {
    countUnique: typeof countUnique;
    makeUnique: typeof makeUnique;
    splitBySize: typeof splitBySize;
    splitByCount: typeof splitByCount;
    index: typeof indexArray;
    indexCollection: typeof indexArrayToCollection;
    onlyOrThrow: typeof onlyOrThrow;
    onlyOrNull: typeof onlyOrNull;
    firstOrNull: typeof firstOrNull;
    shuffle: typeof shuffle;
    takeRandomly: typeof takeRandomly;
    pickRandomIndices: typeof pickRandomIndices;
    initialize: typeof initializeArray;
    glue: typeof glue;
    pluck: typeof pluck;
    pick: typeof pick;
    last: typeof last;
    pickWeighted: typeof pickWeighted;
    sortWeighted: typeof sortWeighted;
    pushAll: typeof pushAll;
    unshiftAll: typeof unshiftAll;
    filterAndRemove: typeof filterAndRemove;
    merge: typeof mergeArrays;
    empty: typeof empty;
    pushToBucket: typeof pushToBucket;
    unshiftAndLimit: typeof unshiftAndLimit;
    atRolling: typeof atRolling;
};
export declare const System: {
    sleepMillis: typeof sleepMillis;
    forever: typeof forever;
    scheduleMany: typeof scheduleMany;
    waitFor: typeof waitFor;
    execAsync: typeof execAsync;
    getHeapMegabytes: typeof getHeapMegabytes;
    expandError: typeof expandError;
    runProcess: typeof runProcess;
};
export declare const Numbers: {
    sum: typeof sum;
    average: typeof average;
    clamp: typeof clamp;
    range: typeof range;
    interpolate: typeof interpolate;
    createSequence: () => {
        next: () => number;
    };
    increment: typeof increment;
    decrement: typeof decrement;
    format: typeof formatNumber;
    parseIntOrThrow: typeof parseIntOrThrow;
};
export declare const Promises: {
    raceFulfilled: typeof raceFulfilled;
    invert: typeof invertPromise;
    runInParallelBatches: typeof runInParallelBatches;
    makeAsyncQueue: typeof makeAsyncQueue;
};
export declare const Dates: {
    getAgo: typeof getAgo;
    isoDate: typeof isoDate;
    throttle: typeof throttle;
    timeSince: typeof timeSince;
    dateTimeSlug: typeof dateTimeSlug;
    unixTimestamp: typeof unixTimestamp;
    fromUtcString: typeof fromUtcString;
    getProgress: typeof getProgress;
    humanizeTime: typeof humanizeTime;
    humanizeProgress: typeof humanizeProgress;
    createTimeDigits: typeof createTimeDigits;
    mapDayNumber: typeof mapDayNumber;
    getDayInfoFromDate: typeof getDayInfoFromDate;
    getDayInfoFromDateTimeString: typeof getDayInfoFromDateTimeString;
    seconds: typeof seconds;
    minutes: typeof minutes;
    hours: typeof hours;
};
export declare const Objects: {
    safeParse: typeof safeParse;
    deleteDeep: typeof deleteDeep;
    getDeep: typeof getDeep;
    getDeepOrElse: typeof getDeepOrElse;
    setDeep: typeof setDeep;
    incrementDeep: typeof incrementDeep;
    ensureDeep: typeof ensureDeep;
    replaceDeep: typeof replaceDeep;
    getFirstDeep: typeof getFirstDeep;
    mergeDeep: typeof mergeDeep;
    mapAllAsync: typeof mapAllAsync;
    cloneWithJson: typeof cloneWithJson;
    sortObject: typeof sortObject;
    sortArray: typeof sortArray;
    sortAny: typeof sortAny;
    deepEquals: typeof deepEquals;
    runOn: typeof runOn;
    ifPresent: typeof ifPresent;
    zip: typeof zip;
    zipSum: typeof zipSum;
    removeEmptyArrays: typeof removeEmptyArrays;
    removeEmptyValues: typeof removeEmptyValues;
    flatten: typeof flatten;
    unflatten: typeof unflatten;
    match: typeof match;
    sort: typeof sortObjectValues;
    map: typeof mapObject;
    filterKeys: typeof filterObjectKeys;
    filterValues: typeof filterObjectValues;
    rethrow: typeof rethrow;
    setSomeOnObject: typeof setSomeOnObject;
    flip: typeof flip;
    getAllPermutations: typeof getAllPermutations;
    countTruthyValues: typeof countTruthyValues;
    transformToArray: typeof transformToArray;
    setMulti: typeof setMulti;
    incrementMulti: typeof incrementMulti;
    createFastIndex: typeof createFastIndex;
    pushToFastIndex: typeof pushToFastIndex;
    pushToFastIndexWithExpiracy: typeof pushToFastIndexWithExpiracy;
    getFromFastIndexWithExpiracy: typeof getFromFastIndexWithExpiracy;
};
export declare const Pagination: {
    asPageNumber: typeof asPageNumber;
    pageify: typeof pageify;
};
export declare const Files: {
    existsAsync: typeof existsAsync;
    writeJsonAsync: typeof writeJsonAsync;
    readdirDeepAsync: typeof readdirDeepAsync;
    readUtf8FileAsync: typeof readUtf8FileAsync;
    readJsonAsync: typeof readJsonAsync;
    readLinesAsync: typeof readLinesAsync;
    readMatchingLines: typeof readMatchingLines;
    readNonEmptyLines: typeof readNonEmptyLines;
    readCsv: typeof readCsv;
    walkTreeAsync: typeof walkTreeAsync;
    getFileSize: typeof getFileSize;
    asMegabytes: typeof asMegabytes;
    getDirectorySize: typeof getDirectorySize;
    convertBytes: typeof convertBytes;
    getChecksum: typeof getChecksumOfFile;
    mkdirp: typeof mkdirp;
};
export declare const Types: {
    isFunction: typeof isFunction;
    isObject: typeof isObject;
    isStrictlyObject: typeof isStrictlyObject;
    isEmptyArray: typeof isEmptyArray;
    isEmptyObject: typeof isEmptyObject;
    isUndefined: typeof isUndefined;
    isString: typeof isString;
    isNumber: typeof isNumber;
    isDate: typeof isDate;
    isBlank: typeof isBlank;
    isId: typeof isId;
    asString: typeof asString;
    asNumber: typeof asNumber;
    asDate: typeof asDate;
    asNullableString: typeof asNullableString;
    asId: typeof asId;
    asArray: typeof asArray;
    asObject: typeof asObject;
};
export declare const Strings: {
    tokenizeByCount: typeof tokenizeByCount;
    tokenizeByLength: typeof tokenizeByLength;
    randomHex: typeof randomHexString;
    randomLetter: typeof randomLetterString;
    randomAlphanumeric: typeof randomAlphanumericString;
    randomRichAscii: typeof randomRichAsciiString;
    randomUnicode: typeof randomUnicodeString;
    includesAny: typeof includesAny;
    slugify: typeof slugify;
    enumify: typeof enumify;
    escapeHtml: typeof escapeHtml;
    decodeHtmlEntities: typeof decodeHtmlEntities;
    after: typeof after;
    afterLast: typeof afterLast;
    before: typeof before;
    beforeLast: typeof beforeLast;
    between: typeof between;
    betweenWide: typeof betweenWide;
    betweenNarrow: typeof betweenNarrow;
    getPreLine: typeof getPreLine;
    containsWord: typeof containsWord;
    containsWords: typeof containsWords;
    joinUrl: typeof joinUrl;
    getFuzzyMatchScore: typeof getFuzzyMatchScore;
    sortByFuzzyScore: typeof sortByFuzzyScore;
    getChecksum: typeof getChecksum;
    splitOnce: typeof splitOnce;
    randomize: typeof randomize;
    shrinkTrim: typeof shrinkTrim;
    capitalize: typeof capitalize;
    decapitalize: typeof decapitalize;
    csvEscape: typeof csvEscape;
    parseCsv: typeof parseCsv;
    surroundInOut: typeof surroundInOut;
    getExtension: typeof getExtension;
    getBasename: typeof getBasename;
    normalizeFilename: typeof normalizeFilename;
    parseFilename: typeof parseFilename;
    camelToTitle: typeof camelToTitle;
    slugToTitle: typeof slugToTitle;
    slugToCamel: typeof slugToCamel;
    joinHumanly: typeof joinHumanly;
    findWeightedPair: typeof findWeightedPair;
    extractBlock: typeof extractBlock;
    isLetter: typeof isLetter;
    isDigit: typeof isDigit;
    isLetterOrDigit: typeof isLetterOrDigit;
    insert: typeof insertString;
};
export declare const Assertions: {
    asEqual: typeof asEqual;
    asTrue: typeof asTrue;
    asTruthy: typeof asTruthy;
    asFalse: typeof asFalse;
    asFalsy: typeof asFalsy;
    asEither: typeof asEither;
};
export declare const Cache: {
    get: typeof getCached;
};
export declare const Logger: {
    create: typeof createLogger;
    enableFileLogging: typeof enableFileLogging;
};
export {};