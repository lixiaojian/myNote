/**
 * Created by xiaojianli on 2017/4/25.
 */
import React from "react";
import headerMsg from '../../../../mockData/userHeaderMsg.json';
import headerImg from '../../../resume1/images/silder/user-header-img.png';

import '../../styles/pageTitle.less';

export default class UserHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mainNav:[
                {text:'首页',link:'#/'},
                {text:'个人技能',link:'#/'},
                {text:'工作经验',link:'#/'},
                {text:'教育经历',link:'#/'},
                {text:'联系方式',link:'#/'},
            ],
            currIndex:0
        };
        this.changeMainNav.bind(this);
    }
    componentDidMount(){
        this.setState(headerMsg);
    };
    changeMainNav(e,index){
        // e.preventDefault();
        this.setState({currIndex:index});
    };
    render(){
        let state = this.state;
        return (
            <div className="page-title">
                <div className="user-name">{state.userName}</div>
                <div className="job-name">{state.jobTitle}</div>
                <ul className="main-nav clearfix">
                    {this.state.mainNav.map((item,index) => {
                        return <li className="main-nav-item"><a onClick={e => {this.changeMainNav(e,index)}} className={this.state.currIndex === index?'active':''} href={item.link}>{item.text}</a></li>
                    })}
                </ul>
            </div>
        )
    }
}