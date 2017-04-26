/**
 * Created by xiaojianli on 2017/4/26.
 */
import React from 'react';
import ModuleTitle from '../components/ModuleTitle';
import '../../styles/workExperience.less';

export default class WorkExperience extends React.Component{
    render(){
        return(
            <div className="work-experience-warpper modeule-box" id="work_experience">
                <ModuleTitle radius={true} title="工作经验"/>
                <ul>
                    <li>12321312321</li>
                </ul>
            </div>
        )
    }
}