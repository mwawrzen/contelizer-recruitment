import Paragraph from "./Paragraph";
import Alert from "../components/Alert";
import { shuffleLettersInText } from "../utils/shuffle-letters";
import FileInput from "./FileInput";
import Button from "./Button";
import Progress from "./Progress";
import { useFile } from "../hooks/useFile";

function FileFormPage() {

  const {
    isFile,
    setFile,
    upload,
    content,
    setContent,
    status,
    progress,
    error
  } = useFile();

  function shuffleText() {
    if (!content)
      return null;
    const shuffledText = shuffleLettersInText(content);
    setContent(shuffledText);
  }

  return (
    <section className="flex flex-col items-center gap-4">
      {error && <Alert message={error} />}
      <FileInput
        changeAction={setFile}
      />
      {isFile && <Progress value={progress} />}
      {
        isFile && status !== 'uploading' &&
          <Button text="Upload" onClick={upload} />
      }
      {
        isFile && status === 'success' &&
          <Button text="Shuffle" onClick={shuffleText} accent />
      }
      <Paragraph text={content} />
    </section>
  );
}

export default FileFormPage;
