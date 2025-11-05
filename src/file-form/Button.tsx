type ButtonProps = {
  text: string;
  onClick: () => void;
  type?: string;
};

function Button({ text, onClick, type = 'neutral' }: ButtonProps) {
  return (
    <button
      className={`btn btn-${type}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
