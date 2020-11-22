import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { UserOutlined, PhoneOutlined, MailOutlined, BulbOutlined, SettingOutlined, HeartOutlined } from "@ant-design/icons"
import { Divider, Card, Modal, Input, message } from 'antd'

import Meta from 'antd/lib/card/Meta'
import Works from "../../../components/Wroker/Worker"
import Navbar from "../../../components/MainNavbar/MainNavbar"

import axios from "axios"

import "../../../styles/userGlobal.css"

const baseURL = "http://localhost:18081";


const UserMain = () => {
    const [userInfo, setUserInfo] = useState({});
    const [userWorks, setUserWorks] = useState([]);
    const [visable, setVisable] = useState(false)
    const [newPassword, setNewPassword] = useState(null);
    useEffect(() => {
        axios.get(baseURL + "/user/getInfo?email=" + localStorage.getItem("email"))
        .then(res => {
            let userFromServer = res.data;
            setUserInfo(userFromServer)

            axios.get(baseURL + "/works/getUserWorks?email=" + localStorage.getItem("email"))
            .then(res => {
                let worksInfoFromServer = res.data;
                setUserWorks(worksInfoFromServer)
            })
        })
    }, []);

    const handleOpenModel = () => {
        setVisable(true);
    }
    const handleSubmitChangePassword = () => {
        console.log({ username: userInfo.username, newpassword: newPassword });
        axios.post(baseURL + "/user/changePassword", { email: userInfo.email, newPassword: newPassword })
            .then((res) => {
                if (res == "ERROR") {
                    message.err("修改失败，请检查网络环境");
                } else {
                    message.success("修改成功，请重新登录");
                    setVisable(false);
                    setTimeout(() => {
                        localStorage.removeItem("email");
                        location.href = "/";
                    }, 1000);
                }
            })
    }
    const handleCancleChangePassword = () => {
        setVisable(false);
    }
    return (
        <div className="main-container-user">
            <Head>
                <title>小艺书/我的</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <Modal title="修改密码" visible={visable} onCancel={handleCancleChangePassword} onOk={handleSubmitChangePassword}>
                <Input type="password" placeholder="请输入新密码" onChange={(e) => setNewPassword(e.target.value)}></Input>
            </Modal>
            <div className="main-content">
                <Divider plain>我的信息</Divider>
                <Card border="true" actions={[
                    <a onClick={handleOpenModel}><SettingOutlined className="user-info-icon" />修改密码</a>,
                    <a href='/user/create'><BulbOutlined className="user-info-icon" />上传作品</a>
                ]} className="user-info-card">
                    <Meta title={userInfo.username} avatar={<UserOutlined />} description={
                        <div>
                            <PhoneOutlined className="user-info-icon" />{userInfo.telephone} <br />
                            <MailOutlined className="user-info-icon" />{userInfo.email}
                        </div>
                    } />
                </Card>
                <Divider plain>我的作品</Divider>
                <div className="user-main-workers-container">
                    {
                        userWorks.map((e, index) => (
                            <Works {...e} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UserMain;