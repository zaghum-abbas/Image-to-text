import React, { useState } from "react";
import { jsPDF } from "jspdf";

const ImageToPdf = () => {
  const [image, setImage] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); // Base64 URL of the image
        setPdfBlob(null); // Reset the PDF blob when a new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert image to PDF
  const convertToPdf = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setIsConverting(true);

    setTimeout(() => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(image, "JPEG", 10, 10, 190, 0); // Fit the image to A4 width
      const pdfBlob = pdf.output("blob");
      setPdfBlob(pdfBlob);
      setIsConverting(false);
    }, 1000); // Simulate conversion delay for the animation
  };

  // Download the PDF
  const downloadPdf = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "image.pdf";
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Image to PDF</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Preview"
              className="w-full h-48 object-contain border rounded-lg"
            />
          </div>
        )}
        <div className="mt-6 flex flex-col gap-4">
          {/* Convert Button */}
          <button
            onClick={convertToPdf}
            disabled={isConverting}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition ${
              isConverting ? "cursor-not-allowed bg-blue-300" : ""
            }`}
          >
            {isConverting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Converting...
              </div>
            ) : (
              "Convert"
            )}
          </button>

          {/* Download Button */}
          {pdfBlob && (
            <button
              onClick={downloadPdf}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToPdf;