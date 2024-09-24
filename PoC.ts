import { Pool } from 'pg';

const pool = new Pool({
  // ...connection details
});

interface Pet {
  id: number;
  name: string;
  birth_date: Date;
  color: 'black' | 'white' | 'brown';
}

async function insertPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
  try {
    const result = await pool.query(
      'INSERT INTO pets (name, birth_date, color) VALUES ($1, $2, $3) RETURNING *',
      [pet.name, pet.birth_date, pet.color]
    );
    console.log('Pet created:', result.rows[0]);

    return result.rows[0];
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
}

async function updatePet(petId: number, updates: Partial<Pet>): Promise<Pet> {
  const fields: string[] = [];
  const values: any[] = [];
  let query = 'UPDATE pets SET ';

  // Dynamically build the SET clause and the values array
  Object.entries(updates).forEach(([key, value], index) => {
    if (value !== undefined) {
      fields.push(`${key} = $${index + 1}`);
      values.push(value);
    }
  });

  // If no fields to update, return early
  if (fields.length === 0) {
    throw new Error('No valid fields to update');
  }

  // Add the dynamic fields and WHERE clause
  query += fields.join(', ') + ' WHERE id = $' + (fields.length + 1);
  values.push(petId);

  try {
    // Execute the query
    const result = await pool.query(query, values);
    console.log('Update successful', result.rowCount);

    return result.rows[0];
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
}

async function getPet(petId: number): Promise<Pet | null> {
  try {
    const result = await pool.query('SELECT * FROM pets WHERE id = $1', [
      petId,
    ]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching pet:', error);
    throw error;
  }
}

async function getAllPets(): Promise<Pet[]> {
  try {
    const result = await pool.query('SELECT * FROM pets');
    return result.rows;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
}

async function deletePet(petId: number) {
  try {
    const result = await pool.query('DELETE FROM pets WHERE id = $1', [petId]);
    console.log('Delete successful', result.rowCount);
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
}

// react queries

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';

// Define query keys
const queryKeys = {
  pets: ['pets'] as const,
  pet: (id: number) => ['pet', id] as const,
};

// Hook to fetch all pets
export const useGetAllPets = (
  options?: Omit<
    UseQueryOptions<Pet[], Error, Pet[], typeof queryKeys.pets>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<Pet[], Error, Pet[], typeof queryKeys.pets>({
    queryKey: queryKeys.pets,
    queryFn: getAllPets,
    ...options,
  });
};

// Hook to fetch a single pet
export const useGetPet = (
  petId: number,
  options?: Omit<
    UseQueryOptions<
      Pet | null,
      Error,
      Pet | null,
      ReturnType<typeof queryKeys.pet>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<
    Pet | null,
    Error,
    Pet | null,
    ReturnType<typeof queryKeys.pet>
  >({
    queryKey: queryKeys.pet(petId),
    queryFn: () => getPet(petId),
    ...options,
  });
};

// Hook to insert a new pet
export const useInsertPet = (
  options?: Omit<
    UseMutationOptions<Pet, Error, Omit<Pet, 'id'>, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<Pet, Error, Omit<Pet, 'id'>>({
    mutationFn: insertPet,
    onSuccess: (newPet) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets });
      queryClient.setQueryData(queryKeys.pet(newPet.id), newPet);
    },
    ...options,
  });
};

// Hook to update a pet
export const useUpdatePet = (
  options?: Omit<
    UseMutationOptions<
      Pet,
      Error,
      { petId: number; updates: Partial<Pet> },
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<Pet, Error, { petId: number; updates: Partial<Pet> }>({
    mutationFn: ({ petId, updates }) => updatePet(petId, updates),
    onSuccess: (updatedPet) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets });
      queryClient.invalidateQueries({ queryKey: queryKeys.pet(updatedPet.id) });
    },
    ...options,
  });
};

// Hook to delete a pet
export const useDeletePet = (
  options?: Omit<UseMutationOptions<void, Error, number, unknown>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deletePet,
    onSuccess: (_, petId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets });
      queryClient.removeQueries({ queryKey: queryKeys.pet(petId) });
    },
    ...options,
  });
};
