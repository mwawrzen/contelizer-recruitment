import type { User } from "../utils/types";

type UserCardProps = {
  user: User;
  editAction: () => void;
};

function UserCard({ user, editAction }: UserCardProps) {
  return (
    <div className="card w-xl bg-base-100 card-sm shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <p>email: {user.email}</p>
        <p>gender: {user.gender}</p>
        <p>status: {user.status}</p>
        <div className="justify-end card-actions">
          <button
            className="btn btn-outline btn-accent"
            onClick={editAction}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
