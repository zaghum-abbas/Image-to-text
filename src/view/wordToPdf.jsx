import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import mammoth from "mammoth";
import "tailwindcss/tailwind.css";

// Function to convert Word file content to PDF
const convertToPdf = async (file) => {
  const fileType = file.type;

  // Handling .docx files with mammoth.js
  if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileType === "application/msword") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    // Create PDF from extracted text
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);  // Define page size
    const { width, height } = page.getSize();
    page.drawText(result.value, {
      x: 50, 
      y: height - 50,
      maxWidth: width - 100, // To make sure the text fits in the page width
      fontSize: 12,
    });

    return pdfDoc.save();  // Return the PDF bytes
  }

  // Handling .txt files
  if (fileType === "text/plain") {
    const textContent = await file.text();

    // Create PDF from text
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Define page size
    const { width, height } = page.getSize();
    page.drawText(textContent, {
      x: 50,
      y: height - 50,
      maxWidth: width - 100,  // To make sure the text fits in the page width
      fontSize: 12,
    });

    return pdfDoc.save();  // Return the PDF bytes
  }

  // Handling PDF files (No conversion needed for PDF files)
  if (fileType === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    return arrayBuffer; // Directly return the PDF file as is
  }

  throw new Error("Unsupported file type. Please upload a .docx, .txt, or .pdf file.");
};

const App = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null); // Reset error if a new file is uploaded
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".docx, .doc, .txt, .pdf", // Accepted file types
  });

  // Handle the convert click
  const handleConvertClick = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);

    try {
      const pdfBytes = await convertToPdf(file);
      setPdfFile(pdfBytes);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConverting(false);
    }
  };

  // Handle the download click
  const handleDownloadClick = () => {
    if (pdfFile) {
      const blob = new Blob([pdfFile], { type: "application/pdf" });
      saveAs(blob, "converted-file.pdf");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-xl font-semibold">File to PDF Converter</h1>

      {/* File Upload */}
      <div
        {...getRootProps()}
        className="border border-gray-300 rounded px-4 py-2 cursor-pointer text-center"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop a file here, or click to select one</p>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Convert Button */}
      <button
        onClick={handleConvertClick}
        disabled={isConverting || !file}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${isConverting ? "bg-gray-500" : "hover:bg-blue-600"}`}
      >
        {isConverting ? <span>Converting...</span> : <span>Convert</span>}
      </button>

      {/* Download Button */}
      {pdfFile && (
        <button
          onClick={handleDownloadClick}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default App;