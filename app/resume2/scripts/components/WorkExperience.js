/**
 * Created by xiaojianli on 2017/4/26.
 */
import React from 'react';
import {Icon } from 'antd';
import ModuleTitle from '../components/ModuleTitle';
import '../../styles/workExperience.less';

export default class WorkExperience extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="work-experience-warpper modeule-box" id={this.props.cid}>
                <ModuleTitle radius={true} title={this.props.title}/>
                <ul className="work-experience-box">
                    {this.props.exp.datas.map((item,index) => {
                        return(
                            <li key={index} className="work-experience-item">
                                <div className="item-header">
                                    {item.link?
                                        <div>
                                            <a target="_blank" href={item.link}><Icon type="link" />{item.jobTitle}</a>
                                            <span className="time-warrper">{item.date}</span>
                                        </div>
                                        :<div>
                                            <span className="company-name">{item.orgName}</span>
                                            <span className="time-warrper">{item.date}</span>
                                            <span>{item.jobTitle}</span>
                                        </div>}
                                </div>
                                <p>{item.workDesc}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}