import { useEffect, useRef, useState } from "react";
import type { User } from "../utils/types";

type EditionModalProps = {
  user: User;
  edit: (user: User) => void;
  cancel: () => void;
};

function EditionModal({ user, edit, cancel }: EditionModalProps) {

  const [name, setName] = useState<User['name']>(user.name);
  const [email, setEmail] = useState<User['email']>(user.email);
  const [gender, setGender] = useState<User['gender']>(user.gender);
  const [status, setStatus] = useState<User['status']>(user.status);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current)
      modalRef.current.showModal();
  }, [modalRef])

  const close = () => modalRef.current ? modalRef.current.close() : null;

  function handleClose() {
    close();
    cancel();
  }

  function handleEdit() {
    close();
    edit({ id: user.id, name, email, gender, status });
  }

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">Edit user</h3>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <label className="label">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            className="input w-full"
            placeholder="Name"
            required
          />

          <label className="label">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input validator w-full"
            type="email"
            required
          />

          <label className="label">Gender</label>
          <div className="flex gap-4">
            <input
              checked={gender === 'male'}
              onChange={() => setGender('male')}
              type="radio"
              name="gender"
              aria-label="Male"
              className="btn btn-outline w-32"
            />
            <input
              checked={gender === 'female'}
              onChange={() => setGender('female')}
              type="radio"
              name="gender"
              aria-label="Female"
              className="btn btn-outline w-32"
            />
          </div>

          <label className="label">Status</label>
          <div className="flex gap-4">
            <input
              checked={status === 'active'}
              onChange={() => setStatus('active')}
              type="radio"
              name="status"
              aria-label="Active"
              className="btn btn-outline w-32"
            />
            <input
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
              type="radio"
              name="status"
              aria-label="Inactive"
              className="btn btn-outline w-32"
            />
          </div>
        </fieldset>
        <div className="modal-action">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EditionModal;
