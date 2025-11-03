# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-03

### Added

- **Full decimal number support** - Major new feature
  - Convert decimal numbers to Persian words with proper decimal place suffixes
  - Support for positive decimals: `toWords(3.14)` → `"سه ممیز چهارده صدم"`
  - Support for negative decimals: `toWords(-0.5)` → `"منفی صفر ممیز پنج دهم"`
  - Decimal separator "ممیز" between integer and decimal parts
  - Decimal place suffixes: دهم (tenth), صدم (hundredth), هزارم (thousandth), etc.
  - Support for very small decimals: `toWords(0.001)` → `"صفر ممیز یک هزارم"`
  - String input support for decimals: `toWords("3.14")` → `"سه ممیز چهارده صدم"`
  - Scientific notation fallback for very large decimal places
- New constants:
  - `DECIMAL_SEPARATOR` = "ممیز"
  - `DECIMAL_SUFFIX` array with Persian decimal place words
- Enhanced input normalization to accept decimal numbers
- Comprehensive decimal test suite with 30+ new test cases

### Changed

- Updated `normalizeInput()` to accept decimal numbers (previously rejected floats)
- Updated error messages to reflect decimal support
- Enhanced `toWords()` function to handle both integers and decimals
- Updated TypeScript type definitions and JSDoc comments

### Fixed

- Input validation now properly handles `Infinity` and `NaN` values

### Backward Compatibility

- **100% backward compatible** with v1.x
- All existing integer conversion code works identically
- No breaking changes to API or behavior
- All v1.x tests continue to pass

### Examples

```typescript
// New decimal features
toWords(3.14);        // "سه ممیز چهارده صدم"
toWords(0.5);         // "صفر ممیز پنج دهم"
toWords(-2.718);      // "منفی دو ممیز هفتصد و هجده هزارم"
toWords(0.001);       // "صفر ممیز یک هزارم"
toWords("3.14");      // "سه ممیز چهارده صدم"

// Existing integer features (unchanged)
toWords(123);         // "یکصد و بیست و سه"
toWords(-456);        // "منفی چهارصد و پنجاه و شش"
toWords(1000000);     // "یک میلیون"
```

## [1.0.0] - 2025-11-03

### Added

- Initial release of persian-number-words package
- Core `toWords()` function to convert numbers to Persian words
- Support for integer numbers (positive and negative)
- Support for string input (numeric strings)
- Zero dependency implementation
- Full TypeScript support with type definitions
- ESM and CommonJS module formats
- Support for Node.js 14+
- Support for browsers (Chrome 80+, Firefox 74+, Safari 13.1+, Edge 80+)
- Support for Bun runtime
- Support for Deno via npm: specifier
- Comprehensive error handling:
  - TypeError for invalid input types
  - RangeError for floats with fractional parts
  - RangeError for non-numeric strings
- Support for very large numbers (up to quadrillions and beyond)
- Negative number support with "منفی" prefix
- Persian number units: هزار, میلیون, میلیارد, تریلیون, etc.
- Comprehensive test suite with 25+ test cases
- Complete documentation with usage examples
- MIT License

### Features

- Convert integers to Persian words
- Handle zero (صفر)
- Handle negative numbers with منفی prefix
- Support thousands (هزار)
- Support millions (میلیون)
- Support billions (میلیارد)
- Support trillions (تریلیون)
- Support quadrillions and larger (کوادریلیون, etc.)
- Accept both number and string inputs
- Automatic whitespace trimming for string inputs
- Scientific notation fallback for extremely large numbers
- Tree-shakeable exports
- Source maps for debugging

[2.0.0]: https://github.com/yourusername/persian-number-words/releases/tag/v2.0.0
[1.0.0]: https://github.com/yourusername/persian-number-words/releases/tag/v1.0.0
