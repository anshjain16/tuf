import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { encode, decode } from "base-64";
import { CodeOutlined } from "@ant-design/icons";

const Page2 = () => {
  const [submissions, setSubmissions] = useState([]);
  const [modaldata, setmodaldata] = useState([]);
  const columns = [
    {
      title: "timestamp",
      dataIndex: "timestamp",
      width: "20%",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "username",
      dataIndex: "username",
      width: "20%",
    },
    {
      title: "language",
      dataIndex: "language",
      width: "10%",
    },

    {
      title: "input",
      dataIndex: "stdin",
      width: "15%",
    },
    {
      title: "output",
      dataIndex: "output",
      width: "15%",
    },
    {
      title: "code",
      dataIndex: "code_snippet",
      render: (index, record) => (
        <Button onClick={() => showModal(record)}>
          <CodeOutlined></CodeOutlined>
        </Button>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getSubmissions = async () => {
    const res1 = await fetch(
      "https://tuf-nfng.onrender.com/api/v1/submission",
      {
        method: "GET",
      }
    );
    const res1Json = await res1.json();
    console.log(res1Json);
    let i = 1;
    res1Json.map((s) => {
      s["code_snippet"] = decode(s.source_code).slice(0, 97);
      s["key"] = i;
      i++;
    });
    setSubmissions(res1Json);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full pl-16 pr-16 pt-5 pb-5 bg-stone-300">
        <div className="text-3xl font-bold font-mono">Submissions</div>
        <div>link to create submission</div>
      </div>
      <div className="p-10">
        <Table columns={columns} dataSource={submissions} onChange={onChange} />
        <Modal
          title="Submission"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{modaldata.code_snippet}</p>
        </Modal>
      </div>
    </div>
  );
};

export default Page2;
