import type { InterfaceDeclaration } from 'ts-morph';

import { toTypeName } from './toTypeName';

interface GenerateTypesArg {
  table: InterfaceDeclaration;
  tableName: string;
}

export function generateTypes({
  tableName,
  table,
}: GenerateTypesArg): string[] {
  // Find the 'Row' property within the table type
  const rowProperty = table.getProperty('Row');
  if (!rowProperty) {
    throw new Error(`Unable to find Row property type for ${tableName}.`);
  }

  // Get the type of the 'Row' property
  const rowType = rowProperty.getType();

  const insertProperty = table.getProperty('Insert');
  if (!insertProperty) {
    throw new Error(`Unable to find insert property type for ${tableName}.`);
  }

  const insertType = insertProperty.getType();

  const updateProperty = table.getProperty('Update');
  if (!updateProperty) {
    throw new Error(`Unable to find update property type for ${tableName}.`);
  }

  const updateType = updateProperty.getType();

  const rowTypeString = rowType.getText();
  const insertTypeString = insertType.getText();
  const updateTypeString = updateType.getText();

  const types: string[] = [];

  types.push(
    `export type ${toTypeName({
      operation: 'Get',
      tableName,
    })} = ${rowTypeString};`,
    `export type ${toTypeName({
      operation: 'Add',
      tableName,
    })} = ${insertTypeString};`,
    `export type ${toTypeName({
      operation: 'Update',
      tableName,
    })} = { id: string; changes: ${updateTypeString} };
    `
  );

  return types;
}
