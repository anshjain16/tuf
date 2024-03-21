import { Form, Input, Cascader } from "antd";
import Editor from "@monaco-editor/react";
import { encode as base64_encode, decode } from "base-64";
import axios from "axios";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Button } from "antd/es/radio";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";

function Page1() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
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
    setLanguage(value[0]);
    console.log(value[0]);
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

  const handleFormSubmit = async () => {
    setLoading(true);
    const base64code = base64_encode(code);
    console.log(language);
    let languageCode = languageOptions.find((l) => l.value === language).id;
    console.log(languageCode);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        wait: "true",
      },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "a153a9a044mshceeb2d2e39060a2p151ab3jsn4eb3661acc00",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: languageCode,
        source_code: base64code,
        stdin: base64_encode(stdin),
      },
    };

    try {
      const res1 = await axios.request(options);
      console.log(res1.data);
      const res2 = await fetch(
        `https://tuf-nfng.onrender.com/api/v1/submission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            source_code: base64code,
            stdin: stdin,
            language: language,
            output: decode(res1.data.stdout),
            code_snippet: code.slice(0, 97) + "...",
          }),
        }
      );
      console.log(res2);
      navigate("/submissions");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    // const tempOut = "aGVsbG8gV29ybGQ=\n";
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full pl-16 pr-16 pt-5 pb-5 bg-stone-300">
        <div className="text-3xl font-bold font-mono">Create a submission</div>
        <div>
          <Link to="/submissions">
            All submissions <ArrowRightOutlined />
          </Link>
        </div>
      </div>
      {/* <Button type="primary">click me</Button> */}
      <div className="p-5">
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
            <Input
              className="rounded-md"
              onChange={handleUsernameChange}
            ></Input>
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
            defaultValue={language == "python" ? "# code here" : "// code here"}
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
            <Button type="submit" onClick={handleFormSubmit} disabled={loading}>
              {loading === true ? <LoadingOutlined></LoadingOutlined> : <></>}
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Page1;
