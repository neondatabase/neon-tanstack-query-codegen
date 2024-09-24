import fs from 'fs';
import path from 'path';

import { formatGeneratedContent } from './utils/formatGeneratedContent/formatGeneratedContent';
import { generateHooks } from './utils/generateHooks/generateHooks';
import { generateTypes } from './utils/generateTypes/generateTypes';
import { getTablesMetadata } from './utils/getTablesProperties/getTablesProperties';
import { importNeon } from './utils/importNeon/importNeon';

export interface Config {
  outputPath: string;
  prettierConfigPath?: string;
  relativeNeonPath?: string;
  neonExportName?: string;
  typesPath: string;
}

export default async function generate({
  outputPath,
  prettierConfigPath,
  relativeNeonPath,
  neonExportName,
  typesPath,
}: Config) {
  const allowedOutputDir = path.resolve(process.cwd());
  const resolvedOutputPath = path.resolve(allowedOutputDir, outputPath);
  if (!resolvedOutputPath.startsWith(allowedOutputDir)) {
    throw new Error(
      `Invalid output path: "${outputPath}". Writing files outside of the allowed directory is not allowed.`
    );
  }

  const tablesProperties = getTablesMetadata(typesPath);

  // Iterate through table keys and generate hooks
  const hooks: string[] = [];
  const types: string[] = [];

  for (const table of tablesProperties) {
    const tableName = table.getName();
    console.log(`Generating hooks for ${tableName}`);

    hooks.push(...generateTypes({ tableName, table }));
    hooks.push(...generateHooks({ tableName }));
  }

  // Create the output file content with imports and hooks
  const generatedFileContent = `
import { useMutation, useQuery, useQueryClient } from 'react-query';
${importNeon({ relativeNeonPath, neonExportName: neonExportName })}

${types.join('\n')}

${hooks.join('\n\n')}
`;

  const formattedFileContent = await formatGeneratedContent({
    generatedFileContent,
    prettierConfigPath,
  });

  console.log('outputPath', resolvedOutputPath);
  // Write the output file
  fs.writeFileSync(resolvedOutputPath, formattedFileContent);
}

generate({
  outputPath: `${__dirname}/../../__generated__/hooks.ts`,
  typesPath: `${__dirname}/../../__generated__/pg-schema.ts`,
  prettierConfigPath: '.prettierrc',
  relativeNeonPath: '../neon',
  neonExportName: 'neon',
});
