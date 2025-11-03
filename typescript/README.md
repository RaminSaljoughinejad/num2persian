# Persian Number Words

Convert numbers to Persian (Farsi) words with zero dependencies and full TypeScript support.

## Features

- ✅ Zero dependencies
- ✅ TypeScript support with full type definitions
- ✅ ESM and CommonJS support
- ✅ Works in Node.js, browsers, React, Next.js, Vite, Bun, and Deno
- ✅ Handles negative numbers
- ✅ **NEW in v2.0:** Full decimal number support
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

// Integers
toWords(123);   // "یکصد و بیست و سه"
toWords(0);     // "صفر"
toWords(-456);  // "منفی چهارصد و پنجاه و شش"

// Decimals (v2.0+)
toWords(3.14);  // "سه ممیز چهارده صدم"
toWords(0.5);   // "صفر ممیز پنج دهم"
toWords(-2.71); // "منفی دو ممیز هفتاد و یک صدم"
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

// Decimal numbers (v2.0+)
console.log(toWords(3.14));      // "سه ممیز چهارده صدم"
console.log(toWords(0.5));       // "صفر ممیز پنج دهم"
console.log(toWords(-2.718));    // "منفی دو ممیز هفتصد و هجده هزارم"
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
toWords("3.14");     // "سه ممیز چهارده صدم"
```

### Decimal Numbers (v2.0+)

```typescript
// Positive decimals
toWords(0.5);        // "صفر ممیز پنج دهم"
toWords(3.14);       // "سه ممیز چهارده صدم"
toWords(123.456);    // "یکصد و بیست و سه ممیز چهارصد و پنجاه و شش هزارم"

// Negative decimals
toWords(-0.5);       // "منفی صفر ممیز پنج دهم"
toWords(-3.14);      // "منفی سه ممیز چهارده صدم"

// Small decimals
toWords(0.01);       // "صفر ممیز یک صدم"
toWords(0.001);      // "صفر ممیز یک هزارم"
toWords(0.0001);     // "صفر ممیز یک ده‌هزارم"

// String input with decimals
toWords("3.14");     // "سه ممیز چهارده صدم"
toWords("  0.5  ");  // "صفر ممیز پنج دهم" (whitespace is trimmed)
```

## API Reference

### `toWords(input: number | string): string`

Converts a number (integer or decimal) to Persian words.

**Parameters:**
- `input` - A number or numeric string to convert. Supports both integers and decimals.

**Returns:**
- A string containing the Persian word representation of the number.

**Throws:**
- `TypeError` - If input is not a number or string (e.g., null, undefined, object)
- `RangeError` - If input cannot be parsed, is not finite (Infinity, NaN), or is an invalid string

**Examples:**

```typescript
// Integers
toWords(0);           // "صفر"
toWords(123);         // "یکصد و بیست و سه"
toWords(-456);        // "منفی چهارصد و پنجاه و شش"
toWords("789");       // "هفتصد و هشتاد و نه"
toWords(1000000000);  // "یک میلیارد"

// Decimals (v2.0+)
toWords(3.14);        // "سه ممیز چهارده صدم"
toWords(0.5);         // "صفر ممیز پنج دهم"
toWords(-2.718);      // "منفی دو ممیز هفتصد و هجده هزارم"
toWords("0.001");     // "صفر ممیز یک هزارم"
```

## Error Handling

The library throws descriptive errors for invalid inputs:

```typescript
// Non-numeric string
try {
  toWords("abc");
} catch (error) {
  console.error(error);  // RangeError: Cannot convert string to number: 'abc'
}

// Invalid decimal string
try {
  toWords("3.14.15");
} catch (error) {
  console.error(error);  // RangeError: Cannot convert string to number: '3.14.15'
}

// Invalid type
try {
  toWords(null);
} catch (error) {
  console.error(error);  // TypeError: Input must be a number or string, got null
}

// Infinity or NaN
try {
  toWords(Infinity);
} catch (error) {
  console.error(error);  // RangeError: Number must be finite: Infinity
}
```

## Migration from v1.x to v2.0

Version 2.0 is **fully backward compatible** with v1.x. All existing integer conversion code will work identically:

```typescript
// v1.x code - works exactly the same in v2.0
toWords(123);   // "یکصد و بیست و سه"
toWords(-456);  // "منفی چهارصد و پنجاه و شش"
toWords("789"); // "هفتصد و هشتاد و نه"

// v2.0 new feature - decimal support
toWords(3.14);  // "سه ممیز چهارده صدم"
```

No code changes are required to upgrade from v1.x to v2.0.

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
