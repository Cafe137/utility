declare type Indexable = number | string;
declare type CafeObject<T = unknown> = Record<string, T>;
declare function invertPromise<T>(promise: Promise<T>): Promise<unknown>;
declare function raceFulfilled<T>(promises: Promise<T>[]): Promise<unknown>;
declare function runInParallelBatches<T>(promises: (() => Promise<T>)[], concurrency?: number): Promise<T[]>;
declare function sleepMillis(millis: number): Promise<unknown>;
declare function shuffle<T>(array: T[], generator?: () => number): T[];
declare function onlyOrThrow<T>(array: T[]): T;
declare function onlyOrNull<T>(array: T[]): T | null;
declare function firstOrNull<T>(array: T[]): T | null;
declare function initializeArray<T>(count: number, initializer: (index: number) => T): T[];
declare function rotate2DArray<T>(array: T[][]): T[][];
declare function initialize2DArray<T>(width: number, height: number, initialValue: T): T[][];
declare function containsShape<T>(array2D: T[][], shape: T[][], x: number, y: number): boolean;
declare function pickRandomIndices<T>(array: T[], count: number, generator?: () => number): number[];
declare function pluck<T, K extends keyof T>(array: T[], key: K): T[K][];
declare function makeSeededRng(seed: number): () => number;
declare function intBetween(min: number, max: number, generator?: () => number): number;
declare function floatBetween(min: number, max: number, generator?: () => number): number;
declare function signedRandom(): number;
declare function chance(threshold: number, generator?: () => number): boolean;
declare function pick<T>(array: T[], generator?: () => number): T;
declare function pickMany<T>(array: T[], count: number, generator?: () => number): T[];
declare function pickManyUnique<T>(array: T[], count: number, equalityFunction: (a: T, b: T) => boolean, generator?: () => number): T[];
declare function pickGuaranteed<T>(array: T[], include: T | null, exclude: T | null, count: number, predicate: (value: T, values: T[]) => boolean, generator?: () => number): {
    values: T[];
    indexOfGuaranteed: number;
};
declare function last<T>(array: T[]): T;
declare function pickWeighted<T>(array: T[], weights: number[], randomNumber?: number): T;
declare function sortWeighted<T>(array: T[], weights: number[], generator?: () => number): T[];
declare function getDeep(object: CafeObject, path: string): unknown;
declare function getDeepOrElse(object: CafeObject, path: string, fallback: unknown): unknown;
declare function setDeep<T>(object: CafeObject, path: string, value: T): T;
declare function incrementDeep(object: CafeObject, path: string, amount?: number): number;
declare function ensureDeep(object: CafeObject, path: string, value: unknown): unknown;
declare function deleteDeep(object: CafeObject, path: string): void;
declare function replaceDeep(object: CafeObject, path: string, value: unknown): unknown;
declare function getFirstDeep(object: CafeObject, paths: string[], fallbackToAnyKey?: boolean): unknown;
declare function forever(callable: (() => Promise<void>) | (() => void), millis: number, log?: (message: string, metadata: object) => void): Promise<never>;
declare function asMegabytes(number: number): number;
declare function convertBytes(bytes: number): string;
declare function hexToRgb(hex: string): [number, number, number];
declare function rgbToHex(rgb: [number, number, number]): string;
declare function isObject(value: any): value is object;
declare function isStrictlyObject(value: any): value is object;
declare function isEmptyArray(value: any): boolean;
declare function isEmptyObject(value: any): boolean;
declare function isUndefined(value: any): value is undefined;
declare function isFunction(value: any): value is Function;
declare function isString(value: any): value is string;
declare function isNumber(value: any): value is number;
declare function isBoolean(value: any): value is boolean;
declare function isDate(value: any): value is Date;
declare function isBlank(value: any): boolean;
declare function isId(value: any): value is number;
declare function randomLetterString(length: number, generator?: () => number): string;
declare function randomAlphanumericString(length: number, generator?: () => number): string;
declare function randomRichAsciiString(length: number, generator?: () => number): string;
declare function randomUnicodeString(length: number, generator?: () => number): string;
declare function randomHexString(length: number, generator?: () => number): string;
declare function asString(string: any): string;
declare function asNumber(number: any): number;
declare function asBoolean(bool: any): boolean;
declare function asDate(date: any): Date;
declare function asNullableString(string: any): string | null;
declare function asEmptiableString(string: any): string;
declare function asId(value: any): number;
declare function asTime(value: any): string;
declare function asArray(value: any): unknown[];
declare function asObject(value: any): Record<string, unknown>;
declare function represent(value: any, strategy?: 'json' | 'key-value', depth?: number): string;
declare function expandError(error: any, stackTrace?: boolean): string;
declare function deepMergeInPlace<X extends object, Y extends object>(target: X, source: Y): X & Y;
declare function deepMerge2<X extends object, Y extends object>(target: X, source: Y): X & Y;
declare function deepMerge3<X extends object, Y extends object, Z extends object>(target: X, sourceA: Y, sourceB: Z): X & Y & Z;
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
declare function median(array: number[]): number;
declare function range(start: number, end: number): number[];
declare function includesAny(string: string, substrings: string[]): boolean;
declare function isChinese(string: string): boolean;
declare function slugify(string: string, shouldAllowToken?: (character: string) => boolean): string;
declare function camelToTitle(string: string): string;
declare function slugToTitle(string: string): string;
declare function slugToCamel(string: string): string;
declare function joinHumanly(parts: string[], separator?: string, lastSeparator?: string): string;
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
declare function betweenWide(string: string, start: string, end: string): string;
declare function betweenNarrow(string: string, start: string, end: string): string;
declare function splitOnce(string: string, separator: string, last?: boolean): [string | null, string | null];
declare function getExtension(path: string): string;
declare function getBasename(path: string): string;
declare function normalizeFilename(path: string): string;
interface ParsedFilename {
    basename: string;
    extension: string;
    filename: string;
}
declare function parseFilename(string: string): ParsedFilename;
declare function randomize(string: string, generator?: () => number): string;
declare function expand(input: string): string[];
declare function shrinkTrim(string: string): string;
declare function capitalize(string: string): string;
declare function decapitalize(string: string): string;
declare function isLetter(character: string): boolean;
declare function isDigit(character: string): boolean;
declare function isLetterOrDigit(character: string): boolean;
declare function isValidObjectPathCharacter(character: string): boolean;
declare function insertString(string: string, index: number, length: number, before: string, after: string): string;
interface RegexMatch {
    index: number;
    match: string;
}
declare function indexOfRegex(string: string, regex: RegExp, start?: number): RegexMatch | null;
declare function lineMatches(haystack: string, needles: (string | RegExp)[], orderMatters?: boolean): boolean;
declare function linesMatchInOrder(lines: string[], expectations: (string | RegExp)[][], orderMatters?: boolean): boolean;
declare function csvEscape(string: string): string;
declare function indexOfEarliest(string: string, searchStrings: string[], start?: number): number;
declare function lastIndexOfBefore(string: string, searchString: string, start?: number): number;
declare function findWeightedPair(string: string, start?: number, opening?: string, closing?: string): number;
interface BlockExtractionOptions {
    start?: number;
    opening: string;
    closing: string;
    exclusive?: boolean;
    wordBoundary?: boolean;
}
declare function extractBlock(string: string, options: BlockExtractionOptions): string | null;
declare function extractAllBlocks(string: string, options: BlockExtractionOptions): string[];
declare type StringSegment = {
    symbol: string | null;
    string: string;
};
declare function segmentizeString(string: string, symbol: string): StringSegment[];
declare function base64ToUint8Array(base64: string): Uint8Array;
declare function uint8ArrayToBase64(array: Uint8Array): string;
declare function hexToUint8Array(hex: string): Uint8Array;
declare function uint8ArrayToHex(array: Uint8Array): string;
declare function route(pattern: string, actual: string): Record<string, unknown> | null;
declare type VariantGroup = {
    variants: string[];
    avoid: string | null;
};
declare function explodeReplace(string: string, substring: string, variants: string[]): string[];
declare function generateVariants(string: string, groups: VariantGroup[], count: number, generator?: () => number): string[];
declare function hashCode(string: string): number;
declare function replaceWord(string: string, search: string, replace: string): string;
declare function containsWord(string: string, word: string): boolean;
declare function containsWords(string: string, words: string[], mode: 'any' | 'all'): boolean;
declare function parseHtmlAttributes(string: string): Record<string, string>;
declare function readNextWord(string: string, index: number, allowedCharacters?: string[]): string;
declare function resolveVariables(string: string, variables: Record<string, string>, prefix?: string, separator?: string): string;
declare function resolveVariableWithDefaultSyntax(string: string, key: string, value: string, prefix?: string, separator?: string): string;
declare function resolveRemainingVariablesWithDefaults(string: string, prefix?: string, separator?: string): string;
declare function resolveMarkdownLinks(string: string, transformer: (label: string, link: string) => string): string;
declare function toQueryString(object: Record<string, any>, questionMark?: boolean): string;
declare function hasKey(object: Record<string, any>, key: string): boolean;
declare function buildUrl(baseUrl?: string | null, path?: string | null, query?: Record<string, any> | null): string;
declare function parseCsv(string: string, delimiter?: string, quote?: string): string[];
declare function humanizeProgress(state: Progress): string;
declare function waitFor(predicate: () => Promise<boolean>, waitLength: number, maxWaits: number): Promise<boolean>;
declare function filterAndRemove<T>(array: T[], predicate: (item: T) => boolean): T[];
declare function cloneWithJson<T>(a: T): T;
declare function unixTimestamp(optionalTimestamp?: number): number;
declare function isoDate(optionalDate?: Date): string;
declare function dateTimeSlug(optionalDate?: Date): string;
declare function fromUtcString(string: string): Date;
declare function fromMillis(millis: number): Date;
declare function createTimeDigits(value: number): string;
declare function humanizeTime(millis: number): string;
declare function getAgo(date: Date, now?: number): string;
declare function getAgoStructured(dateOrTimestamp: Date | number, now?: number): {
    value: number;
    unit: string;
};
declare type CountCyclesOptions = {
    precision?: number;
    now?: number;
};
declare function countCycles(since: number, cycleLength: number, options?: CountCyclesOptions): {
    cycles: number;
    remaining: number;
};
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
declare function makeDate(numberWithUnit: string): number;
declare function getPreLine(string: string): string;
declare function getCached<T>(key: string, ttlMillis: number, handler: () => Promise<T>): Promise<T>;
declare function joinUrl(...parts: unknown[]): string;
declare function replaceBetweenStrings(string: string, start: string, end: string, replacement: string, keepBoundaries?: boolean): string;
declare type MarkdownDescription = {
    type: 'p' | 'h1' | 'li';
    isCapitalized: boolean;
    hasPunctuation: boolean;
    endsWithColon: boolean;
};
declare function describeMarkdown(string: string): MarkdownDescription;
declare function isBalanced(string: string, opening?: string, closing?: string): boolean;
declare function textToFormat(text: string): string;
declare function sortObject<T>(object: CafeObject<T>): CafeObject<T>;
declare function sortArray<T>(array: T[]): T[];
declare function sortAny(any: unknown): unknown;
declare function deepEquals(a: unknown, b: unknown): boolean;
declare function deepEqualsEvery(...values: unknown[]): boolean;
declare function safeParse(stringable: string): CafeObject | null;
declare function createSequence(): {
    next: () => number;
};
declare function createOscillator<T>(values: T[]): {
    next: () => T;
};
declare function createStatefulToggle(desiredValue: unknown): (value: unknown) => boolean;
declare function organiseWithLimits<T>(items: T[], limits: Record<string, number>, property: keyof T, defaultValue: string, sortFn?: (a: T, b: T) => number): Record<string, T[]>;
declare function diffKeys(objectA: CafeObject, objectB: CafeObject): {
    uniqueToA: string[];
    uniqueToB: string[];
};
declare function pickRandomKey(object: CafeObject): string;
declare function mapRandomKey<T>(object: CafeObject<T>, mapFunction: (value: T) => T): string;
declare function fromObjectString<T>(string: string): T;
interface NumberFormatOptions {
    precision?: number;
    longForm?: boolean;
    unit?: null | string;
}
declare function formatNumber(number: number, options?: NumberFormatOptions): string;
declare function makeNumber(numberWithUnit: string): number;
declare function parseIntOrThrow(numberOrString: any): number;
declare function clamp(value: number, lower: number, upper: number): number;
declare function increment(value: number, change: number, maximum: number): number;
declare function decrement(value: number, change: number, minimum: number): number;
declare function runOn<T>(object: T, callable: (object: T) => void): T;
declare function ifPresent<T>(object: T, callable: (object: T) => void): void;
declare function mergeArrays(target: CafeObject<unknown | unknown[]>, source: CafeObject<unknown | unknown[]>): void;
declare function empty<T>(array: T[]): T[];
declare function removeEmptyArrays(object: CafeObject): CafeObject;
declare function removeEmptyValues(object: CafeObject): CafeObject;
declare function filterObjectKeys<T>(object: CafeObject<T>, predicate: (key: string) => boolean): CafeObject<T>;
declare function filterObjectValues<T>(object: CafeObject<T>, predicate: (value: T) => boolean): CafeObject<T>;
declare function mapObject<T, K>(object: CafeObject<T>, mapper: (value: T) => K): CafeObject<K>;
declare function rethrow<T>(asyncFn: () => Promise<T>, throwable: Error): Promise<T>;
declare function setSomeOnObject(object: CafeObject, key: string, value: unknown): void;
declare function setSomeDeep(target: CafeObject, targetPath: string, source: CafeObject, sourcePath: string): void;
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
declare function transformToArray(objectOfArrays: CafeObject<unknown[]>): CafeObject[];
declare function incrementMulti<T>(objects: T[], key: keyof T, step?: number): void;
declare function setMulti<T, K extends keyof T>(objects: T[], key: K, value: T[K]): void;
declare function group<T>(array: T[], groupFn: (current: T, previous: T) => boolean): T[][];
interface FastIndex<T> {
    index: CafeObject<T>;
    keys: string[];
}
declare function createFastIndex<T>(): FastIndex<T>;
declare function pushToFastIndex<T>(object: FastIndex<T>, key: string, item: T, limit?: number): void;
declare function pushToFastIndexWithExpiracy<T>(object: FastIndex<T>, key: string, item: T, expiration: number, limit?: number): void;
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
declare type Playbook<T> = {
    ttl: number;
    ttlMax?: number;
    data: T;
}[];
declare function tickPlaybook<T>(playbook: Playbook<T>): {
    progress: number;
    data: T;
} | null;
declare function getArgument(args: string[], key: string, env?: Record<string, string>, envKey?: string): string | null;
declare function getNumberArgument(args: string[], key: string, env?: Record<string, string>, envKey?: string): number | null;
declare function getBooleanArgument(args: string[], key: string, env?: Record<string, string>, envKey?: string): boolean | null;
declare function requireStringArgument(args: string[], key: string, env?: Record<string, string>, envKey?: string): string;
declare function requireNumberArgument(args: string[], key: string, env?: Record<string, string>, envKey?: string): number;
declare function bringToFrontInPlace<T>(array: T[], index: number): void;
declare function bringToFront<T>(array: T[], index: number): T[];
declare type Point = {
    x: number;
    y: number;
};
declare type Line = {
    start: Point;
    end: Point;
};
declare type Truthy = boolean | number;
declare function addPoint(a: Point, b: Point): Point;
declare function subtractPoint(a: Point, b: Point): Point;
declare function multiplyPoint(point: Point, scalar: number): Point;
declare function normalizePoint(point: Point): Point;
declare function pushPoint(point: Point, angle: number, length: number): Point;
declare function filterCoordinates(grid: Truthy[][], predicate: (x: number, y: number) => boolean, direction?: 'row-first' | 'column-first'): Point[];
declare function findCorners(tiles: Truthy[][], tileSize: number, columns: number, rows: number): Point[];
declare function findLines(grid: Truthy[][], tileSize: number): Line[];
declare function getLineIntersectionPoint(line1Start: Point, line1End: Point, line2Start: Point, line2End: Point): Point | null;
declare function raycast(origin: Point, lines: Line[], angle: number): Point | null;
declare function raycastCircle(origin: Point, lines: Line[], corners: Point[]): Point[];
export declare const Random: {
    intBetween: typeof intBetween;
    floatBetween: typeof floatBetween;
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
    initialize: typeof initializeArray;
    initialize2D: typeof initialize2DArray;
    rotate2D: typeof rotate2DArray;
    containsShape: typeof containsShape;
    glue: typeof glue;
    pluck: typeof pluck;
    pick: typeof pick;
    pickMany: typeof pickMany;
    pickManyUnique: typeof pickManyUnique;
    pickWeighted: typeof pickWeighted;
    pickRandomIndices: typeof pickRandomIndices;
    pickGuaranteed: typeof pickGuaranteed;
    last: typeof last;
    sortWeighted: typeof sortWeighted;
    pushAll: typeof pushAll;
    unshiftAll: typeof unshiftAll;
    filterAndRemove: typeof filterAndRemove;
    merge: typeof mergeArrays;
    empty: typeof empty;
    pushToBucket: typeof pushToBucket;
    unshiftAndLimit: typeof unshiftAndLimit;
    atRolling: typeof atRolling;
    group: typeof group;
    createOscillator: typeof createOscillator;
    organiseWithLimits: typeof organiseWithLimits;
    tickPlaybook: typeof tickPlaybook;
    getArgument: typeof getArgument;
    getBooleanArgument: typeof getBooleanArgument;
    getNumberArgument: typeof getNumberArgument;
    requireStringArgument: typeof requireStringArgument;
    requireNumberArgument: typeof requireNumberArgument;
    bringToFront: typeof bringToFront;
    bringToFrontInPlace: typeof bringToFrontInPlace;
};
export declare const System: {
    sleepMillis: typeof sleepMillis;
    forever: typeof forever;
    scheduleMany: typeof scheduleMany;
    waitFor: typeof waitFor;
    expandError: typeof expandError;
};
export declare const Numbers: {
    make: typeof makeNumber;
    sum: typeof sum;
    average: typeof average;
    median: typeof median;
    clamp: typeof clamp;
    range: typeof range;
    interpolate: typeof interpolate;
    createSequence: typeof createSequence;
    increment: typeof increment;
    decrement: typeof decrement;
    format: typeof formatNumber;
    parseIntOrThrow: typeof parseIntOrThrow;
    asMegabytes: typeof asMegabytes;
    convertBytes: typeof convertBytes;
    hexToRgb: typeof hexToRgb;
    rgbToHex: typeof rgbToHex;
};
export declare const Promises: {
    raceFulfilled: typeof raceFulfilled;
    invert: typeof invertPromise;
    runInParallelBatches: typeof runInParallelBatches;
    makeAsyncQueue: typeof makeAsyncQueue;
};
export declare const Dates: {
    getAgo: typeof getAgo;
    getAgoStructured: typeof getAgoStructured;
    countCycles: typeof countCycles;
    isoDate: typeof isoDate;
    throttle: typeof throttle;
    timeSince: typeof timeSince;
    dateTimeSlug: typeof dateTimeSlug;
    unixTimestamp: typeof unixTimestamp;
    fromUtcString: typeof fromUtcString;
    fromMillis: typeof fromMillis;
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
    make: typeof makeDate;
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
    deepMergeInPlace: typeof deepMergeInPlace;
    deepMerge2: typeof deepMerge2;
    deepMerge3: typeof deepMerge3;
    mapAllAsync: typeof mapAllAsync;
    cloneWithJson: typeof cloneWithJson;
    sortObject: typeof sortObject;
    sortArray: typeof sortArray;
    sortAny: typeof sortAny;
    deepEquals: typeof deepEquals;
    deepEqualsEvery: typeof deepEqualsEvery;
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
    setSomeDeep: typeof setSomeDeep;
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
    createStatefulToggle: typeof createStatefulToggle;
    diffKeys: typeof diffKeys;
    pickRandomKey: typeof pickRandomKey;
    mapRandomKey: typeof mapRandomKey;
    fromObjectString: typeof fromObjectString;
    toQueryString: typeof toQueryString;
    hasKey: typeof hasKey;
};
export declare const Pagination: {
    asPageNumber: typeof asPageNumber;
    pageify: typeof pageify;
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
    isBoolean: typeof isBoolean;
    isDate: typeof isDate;
    isBlank: typeof isBlank;
    isId: typeof isId;
    asString: typeof asString;
    asNumber: typeof asNumber;
    asBoolean: typeof asBoolean;
    asDate: typeof asDate;
    asNullableString: typeof asNullableString;
    asEmptiableString: typeof asEmptiableString;
    asId: typeof asId;
    asTime: typeof asTime;
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
    betweenWide: typeof betweenWide;
    betweenNarrow: typeof betweenNarrow;
    getPreLine: typeof getPreLine;
    containsWord: typeof containsWord;
    containsWords: typeof containsWords;
    joinUrl: typeof joinUrl;
    getFuzzyMatchScore: typeof getFuzzyMatchScore;
    sortByFuzzyScore: typeof sortByFuzzyScore;
    splitOnce: typeof splitOnce;
    randomize: typeof randomize;
    expand: typeof expand;
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
    extractAllBlocks: typeof extractAllBlocks;
    indexOfEarliest: typeof indexOfEarliest;
    lastIndexOfBefore: typeof lastIndexOfBefore;
    parseHtmlAttributes: typeof parseHtmlAttributes;
    readNextWord: typeof readNextWord;
    resolveVariables: typeof resolveVariables;
    resolveVariableWithDefaultSyntax: typeof resolveVariableWithDefaultSyntax;
    resolveRemainingVariablesWithDefaults: typeof resolveRemainingVariablesWithDefaults;
    isLetter: typeof isLetter;
    isDigit: typeof isDigit;
    isLetterOrDigit: typeof isLetterOrDigit;
    isValidObjectPathCharacter: typeof isValidObjectPathCharacter;
    insert: typeof insertString;
    indexOfRegex: typeof indexOfRegex;
    lineMatches: typeof lineMatches;
    linesMatchInOrder: typeof linesMatchInOrder;
    represent: typeof represent;
    resolveMarkdownLinks: typeof resolveMarkdownLinks;
    buildUrl: typeof buildUrl;
    isChinese: typeof isChinese;
    replaceBetweenStrings: typeof replaceBetweenStrings;
    describeMarkdown: typeof describeMarkdown;
    isBalanced: typeof isBalanced;
    textToFormat: typeof textToFormat;
    segmentize: typeof segmentizeString;
    hexToUint8Array: typeof hexToUint8Array;
    uint8ArrayToHex: typeof uint8ArrayToHex;
    base64ToUint8Array: typeof base64ToUint8Array;
    uint8ArrayToBase64: typeof uint8ArrayToBase64;
    route: typeof route;
    explodeReplace: typeof explodeReplace;
    generateVariants: typeof generateVariants;
    hashCode: typeof hashCode;
    replaceWord: typeof replaceWord;
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
export declare const Vector: {
    addPoint: typeof addPoint;
    subtractPoint: typeof subtractPoint;
    multiplyPoint: typeof multiplyPoint;
    normalizePoint: typeof normalizePoint;
    pushPoint: typeof pushPoint;
    filterCoordinates: typeof filterCoordinates;
    findCorners: typeof findCorners;
    findLines: typeof findLines;
    raycast: typeof raycast;
    raycastCircle: typeof raycastCircle;
    getLineIntersectionPoint: typeof getLineIntersectionPoint;
};
export {};
