# Publishing Guide

This document provides instructions for publishing the `persian-number-words` package to npm.

## Prerequisites

1. You must have an npm account. If you don't have one, create it at https://www.npmjs.com/signup
2. You must be logged in to npm on your local machine

## Publishing Steps

### 1. Login to npm

If you haven't already logged in, run:

```bash
npm login
```

You'll be prompted to enter:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 2. Verify Package Build

Ensure the package builds successfully and all tests pass:

```bash
npm run build
npm test
```

Both commands should complete without errors.

### 3. Publish to npm

Publish the package with public access:

```bash
npm publish --access public
```

This command will:
- Run the `prepublishOnly` script (which builds and tests the package)
- Upload the package to npm registry
- Make it publicly available

### 4. Tag the Release

After successful publishing, tag the release in git:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Or push all tags:

```bash
git push --tags
```

## Version 1.0.0 Release Notes

### Initial Release Features

- ✅ Convert integers to Persian words
- ✅ Support for positive and negative numbers
- ✅ String input support
- ✅ Zero dependency
- ✅ Full TypeScript support
- ✅ ESM and CommonJS builds
- ✅ Support for Node.js, browsers, React, Next.js, Vite, Bun, and Deno
- ✅ Handles numbers up to quadrillions
- ✅ Comprehensive error handling
- ✅ 20+ test cases with 100% pass rate
- ✅ Complete documentation

### What's Included

- Core `toWords()` function
- TypeScript type definitions
- ESM bundle (dist/index.js)
- CommonJS bundle (dist/index.cjs)
- Type declarations (dist/index.d.ts, dist/index.d.cts)
- Source maps for debugging
- Comprehensive README
- MIT License
- CHANGELOG

## Post-Publishing

After publishing, verify the package:

1. Check the package page: https://www.npmjs.com/package/persian-number-words
2. Test installation in a new project:
   ```bash
   mkdir test-install
   cd test-install
   npm init -y
   npm install persian-number-words
   ```
3. Test the installed package:
   ```javascript
   // test.js
   import { toWords } from 'persian-number-words';
   console.log(toWords(123)); // Should output: یکصد و بیست و سه
   ```

## Troubleshooting

### "You do not have permission to publish"

Make sure you're logged in with the correct npm account:
```bash
npm whoami
```

### "Package name already exists"

If the package name is taken, you'll need to:
1. Choose a different name
2. Update `package.json` with the new name
3. Try publishing again

### "prepublishOnly script failed"

This means either the build or tests failed. Check the error output and fix any issues before publishing.

## Future Releases

For future releases:

1. Update version in `package.json` (follow semantic versioning)
2. Update `CHANGELOG.md` with changes
3. Run `npm run build && npm test`
4. Commit changes
5. Run `npm publish`
6. Tag the release: `git tag vX.Y.Z && git push --tags`

## Important Notes

- ⚠️ **DO NOT** run `npm publish` automatically in CI/CD without manual approval
- ⚠️ Always test the package locally before publishing
- ⚠️ Once published, a version cannot be unpublished after 24 hours
- ⚠️ Follow semantic versioning for version numbers
