export const preprocessImage = (imageData) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const grayscale =
          data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
      }
      ctx.putImageData(imageData, 0, 0);
      const threshold = 128;
      const binarizedImage = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const binarizedData = binarizedImage.data;
      for (let i = 0; i < binarizedData.length; i += 4) {
        const value = binarizedData[i] > threshold ? 255 : 0;
        binarizedData[i] = value;
        binarizedData[i + 1] = value;
        binarizedData[i + 2] = value;
      }
      ctx.putImageData(binarizedImage, 0, 0);
      resolve(canvas.toDataURL());
    };

    img.onerror = reject;
    img.src = imageData;
  });
};

export const convertToText = () => {
  if (!imageUrl) {
    toast.error("Please provide a valid image file!");
    return;
  }

  setLoading(true);

  Tesseract.recognize(imageUrl, "eng", {
    logger: (m) => console.log(m),
    tessedit_char_whitelist:
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.!? ",
  })
    .then(({ data: { text } }) => {
      if (text.trim()) {
        setExtractedText(text.trim());
        toast.success("Text extracted successfully!");
        setStep(3);
      } else {
        toast.error("No text could be extracted. Please try another image.");
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("OCR Error:", err);
      toast.error("Failed to extract text. Please try again.");
      setLoading(false);
    });
};

export const clearAll = () => {
  setImageFile(null);
  setImageUrl("");
  setExtractedText("");
  setStep(1);
};

export const copyToClipboard = () => {
  navigator.clipboard.writeText(extractedText);
  toast.success("Text copied to clipboard!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const downloadText = () => {
  const blob = new Blob([extractedText], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "extracted-text.txt");
  toast.success("File downloaded successfully!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};