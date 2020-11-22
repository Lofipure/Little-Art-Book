import React, { useState, useEffect } from 'react'
import { Menu, Row, Col } from 'antd';
import { UserAddOutlined, UserOutlined } from "@ant-design/icons"
import "./Navbar.css";

let Navbar = () => {
    return (
        <div className="header">
            <Row type="flex" justify="space-between">
                <Col xs={12} sm={12} md={10} lg={15} xl={12}>
                    <a href="/">
                        <span className="header-logo">小艺书</span>
                    </a>
                </Col>

                <Col className="meun-div" md={14} lg={8} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item icon={<UserOutlined />} key="sign-in">
                            <a href="/login">
                                登陆
                            </a>
                        </Menu.Item>
                        <Menu.Item icon={<UserAddOutlined />} key="sign-up">
                            <a href="/register">
                                注册
                            </a>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar;
