/**
 * Created by 872458899@qq.com on 2017/4/11.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Layout,Progress } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import userHeaderImg from '../images/silder/user-header-img.png';

import '../styles/index.less';

class MainPage extends React.Component{
    render(){
        return(
            <Layout>
                <Sider width="390">
                    <div className="user-header-box"><img src={userHeaderImg} alt="李晓健" className="user-header"/></div>
                    <div className="user-name">
                        李晓健
                        <p className="job-name">web前端开发工程师</p>
                    </div>
                    <div className="base-msg">
                        <h3 className="base-msg-title">基本信息</h3>
                        <div className="base-msg-detail">
                            <label className="msg-label">生日：</label>
                            <span className="msg-value">1987年2月4日</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">毕业学校：</label>
                            <span className="msg-value">郑州大学</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">学历：</label>
                            <span className="msg-value">大专</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">贯籍：</label>
                            <span className="msg-value">河南</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">专业：</label>
                            <span className="msg-value">软件技术</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">现居：</label>
                            <span className="msg-value">上海浦东</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">个人网站：</label>
                            <span className="msg-value">www.xiaojianli.cn</span>
                        </div>
                    </div>
                    <div className="base-msg">
                        <h3 className="base-msg-title">联系方式</h3>
                        <div className="base-msg-detail">
                            <label className="msg-label">手机：</label>
                            <span className="msg-value">13817615243</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">邮箱：</label>
                            <span className="msg-value">376127890@qq.com</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">地址：</label>
                            <span className="msg-value">上海市浦东新区唐陆公路唐镇路3271弄2号202</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">贯籍：</label>
                            <span className="msg-value">河南</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">专业：</label>
                            <span className="msg-value">软件技术</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">现居：</label>
                            <span className="msg-value">上海浦东</span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">个人网站：</label>
                            <span className="msg-value">www.xiaojianli.cn</span>
                        </div>
                    </div>
                    <div className="base-msg">
                        <h3 className="base-msg-title">掌握技能</h3>
                        <div className="base-msg-detail">
                            <label className="msg-label">javascript：</label>
                            <span className="msg-value"> <Progress percent={70} status="active" /> </span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">html：</label>
                            <span className="msg-value"><Progress percent={80} status="active" /></span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">css：</label>
                            <span className="msg-value"><Progress percent={70} status="active" /></span>
                        </div>
                        <div className="base-msg-detail">
                            <label className="msg-label">photoshop：</label>
                            <span className="msg-value"><Progress percent={20} status="active" /></span>
                        </div>
                    </div>
                </Sider>
                <Layout>
                    <Content>Content</Content>
                </Layout>
            </Layout>
        )
    }
}
ReactDOM.render(<MainPage/>,document.getElementById('app'));