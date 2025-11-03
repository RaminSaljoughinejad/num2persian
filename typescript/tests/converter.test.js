/**
 * Tests for Persian Number to Words Converter
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toWords } from '../dist/index.js';


describe('Persian Number to Words Converter', () => {
  describe('Zero and Basic Numbers', () => {
    it('should convert 0 to صفر', () => {
      assert.strictEqual(toWords(0), 'صفر');
    });

    it('should convert single digit numbers', () => {
      assert.strictEqual(toWords(1), 'یک');
      assert.strictEqual(toWords(5), 'پنج');
      assert.strictEqual(toWords(9), 'نه');
    });

    it('should convert double digit numbers', () => {
      assert.strictEqual(toWords(10), 'ده');
      assert.strictEqual(toWords(15), 'پانزده');
      assert.strictEqual(toWords(42), 'چهل و دو');
      assert.strictEqual(toWords(99), 'نود و نه');
    });

    it('should convert three digit numbers', () => {
      assert.strictEqual(toWords(100), 'یکصد');
      assert.strictEqual(toWords(123), 'یکصد و بیست و سه');
      assert.strictEqual(toWords(999), 'نهصد و نود و نه');
    });
  });


  describe('Negative Numbers', () => {
    it('should handle negative single digit', () => {
      assert.strictEqual(toWords(-5), 'منفی پنج');
      assert.strictEqual(toWords(-9), 'منفی نه');
    });

    it('should handle negative multi-digit numbers', () => {
      assert.strictEqual(toWords(-123), 'منفی یکصد و بیست و سه');
      assert.strictEqual(toWords(-456), 'منفی چهارصد و پنجاه و شش');
      assert.strictEqual(toWords(-1000), 'منفی یک هزار');
    });

    it('should verify منفی prefix is present', () => {
      const result = toWords(-42);
      assert.ok(result.startsWith('منفی'));
      assert.strictEqual(result, 'منفی چهل و دو');
    });
  });


  describe('Large Numbers', () => {
    it('should handle thousands (هزار)', () => {
      assert.strictEqual(toWords(1000), 'یک هزار');
      assert.strictEqual(toWords(5000), 'پنج هزار');
      assert.strictEqual(toWords(12345), 'دوازده هزار و سیصد و چهل و پنج');
    });

    it('should handle millions (میلیون)', () => {
      assert.strictEqual(toWords(1000000), 'یک میلیون');
      assert.strictEqual(toWords(2500000), 'دو میلیون و پانصد هزار');
    });

    it('should handle billions (میلیارد)', () => {
      assert.strictEqual(toWords(1000000000), 'یک میلیارد');
      assert.strictEqual(toWords(3000000000), 'سه میلیارد');
    });

    it('should handle trillions (تریلیون)', () => {
      assert.strictEqual(toWords(1000000000000), 'یک تریلیون');
      assert.strictEqual(toWords(7000000000000), 'هفت تریلیون');
    });

    it('should handle quadrillions (کوادریلیون)', () => {
      // Test the largest predefined unit
      assert.strictEqual(toWords(1000000000000000), 'یک کوادریلیون');
    });
  });


  describe('String Input', () => {
    it('should accept numeric strings', () => {
      assert.strictEqual(toWords('42'), 'چهل و دو');
      assert.strictEqual(toWords('123'), 'یکصد و بیست و سه');
      assert.strictEqual(toWords('1000'), 'یک هزار');
    });

    it('should handle strings with whitespace (trimming)', () => {
      assert.strictEqual(toWords('  999  '), 'نهصد و نود و نه');
      assert.strictEqual(toWords(' 42 '), 'چهل و دو');
      assert.strictEqual(toWords('\t100\n'), 'یکصد');
    });

    it('should handle large numbers as strings', () => {
      assert.strictEqual(toWords('1000000'), 'یک میلیون');
      assert.strictEqual(toWords('1000000000'), 'یک میلیارد');
    });
  });


  describe('Invalid Input', () => {
    it('should reject float with fractional parts', () => {
      assert.throws(
        () => toWords(3.14),
        {
          name: 'RangeError',
          message: /Float numbers with fractional parts are not supported/
        }
      );
      assert.throws(() => toWords(12.5), RangeError);
    });

    it('should reject non-numeric string', () => {
      assert.throws(
        () => toWords('abc'),
        {
          name: 'RangeError',
          message: /Cannot convert string to integer/
        }
      );
      assert.throws(() => toWords('12.5'), RangeError);
      assert.throws(() => toWords('hello'), RangeError);
    });

    it('should reject null', () => {
      assert.throws(
        () => toWords(null),
        {
          name: 'TypeError',
          message: /Input must be a number or string/
        }
      );
    });

    it('should reject undefined', () => {
      assert.throws(
        () => toWords(undefined),
        {
          name: 'TypeError',
          message: /Input must be a number or string/
        }
      );
    });

    it('should reject object', () => {
      assert.throws(
        () => toWords({}),
        {
          name: 'TypeError',
          message: /Input must be a number or string/
        }
      );
      assert.throws(() => toWords([]), TypeError);
    });
  });
});
