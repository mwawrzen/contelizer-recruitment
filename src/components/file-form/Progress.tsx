function Progress({ value }: { value: number }) {
  return (
    <progress
      className="progress w-56"
      value={value}
      max="100"
    />
  );
}

export default Progress;
