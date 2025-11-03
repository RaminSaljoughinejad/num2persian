# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-03

### Added
- **Decimal number support**: Convert decimal numbers to Persian words
  - Support for decimal points with proper Persian fractional suffixes
  - Examples: `3.14` → `"سه ممیز چهارده صدم"`, `0.5` → `"صفر ممیز پنج دهم"`
- **Fractional suffixes**: Added `DECIMAL_SUFFIX` dictionary with Persian terms for:
  - دهم (1st decimal), صدم (2nd decimal), هزارم (3rd decimal)
  - And up to میلیاردم (9th decimal)
- **Enhanced input validation**: Now accepts float inputs with decimal parts
- **Comprehensive tests**: Added test cases for decimal number conversion

### Changed
- **Input handling**: Modified `_normalize_input()` to accept floats with fractional parts
- **Documentation**: Updated README.md and docstrings with decimal examples
- **API**: Maintains backward compatibility with existing integer conversion

### Fixed
- **Decimal string extraction**: Fixed edge cases in decimal part parsing

## [0.1.0] - 2025-10-XX

### Added
- Initial release with integer number conversion to Persian words
- Support for positive and negative integers
- Command-line interface
- Comprehensive test suite
- TypeScript implementation available
- PyPI package distribution

### Features
- Convert integers to Persian words with proper grammar
- Support for large numbers with thousands, millions, billions, etc.
- Scientific notation fallback for very large numbers
- String input parsing
- CLI tool with version and help options
