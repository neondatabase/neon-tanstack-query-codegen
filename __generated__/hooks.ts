import { useMutation, useQuery, useQueryClient } from "react-query";
import { neon } from "../neon";

export type BookingEntity = {
  createdAt?: Date;
  endTime: Date;
  id: string;
  maintainerId: string;
  startTime: Date;
  status?: import("/Users/pedrofigueiredo/Desktop/GIT/neon/neon-schema-gen/__generated__/pg-schema").BookingStatus;
  totalAmount: number;
  updatedAt: Date;
  userProfileId: string;
};

export type AddBookingEntityRequest = {
  createdAt?: Date;
  endTime: Date;
  id: string;
  maintainerId: string;
  startTime: Date;
  status?: import("/Users/pedrofigueiredo/Desktop/GIT/neon/neon-schema-gen/__generated__/pg-schema").BookingStatus;
  totalAmount: number;
  updatedAt: Date;
  userProfileId: string;
};

export type UpdateBookingEntityRequest = {
  id: string;
  changes: {
    createdAt?: Date;
    endTime: Date;
    id: string;
    maintainerId: string;
    startTime: Date;
    status?: import("/Users/pedrofigueiredo/Desktop/GIT/neon/neon-schema-gen/__generated__/pg-schema").BookingStatus;
    totalAmount: number;
    updatedAt: Date;
    userProfileId: string;
  };
};

export function useGetBookingEntity(id: string) {
  return useQuery<BookingEntity, Error>(
    ["BookingEntity", id],
    async () => {
      const { data, error } = await neon
        .from("BookingEntity")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) throw new Error("No data found");
      return data as BookingEntity;
    },
    { enabled: !!id }
  );
}

export function useGetAllBookingEntities() {
  return useQuery<BookingEntity[], Error>(["BookingEntity"], async () => {
    const { data, error } = await neon.from("BookingEntity").select();
    if (error) throw error;
    return data as BookingEntity[];
  });
}

export function useAddBookingEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: AddBookingEntityRequest) => {
      const { error } = await neon.from("BookingEntity").insert(item).single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("BookingEntity");
      },
    }
  );
}

export function useUpdateBookingEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: UpdateBookingEntityRequest) => {
      const { error } = await neon
        .from("BookingEntity")
        .update(item.changes)
        .eq("id", item.id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("BookingEntity");
      },
    }
  );
}

export function useDeleteBookingEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { error } = await neon
        .from("BookingEntity")
        .delete()
        .eq("id", id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("BookingEntity");
      },
    }
  );
}

export type MaintainerProfileEntity = {
  availability: string;
  createdAt?: Date;
  expertise?: string[];
  githubProfile?: string;
  hourlyRate: number;
  id: string;
  projectId: string;
  updatedAt: Date;
  userProfileId: string;
};

export type AddMaintainerProfileEntityRequest = {
  availability: string;
  createdAt?: Date;
  expertise?: string[];
  githubProfile?: string;
  hourlyRate: number;
  id: string;
  projectId: string;
  updatedAt: Date;
  userProfileId: string;
};

export type UpdateMaintainerProfileEntityRequest = {
  id: string;
  changes: {
    availability: string;
    createdAt?: Date;
    expertise?: string[];
    githubProfile?: string;
    hourlyRate: number;
    id: string;
    projectId: string;
    updatedAt: Date;
    userProfileId: string;
  };
};

export function useGetMaintainerProfileEntity(id: string) {
  return useQuery<MaintainerProfileEntity, Error>(
    ["MaintainerProfileEntity", id],
    async () => {
      const { data, error } = await neon
        .from("MaintainerProfileEntity")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) throw new Error("No data found");
      return data as MaintainerProfileEntity;
    },
    { enabled: !!id }
  );
}

export function useGetAllMaintainerProfileEntities() {
  return useQuery<MaintainerProfileEntity[], Error>(
    ["MaintainerProfileEntity"],
    async () => {
      const { data, error } = await neon
        .from("MaintainerProfileEntity")
        .select();
      if (error) throw error;
      return data as MaintainerProfileEntity[];
    }
  );
}

export function useAddMaintainerProfileEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: AddMaintainerProfileEntityRequest) => {
      const { error } = await neon
        .from("MaintainerProfileEntity")
        .insert(item)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("MaintainerProfileEntity");
      },
    }
  );
}

export function useUpdateMaintainerProfileEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: UpdateMaintainerProfileEntityRequest) => {
      const { error } = await neon
        .from("MaintainerProfileEntity")
        .update(item.changes)
        .eq("id", item.id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("MaintainerProfileEntity");
      },
    }
  );
}

export function useDeleteMaintainerProfileEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { error } = await neon
        .from("MaintainerProfileEntity")
        .delete()
        .eq("id", id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("MaintainerProfileEntity");
      },
    }
  );
}

export type ProjectEntity = {
  createdAt?: Date;
  description?: string;
  id: string;
  name: string;
  repoUrl: string;
  updatedAt: Date;
};

export type AddProjectEntityRequest = {
  createdAt?: Date;
  description?: string;
  id: string;
  name: string;
  repoUrl: string;
  updatedAt: Date;
};

export type UpdateProjectEntityRequest = {
  id: string;
  changes: {
    createdAt?: Date;
    description?: string;
    id: string;
    name: string;
    repoUrl: string;
    updatedAt: Date;
  };
};

export function useGetProjectEntity(id: string) {
  return useQuery<ProjectEntity, Error>(
    ["ProjectEntity", id],
    async () => {
      const { data, error } = await neon
        .from("ProjectEntity")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) throw new Error("No data found");
      return data as ProjectEntity;
    },
    { enabled: !!id }
  );
}

export function useGetAllProjectEntities() {
  return useQuery<ProjectEntity[], Error>(["ProjectEntity"], async () => {
    const { data, error } = await neon.from("ProjectEntity").select();
    if (error) throw error;
    return data as ProjectEntity[];
  });
}

export function useAddProjectEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: AddProjectEntityRequest) => {
      const { error } = await neon.from("ProjectEntity").insert(item).single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ProjectEntity");
      },
    }
  );
}

export function useUpdateProjectEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: UpdateProjectEntityRequest) => {
      const { error } = await neon
        .from("ProjectEntity")
        .update(item.changes)
        .eq("id", item.id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ProjectEntity");
      },
    }
  );
}

export function useDeleteProjectEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { error } = await neon
        .from("ProjectEntity")
        .delete()
        .eq("id", id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ProjectEntity");
      },
    }
  );
}

export type UserEntity = { id: string };

export type AddUserEntityRequest = { id: string };

export type UpdateUserEntityRequest = { id: string; changes: { id: string } };

export function useGetUserEntity(id: string) {
  return useQuery<UserEntity, Error>(
    ["UserEntity", id],
    async () => {
      const { data, error } = await neon
        .from("UserEntity")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) throw new Error("No data found");
      return data as UserEntity;
    },
    { enabled: !!id }
  );
}

export function useGetAllUserEntities() {
  return useQuery<UserEntity[], Error>(["UserEntity"], async () => {
    const { data, error } = await neon.from("UserEntity").select();
    if (error) throw error;
    return data as UserEntity[];
  });
}

export function useAddUserEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: AddUserEntityRequest) => {
      const { error } = await neon.from("UserEntity").insert(item).single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("UserEntity");
      },
    }
  );
}

export function useUpdateUserEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: UpdateUserEntityRequest) => {
      const { error } = await neon
        .from("UserEntity")
        .update(item.changes)
        .eq("id", item.id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("UserEntity");
      },
    }
  );
}

export function useDeleteUserEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { error } = await neon
        .from("UserEntity")
        .delete()
        .eq("id", id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("UserEntity");
      },
    }
  );
}

export type UserProfileEntity = {
  createdAt?: Date;
  email: string;
  id: string;
  name: string;
  updatedAt: Date;
};

export type AddUserProfileEntityRequest = {
  createdAt?: Date;
  email: string;
  id: string;
  name: string;
  updatedAt: Date;
};

export type UpdateUserProfileEntityRequest = {
  id: string;
  changes: {
    createdAt?: Date;
    email: string;
    id: string;
    name: string;
    updatedAt: Date;
  };
};

export function useGetUserProfileEntity(id: string) {
  return useQuery<UserProfileEntity, Error>(
    ["UserProfileEntity", id],
    async () => {
      const { data, error } = await neon
        .from("UserProfileEntity")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) throw new Error("No data found");
      return data as UserProfileEntity;
    },
    { enabled: !!id }
  );
}

export function useGetAllUserProfileEntities() {
  return useQuery<UserProfileEntity[], Error>(
    ["UserProfileEntity"],
    async () => {
      const { data, error } = await neon.from("UserProfileEntity").select();
      if (error) throw error;
      return data as UserProfileEntity[];
    }
  );
}

export function useAddUserProfileEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: AddUserProfileEntityRequest) => {
      const { error } = await neon
        .from("UserProfileEntity")
        .insert(item)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("UserProfileEntity");
      },
    }
  );
}

export function useUpdateUserProfileEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: UpdateUserProfileEntityRequest) => {
      const { error } = await neon
        .from("UserProfileEntity")
        .update(item.changes)
        .eq("id", item.id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("UserProfileEntity");
      },
    }
  );
}

export function useDeleteUserProfileEntity() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { error } = await neon
        .from("UserProfileEntity")
        .delete()
        .eq("id", id)
        .single();
      if (error) throw error;
      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("UserProfileEntity");
      },
    }
  );
}
