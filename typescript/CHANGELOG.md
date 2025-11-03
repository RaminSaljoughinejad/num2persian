# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/yourusername/persian-number-words/releases/tag/v1.0.0
