import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../utils/api";

export function useUsersQuery(query: string = '') {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => getUsers(query)
  });
};
