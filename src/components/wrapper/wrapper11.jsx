import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QrScanner from "qr-scanner";

const QrCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      toast.error("Input cannot be empty! Please enter some text or a URL.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    setQrCode(trimmedInput);
    setIsGenerated(true);
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const canvas = document.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  };

  const handleClear = () => {
    setInputValue("");
    setQrCode("");
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
          toast.success("QR code decoded successfully!", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } catch (error) {
          toast.error("Invalid QR code image!", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    toast.success("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">QR Code Scanner</h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        Our QR code scanner online allows you to scan any code in seconds.{" "}
        <br />
        You can upload QR codes or use the webcam to scan and decode them
        directly.
      </p>
      <div className="container mx-auto px-4 flex flex-wrap justify-center items-start mt-4">
        <div className="w-full h-[360px] px-5 py-5 bg-white rounded-[25px]
         text-center shadow-lg hover:shadow-xl transition duration-300 flex border-dashed border-2 gap-4 items-center">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-white px-5 py-5 rounded-[25px] shadow-lg border-2 border-dashed">
              <input
                type="text"
                placeholder="Enter URL or text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleGenerate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition hover:scale-105 focus:ring-2 focus:ring-blue-500"
                >
                  Generate
                </button>
                <button
                  onClick={handleClear}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition hover:scale-105 focus:ring-2 focus:ring-red-500"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-white px-5 py-5 rounded-[25px] shadow-lg border-2 border-dashed">
              <div className="flex flex-col gap-4">
                <label className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition hover:scale-105 cursor-pointer">
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
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition hover:scale-105 focus:ring-2 focus:ring-purple-500"
                  >
                    Copy
                  </button>
                )}
                <button
                  onClick={handleDownload}
                  className={`${
                    isGenerated ? "bg-green-500" : "bg-gray-300"
                  } text-white px-4 py-2 rounded-lg hover:bg-green-600 transition hover:scale-105 focus:ring-2 focus:ring-green-500`}
                  disabled={!isGenerated}
                >
                  Download
                </button>
              </div>
              {qrCode && (
                <div className="mt-4 flex justify-center">
                  <QRCodeCanvas value={qrCode} size={200} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCodeGenerator;
