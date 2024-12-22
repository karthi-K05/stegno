import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const FileUpload = ({ onFileSelect, label }: FileUploadProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="mt-2">
        <label className="flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
          <Upload className="h-12 w-12 text-gray-400" />
          <span className="mt-2 text-base">Click or drag photo to upload</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onFileSelect}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;