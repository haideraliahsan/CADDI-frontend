'use client';

import React, { useState } from 'react';
import Toolbar from '@/components/Toolbar';
import AnnotationCanvas from '@/components/AnnotationCanvas';
import FileUploader from '@/components/FileUploader';

const AnnotatePage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [mode, setMode] = useState<string>('draw');

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      <Toolbar mode={mode} setMode={setMode} />

      {!imageSrc ? (
        <div className="flex items-center justify-center h-full">
          <FileUploader onFileSelect={handleFileSelect} />
        </div>
      ) : (
        <div className="relative border rounded-md shadow bg-white overflow-hidden">
          <AnnotationCanvas imageSrc={imageSrc} mode={mode} />
        </div>
      )}
    </div>
  );
};

export default AnnotatePage;
