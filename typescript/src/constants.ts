/**
 * Persian number to words constants
 * Contains all Persian language mappings for number conversion
 */

export const ONES: readonly string[] = [
  "", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"
];

export const TENS: readonly string[] = [
  "", "ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"
];

export const TEENS: readonly string[] = [
  "ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", 
  "شانزده", "هفده", "هجده", "نوزده"
];

export const HUNDREDS: readonly string[] = [
  "", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", 
  "ششصد", "هفتصد", "هشتصد", "نهصد"
];

export const THOUSANDS_UNITS: readonly string[] = [
  "", "هزار", "میلیون", "میلیارد", "تریلیون", "کوادریلیون",
  "کوانتیلیون", "سکستیلیون", "سپتیلیون", "اکتیلیون",
  "نونیلیون", "دسیلیون", "اندسیلیون", "دودسیلیون",
  "تردسیلیون", "کوادردسیلیون", "کوانتدسیلیون"
];

export const ZERO = "صفر";
export const NEGATIVE_PREFIX = "منفی";
export const SEPARATOR = " و ";

export const DECIMAL_SEPARATOR = "ممیز";

export const DECIMAL_SUFFIX: readonly string[] = [
  "",         // 0 decimal places (not used)
  "دهم",      // 1 decimal place (0.1)
  "صدم",      // 2 decimal places (0.01)
  "هزارم",    // 3 decimal places (0.001)
  "ده‌هزارم",  // 4 decimal places (0.0001)
  "صدهزارم",   // 5 decimal places (0.00001)
  "میلیونیم",  // 6 decimal places (0.000001)
];
