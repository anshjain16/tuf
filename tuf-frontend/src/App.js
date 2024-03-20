import { Form, Input, Cascader } from "antd";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Button } from "antd/es/radio";

function App() {
  const languageOptions = [
    {
      value: "cpp",
      label: "C++ (GCC 9.2.0)",
      id: 54,
    },
    {
      value: "python",
      label: "Python (3.8.1)",
      id: 71,
    },
    {
      value: "java",
      label: "Java (JDK 17.0.6)",
      id: 91,
    },
    {
      value: "javascript",
      label: "JavaScript (Node.js 18.15.0)",
      id: 93,
    },
  ];

  const onLanguageChange = (value) => {
    setLanguage(value);
    console.log(value);
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleStdinChange = (e) => {
    setStdin(e.target.value);
  };

  const handleFormSubmit = () => {
    console.log("working");
  };

  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");

  return (
    <div className="App">
      <div>hello</div>
      {/* <Button type="primary">click me</Button> */}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Username">
          <Input className="rounded-md" onChange={handleUsernameChange}></Input>
        </Form.Item>
        <span className="p-5">Select Language: </span>
        <Cascader
          options={languageOptions}
          onChange={onLanguageChange}
          placeholder="select language"
          className="width-8"
          defaultValue={languageOptions[0].value}
        ></Cascader>
        <br></br>
        <br></br>
        <span className="p-5">Code: </span>
        <Editor
          height="70vh"
          // defaultLanguage={language}
          defaultValue="write your code here"
          width="50vw"
          className="p-5"
          theme="vs-dark"
          language={language}
          onChange={handleEditorChange}
        />
        <Form.Item label="stdin">
          <TextArea onChange={handleStdinChange}></TextArea>
        </Form.Item>
        <Form.Item className="p-5">
          <Button type="submit" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
