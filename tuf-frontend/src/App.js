import Page2 from "./Page2";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from "./Page1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />{" "}
        <Route path="submissions" element={<Page2 />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
