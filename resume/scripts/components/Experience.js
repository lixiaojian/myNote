/**
 * Created by 872458899@qq.com on 2017/4/13.
 * 经历组件
 */

import React from 'react';
import { Card } from 'antd';

import Exp from '../../../mockData/experience.json';

class ContentTitle extends React.Component{
    render(){
        return(
            <p><i className={this.props.icon}></i>{this.props.title}</p>
        )
    }
}

export default class Experience extends React.Component{
    constructor(){
        super();
        this.state = {
            datas:[]
        };
    }
    componentDidMount(){
        this.setState({datas:Exp});
    };
    render(){
        return (
            <div>
                {this.state.datas.map((item,index)=>(
                    <Card key={index} title={<ContentTitle icon={item.iconCls} title={item.title}/>}>
                        {item.hasLabel?
                            item.datas.map((exp,ind) =>(
                                <div key={'1111'+ind} className="experience-box">
                                    <div className="experience-date-box">
                                        <div className="exp-date">{exp.date}</div>
                                        <div className="exp-job-title">{exp.jobTitle}</div>
                                    </div>
                                    <div className="experience-desc-box">
                                        <div className="exp-org-name">{exp.orgName}</div>
                                        <p>{exp.workDesc}</p>
                                    </div>
                                </div>
                            ))
                        :<p>{item.content}</p>}
                    </Card>
                ))}
            </div>
        );
    }
}
