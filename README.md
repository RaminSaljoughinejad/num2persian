# num2persian

[![PyPI version](https://badge.fury.io/py/num2persian.svg)](https://pypi.org/project/num2persian/)
[![npm version](https://badge.fury.io/js/persian-number-words.svg)](https://www.npmjs.com/package/persian-number-words)

Convert numbers to Persian words. Available in both Python and TypeScript implementations.

📖 **Read this in [Persian](README_FA.md)**

## Installation

```bash
pip install num2persian
```

## TypeScript Implementation

This project also includes a TypeScript implementation available as an NPM package.

```bash
npm install persian-number-words
```

For more information, see [typescript/README.md](typescript/README.md).

## Usage

### Python API

```python
import num2persian

# Convert numbers to Persian words
print(num2persian.to_words(42))        # Output: چهل و دو
print(num2persian.to_words(1234))      # Output: یک هزار و دویست و سی و چهار
print(num2persian.to_words(-567))      # Output: منفی پانصد و شصت و هفت
print(num2persian.to_words("890"))     # Output: هشتصد و نود
```

### Command Line

```bash
# Convert a number to Persian words
num2persian 2025

# Show version
num2persian --version

# Show help
num2persian --help
```

## Features

- Convert integers and decimal numbers (positive, negative, and zero) to Persian words
- Accept string inputs that can be converted to numbers
- Proper Persian grammar with correct "و" (and) placement
- Support for very large numbers with scientific notation fallback
- Decimal numbers with appropriate Persian suffixes (دهم, صدم, هزارم, etc.)
- Command-line interface
- Comprehensive test coverage

## Examples

```python
from num2persian import to_words

# Basic numbers
to_words(0)      # "صفر"
to_words(15)     # "پانزده"
to_words(100)    # "یکصد"

# Compound numbers
to_words(123)    # "یکصد و بیست و سه"
to_words(2025)   # "دو هزار و بیست و پنج"

# Large numbers
to_words(1000000)    # "یک میلیون"
to_words(1000000000) # "یک میلیارد"

# Decimal numbers
to_words(3.14)   # "سه ممیز چهارده صدم"
to_words(0.5)    # "صفر ممیز پنج دهم"
to_words(1.234)  # "یک ممیز دویست و سی و چهار هزارم"
to_words(12.25)  # "دوازده ممیز بیست و پنج صدم"

# Negative numbers
to_words(-42)    # "منفی چهل و دو"
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/num2persian.git
cd num2persian

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install in development mode
pip install -e .
```

### Testing

```bash
# Run tests
pytest

# Run tests with coverage
pytest --cov=persian_numbers
```

### Building

```bash
# Build wheel and source distribution
python -m build

# Install build dependencies
pip install build twine

# Upload to TestPyPI (replace with actual credentials)
twine upload --repository testpypi dist/*

# Upload to PyPI (replace with actual credentials)
twine upload dist/*
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! This project includes both Python and TypeScript implementations:

- **Python**: Located in the root directory
- **TypeScript**: Located in the `typescript/` directory

Both implementations are tested in CI. Please feel free to submit a Pull Request.
