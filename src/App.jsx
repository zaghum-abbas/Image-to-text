import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import LoginForm from "./components/auth/loginForm";
import RegisterForm from "./components/auth/registerForm";
import Profile from "./view/profile";
// import CheckAuth from "./components/common/checkAuth";
import ImageToText from "./view/imagetoText";
import JpgToWord from "./view/jpgtoWord";
import PDFToTextConverter from './view/pdftoText';
import PDFToWord from './view/pdfToWord';
import ImageTranslator from './view/imageTranslator';
import ImageToPdf from './view/imageToPdf';
import WordToPdf from './view/wordToPdf';
import TextToPdf from './view/textToPdf';
import TextToWord from './view/textToWord';
import InvertImage from './view/invertImage';
import QrScanner from './view/qrCodeScanner';
import PdfToJpg from './view/pdfToJpg';
import TextToImage from './view/textToImages';

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   setIsAuthenticated(!!token);
  // }, []);

  return (
    <>
      {/* <CheckAuth isAuthenticated={isAuthenticated}> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageToText />} />
          <Route path="/jpg-to-word" element={<JpgToWord />} />
          <Route path="/pdf-to-text" element={<PDFToTextConverter/>} />
          <Route path="/pdf-to-word" element={<PDFToWord/>} />
          <Route path="/image-translator" element={<ImageTranslator/>} />
          <Route path="/image-to-pdf" element={<ImageToPdf/>} />
          <Route path="/word-to-pdf" element={<WordToPdf/>} />
          <Route path="/text-to-pdf" element={<TextToPdf/>} />
          <Route path="/text-to-word" element={<TextToWord/>} />
          <Route path="/invert-image" element={<InvertImage/>} />
          <Route path="/qr-code-scanner" element={<QrScanner/>} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg/>} />
          <Route path="/text-to-image" element={<TextToImage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      {/* </CheckAuth> */}
    </>
  );
};

export default App;