import { useRef, useState, type ChangeEvent } from "react";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

function FileFormPage() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isFileTypeError, setIsFileTypeError] = useState<boolean>(false);
  const [status, setStatus] = useState<UploadStatus>('idle');

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {

    if (!e.target.files)
      return;

    setFile(e.target.files[0]);

    // const reader = new FileReader();

    // reader.onload = (e: ProgressEvent<FileReader>) => {
    //   const content = e.target?.result as string;
    //   setFileContent(content);
    //   // console.log(content.split('\n').map(line => line.trim()));
    // }

    // reader.onerror = (error): void => {
    //   console.error('Error reading file:', error);
    //   alert('Error reading file.');
    // };

    // reader.readAsText(file);
  }

  async function handleFileUpload() {

    if (!file)
      return;

    if (file.type !== 'text/plain') {
      setIsFileTypeError(true);
      if (inputRef.current)
        inputRef.current.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      setFileContent(content);
      console.log(content.split('\n').map(line => line.trim()));
    };

    reader.readAsText(file);
  }

  return (
    <section className="flex flex-col items-center gap-4">
      { isFileTypeError && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>Only text files can be uploaded.</span>
        </div>
      )}
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Pick a text file</legend>
          <input
            ref={inputRef}
            type="file"
            accept=".txt"
            className="file-input file-input-accent"
            onChange={handleFileChange}
            onClick={() => setIsFileTypeError(false)}
          />
          {/* <label className="label">Max size 2MB</label> */}
        </fieldset>
      </div>
      {
        file && status !== 'uploading' &&
          <button
            className="btn btn-wide"
            onClick={handleFileUpload}
          >
            Randomize
          </button>
      }
      { file && (
        <div className="m-4 text-sm">
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File type: {file.type}</p>
        </div>
      )}
      {
        fileContent.length !== 0 && (
          <section className="text-left">
            {
              fileContent.split('\n').map(line => line.trim()).map((line, i) => (
                line.length ? <p key={i}>{line}</p> : <br key={i} />
              ))
            }
          </section>
        )
      }
    </section>
  );
}

export default FileFormPage;
