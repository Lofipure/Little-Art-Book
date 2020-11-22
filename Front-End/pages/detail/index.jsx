import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Navbar from "../../components/MainNavbar/MainNavbar";

import "../../styles/detailGlobal.css"
import "./main.css"
import 'highlight.js/styles/monokai-sublime.css';
import "../../styles/hightLightCss.css";

import axios from 'axios';
import { Button, Typography, Drawer } from 'antd';
import { UserOutlined } from "@ant-design/icons";

import marked from 'marked';
import hljs from "highlight.js";


const getInfoReg = /^http:\/\/[a-zA-Z0-9.]*[:[0-9]{0,}]?\/detail\?workers_id=(\w*)$/g;
const baseURL = "http://localhost:18081";
const { Title, Paragraph, Text } = Typography
const Detail = () => {
    const [worksInfo, setWorksInfo] = useState();
    const renderer = new marked.Renderer();
    const [ARDrawer, setARDrawer] = useState(false)
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: code => hljs.highlightAuto(code).value
    });

    useEffect(() => {
        axios.get(baseURL + "/works/getWorksInfo?id=" + getInfoReg.exec(location.href)[1])
            .then((res) => {
                setWorksInfo(res.data);
                console.log(res.data)
            });
    }, []);

    function showAR() {
        setARDrawer(true)
    }
    return (
        <div className="detail-main-container">
            <Head>
                <title>小艺书/详细</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="detail-content">
                <Drawer placement="top" closable="true" visible={ARDrawer} onClose={() => {setARDrawer(false)}} key={"top"} className="AR-drawer" height={600}>
                <iframe src={"/AR.html?data=" + (worksInfo || {}).data || ""} width="100%" height="100%" className="AR-frame"></iframe>
                </Drawer>
                <img src={(worksInfo || {}).image_url || ''} className="detail-image" alt="" />
                <Typography>
                    <Title level={2} type="secondary" className="detail-title">{(worksInfo || {}).name || ''}</Title>
                    <Paragraph className="detail-paragraph detail-title" type="warning"><UserOutlined className="detail-icon"/> {(worksInfo || {}).belong_user_id || ''}</Paragraph>
                    <Paragraph className="detail-paragraph">
                        <div dangerouslySetInnerHTML={{ __html: marked((worksInfo || {}).short_description || '') }}></div>
                    </Paragraph>
                    <Paragraph className="detail-paragraph">
                        <div dangerouslySetInnerHTML={{ __html: marked((worksInfo || {}).description || '') }}></div>
                    </Paragraph>
                </Typography>
                <div className="detail-button-container">
                <Button type="primary" className="show-detail-AR" onClick={showAR}>去看看AR虚拟现实</Button>
                </div>
            </div>
        </div>
    )
}


export default Detail;
