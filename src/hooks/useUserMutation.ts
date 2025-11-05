import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../utils/api";

export function useUserMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};
