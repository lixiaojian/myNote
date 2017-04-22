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
import resume1 from '../images/resume1.png';
import WorkExperience from './workExperience';

import '../styles/index.less';

import '../../../font/style.css';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu:'#menu',
            anchors: ['index', 'section2', 'section3', 'section4','section5','section6'],
            resize:true,
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['首页', 'secondSlide','3rdPage','4thpage','5thpage','6thpage'],
            slidesNavigation: true,
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
                console.log(link);
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
                    <div className="third-section section">
                        <h2>等待完善</h2>
                    </div>
                    <div className="third-section section">
                        <ul className="resume-list">
                            <li className="resume-item">
                                <a href="/resume/resume1.html"><img src={resume1} alt="李晓健简历"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="nav-menu" id="menu">
                    <li data-menuanchor="index" className="active menu-nav-item"><a href="#index">首页</a></li>
                    <li data-menuanchor="section2" className="menu-nav-item"><a href="#section2">关于我</a></li>
                    <li data-menuanchor="section3" className="menu-nav-item"><a href="#section3">技能栈</a></li>
                    <li data-menuanchor="section4" className="menu-nav-item"><a href="#section4">工作经历</a></li>
                    <li data-menuanchor="section5" className="menu-nav-item"><a href="#section5">作品集</a></li>
                    <li data-menuanchor="section6" className="menu-nav-item"><a href="#section6">我的简历</a></li>
                </ul>
            </div>
        )
    }
}
render(<MainPage/>,document.getElementById('app'));