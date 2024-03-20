import { Form, Input, Cascader } from "antd";
import Editor from "@monaco-editor/react";
import { encode as base64_encode, decode } from "base-64";
import axios from "axios";
import Page2 from "./Page2";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "antd/es/radio";
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
