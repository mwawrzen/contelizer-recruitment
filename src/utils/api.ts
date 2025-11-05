import type { User } from "@/utils/types";
import { token } from "@/auth-token";

export const getUsers = async (query: string) => {
  const response = await fetch(`https://gorest.co.in/public/v2/users?name=${query}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};

export const editUser = async (user: User) => {
  const response = await fetch(`https://gorest.co.in/public/v2/users/${user.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });

  if (!response.ok)
    throw new Error();

  const data = await response.json();

  return data;
};
