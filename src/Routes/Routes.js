import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import RepoData from "../Components/RepoData";
import UserData from "../Components/UserData";
import FooterBar from "../Layout/FooterBar";
import HeaderBar from "../Layout/HeaderBar";

const { Header, Content, Footer } = Layout;

const Routes = () => {
  return (
    <>
      <Router>
        <Layout className="layout">
          <Header>
            <HeaderBar />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Switch>
              <Route path="/" exact component={UserData} />
              <Route path="/:Id" exact component={RepoData} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <FooterBar></FooterBar>
          </Footer>
        </Layout>
      </Router>
    </>
  );
};

export default Routes;
