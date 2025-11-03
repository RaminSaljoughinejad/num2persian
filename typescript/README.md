# Persian Number Words

Convert numbers to Persian (Farsi) words with zero dependencies and full TypeScript support.

## Features

- ✅ Zero dependencies
- ✅ TypeScript support with full type definitions
- ✅ ESM and CommonJS support
- ✅ Works in Node.js, browsers, React, Next.js, Vite, Bun, and Deno
- ✅ Handles negative numbers
- ✅ Supports very large numbers (up to quadrillions and beyond)
- ✅ Lightweight (< 5KB)

## Installation

```bash
# npm
npm install persian-number-words

# yarn
yarn add persian-number-words

# pnpm
pnpm add persian-number-words

# bun
bun add persian-number-words
```

## Quick Start

```typescript
import { toWords } from 'persian-number-words';

toWords(123);  // "یکصد و بیست و سه"
toWords(0);    // "صفر"
toWords(-456); // "منفی چهارصد و پنجاه و شش"
```

## Usage

### TypeScript

```typescript
import { toWords } from 'persian-number-words';

// Basic usage
console.log(toWords(42));        // "چهل و دو"
console.log(toWords(1000));      // "یک هزار"
console.log(toWords(1000000));   // "یک میلیون"

// String input
console.log(toWords("789"));     // "هفتصد و هشتاد و نه"

// Negative numbers
console.log(toWords(-123));      // "منفی یکصد و بیست و سه"
```

### JavaScript (CommonJS)

```javascript
const { toWords } = require('persian-number-words');

console.log(toWords(123));  // "یکصد و بیست و سه"
```

### JavaScript (ESM)

```javascript
import { toWords } from 'persian-number-words';

console.log(toWords(123));  // "یکصد و بیست و سه"
```

### Default Export

```typescript
import toWords from 'persian-number-words';

console.log(toWords(123));  // "یکصد و بیست و سه"
```

### Browser (via bundler)

```javascript
import { toWords } from 'persian-number-words';

document.getElementById('result').textContent = toWords(123);
```

### Browser (via CDN)

```html
<script type="module">
  import { toWords } from 'https://esm.sh/persian-number-words';
  
  console.log(toWords(123));  // "یکصد و بیست و سه"
</script>
```

### React / Next.js

```tsx
import { toWords } from 'persian-number-words';

function NumberDisplay({ value }: { value: number }) {
  return <div>{toWords(value)}</div>;
}

// Usage
<NumberDisplay value={1234} />  // displays: "یک هزار و دویست و سی و چهار"
```

### Vite

```typescript
import { toWords } from 'persian-number-words';

const result = toWords(999);
console.log(result);  // "نهصد و نود و نه"
```

### Bun

```typescript
import { toWords } from 'persian-number-words';

console.log(toWords(777));  // "هفتصد و هفتاد و هفت"
```

### Deno

```typescript
import { toWords } from 'npm:persian-number-words';

console.log(toWords(555));  // "پانصد و پنجاه و پنج"
```

## Examples

### Negative Numbers

```typescript
toWords(-5);      // "منفی پنج"
toWords(-123);    // "منفی یکصد و بیست و سه"
toWords(-1000);   // "منفی یک هزار"
```

### Large Numbers

```typescript
// Thousands (هزار)
toWords(1000);              // "یک هزار"
toWords(12345);             // "دوازده هزار و سیصد و چهل و پنج"

// Millions (میلیون)
toWords(1000000);           // "یک میلیون"
toWords(2500000);           // "دو میلیون و پانصد هزار"

// Billions (میلیارد)
toWords(1000000000);        // "یک میلیارد"
toWords(3000000000);        // "سه میلیارد"

// Trillions (تریلیون)
toWords(1000000000000);     // "یک تریلیون"
toWords(7000000000000);     // "هفت تریلیون"

// Even larger numbers
toWords(1000000000000000);  // "یک کوادریلیون"
```

### String Input

```typescript
toWords("42");       // "چهل و دو"
toWords("  999  ");  // "نهصد و نود و نه" (whitespace is trimmed)
toWords("1000000");  // "یک میلیون"
```

## API Reference

### `toWords(input: number | string): string`

Converts a number to Persian words.

**Parameters:**
- `input` - A number or numeric string to convert. Must be an integer (no fractional parts).

**Returns:**
- A string containing the Persian word representation of the number.

**Throws:**
- `TypeError` - If input is not a number or string (e.g., null, undefined, object)
- `RangeError` - If input is a float with fractional parts or a non-numeric string

**Examples:**

```typescript
toWords(0);           // "صفر"
toWords(123);         // "یکصد و بیست و سه"
toWords(-456);        // "منفی چهارصد و پنجاه و شش"
toWords("789");       // "هفتصد و هشتاد و نه"
toWords(1000000000);  // "یک میلیارد"
```

## Error Handling

The library throws descriptive errors for invalid inputs:

```typescript
// Float with fractional parts
try {
  toWords(3.14);
} catch (error) {
  console.error(error);  // RangeError: Float numbers with fractional parts are not supported: 3.14
}

// Non-numeric string
try {
  toWords("abc");
} catch (error) {
  console.error(error);  // RangeError: Cannot convert string to integer: 'abc'
}

// Invalid type
try {
  toWords(null);
} catch (error) {
  console.error(error);  // TypeError: Input must be a number or string, got null
}
```

## Browser Support

This package works in all modern browsers that support ES2020:

- Chrome 80+
- Firefox 74+
- Safari 13.1+
- Edge 80+

For older browsers, transpile the package in your build process.

## Node.js Support

Requires Node.js 14.0.0 or higher.

## Publishing

This package is ready to be published to npm. See [PUBLISHING.md](PUBLISHING.md) for detailed instructions.

### Quick Publish

```bash
# 1. Login to npm
npm login

# 2. Publish the package
npm publish --access public

# 3. Tag the release
git tag v1.0.0
git push --tags
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Keywords

persian, farsi, number, words, converter, typescript, i18n, localization
