/**
 * Created by 872458899@qq.com on 2017/4/11.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import UserHeader from './components/UserHeader';
import BaseMsg from './components/BaseMsg';
import Experience from './components/Experience';

import '../styles/index.less';


class MainPage extends React.Component{
    render(){
        return(
            <Layout>
                <Sider width="390">
                    <UserHeader/>
                    <BaseMsg />
                </Sider>
                <Layout>
                    <Content>
                        <a className="download-link" target="_blank" href="/fileDownload/lxj.pdf">简历导出</a>
                        <Experience />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
ReactDOM.render(<MainPage/>,document.getElementById('app'));