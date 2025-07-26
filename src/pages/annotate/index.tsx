'use client';

import React, { useState } from 'react';
import { Toolbar, AnnotationCanvas, FileUploader } from '@/components';

const AnnotatePage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [mode, setMode] = useState<'draw' | 'move' | 'select' | 'comment' | 'delete'>('draw');

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <Toolbar mode={mode} setMode={setMode} />

      {!imageSrc ? (
        <div className="flex items-center justify-center h-[80vh]">
          <FileUploader onFileSelect={handleFileSelect} />
        </div>
      ) : (
        <div className="mt-4 border rounded-md shadow bg-white overflow-hidden">
          <AnnotationCanvas imageSrc={imageSrc} mode={mode} />
        </div>
      )}
    </div>
  );
};

export default AnnotatePage;
