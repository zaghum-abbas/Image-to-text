import React, { useState } from "react";
import Tesseract from "tesseract.js";
import * as translate from "@vitalets/google-translate-api"; // Correct import

const Translator = () => {
  const [image, setImage] = useState(null);
  const [translatedImage, setTranslatedImage] = useState(null);
  const [language, setLanguage] = useState("ur");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const processImage = async () => {
    if (!image) return;

    setIsProcessing(true);
    try {
      // Step 1: Extract text and positions from the image
      const { data } = await Tesseract.recognize(image, "eng", {
        logger: (info) => console.log(info), // Logs OCR progress
      });

      const { lines } = data; // Extract lines with bounding box data
      const textBlocks = lines.map((line) => ({
        text: line.text,
        bbox: line.bbox,
      }));

      // Step 2: Translate text blocks
      const translatedBlocks = await Promise.all(
        textBlocks.map(async (block) => {
          const translatedText = await translate.default(block.text, {
            to: language,
          });
          return { ...block, translatedText: translatedText.text };
        })
      );

      // Step 3: Draw the original image and overlay translated text
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.src = image;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Style for overlay text
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";

        // Draw translated text at the same positions
        translatedBlocks.forEach((block) => {
          const { translatedText, bbox } = block;
          const { x0, y0 } = bbox; // Use the bounding box coordinates
          ctx.fillText(translatedText, x0, y0);
        });

        // Convert canvas to image
        canvas.toBlob((blob) => {
          const newImage = URL.createObjectURL(blob);
          setTranslatedImage(newImage);
          setIsProcessing(false);
        });
      };
    } catch (error) {
      console.error("Error during processing:", error);
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!translatedImage) return;

    const link = document.createElement("a");
    link.href = translatedImage;
    link.download = "translated-image.png";
    link.click();
  };

  return (
    <div className="py-16 flex items-center justify-center flex-col gap-2 bg-gray-100">
      <h1 className="text-2xl font-bold">Image Translator</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block"
      />

      {image && (
        <div>
          <img src={image} alt="Uploaded" className="w-64 mt-4" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="block w-full mt-4 border p-2 rounded"
          >
            <option value="ur">Urdu</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            {/* Add more languages as needed */}
          </select>
          <button
            onClick={processImage}
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Translate and Generate Image"}
          </button>
        </div>
      )}

      {translatedImage && (
        <div>
          <img src={translatedImage} alt="Translated" className="w-64 mt-4" />
          <button
            onClick={downloadImage}
            className="px-4 py-2 mt-4 bg-yellow-500 text-white rounded"
          >
            Download Translated Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Translator;