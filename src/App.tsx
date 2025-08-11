import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PhotoDetail from "./pages/photoDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
