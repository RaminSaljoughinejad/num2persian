/**
 * Persian number to words converter
 */

import {
  ONES,
  TENS,
  TEENS,
  HUNDREDS,
  THOUSANDS_UNITS,
  ZERO,
  NEGATIVE_PREFIX,
  SEPARATOR
} from './constants.js';

/**
 * Options for number-to-words conversion
 * Reserved for future extensions (e.g., ordinal numbers, currency)
 */
export interface ToWordsOptions {
  // Reserved for future use
}

/**
 * Normalizes input to a valid integer
 * @param input - Number or string to normalize
 * @returns Normalized integer value
 * @throws {TypeError} If input type is invalid (null, undefined, object, etc.)
 * @throws {RangeError} If input is not an integer or cannot be parsed
 * @internal
 */
function normalizeInput(input: number | string): number {
  // Check for null or undefined explicitly
  if (input === null || input === undefined) {
    throw new TypeError(`Input must be a number or string, got ${input}`);
  }

  if (typeof input === 'number') {
    if (!Number.isInteger(input)) {
      throw new RangeError(`Float numbers with fractional parts are not supported: ${input}`);
    }
    return input;
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    const parsed = Number(trimmed);
    
    if (isNaN(parsed) || !Number.isInteger(parsed)) {
      throw new RangeError(`Cannot convert string to integer: '${input}'`);
    }
    
    return parsed;
  }

  throw new TypeError(`Input must be a number or string, got ${typeof input}: ${input}`);
}

/**
 * Converts a 3-digit number (0-999) to Persian words
 * @param num - Number between 0 and 999
 * @returns Persian word representation
 * @internal
 */
function threeDigitsToWords(num: number): string {
  if (num === 0) {
    return "";
  }

  if (num < 0 || num > 999) {
    throw new Error(`Number must be between 0 and 999, got ${num}`);
  }

  const parts: string[] = [];
  const h = Math.floor(num / 100);
  const t = Math.floor((num % 100) / 10);
  const o = num % 10;

  // Handle hundreds place
  if (h > 0) {
    parts.push(HUNDREDS[h]);
  }

  // Handle tens and ones
  if (t === 1) {
    // Special case for teens (10-19)
    parts.push(TEENS[o]);
  } else {
    if (t > 0) {
      parts.push(TENS[t]);
    }
    if (o > 0) {
      parts.push(ONES[o]);
    }
  }

  // Join with Persian "and" (و) - filter out empty parts
  return parts.filter(p => p).join(SEPARATOR);
}

/**
 * Converts a number to Persian words
 * 
 * @param input - Number or numeric string to convert
 * @param options - Conversion options (reserved for future use)
 * @returns Persian word representation of the number
 * @throws {TypeError} If input is not a number or numeric string
 * @throws {RangeError} If input is a float with fractional parts
 * 
 * @example
 * ```typescript
 * toWords(0)           // "صفر"
 * toWords(123)         // "یکصد و بیست و سه"
 * toWords(-456)        // "منفی چهارصد و پنجاه و شش"
 * toWords("789")       // "هفتصد و هشتاد و نه"
 * toWords(1000)        // "یک هزار"
 * toWords(1000000)     // "یک میلیون"
 * toWords(1000000000)  // "یک میلیارد"
 * ```
 */
export function toWords(input: number | string, options?: ToWordsOptions): string {
  let num: number;

  try {
    num = normalizeInput(input);
  } catch (error) {
    throw error;
  }

  // Handle zero
  if (num === 0) {
    return ZERO;
  }

  // Handle negative numbers
  const isNegative = num < 0;
  if (isNegative) {
    num = -num;
  }

  // Convert to string and split into 3-digit chunks
  const numStr = num.toString();
  const chunks: string[] = [];

  for (let i = numStr.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    chunks.unshift(numStr.slice(start, i));
  }

  const parts: string[] = [];

  // Process each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunkVal = parseInt(chunks[i], 10);
    
    if (chunkVal > 0) {
      let part = threeDigitsToWords(chunkVal);
      const unitIndex = chunks.length - i - 1;

      let unit: string;
      if (unitIndex < THOUSANDS_UNITS.length) {
        unit = THOUSANDS_UNITS[unitIndex];
      } else {
        // Scientific notation fallback for very large numbers
        unit = `۱۰^${unitIndex * 3}`;
      }

      if (unit) {
        part = `${part} ${unit}`;
      }
      
      parts.push(part);
    }
  }

  let result = parts.join(SEPARATOR);

  // Add negative prefix if needed
  if (isNegative) {
    result = `${NEGATIVE_PREFIX} ${result}`;
  }

  return result;
}
