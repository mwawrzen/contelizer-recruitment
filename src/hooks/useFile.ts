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

  function upload() {

    if (!file) {
      console.error('No file');
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
    reset,
    content,
    status,
    progress,
    error,
    isFile: !!file
  };
};
