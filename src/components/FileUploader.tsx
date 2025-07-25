'use client';

import { useRef } from 'react';
import styles from './FileUploader.module.css';

type FileUploaderProps = {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  inputId?: string;
  label?: string;
};

export default function FileUploader({
  onFileSelect,
  accept = 'image/*',
  inputId = 'file-upload',
  label = 'Upload File',
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className={styles.label}>{label}</p>
      <p className={styles.subText}>Drag & drop or click to select</p>

      <input
        id={inputId}
        type="file"
        ref={fileInputRef}
        className={styles.hiddenInput}
        accept={accept}
        onChange={handleChange}
        capture="environment"
      />
    </div>
  );
}
