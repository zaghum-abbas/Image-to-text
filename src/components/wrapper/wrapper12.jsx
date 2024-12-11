import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import mammoth from "mammoth";
import "tailwindcss/tailwind.css";

const convertToPdf = async (file) => {
  const fileType = file.type;

  if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    page.drawText(result.value, {
      x: 50,
      y: height - 50,
      maxWidth: width - 100,
      fontSize: 12,
    });

    return pdfDoc.save();
  }

  if (fileType === "text/plain") {
    const textContent = await file.text();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    page.drawText(textContent, {
      x: 50,
      y: height - 50,
      maxWidth: width - 100,
      fontSize: 12,
    });

    return pdfDoc.save();
  }

  if (fileType === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    return arrayBuffer;
  }

  throw new Error(
    "Unsupported file type. Please upload a .docx, .txt, or .pdf file."
  );
};

const App = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".docx, .doc, .txt, .pdf",
  });

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

  const handleDownloadClick = () => {
    if (pdfFile) {
      const blob = new Blob([pdfFile], { type: "application/pdf" });
      saveAs(blob, "converted-file.pdf");
    }
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">Word to PDF</h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        An online Word to PDF converter is free and accurately converts DOC
        files to PDF format.<br/> Use this tool to convert Word documents to PDF
        files with one click
      </p>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-[360px] px-5 py-5 bg-white border-gray-300 rounded-[25px]
         text-center shadow-lg hover:shadow-xl transition duration-300 border-2 border-dashed">
          <div className="flex flex-col items-center gap-6 py-10">
            <div
              {...getRootProps()}
              className="border border-gray-300 rounded px-4 py-2 cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                Drag & drop a file here, or click to select one
              </p>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={handleConvertClick}
              disabled={isConverting || !file}
              className={`bg-blue-500 text-white py-2 px-4 rounded ${
                isConverting ? "bg-gray-500" : "hover:bg-blue-600"
              }`}
            >
              {isConverting ? <span>Converting...</span> : <span>Convert</span>}
            </button>

            {pdfFile && (
              <button
                onClick={handleDownloadClick}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
