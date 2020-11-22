import Head from 'next/head'

import Navbar from "../components/Navbar/Navbar";
import MainShow from "../components/MainShow/MainShow";

import "../styles/Home.css";

import Router from 'next/router'


export default function Home() {
  return (
    <div className="root">
      <Head>
        <title>小艺书</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="main-container-home">
        <MainShow />
      </main>
    </div>
  )
}
