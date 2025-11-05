import { useRef, type ChangeEvent } from "react";

type FileInputProps = {
  isEmpty: boolean;
  changeAction: (file: File) => void;
};

function FileInput({ isEmpty, changeAction }: FileInputProps) {

  const ref = useRef<HTMLInputElement | null>(null);

  if (isEmpty && ref.current)
    ref.current.value = '';

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files)
      changeAction(e.target.files[0])
  }

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pick a text file</legend>
        <input
          ref={ref}
          type="file"
          accept=".txt"
          className="file-input file-input-accent"
          onChange={handleChange}
        />
        <label className="label">Max size 10MB</label>
      </fieldset>
    </div>
  );
}

export default FileInput;
