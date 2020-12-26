import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Navbar from "../../../components/MainNavbar/MainNavbar";
import Works from "../../../components/Wroker/Worker";

import "../../../styles/mainGlobals.css";
import axios from 'axios'

import { Carousel } from "antd";
const baseURL = "http://localhost:18081";

const Main = () => {
    const [virtualData, setVirtualData] = useState([]);
    useEffect(() => {
        axios.get(baseURL + "/works/getAll")
            .then((res) => {
                setVirtualData(res.data);
            });
    }, []);
    return (
        <div className="main-container-real">
            <Head>
                <title>小艺书/主页</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="main-content">
                <div className="carousel">
                    <Carousel autoplay>
                        <div key="1" className="carousel-content">小艺书的简介或者其他</div>
                        <div key="2" className="carousel-content">但是还没有想好写啥</div>
                        <div key="3" className="carousel-content">那就算了先这样</div>
                    </Carousel>
                </div>
                {
                    virtualData.map((e, index) => (
                        <Works {...e} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Main;