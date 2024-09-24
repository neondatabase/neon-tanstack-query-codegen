interface ImportNeonArgs {
  relativeNeonPath?: string;
  neonExportName?: string;
}

export function importNeon({
  relativeNeonPath = './neon',
  neonExportName,
}: ImportNeonArgs): string {
  const exportName = neonExportName ? `{ ${neonExportName} }` : 'neon';

  return `import ${exportName} from '${relativeNeonPath}';`;
}
