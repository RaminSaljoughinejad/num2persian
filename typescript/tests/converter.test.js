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


  describe('Decimal Numbers (v2.0.0)', () => {
    describe('Basic Decimal Conversion', () => {
      it('should convert positive decimals', () => {
        assert.strictEqual(toWords(0.5), 'صفر ممیز پنج دهم');
        assert.strictEqual(toWords(3.14), 'سه ممیز چهارده صدم');
        assert.strictEqual(toWords(123.456), 'یکصد و بیست و سه ممیز چهارصد و پنجاه و شش هزارم');
      });

      it('should convert negative decimals', () => {
        assert.strictEqual(toWords(-0.5), 'منفی صفر ممیز پنج دهم');
        assert.strictEqual(toWords(-3.14), 'منفی سه ممیز چهارده صدم');
        assert.strictEqual(toWords(-123.456), 'منفی یکصد و بیست و سه ممیز چهارصد و پنجاه و شش هزارم');
      });

      it('should convert zero with decimals', () => {
        assert.strictEqual(toWords(0.1), 'صفر ممیز یک دهم');
        assert.strictEqual(toWords(0.01), 'صفر ممیز یک صدم');
      });

      it('should verify decimal separator ممیز is present', () => {
        const result = toWords(3.14);
        assert.ok(result.includes('ممیز'));
        assert.strictEqual(result, 'سه ممیز چهارده صدم');
      });
    });

    describe('Decimal Edge Cases', () => {
      it('should handle small decimals', () => {
        assert.strictEqual(toWords(0.01), 'صفر ممیز یک صدم');
        assert.strictEqual(toWords(0.001), 'صفر ممیز یک هزارم');
        assert.strictEqual(toWords(0.0001), 'صفر ممیز یک ده‌هزارم');
      });

      it('should handle trailing zeros', () => {
        // JavaScript normalizes trailing zeros automatically in Number()
        // Both numeric and string inputs become normalized
        // 3.140 becomes 3.14, 5.00 becomes 5
        assert.strictEqual(toWords(3.140), 'سه ممیز چهارده صدم');
        assert.strictEqual(toWords(5.00), 'پنج');
        assert.strictEqual(toWords('3.140'), 'سه ممیز چهارده صدم');
      });

      it('should handle leading zeros in decimal part', () => {
        assert.strictEqual(toWords(0.001), 'صفر ممیز یک هزارم');
        assert.strictEqual(toWords(0.0123), 'صفر ممیز یکصد و بیست و سه ده‌هزارم');
      });

      it('should handle very large numbers with decimals', () => {
        const result = toWords(123456789.987654321);
        assert.ok(result.includes('ممیز'));
        assert.ok(result.includes('میلیون'));
      });

      it('should handle decimal strings with whitespace', () => {
        assert.strictEqual(toWords('  3.14  '), 'سه ممیز چهارده صدم');
        assert.strictEqual(toWords(' 0.5 '), 'صفر ممیز پنج دهم');
      });
    });

    describe('Decimal String Input', () => {
      it('should accept decimal string inputs', () => {
        assert.strictEqual(toWords('3.14'), 'سه ممیز چهارده صدم');
        assert.strictEqual(toWords('0.5'), 'صفر ممیز پنج دهم');
        assert.strictEqual(toWords('-2.718'), 'منفی دو ممیز هفتصد و هجده هزارم');
      });

      it('should handle whitespace trimming for decimal strings', () => {
        assert.strictEqual(toWords('  3.14  '), 'سه ممیز چهارده صدم');
        assert.strictEqual(toWords('\t0.5\n'), 'صفر ممیز پنج دهم');
      });

      it('should reject invalid decimal strings', () => {
        assert.throws(
          () => toWords('3.14.15'),
          {
            name: 'RangeError',
            message: /Cannot convert string to number/
          }
        );
        assert.throws(
          () => toWords('3.14abc'),
          {
            name: 'RangeError',
            message: /Cannot convert string to number/
          }
        );
      });
    });

    describe('Backward Compatibility', () => {
      it('should maintain integer conversion behavior', () => {
        // Verify all integer tests still pass
        assert.strictEqual(toWords(0), 'صفر');
        assert.strictEqual(toWords(123), 'یکصد و بیست و سه');
        assert.strictEqual(toWords(-456), 'منفی چهارصد و پنجاه و شش');
        assert.strictEqual(toWords(1000), 'یک هزار');
        assert.strictEqual(toWords(1000000), 'یک میلیون');
      });

      it('should maintain error handling for invalid inputs', () => {
        assert.throws(() => toWords(null), TypeError);
        assert.throws(() => toWords(undefined), TypeError);
        assert.throws(() => toWords({}), TypeError);
        assert.throws(() => toWords([]), TypeError);
      });

      it('should handle Infinity and NaN', () => {
        assert.throws(
          () => toWords(Infinity),
          {
            name: 'RangeError',
            message: /Number must be finite/
          }
        );
        assert.throws(
          () => toWords(NaN),
          {
            name: 'RangeError',
            message: /Number must be finite/
          }
        );
      });
    });
  });

  describe('Invalid Input', () => {
    it('should reject non-numeric string', () => {
      assert.throws(
        () => toWords('abc'),
        {
          name: 'RangeError',
          message: /Cannot convert string to number/
        }
      );
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
