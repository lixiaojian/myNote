/**
 * Created by xiaojianli on 2017/4/25.
 */
import React from "react";
import ReactDOM from "react-dom";
import '../../common/styles/reset.less';
import '../styles/index.less';
import workExp from '../../../mockData/wordExperience.json';
import eduExp from '../../../mockData/educationExperience.json';
import proExp from '../../../mockData/projectExperience.json';

import UserHeader from './components/UserHeader';
import AboutMe from './components/AboutMe';
import MySkill from './components/MySkill';
import WorkExperience from './components/WorkExperience';
import EvaluationMyself from './components/EvaluationMyself'
import ContactMe from './components/ContactMe';
class MainPage extends React.Component{
    render(){
        return(
            <div className="resume2">
                <a className="download-link" target="_blank" href="/fileDownload/lxj2.pdf">简历导出</a>
                <UserHeader />
                <AboutMe />
                <MySkill />
                <WorkExperience exp={workExp} title="工作经历" cid="work_experience"/>
                <WorkExperience exp={eduExp} title="教育经历" cid="edu_experience"/>
                <WorkExperience exp={proExp} title="项目经历" cid="project_experience"/>
                <EvaluationMyself title="自我评价"/>
                <ContactMe title="联系我"/>
            </div>
        )
    }
}

ReactDOM.render(<MainPage/>,document.getElementById('app'));