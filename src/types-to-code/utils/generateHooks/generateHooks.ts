import { toTypeName } from '../generateTypes/toTypeName';
import { toHookName } from './toHookName';

interface GenerateHooksArg {
  tableName: string;
}

export function generateHooks({ tableName }: GenerateHooksArg): string[] {
  const hooks: string[] = [];
  const neon = 'neon';

  const getRowType = toTypeName({ operation: 'Get', tableName });
  const addRowType = toTypeName({ operation: 'Add', tableName });
  const updateRowType = toTypeName({ operation: 'Update', tableName });

  hooks.push(
    `export function ${toHookName({
      operation: 'Get',
      tableName,
    })}(id: string) {
  return useQuery<${getRowType}, Error>(
    ['${tableName}', id],
    async () => {
      const { data, error } = await ${neon}
        .from('${tableName}')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      if (!data) throw new Error('No data found');
      return data as ${getRowType};
    },
    { enabled: !!id }
  );
}`,
    `export function ${toHookName({ operation: 'GetAll', tableName })}() {
  return useQuery<${getRowType}[], Error>(['${tableName}'], async () => {
    const { data, error } = await ${neon}.from('${tableName}').select();
    if (error) throw error;
    return data as ${getRowType}[];
  });
}`,
    `export function ${toHookName({ operation: 'Add', tableName })}() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: ${addRowType}) => {
      const { error } = await ${neon}
        .from('${tableName}')
        .insert(item)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('${tableName}');
      },
    }
  );
}`,
    `export function ${toHookName({ operation: 'Update', tableName })}() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: ${updateRowType}) => {
      const { error } = await ${neon}
        .from('${tableName}')
        .update(item.changes)
        .eq('id', item.id)
        .single()
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('${tableName}');
      },
    }
  );
}`,
    `export function ${toHookName({ operation: 'Delete', tableName })}() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { error} = await ${neon}
        .from('${tableName}')
        .delete()
        .eq('id', id)
        .single()
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('${tableName}');
      }
    }
  );
}`
  );

  return hooks;
}
