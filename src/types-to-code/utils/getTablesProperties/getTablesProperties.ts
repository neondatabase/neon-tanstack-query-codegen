import { Project } from 'ts-morph';

export function getTablesMetadata(typesPath: string) {
  // Initialize a new project
  const project = new Project();

  // Add the source file containing the interfaces
  const sourceFile = project.addSourceFileAtPath(
    typesPath
  );

  // Find all interface declarations in the source file
  const tables = sourceFile.getInterfaces();

  return tables;
}