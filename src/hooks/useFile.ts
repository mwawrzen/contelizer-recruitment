import { useState } from "react";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export function useFile(
  type: string = 'text/plain',
  maxSize: number = 1000000
) {

  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState<number>(0);

  function updateProgress(e: ProgressEvent) {
    if (e.lengthComputable) {
      const percentLoaded = Math.round((e.loaded / e.total) * 100);
      setProgress(percentLoaded);
    }
  }

  function download() {

    if (!file) {
      setError('No file');
      return;
    }

    if (!content) {
      setError('Problem with file content');
      return;
    }

    const data = content;
    const blob = new Blob([data], { type: 'text/plain' });
    const fileURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.href = fileURL;
    downloadLink.download = 'new_file.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  function upload() {

    if (!file) {
      setError('No file');
      return;
    }

    setProgress(0);
    setStatus('uploading');

    const reader = new FileReader();

    reader.onerror = (error) => {
      console.error(error);
    }

    reader.onprogress = updateProgress;

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      setContent(content);
      setStatus('success');
    };

    reader.readAsText(file);
  }

  function inputFile(file: File) {

    if (!file) {
      setError('No file');
      return;
    }

    setFile(null);
    setContent(null);
    setError(null);
    setProgress(0);
    setStatus('idle');

    if (file.type !== type) {
      setError('Wrong file type. Only text files are allowed.');
      return;
    }
    if (file.size > maxSize) {
      setError('File is too big. Max size is 10MB.');
      return;
    }

    setFile(file);
  }

  function reset() {
    setError(null);
    setFile(null);
    setContent(null);
    setProgress(0);
  }

  return {
    setFile: (file: File) => inputFile(file),
    setContent: (text: string) => setContent(text),
    upload,
    download,
    reset,
    content,
    status,
    progress,
    error,
    isFile: !!file
  };
};
