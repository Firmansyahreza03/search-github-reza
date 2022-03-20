import { Breadcrumb, Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import styled from "./RepoData.module.css";

const RepoData = (props) => {
  const [userRepo, setUserRepo] = useState([]);
  const [detailRepo, setDetailRepo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { Id } = useParams();
  // console.log(Id);

  // Data semua repository
  useEffect(async () => {
    const result = await axios
      .get(`https://api.github.com/users/${Id}/repos`)
      .then((result) => {
        setUserRepo(result.data);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: 100,
    },
    {
      title: "Nama Repository",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Bahasa Pemrograman",
      dataIndex: "language",
      render: (param, index) => {
        // console.log(param);
        if (param == null) {
          return (param = "Tidak Terdefinisi");
        } else return param;
      },
    },
    {
      title: "Action",
      dataIndex: "name",
      render: (res, index) => (
        <>
          <button onClick={showModal} value={res} className={styled.btn}>
            Detail
          </button>
        </>
      ),
    },
  ];

  const data = userRepo;

  const onChange = (pagination, sorter, extra) => {
    // console.log("params", pagination, sorter, extra);
  };

  const showModal = async (event) => {
    event.preventDefault();
    const target = event.target.value;
    // console.log(event.target.value);
    const result = await axios.get(
      `https://api.github.com/repos/${Id}/${target}`
    );
    const dataFull = result.data;
    // console.log(result.data);
    dataFull["date_create"] = dataFull.created_at.slice(0, 10);
    dataFull["date_update"] = dataFull.updated_at.slice(0, 10);
    setDetailRepo(dataFull);
    // console.log(detailRepo);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to={"/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{Id}</Breadcrumb.Item>
        <Breadcrumb.Item>Repository</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <Table columns={columns} dataSource={data} onChange={onChange} />
        <Modal
          title="Detail Repository"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <table className={styled.detailTable}>
            <tr>
              <td className={styled.title}>ID</td>
              <td className={styled.component}>{detailRepo.id}</td>
            </tr>
            <tr>
              <td className={styled.title}>Nama Repository</td>
              <td className={styled.component}>{detailRepo.name}</td>
            </tr>
            <tr>
              <td className={styled.title}>Bahasa yang digunakan</td>
              <td className={styled.component}>{detailRepo.language}</td>
            </tr>
            <tr>
              <td className={styled.title}>Deskripsi</td>
              <td className={styled.component}>{detailRepo.description}</td>
            </tr>
            <tr>
              <td className={styled.title}>Tanggal Dibuat</td>
              <td className={styled.component}>{detailRepo.date_create}</td>
            </tr>
            <tr>
              <td className={styled.title}>Tanggal Diperbarui</td>
              <td className={styled.component}>{detailRepo.date_update}</td>
            </tr>
          </table>
        </Modal>
      </div>
    </>
  );
};

export default RepoData;
