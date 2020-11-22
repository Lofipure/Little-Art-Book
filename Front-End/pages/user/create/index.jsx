import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Input, Button, Modal, Row, Col, Divider, message } from "antd";

import Navbar from "../../../components/MainNavbar/MainNavbar";

import "../../../styles/userGlobal.css";
import "./create.css";

import marked from "marked";
import hljs from "highlight.js";
import axios from 'axios'
import 'highlight.js/styles/monokai-sublime.css';

import "./hightLightCss.css"

const { TextArea } = Input;
const baseURL = "http://localhost:18081";

const UserCreate = () => {  
    const [name, setName] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [shortDescriptionModalStatus, setShortDescriptionModalStatus] = useState(false)
    const [description, setDescription] = useState('')
    const [descriptionModalStatus, setDescriptionModalStatus] = useState(false)

    const renderer = new marked.Renderer();
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

    async function uploadData() {
        let formdata = new FormData();
        let data = document.getElementById("data_uploader").files[0];
        let image = document.getElementById('image_uploader').files[0];
        formdata.append("image", image);
        formdata.append("data", data);
        let res = await axios({
            url: baseURL + "/works/addStaticFile?name=" + name + "&email=" + localStorage.getItem("email"),
            method: 'POST',
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        let imageURL = res.data.image;
        let dataURL = res.data.data;
        setShortDescription(shortDescription.replace(/"/g, "<doubleFlag>"));
        setDescription(description.replace(/"/g, "<doubleFlag>"));

        let postObj = {
            name, imageURL, dataURL, shortDescription, description, author: localStorage.getItem("email")
        }
        let result = await axios({
            url: baseURL + "/works/addNewWorks",
            method: "POST",
            data: postObj
        });
        if(result.data == "OK") {
            message.success("上传成功")
            setTimeout(() => {
                location.href = "/main/showAll"
            }, 1000);
        } else {
            message.error("上传失败")
        }
    }

    return (
        <div className="main-container-real">
            <Head>
                <title>小艺书/创作</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <Modal footer={null} visible={shortDescriptionModalStatus} title="简介效果预览" onCancel={() => { setShortDescriptionModalStatus(false) }}>
                <div className="modal_inner_box" dangerouslySetInnerHTML={{ __html: marked(shortDescription) }}></div>
            </Modal>

            <Modal footer={null} visible={descriptionModalStatus} title="详细介绍效果预览" onCancel={() => { setDescriptionModalStatus(false) }}>
                <div className="modal_inner_box" dangerouslySetInnerHTML={{ __html: marked(description) }}></div>
            </Modal>

            <div className="main-container-create">
                <Row align={"middle"} justify={"center"}>
                    <Col span={20} className="create-item">
                        <Divider dashed orientation="left">作品名称</Divider>
                        <Input placeholder="请输入作品名称" size="large" value={name} onChange={(e) => { setName(e.target.value) }}></Input>
                    </Col>
                    <Col span={20} className="create-item">
                        <Divider dashed orientation="left">作品简介</Divider>
                        <TextArea placeholder="请输入简介，已支持markdown解析。" onChange={(e) => {
                            setShortDescription(e.target.value)
                        }} bordered></TextArea>
                        <Button className="show-button" type="primary" onClick={() => { setShortDescriptionModalStatus(true) }}>效果预览</Button>
                    </Col>
                    <Col span={20} className="create-item">
                        <Divider dashed orientation="left">作品详细</Divider>
                        <TextArea placeholder="请输入详细介绍，已支持markdown解析。" onChange={(e) => {
                            setDescription(e.target.value)
                        }} bordered></TextArea>
                        <Button className="show-button" type="primary" onClick={() => { setDescriptionModalStatus(true) }}>效果预览</Button>
                    </Col>
                    <Col span={20} className="create-item">
                        <Divider dashed orientation="left">展示图</Divider>
                        <Input type="file" id="image_uploader" placeholder="请上传识别图"></Input>
                    </Col>
                    <Col span={20} className="create-item">
                        <Divider dashed orientation="left">模型数据文件</Divider>
                        <Input type="file" placeholder="请上传模型数据文件" id="data_uploader"></Input>
                    </Col>
                    <Col className="create-item" span={20}>
                        <Button type="primary" className="show-button" onClick={uploadData}>上传</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default UserCreate