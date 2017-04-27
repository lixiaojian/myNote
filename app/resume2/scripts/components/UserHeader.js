/**
 * Created by xiaojianli on 2017/4/25.
 */
import React from "react";
import headerMsg from '../../../../mockData/userHeaderMsg.json';

import '../../styles/pageTitle.less';

export default class UserHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mainNav:[
                {text:'关于我',link:'#about_me'},
                {text:'个人技能',link:'#skill'},
                {text:'工作经历',link:'#work_experience'},
                {text:'教育经历',link:'#edu_experience'},
                {text:'项目经历',link:'#project_experience'},
                {text:'自我评价',link:'#evaluation_myself'},
                {text:'联系我',link:'#evaluation_myself'}
            ],
            currIndex:0
        };
        this.changeMainNav.bind(this);
    }
    componentDidMount(){
        this.setState(headerMsg);
    };
    changeMainNav(index){
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
                        return <li key={index} className="main-nav-item"><a onClick={() => this.changeMainNav(index)} className={this.state.currIndex === index?'active':''} href={item.link}>{item.text}</a></li>
                    })}
                </ul>
            </div>
        )
    }
}