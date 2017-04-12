/**
 * Created by 872458899@qq.com on 2017/4/11.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Layout,Card } from 'antd';
const { Sider, Content } = Layout;

import UserHeader from './components/UserHeader';
import BaseMsg from './components/BaseMsg';

import '../styles/index.less';

class ContentTitle extends React.Component{
    render(){
        return(
            <p><i className={this.props.icon}></i>{this.props.title}</p>
        )
    }
}

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
                        <Card title={<ContentTitle icon="individual-resume-icon" title="个人简介"/>}>
                            <p>毕业中央美院，4年室内设计工作经验，我不是什么牛人我只是菜鸟，一直在成长中。从事网站的建设与分析，有美丽的幻想，有美好的憧憬。 从学习到工作一直做我喜欢的设计，可以说现在是更为全面学习的时候，每一天我都很开心，有我喜欢的工作和生活。</p>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
ReactDOM.render(<MainPage/>,document.getElementById('app'));