type ButtonProps = {
  text: string;
  onClick: () => void;
  accent?: boolean;
};

function Button({ text, onClick, accent = false }: ButtonProps) {
  return (
    <button
      className={`btn btn-wide ${accent ? 'btn-accent' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
