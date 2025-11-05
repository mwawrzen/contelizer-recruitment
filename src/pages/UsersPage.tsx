import UsersList from "@/components/users/UsersList";

function UsersPage() {
  return (
    <section className="flex flex-col items-center gap-8 w-full">
      <UsersList />
    </section>
  );
}

export default UsersPage;
