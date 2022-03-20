import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import styled from "./UserData.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { Breadcrumb, Button, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";

const UserData = (props) => {
  const [usersData, setUsersData] = useState([]);
  const [usnSearch, setUsnSearch] = useState(undefined);
  const [reset, setReset] = useState(false);

  useEffect(async () => {
    const result = await axios
      .get("https://api.github.com/users")
      .then((result) => {
        setUsersData(result.data);
      });
  }, [reset]);

  const usernameHandler = (event) => {
    event.preventDefault();
    setUsnSearch(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    let username = usnSearch;
    let usersArray = [];
    if (username.length != 0) {
      usersData.map((item, key) => {
        if (item.login.includes(username)) {
          // console.log(item);
          usersArray.push(item);
        }
      });
      setUsersData(usersArray);
    }
    setUsnSearch("");
  };

  const resetHandler = (event) => {
    event.preventDefault();
    if (reset === true) {
      setReset(false);
    } else setReset(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: 100,
    },
    {
      title: "Username",
      dataIndex: "login",
      sorter: (a, b) => a.login.localeCompare(b.login),
    },
    {
      title: "Action",
      dataIndex: "login",
      render: (res, index) => (
        <Link to={`/${res}`}>
          <Button type="primary">Detail</Button>
        </Link>
      ),
    },
  ];

  const data = usersData;

  const onChange = (pagination, sorter, extra) => {
    // console.log("params", pagination, sorter, extra);
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <section className="site-layout-content">
        <div className={styled.contents}>
          <form className={styled.searchBar}>
            <input type="text" onChange={usernameHandler} value={usnSearch} />
            <Tooltip title="search" onClick={searchHandler}>
              <Button
                type="primary"
                shape="circle"
                icon={<AiOutlineSearch />}
                className={styled.btn}
              />
            </Tooltip>
            <Tooltip title="reset" onClick={resetHandler}>
              <Button
                type="primary"
                shape="circle"
                icon={<BiReset />}
                className={styled.btn}
              />
            </Tooltip>
          </form>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </section>
    </>
  );
};

export default UserData;
