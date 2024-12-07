import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";

const pdfToWordConverter = () => {
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConverted, setIsConverted] = useState(false);

  const sanitizeText = (text) => {
    return text.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfText(""); 
      setIsConverted(false);
      setLoading(false);
      const pdfData = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item) => item.str).join(" ") + "\n";
      }
      setPdfText(sanitizeText(text));
    }
  };

  const convertToWord = async () => {
    if (pdfText) {
      setLoading(true); 
      setTimeout(() => {
        setIsConverted(true); 
        setLoading(false);
      }, 1500); 
    } else {
      alert("Please upload a valid PDF file first!");
    }
  };

  const downloadWordFile = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: pdfText,
                  font: "Arial",
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "converted-file.docx");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">PDF to Word Converter</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={convertToWord}
        className={`px-4 py-2 mb-4 flex items-center justify-center ${
          pdfText ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-gray-300"
        } rounded-lg`}
        disabled={!pdfText || loading}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
            Converting...
          </div>
        ) : (
          "Convert to Word"
        )}
      </button>
      {isConverted && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-2">Converted Text:</h2>
          <p className="text-gray-700 text-sm overflow-y-scroll max-h-40 break-words">
            {pdfText}
          </p>
        </div>
      )}
      {isConverted && (
        <button
          onClick={downloadWordFile}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Download Word File
        </button>
      )}
    </div>
  );
};

export default pdfToWordConverter;