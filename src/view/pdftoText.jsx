import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as pdfjs from "pdfjs-dist/build/pdf";

// Set workerSrc to use the CDN-hosted worker script
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfTextExtractor = () => {
  const [pdfFile, setPdfFile] = useState(null); // Store the uploaded PDF file
  const [pdfText, setPdfText] = useState("");  // Store extracted text
  const [loading, setLoading] = useState(false); // Loading state for extraction

  const extractTextFromPDF = async () => {
    if (!pdfFile) return; // Ensure there's a file before extraction

    try {
      setLoading(true);
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      setPdfText(extractedText);
    } catch (error) {
      console.error("Error extracting text: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setPdfText(""); // Reset extracted text on new file upload
  };

  const handleDownloadText = () => {
    const blob = new Blob([pdfText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "extracted-text.txt");
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700">PDF Text Extractor</h1>

      {/* File Upload */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Select PDF File
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Convert Button */}
      <button
        onClick={extractTextFromPDF}
        className={`bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 ${
          !pdfFile && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!pdfFile || loading}
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {/* Extracted Text Display */}
      {pdfText && (
        <textarea
          className="w-full h-60 p-4 bg-white border border-gray-300 rounded"
          value={pdfText}
          readOnly
        />
      )}

      {/* Download Button */}
      <button
        onClick={handleDownloadText}
        className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${
          !pdfText && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!pdfText}
      >
        Download Text
      </button>
    </div>
  );
};

export default PdfTextExtractor;