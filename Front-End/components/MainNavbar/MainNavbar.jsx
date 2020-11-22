import React from 'react'
import { Menu, Row, Col } from "antd";

import "./MainNavbar.css";
import { RollbackOutlined, UserOutlined } from "@ant-design/icons"
const MainNavbar = () => {

    return (
        <div className="header">
            <Row type="flex" justify="space-between">
                <Col xs={12} sm={12} md={10} lg={15} xl={12}>
                    <a href="/main/showAll">
                        <span className="header-logo">小艺书</span>
                    </a>
                </Col>

                <Col className="meun-div" md={14} lg={8} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="user" icon={<UserOutlined />} onClick={() => {location.href="/user/main"}}>我的</Menu.Item>
                        <Menu.Item key="login-out" icon={<RollbackOutlined />} onClick={() => { 
                            location.href = "/";
                            localStorage.removeItem("username")
                        }}>退出</Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default MainNavbar;