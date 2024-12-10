import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QrScanner from 'qr-scanner';

const QrCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      toast.error('Input cannot be empty! Please enter some text or a URL.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      return;
    }

    setQrCode(trimmedInput); // Accept any non-empty input
    setIsGenerated(true);
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const canvas = document.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'qrcode.png';
    link.click();
  };

  const handleClear = () => {
    setInputValue('');
    setQrCode('');
    setIsGenerated(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = async () => {
        try {
          const result = await QrScanner.scanImage(image);
          setInputValue(result);
          toast.success('QR code decoded successfully!', {
            position: 'bottom-right',
            autoClose: 3000,
          });
        } catch (error) {
          toast.error('Invalid QR code image!', {
            position: 'bottom-right',
            autoClose: 3000,
          });
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    toast.success('Copied to clipboard!', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">QR Code Generator</h1>
      <div className="w-full max-w-md bg-white p-6 shadow rounded-lg">
        <input
          type="text"
          placeholder="Enter URL or text..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between mb-4">
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Generate
          </button>
          <button
            onClick={handleDownload}
            className={`${
              isGenerated ? 'bg-green-500' : 'bg-gray-300'
            } text-white px-4 py-2 rounded hover:bg-green-600 transition`}
            disabled={!isGenerated}
          >
            Download
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear All
          </button>
        </div>
        <div className="flex items-center mb-4">
          <label className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition cursor-pointer">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          {inputValue && (
            <button
              onClick={handleCopy}
              className="ml-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Copy
            </button>
          )}
        </div>
        {qrCode && (
          <div className="flex justify-center">
            <QRCodeCanvas value={qrCode} size={200} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodeGenerator;