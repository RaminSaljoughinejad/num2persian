# Release Notes - Version 2.0.0

## 🎉 Major Release: Decimal Number Support

Version 2.0.0 adds full support for decimal numbers while maintaining 100% backward compatibility with v1.x.

## ✨ New Features

### Decimal Number Conversion
- Convert decimal numbers to Persian words with proper decimal place suffixes
- Support for positive and negative decimals
- Decimal separator "ممیز" between integer and fractional parts
- Decimal place suffixes: دهم, صدم, هزارم, ده‌هزارم, صدهزارم, میلیونیم

### Examples

```typescript
import { toWords } from 'persian-number-words';

// Positive decimals
toWords(3.14);        // "سه ممیز چهارده صدم"
toWords(0.5);         // "صفر ممیز پنج دهم"
toWords(123.456);     // "یکصد و بیست و سه ممیز چهارصد و پنجاه و شش هزارم"

// Negative decimals
toWords(-0.5);        // "منفی صفر ممیز پنج دهم"
toWords(-3.14);       // "منفی سه ممیز چهارده صدم"

// Small decimals
toWords(0.01);        // "صفر ممیز یک صدم"
toWords(0.001);       // "صفر ممیز یک هزارم"
toWords(0.0001);      // "صفر ممیز یک ده‌هزارم"

// String input
toWords("3.14");      // "سه ممیز چهارده صدم"
toWords("  0.5  ");   // "صفر ممیز پنج دهم"
```

## 🔄 Backward Compatibility

**100% backward compatible** with v1.x - no breaking changes!

All existing integer conversion code works identically:

```typescript
// v1.x code - works exactly the same in v2.0
toWords(123);         // "یکصد و بیست و سه"
toWords(-456);        // "منفی چهارصد و پنجاه و شش"
toWords("789");       // "هفتصد و هشتاد و نه"
toWords(1000000);     // "یک میلیون"
```

## 🧪 Testing

- 34 total test cases (all passing)
- 11 test suites
- New comprehensive decimal test coverage
- All v1.x tests continue to pass

## 📦 Package Details

- **Version**: 2.0.0
- **Size**: 10.4 KB (tarball)
- **Unpacked**: 65.8 KB
- **Files**: 9 files (ESM, CJS, TypeScript definitions, source maps)

## 🚀 Installation

```bash
npm install persian-number-words@2.0.0
```

## 📝 Migration Guide

No migration needed! Simply upgrade:

```bash
npm update persian-number-words
```

Your existing code will continue to work without any changes.

## 🔧 Technical Changes

### Added
- `DECIMAL_SEPARATOR` constant ("ممیز")
- `DECIMAL_SUFFIX` array with Persian decimal place words
- `splitDecimal()` helper function
- `convertDecimalToWords()` helper function
- Enhanced input normalization for decimals

### Changed
- `normalizeInput()` now accepts decimal numbers
- `toWords()` handles both integers and decimals
- Error messages updated for decimal support
- Updated TypeScript definitions

### Fixed
- Proper handling of `Infinity` and `NaN` values

## 📚 Documentation

- Updated README.md with decimal examples
- Updated CHANGELOG.md with v2.0.0 details
- Enhanced API documentation
- Added migration guide

## 🎯 What's Next

Future enhancements may include:
- Ordinal numbers (سوم, چهارم)
- Currency formatting
- Custom decimal separators
- Rounding options

---

**Full Changelog**: [CHANGELOG.md](CHANGELOG.md)
