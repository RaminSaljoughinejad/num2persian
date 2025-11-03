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
  SEPARATOR,
  DECIMAL_SEPARATOR,
  DECIMAL_SUFFIX
} from './constants.js';

/**
 * Options for number-to-words conversion
 * Reserved for future extensions (e.g., ordinal numbers, currency)
 */
export interface ToWordsOptions {
  // Reserved for future use
}

/**
 * Normalizes input to a valid number
 * @param input - Number or string to normalize
 * @returns Normalized number value (integer or decimal)
 * @throws {TypeError} If input type is invalid (null, undefined, object, etc.)
 * @throws {RangeError} If input cannot be parsed or is not finite
 * @internal
 */
function normalizeInput(input: number | string): number {
  // Check for null or undefined explicitly
  if (input === null || input === undefined) {
    throw new TypeError(`Input must be a number or string, got ${input}`);
  }

  if (typeof input === 'number') {
    if (!Number.isFinite(input)) {
      throw new RangeError(`Number must be finite: ${input}`);
    }
    return input;
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    const parsed = Number(trimmed);
    
    if (isNaN(parsed) || !Number.isFinite(parsed)) {
      throw new RangeError(`Cannot convert string to number: '${input}'`);
    }
    
    return parsed;
  }

  throw new TypeError(`Input must be a number or string, got ${typeof input}: ${input}`);
}

/**
 * Splits a decimal number into integer and decimal parts
 * @param num - Positive decimal number
 * @returns Object with integer part and decimal info
 * @internal
 */
function splitDecimal(num: number): {
  integerPart: number;
  decimalPart: { str: string; places: number };
} {
  const numStr = num.toString();
  const parts = numStr.split('.');
  
  const integerPart = parseInt(parts[0], 10);
  
  if (parts.length === 1) {
    // No decimal part
    return {
      integerPart,
      decimalPart: { str: '', places: 0 }
    };
  }
  
  const decimalStr = parts[1];
  return {
    integerPart,
    decimalPart: {
      str: decimalStr,
      places: decimalStr.length
    }
  };
}

/**
 * Converts decimal part to Persian words
 * @param decimalStr - String representation of decimal digits (e.g., "14" from 3.14)
 * @param decimalPlaces - Number of decimal places
 * @returns Persian word representation with appropriate suffix
 * @internal
 */
function convertDecimalToWords(decimalStr: string, decimalPlaces: number): string {
  // Parse decimal string as integer
  const decimalNum = parseInt(decimalStr, 10);
  
  // Convert to Persian words using existing logic
  let words = '';
  
  if (decimalNum === 0) {
    words = ZERO;
  } else {
    // Convert to string and split into 3-digit chunks
    const numStr = decimalNum.toString();
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

    words = parts.join(SEPARATOR);
  }
  
  // Get appropriate suffix
  let suffix: string;
  if (decimalPlaces < DECIMAL_SUFFIX.length) {
    suffix = DECIMAL_SUFFIX[decimalPlaces];
  } else {
    // Scientific notation fallback for very large decimal places
    suffix = `۱۰^-${decimalPlaces}`;
  }
  
  return `${words} ${suffix}`;
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
 * Converts an integer to Persian words (internal helper)
 * @param num - Positive integer to convert
 * @returns Persian word representation
 * @internal
 */
function convertIntegerToWords(num: number): string {
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

  return parts.join(SEPARATOR);
}

/**
 * Converts a number to Persian words
 * 
 * @param input - Number or numeric string to convert
 * @param options - Conversion options (reserved for future use)
 * @returns Persian word representation of the number
 * @throws {TypeError} If input is not a number or numeric string
 * @throws {RangeError} If input cannot be parsed or is not finite
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
 * toWords(3.14)        // "سه ممیز چهارده صدم"
 * toWords(0.5)         // "صفر ممیز پنج دهم"
 * toWords(-3.14)       // "منفی سه ممیز چهارده صدم"
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

  // Check if number has decimal part
  const hasDecimal = !Number.isInteger(num);
  
  if (!hasDecimal) {
    // Integer path (existing logic)
    let result = convertIntegerToWords(num);
    
    // Add negative prefix if needed
    if (isNegative) {
      result = `${NEGATIVE_PREFIX} ${result}`;
    }
    
    return result;
  }
  
  // Decimal path (new logic)
  const { integerPart, decimalPart } = splitDecimal(num);
  
  // Convert integer part
  let result = integerPart === 0 ? ZERO : convertIntegerToWords(integerPart);
  
  // Convert decimal part
  const decimalWords = convertDecimalToWords(decimalPart.str, decimalPart.places);
  
  // Combine with separator
  result = `${result} ${DECIMAL_SEPARATOR} ${decimalWords}`;
  
  // Apply negative prefix
  if (isNegative) {
    result = `${NEGATIVE_PREFIX} ${result}`;
  }
  
  return result;
}
