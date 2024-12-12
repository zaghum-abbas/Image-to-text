const routes = [
  { path: "/", component: () => import("../view/imagetoText") },
  { path: "/jpg-to-word", component: () => import("../view/jpgtoWord") },
  { path: "/pdf-to-text", component: () => import("../view/pdftoText") },
  { path: "/pdf-to-word", component: () => import("../view/pdfToWord") },
  { path: "/image-translator", component: () => import("../view/imageTranslator") },
  { path: "/image-to-pdf", component: () => import("../view/imageToPdf") },
  { path: "/word-to-pdf", component: () => import("../view/wordToPdf") },
  { path: "/text-to-pdf", component: () => import("../view/textToPdf") },
  { path: "/text-to-word", component: () => import("../view/textToWord") },
  { path: "/invert-image", component: () => import("../view/invertImage") },
  { path: "/qr-code-scanner", component: () => import("../view/qrCodeScanner") },
  { path: "/pdf-to-jpg", component: () => import("../view/pdfToJpg") },
  { path: "/text-to-image", component: () => import("../view/textToImages") },
  { path: "/login", component: () => import("../components/auth/loginForm") },
  { path: "/register", component: () => import("../components/auth/registerForm") },
  { path: "/profile", component: () => import("../view/profile") },
];

export default routes;