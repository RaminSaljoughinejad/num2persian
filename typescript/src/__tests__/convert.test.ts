import { toWords } from '../convert';

describe('Persian Numbers Converter', () => {
  test('converts zero', () => {
    expect(toWords(0)).toBe('صفر');
  });

  test('converts single digits', () => {
    expect(toWords(1)).toBe('یک');
    expect(toWords(5)).toBe('پنج');
    expect(toWords(9)).toBe('نه');
  });

  test('converts teens', () => {
    expect(toWords(10)).toBe('ده');
    expect(toWords(15)).toBe('پانزده');
    expect(toWords(19)).toBe('نوزده');
  });

  test('converts compound numbers', () => {
    expect(toWords(21)).toBe('بیست و یک');
    expect(toWords(42)).toBe('چهل و دو');
    expect(toWords(123)).toBe('یکصد و بیست و سه');
  });

  test('converts thousands', () => {
    expect(toWords(1000)).toBe('یک هزار');
    expect(toWords(10000)).toBe('ده هزار');
  });

  test('converts negative numbers', () => {
    expect(toWords(-42)).toBe('منفی چهل و دو');
    expect(toWords(-123)).toBe('منفی یکصد و بیست و سه');
  });

  test('handles string inputs', () => {
    expect(toWords('42')).toBe('چهل و دو');
    expect(toWords('  123  ')).toBe('یکصد و بیست و سه');
  });

  test('rejects invalid inputs', () => {
    expect(() => toWords('abc')).toThrow('Invalid input');
    expect(() => toWords(12.5)).toThrow('Float numbers with fractional parts are not supported');
    expect(() => toWords(null as any)).toThrow('Input must be a number or integer-convertible string');
  });
});
