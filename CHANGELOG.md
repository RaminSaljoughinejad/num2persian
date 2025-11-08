# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2025-11-04

### Fixed
- **Floating-point precision**: Fixed decimal precision loss for large integers by switching from `float` to `decimal.Decimal` type
- **Decimal arithmetic**: Updated `_normalize_input()` to use `Decimal(str(number))` for maintaining exact decimal representation
- **Large number decimals**: Corrected decimal conversion for numbers like `2564587542.361` that were affected by floating-point mantissa precision limits

### Technical Details
- **decimal.Decimal**: Replaced `float` with `Decimal` for input processing to preserve arbitrary precision
- **String conversion**: Uses `Decimal(str(number))` to capture exact input representation
- **Backward compatibility**: Maintains same API while fixing precision issues

## [2.0.1] - 2025-11-04

### Fixed
- **Decimal conversion bug**: Fixed incorrect decimal part processing where decimal digits were incorrectly converted using large integer logic instead of regular number conversion
- **Decimal suffix application**: Corrected decimal suffix handling to properly convert decimal parts like "361" to "سیصد و شصت و یک" followed by appropriate suffixes

### Examples
- `2564587542.361` now correctly converts to "دو میلیارد و پانصد و شصت و چهار میلیون و پانصد و هشتاد و هفت هزار و پانصد و چهل و دو ممیز سیصد و شصت و یک میلیونیم"
- `0.361` correctly converts to "صفر ممیز سیصد و شصت و یک میلیونیم"

## [2.0.0] - 2025-11-04

### Fixed
- **Scientific notation removal**: Completely removed scientific notation (`۱۰^x` and `۱۰^-x`) fallbacks for both integer and decimal numbers
- **Large number conversion**: Fixed conversion of very large numbers to use proper Persian words instead of scientific notation
- **Decimal suffix generation**: Improved decimal suffix handling for numbers beyond predefined ranges with proper Persian naming patterns
- **Integer unit naming**: Enhanced large unit naming system with Persian prefixes for numbers beyond trillions

### Added
- **Extended decimal suffixes**: Added support for decimal places up to 20 with proper Persian fractional terms
- **Large unit prefixes**: Added comprehensive prefix system for numbers beyond predefined units (دو‌یلیون, تر‌یلیون, etc.)
- **Fallback naming system**: Implemented proper Persian naming patterns for extremely large numbers

### Changed
- **API behavior**: Numbers that previously fell back to scientific notation now use proper Persian words
- **Decimal processing**: Enhanced decimal conversion to handle edge cases without scientific notation
- **Code structure**: Refactored unit and suffix generation into dedicated functions for better maintainability

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
