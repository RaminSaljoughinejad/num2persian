# num2persian

[![PyPI version](https://badge.fury.io/py/num2persian.svg)](https://pypi.org/project/num2persian/)

Convert numbers to Persian words. Available in both Python and TypeScript implementations.

## Installation

```bash
pip install num2persian
```

## TypeScript Implementation

This project also includes a TypeScript implementation available in the `typescript/` directory.

```bash
cd typescript
npm install
npm run build
npm test
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

- Convert integers (positive, negative, and zero) to Persian words
- Accept string inputs that can be converted to integers
- Proper Persian grammar with correct "و" (and) placement
- Support for very large numbers with scientific notation fallback
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
