import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ImagePreview from '../components/ImagePreview';
import axios from 'axios';

const Encrypt = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [encryptedText, setEncryptedText] = useState<string | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEncrypt = async () => {
    if (selectedFile && encryptionKey) {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('message', encryptionKey);  // Use the correct parameter name

      try {
        const response = await axios.post('http://localhost:8080/encryption/encrypt', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setEncryptedText(response.data.base64Image);  // Access the correct response field
        setPopupVisible(true);
      } catch (err) {
        setError('An error occurred while encrypting the photo.');
        console.error('Encryption error:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please select a file and enter a message.');
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Encrypt Photo</h2>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-xl mb-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          label="Select Photo to Encrypt"
        />

        {preview && (
          <ImagePreview
            src={preview}
            alt="Preview"
            title="Preview:"
          />
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter Data to Encrypt The Photo
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={6}
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            placeholder="Type the message here..."
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleEncrypt}
          disabled={!preview || !encryptionKey || isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            preview && encryptionKey && !isLoading
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
              : 'bg-gray-400 cursor-not-allowed'
          }transition-all shadow-md hover:shadow-lg`}
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Photo'}
        </button>
      </div>

      {popupVisible && (
      <div id="popup-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closePopup}>
        <div id="popup" className="bg-white p-6 rounded-lg shadow-lg relative" style={{ width: '400px', padding: '20px' }}>
          <span className="close absolute top-2 right-2 cursor-pointer" onClick={closePopup}>&times;</span>
          <img id="popup-image" src={`data:image/png;base64,${encryptedText}`} alt="Embedded Image" className="w-full h-auto" />
          <div className="popup-buttons mt-4">
            <a id="download-link" className="download-btn bg-blue-500 text-white py-2 px-4 rounded" href={`data:image/png;base64,${encryptedText}`} download="encrypted-image.png">Download Image</a>
            <button className="cancel-btn bg-gray-500 text-white py-2 px-4 rounded" onClick={closePopup}>Cancel</button>
          </div>
        </div>
      </div>
      )}


      <div className="flex justify-between mt-8">
        <Link
          to="/"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text
          -gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all shadow-md 
          hover:shadow-lg"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        <Link
          to="/decrypt"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 
          text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md 
          hover:shadow-lg"
        >
          Decrypt Photo
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Encrypt;


// import React, { useState } from 'react';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import FileUpload from '../components/FileUpload';
// import ImagePreview from '../components/ImagePreview';
// import axios from 'axios';

// const Encrypt = () => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [encryptedText, setEncryptedText] = useState<string | null>(null);
//   const [encryptionKey, setEncryptionKey] = useState<string>('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEncrypt = async () => {
//     if (selectedFile && encryptionKey) {
//       setIsLoading(true);
//       setError(null);
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('encryptionKey', encryptionKey);  // Use the correct parameter name

//       try {
//         const response = await axios.post('http://localhost:8080/encryption/encrypt', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setEncryptedText(response.data.base64Image);  // Access the correct response field
//       } catch (err) {
//         setError('An error occurred while encrypting the photo.');
//         console.error('Encryption error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setError('Please select a file and enter an encryption key.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8">Encrypt Photo</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <FileUpload
//           onFileSelect={handleFileSelect}
//           label="Select Photo to Encrypt"
//         />

//         {preview && (
//           <ImagePreview
//             src={preview}
//             alt="Preview"
//             title="Preview:"
//           />
//         )}

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Enter Data to Encrypt The Photo
//           </label>
//           <textarea
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             rows={6}
//             value={encryptionKey}
//             onChange={(e) => setEncryptionKey(e.target.value)}
//             placeholder="Enter your encryption key..."
//           />
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
//             {error}
//           </div>
//         )}

//         <button
//           onClick={handleEncrypt}
//           disabled={!preview || !encryptionKey || isLoading}
//           className={`w-full py-2 px-4 rounded-lg text-white ${
//             preview && encryptionKey && !isLoading
//               ? 'bg-indigo-600 hover:bg-indigo-700'
//               : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         >
//           {isLoading ? 'Encrypting...' : 'Encrypt Photo'}
//         </button>

//         {encryptedText && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Encrypted Data:</h3>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-sm font-mono break-all">{encryptedText}</p>
//               <p className="mt-2 text-sm text-gray-600">
//                 Copy this encrypted data to decrypt your photo later.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between mt-8">
//         <Link
//           to="/"
//           className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Home
//         </Link>
//         <Link
//           to="/decrypt"
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           Decrypt Photo
//           <ArrowRight className="h-5 w-5 ml-2" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Encrypt;


// import React, { useState } from 'react';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import FileUpload from '../components/FileUpload';
// import ImagePreview from '../components/ImagePreview';

// const Encrypt = () => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [encryptedText, setEncryptedText] = useState<string | null>(null);
//   const [encryptionKey, setEncryptionKey] = useState<string>('');

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEncrypt = () => {
//     // Simulate encryption by showing the preview data
//     if (preview) {
//       setEncryptedText(preview);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8">Encrypt Photo</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <FileUpload
//           onFileSelect={handleFileSelect}
//           label="Select Photo to Encrypt"
//         />

//         {preview && (
//           <ImagePreview
//             src={preview}
//             alt="Preview"
//             title="Preview:"
//           />
//         )}

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Enter Data to Encrypt The Photo
//           </label>
//           <textarea
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             rows={6}
//             // value={encryptedData}
//             // onChange={(e) => setEncryptedData(e.target.value)}
//             placeholder="Paste the encryption data here..."
//           />
//         </div>


//         {/* <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Encryption Key
//           </label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={encryptionKey}
//             onChange={(e) => setEncryptionKey(e.target.value)}
//             placeholder="Enter your encryption key..."
//           />
//           <p className="mt-1 text-sm text-gray-500">
//             Remember this key - you'll need it to decrypt your photo later.
//           </p>
//         </div> */}

//         <button
//           onClick={handleEncrypt}
//           disabled={!preview || !encryptionKey}
//           className={`w-full py-2 px-4 rounded-lg text-white ${
//             preview && encryptionKey
//               ? 'bg-indigo-600 hover:bg-indigo-700'
//               : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         >
//           Encrypt Photo
//         </button>

//         {encryptedText && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Encrypted Data:</h3>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-sm font-mono break-all">{encryptedText}</p>
//               <p className="mt-2 text-sm text-gray-600">
//                 Copy this encrypted data to decrypt your photo later.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between mt-8">
//         <Link
//           to="/"
//           className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Home
//         </Link>
//         <Link
//           to="/decrypt"
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           Decrypt Photo
//           <ArrowRight className="h-5 w-5 ml-2" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Encrypt;

// import React, { useState } from 'react';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import FileUpload from '../components/FileUpload';
// import ImagePreview from '../components/ImagePreview';
// import axios from 'axios';

// const Encrypt = () => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [encryptedText, setEncryptedText] = useState<string | null>(null);
//   const [encryptionKey, setEncryptionKey] = useState<string>('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEncrypt = async () => {
//     if (selectedFile && encryptionKey) {
//       setIsLoading(true);
//       setError(null);
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('encryptionKey', encryptionKey);

//       try {
//         const response = await axios.post('http://localhost:8080/encryption/encrypt', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setEncryptedText(response.data);
//       } catch (err) {
//         setError('An error occurred while encrypting the photo.');
//         console.error('Encryption error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setError('Please select a file and enter an encryption key.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8">Encrypt Photo</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <FileUpload
//           onFileSelect={handleFileSelect}
//           label="Select Photo to Encrypt"
//         />

//         {preview && (
//           <ImagePreview
//             src={preview}
//             alt="Preview"
//             title="Preview:"
//           />
//         )}

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Enter Data to Encrypt The Photo
//           </label>
//           <textarea
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             rows={6}
//             value={encryptionKey}
//             onChange={(e) => setEncryptionKey(e.target.value)}
//             placeholder="Enter your encryption key..."
//           />
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
//             {error}
//           </div>
//         )}

//         <button
//           onClick={handleEncrypt}
//           disabled={!preview || !encryptionKey || isLoading}
//           className={`w-full py-2 px-4 rounded-lg text-white ${
//             preview && encryptionKey && !isLoading
//               ? 'bg-indigo-600 hover:bg-indigo-700'
//               : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         >
//           {isLoading ? 'Encrypting...' : 'Encrypt Photo'}
//         </button>

//         <button
//           onClick={handleEncrypt}
//           disabled={!preview || !encryptionKey || isLoading}
//           className={`mb-6 p-4 bg-red-50 text-red-600 rounded-lg ${
//             preview && encryptionKey && !isLoading
//               ? 'bg-indigo-600 hover:bg-indigo-700'
//               : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         >
//           {isLoading ? 'Encrypting...' : 'Encrypt Photo'}
//         </button>

        

//         {encryptedText && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Encrypted Data:</h3>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-sm font-mono break-all">{encryptedText}</p>
//               <p className="mt-2 text-sm text-gray-600">
//                 Copy this encrypted data to decrypt your photo later.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between mt-8">
//         <Link
//           to="/"
//           className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Home
//         </Link>
//         <Link
//           to="/decrypt"
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           Decrypt Photo
//           <ArrowRight className="h-5 w-5 ml-2" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Encrypt;
