/**
 * Created by xiaojianli on 2017/4/26.
 */
import React from 'react';
import ModuleTitle from '../components/ModuleTitle';
import workExp from '../../../../mockData/wordExperience.json';
import '../../styles/workExperience.less';

export default class WorkExperience extends React.Component{
    constructor(){
        super();
        this.state = {
            workExp:workExp.datas
        }
    }

    render(){
        return(
            <div className="work-experience-warpper modeule-box" id="work_experience">
                <ModuleTitle radius={true} title="工作经验"/>
                <ul className="work-experience-box">
                    {this.state.workExp.map((item,index) => {
                        return(
                            <li key={index} className="work-experience-item">
                                <div className="item-header">
                                    <span>{item.jobTitle}</span>
                                    <span className="time-warrper">{item.date}</span>
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