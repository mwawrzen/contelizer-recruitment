import Alert from "@/components/Alert";
import Button from "@/components/Button";
import FileInput from "@/components/file-form/FileInput";
import Paragraph from "@/components/file-form/Paragraph";
import Progress from "@/components/file-form/Progress";
import { shuffleLettersInText } from "@/utils/shuffle-letters";
import { useFile } from "@/hooks/useFile";

function FileFormPage() {

  const {
    isFile,
    setFile,
    upload,
    download,
    reset,
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
        isEmpty={!isFile}
        changeAction={setFile}
      />
      {isFile && <Progress value={progress} />}
      <div className="flex gap-4">
        {
          isFile && status !== 'uploading' &&
            <Button text="Reset" onClick={reset} type="error" />
        }
        {
          isFile && status !== 'uploading' &&
            <Button text="Upload" onClick={upload} type="primary" />
        }
        {
          isFile && status === 'success' && (
            <>
              <Button text="Shuffle" onClick={shuffleText} type="success" />
              <Button text="Download" onClick={download} />
            </>
          )
        }
      </div>
      <Paragraph text={content} />
    </section>
  );
}

export default FileFormPage;
