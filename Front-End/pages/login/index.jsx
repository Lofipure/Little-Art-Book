import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Head from "next/head"

import { Input, Button, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "../../styles/LoginAndRegister.css";

import axios from "axios";
const baseURL = "http://localhost:18081"

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const loginIn = () => {
        axios.post(baseURL + '/user/login', { email: email, password })
            .then((res) => {
                if (res.data == "NOUSER") {
                    message.error("用户不存在，请注册");
                    setTimeout(() => {
                        location.href = "/register";
                    }, 1000);
                } else if (res.data == "YES") {
                    message.success("登录成功，正在跳转");
                    localStorage.setItem("email", email);
                    setTimeout(() => {
                        location.href = "/main/showAll";
                    }, 1000);
                } else {
                    message.warning("密码错误");
                }
                console.log(res)
            })

    }

    return (
        <div>
            <Head>
                <title>小艺书/登陆</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className={"main-container"}>
                <div className="login-box">
                    <Form>
                        <Form.Item name="email" rules={[
                            {
                                required: true,
                                message: "请输入邮箱"
                            }
                        ]}>
                            <Input type="text"
                                placeholder="邮箱"
                                size="large"
                                prefix={<UserOutlined />}
                                onChange={(e) => { setemail(e.target.value) }}></Input>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="密码"
                                size="large"
                                prefix={<LockOutlined />}
                                onChange={(e) => { setPassword(e.target.value) }}></Input.Password>
                        </Form.Item>
                        <Form.Item>
                            <a className="forget-link">忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                className="login-in-btn"
                                onClick={loginIn}>登陆</Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    )
}

export default Login;