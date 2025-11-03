/**
 * Persian number to words converter - TypeScript implementation
 */

// Persian number mappings
const ONES = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
const TENS = ["", "ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
const TEENS = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
const HUNDREDS = ["", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];

// Units for thousands, millions, etc.
const THOUSANDS_UNITS = [
  "", "هزار", "میلیون", "میلیارد", "تریلیون", "کوادریلیون",
  "کوانتیلیون", "سکستیلیون", "سپتیلیون", "اکتیلیون",
  "نونیلیون", "دسیلیون", "اندسیلیون", "دودسیلیون",
  "تردسیلیون", "کوادردسیلیون", "کوانتدسیلیون"
];

/**
 * Normalize input to integer, rejecting floats with fractional parts.
 */
function normalizeInput(number: number | string): number {
  if (typeof number === 'number') {
    if (!Number.isInteger(number)) {
      throw new Error(`Float numbers with fractional parts are not supported: ${number}`);
    }
    return number;
  }

  if (typeof number === 'string') {
    const trimmed = number.trim();
    const parsed = Number(trimmed);
    if (isNaN(parsed) || !Number.isInteger(parsed)) {
      throw new Error(`Cannot convert string to integer: '${number}'`);
    }
    return parsed;
  }

  throw new Error(`Input must be a number or integer-convertible string, got ${typeof number}: ${number}`);
}

/**
 * Convert a 3-digit number (0-999) to Persian words.
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

  if (h > 0) {
    parts.push(HUNDREDS[h]);
  }

  if (t === 1) {
    parts.push(TEENS[o]);
  } else {
    if (t > 0) {
      parts.push(TENS[t]);
    }
    if (o > 0) {
      parts.push(ONES[o]);
    }
  }

  // Join with Persian "and" (و) - avoid empty parts
  return parts.filter(p => p).join(" و ");
}

/**
 * Convert a number to Persian words.
 */
export function toWords(number: number | string): string {
  let num: number;

  try {
    num = normalizeInput(number);
  } catch (error) {
    throw new Error(`Invalid input: ${(error as Error).message}`);
  }

  if (num === 0) {
    return "صفر";
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

  let result = parts.join(" و ");

  // Add negative prefix if needed
  if (isNegative) {
    result = `منفی ${result}`;
  }

  return result;
}
