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
