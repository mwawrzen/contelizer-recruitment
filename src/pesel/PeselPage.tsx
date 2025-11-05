import { useState, type ChangeEvent } from "react";
import { validatePESEL } from "../utils/validate-pesel";
import { PeselError } from "../utils/types";

type ErrorType = {
  code: PeselError;
  message: string;
};

const errors: ErrorType[] = [
  { code: PeselError.LENGTH, message: 'PESEL should contain exactly 11 digits.' },
  { code: PeselError.CHECK_DIGIT, message: 'Check digit is wrong.' },
  { code: PeselError.DATE, message: 'Wrong date format.' }
];

function PeselPage() {

  const [pesel, setPesel] = useState<string>('');
  const [error, setError] = useState<ErrorType | undefined>();
  const [isOk, setIsOk] = useState<boolean>(false);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.match(/^(\d{0,11})?$/))
      setPesel(value);
  }

  function validateInput() {
    const result = validatePESEL(pesel);
    if (result)
      setError(errors.find(error => error.code === result));
    else
      setIsOk(true);
  }

  return (
    <section className="flex flex-col items-center gap-4 mt-4 w-xl">
      <input
        autoFocus
        type="text"
        className="input input-xl"
        placeholder="Enter PESEL"
        value={pesel}
        onChange={handleInput}
        onFocus={() => { setError(undefined); setIsOk(false)}}
      />
      <button
        className="btn btn-primary btn-wide"
        disabled={!!!pesel.length}
        onClick={validateInput}
      >
        Validate
      </button>
      { error && (
        <div role="alert" className="alert alert-error w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
      { isOk && (
        <div role="alert" className="alert alert-success w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>PESEL is correct :)</span>
        </div>
      )}
    </section>
  );
}

export default PeselPage;
