import React, { useEffect, useState } from 'react'
import './index.css'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { EnterOutlined } from '@ant-design/icons'

import marked from 'marked'
import hljs from 'highlight.js';

import 'highlight.js/styles/monokai-sublime.css';
import "../../styles/hightLightCss.css"

const Worker = (props) => {
    const renderer = new marked.Renderer();
    const [real, setReal] = useState('');
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
        setReal(props.short_description.replace(/<doubleFlag>/g, `"`));
    }, []);

    return (
        <Card bordered hoverable cover={<img src={props.image_url} className="works_card_img" />} className='worker-short-description' actions={[
            <a onClick={() => { location.href = '/detail?workers_id=' + props.id }}><EnterOutlined className='workers_icons' />进来康康</a>
        ]}>
            <Meta title={props.name} description={
                <div dangerouslySetInnerHTML={{ __html: marked(real) }}></div>
            } />
        </Card>
    )
}

export default Worker;