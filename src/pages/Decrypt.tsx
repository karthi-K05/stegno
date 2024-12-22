import React, { useState } from 'react';
import { Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Decrypt = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('File isn\'t chosen');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDecrypt = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:8080/decryption/decrypt', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data);
      } catch (err) {
        setError('An error occurred while decrypting the image.');
        console.error('Decryption error:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please select a file to upload.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Decrypt Photo</h2>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-xl mb-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Encrypted Photo
          </label>
          <div className="mt-2">
            <label className="flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
              <Upload className="h-12 w-12 text-gray-400" />
              <span className="mt-2 text-base">Click or drag encrypted photo to upload</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>

        {preview && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Selected File Preview:</h3>
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Encrypted Data
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={6}
            value={message}
            readOnly
            placeholder="Encrypted data will appear here..."
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleDecrypt}
          disabled={!selectedFile || isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            selectedFile && !isLoading
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Decrypting...' : 'Decrypt Photo'}
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <Link
          to="/encrypt"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 
          text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all shadow-md 
          hover:shadow-lg"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Encrypt
        </Link>
        <Link
          to="/"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 
          text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md 
          hover:shadow-lg"
        >
          Go to Home
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Decrypt;
