function Paragraph({ text }: { text: string | null}) {

  if (!text)
    return null;

  return (
    <section className="text-left mt-6 w-2xl">
      {
        text.split('\n').map(line => line.trim()).map((line, i) => (
          line.length ? <p key={i}>{line}</p> : <br key={i} />
        ))
      }
    </section>
  );
}

export default Paragraph;
