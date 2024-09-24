import { importNeon } from './importNeon';

describe('importNeon', () => {
  test('should return import statement with default export when neonExportName is not provided', () => {
    expect(importNeon({ relativeNeonPath: '../neonClient' })).toBe(
      "import neon from '../neonClient';"
    );
  });

  test('should return import statement with named export when neonExportName is provided', () => {
    expect(
      importNeon({
        relativeNeonPath: '../neonClient',
        neonExportName: 'customNeon',
      })
    ).toBe("import { customNeon } from '../neonClient';");
  });

  test('should throw an error when relativeNeonPath is not provided', () => {
    expect(importNeon({})).toBe("import neon from './neon';");
  });
});
