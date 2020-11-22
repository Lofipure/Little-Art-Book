import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Head from "next/head"

import { Form, Input, Button, message } from "antd";
import { MessageOutlined, UserOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";

import "../../styles/LoginAndRegister.css"

import axios from 'axios';

const baseURL = "http://localhost:18081";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        console.log(email, username, telephone, password);
        console.log({ username, password, email, telephone })
        axios.post(baseURL + "/user/createUser", { username, password, email, telephone })
            .then((res) => {
                console.log(res);
                if (res.data == "ALREADYHAVE") {
                    message.warning("用户已存在")
                } else {
                    message.success("注册成功");
                    setTimeout(() => {
                        location.href = '/login';
                    }, 1000)
                }
            })
    }
    return (
        <div>
            <Head>
                <title>小艺书/注册</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="main-container">
                <div className="login-box">
                    <Form initialValues={{ remember: true }}>
                        <Form.Item name="email" rules={[
                            {
                                type: 'email',
                                message: '格式错误'
                            },
                            {
                                required: true,
                                message: '请输入电子邮箱'
                            }
                        ]}>
                            <Input placeholder="电子邮箱"
                                prefix={<MessageOutlined />}
                                size="large"
                                onChange={(e) => { setEmail(e.target.value) }}></Input>
                        </Form.Item>
                        <Form.Item name="nickname" rules={[
                            {
                                required: true,
                                message: '请输入昵称'
                            }
                        ]}>
                            <Input placeholder="昵称"
                                onChange={(e) => { setUsername(e.target.value) }}
                                prefix={<UserOutlined />}
                                size="large"></Input>
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: "请输入电话号码"
                            },
                            {
                                pattern: /1[34578]{2}[0-9]8/g,
                                message: "格式错误"
                            }
                        ]}>
                            <Input placeholder="电话号码"
                                type="text"
                                onChange={(e) => { setTelephone(e.target.value) }}
                                prefix={<PhoneOutlined />}
                                size="large"></Input>
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            {
                                required: true,
                                message: "请输入密码"
                            }
                        ]}>
                            <Input.Password placeholder="请输入密码"
                                prefix={<LockOutlined />}
                                size="large"></Input.Password>
                        </Form.Item>
                        <Form.Item name="confirm" dependencies={['password']} rules={[
                            {
                                required: true,
                                message: "请再输入密码"
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("两次输入不一致")
                                }
                            })
                        ]}>
                            <Input.Password placeholder="请再次输入密码"
                                onChange={(e) => { setPassword(e.target.value) }}
                                prefix={<LockOutlined />}
                                size="large"></Input.Password>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                className="sing-up-btn"
                                onClick={signUp}>立刻注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    )
}

export default Register;