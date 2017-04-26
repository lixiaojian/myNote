/**
 * Created by xiaojianli on 2017/4/26.
 */
import React from 'react';
import ModuleTitle from '../components/ModuleTitle';
import '../../styles/aboutMe.less';

import baseMsg from '../../../../mockData/baseMsg.json';
import indeividual from '../../../../mockData/individualResume.json';
import userHeader from '../../../common/images/user-header-img.png';

export default class AboutMe extends React.Component{
    constructor(){
        super();
        this.state={
            baseMsg:baseMsg.msgs
        }
    }
    render(){
        return(
            <div className="modeule-box about-me-warpper" id="about_me">
                <ModuleTitle title="关于我"/>
                <ul className="about-me-conent">
                    <li className="about-me-left">
                        {this.state.baseMsg.map((item,index) => {
                            return(
                                <div key={index}>
                                    <label className="conent-key">{item.label}</label>
                                    <span className="conent-value">
                                        {item.isLink?
                                            <a target="_blank" href={item.value}>{item.value}</a>:item.value}
                                    </span>
                                </div>
                            )
                        })}
                    </li>
                    <li className="about-me-right">
                        <div className="about-me-img-wrpper">
                            <span className="header-img">
                                <img src={userHeader} alt="李晓健"/>
                            </span>
                            <div className="my-motto">
                                <p>
                                    {indeividual.content}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}