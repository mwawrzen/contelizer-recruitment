import { useState } from "react";
import UserSkeletons from "../components/users/UserSkeletons";
import { useUsersQuery } from "../hooks/useUsersQuery";
import type { User } from "../utils/types";
import EditionModal from "./EditionModal";
import UserCard from "./UserCard";
import Alert from "../components/Alert";
import { useUserMutation } from "../hooks/useUserMutation";
import SearchInput from "./SearchInput";

function UsersList() {

  const [search, setSearch] = useState<string>('');
  const { data, isLoading, isError } = useUsersQuery(search);

  const userMutation = useUserMutation();

  const [userToEdit, setUserToEdit] = useState<User | null>(null);


  function editUser(user: User) {
    userMutation.mutate(user);
    setUserToEdit(null);
  }

  function hideModal() {
    setUserToEdit(null);
  }

  const userItems = data?.map((user: User) => (
    <UserCard
      key={user.id}
      user={user}
      editAction={() => setUserToEdit(user)}
    />
  ));

  return (
    <>
      <SearchInput
        value={search}
        setSearch={setSearch}
      />
      {
        isLoading ?
          <UserSkeletons /> :
          <ul>{userItems?.length ? userItems : 'No users'}</ul>
      }
      {
        userToEdit !== null ? (
          <EditionModal
            user={userToEdit}
            edit={editUser}
            cancel={hideModal}
          />
        ) : null
      }
      {
        isError &&
          <Alert message="Error! Fetching users gone wrong." />
      }
      {
        userMutation.isError &&
          <Alert message="Error! Editing user gone wrong." />
      }
      {
        userMutation.isSuccess &&
          <Alert message="User successfully edited." success />
      }
    </>
  );
}

export default UsersList;
