/**
 * Created by 872458899@qq.com on 2017/4/15.
 */
import React from "react";
import {render} from "react-dom";
import 'fullpage.js';
import 'normalize-css';

import BaseMsg from './baseMsg';
import AboutMe from './aboutMe';
import SkillStack from './skillStack';
import resume1 from '../images/resume/resume1.png';
import resume2 from '../images/resume/resume2.png';
import WorkExperience from './workExperience';

import '../../common/styles/reset.less';
import '../styles/index.less';

import '../../../font/style.css';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu:'#menu',
            anchors: ['index', 'aboutme', 'skillstack', 'workexp','resume'],
            resize:true,
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['首页', '我的简介','我的技能','工作经历','我的简历'],
            slidesNavigation: false,
            scrollingSpeed: 1000,
            autoScrolling: true,
            scrollBar: false,
            fitToSection:false,
            paddingTop:'50px',
            easingcss3:'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            afterLoad:function (link,index) {
                var dom = document.querySelector('div[data-anchor="'+link+'"]');
                if(dom){
                    dom.classList.add('has-show')
                }
            }
        }
    };
    componentDidMount(){
        $('#myContainer').fullpage(this.state);
    };
    render(){
        return(
            <div>
                <div id="myContainer">
                    <div className="first-section section">
                        <BaseMsg />
                    </div>
                    <div className="second-section section">
                        <AboutMe />
                    </div>
                    <div className="fourth-section section">
                        <SkillStack />
                    </div>
                    <div className="third-section section">
                        <WorkExperience />
                    </div>
                    <div className="five-section section">
                        <ul className="resume-list">
                            <li className="resume-item">
                                <a href="/resume/resume1.html"><img src={resume1} alt="李晓健简历"/></a>
                            </li>
                            <li className="resume-item">
                                <a href="/resume/resume2.html"><img src={resume2} alt="李晓健简历"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="nav-menu" id="menu">
                    <li data-menuanchor="index" className="active menu-nav-item"><a href="#index">首页</a></li>
                    <li data-menuanchor="aboutme" className="menu-nav-item"><a href="#aboutme">关于我</a></li>
                    <li data-menuanchor="skillstack" className="menu-nav-item"><a href="#skillstack">技能栈</a></li>
                    <li data-menuanchor="workexp" className="menu-nav-item"><a href="#workexp">工作经历</a></li>
                    <li data-menuanchor="resume" className="menu-nav-item"><a href="#resume">我的简历</a></li>
                </ul>
            </div>
        )
    }
}
render(<MainPage/>,document.getElementById('app'));