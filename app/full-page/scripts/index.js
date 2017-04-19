/**
 * Created by 872458899@qq.com on 2017/4/15.
 */
import React from "react";
import {render} from "react-dom";
import 'fullpage.js';
import 'normalize-css';

import userHeaderImg from '../images/user-header-img.png';
import jqueryLogo from '../images/skill-icon/jquery.png';
import zeptoLogo from '../images/skill-icon/zepto.png';
import angularLogo from '../images/skill-icon/angular.png';
import requireLogo from '../images/skill-icon/requirejs.png';
import gruntLogo from '../images/skill-icon/grunt-logo.png';
import gulpLogo from '../images/skill-icon/gulp-logo.png';
import webpackLogo from '../images/skill-icon/webpack.png';
import vueLogo from '../images/skill-icon/vue.png';
import reactLogo from  '../images/skill-icon/react.png';
import bootstrapLogo from '../images/skill-icon/bootstrap.png';


import '../styles/index.less';

import '../../../font/style.css';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu:'#menu',
            anchors: ['index', 'section2', 'section3', 'section4'],
            resize:true,
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['首页', 'secondSlide','3rdPage','4thpage'],
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
                if('section3' == link && TagCanvas){
                    console.log(111111);

                }
            }
        }
    };
    componentDidMount(){
        $('#myContainer').fullpage(this.state);
        try {
            TagCanvas.Start('skill_stack_canvas','skill_stack_icon_list',{
                depth: 0.8,
                maxSpeed: 0.1,
                minSpeed:0.05,
                freezeActive:true, //当有选中是停止运动
                initial:0.8,
                wheelZoom:false, //鼠标滚轮缩放
                fadeIn:10
            });
            TagCanvas.SetSpeed('myCanvas', [0.1, 0.05]);
        } catch(e) {}
    };
    render(){
        return(
            <div>
                <div id="myContainer">
                    <div className="first-section section">
                        <div className="intro">
                            <div><img className="user-header-img" src={userHeaderImg} alt=""/></div>
                            <h2><div className="my-motto">按照自己的意志去做，不要听那些闲言碎语，你就一定会成功。</div></h2>
                            <div className="fullpage-line"></div>
                            <h2><span className="job-name">WEB前端开发工程师</span></h2>
                            <h2><span className="user-name">李晓健</span></h2>
                        </div>
                    </div>
                    <div className="second-section section about-me">
                        <h2>关于我</h2>
                        <div className="about-me-warpper">
                            <ul className="about-me-box clearfix">
                                <li className="about-me-item my-birthday">
                                    <div className="about-me-icon">
                                        <div className="spinner"></div>
                                        <span className="icon-cake"></span>
                                        <span className="text-icon-desc">生日</span>
                                    </div>
                                    <div className="about-me-value">1987-02-04</div>
                                </li>
                                <li className="about-me-item my-education">
                                    <div className="about-me-icon">
                                        <div className="spinner"></div>
                                        <span className="icon-education"></span>
                                        <span className="text-icon-desc">学历</span>
                                    </div>
                                    <div className="about-me-value">大专</div>
                                </li>
                                <li className="about-me-item my-position">
                                    <div className="about-me-icon">
                                        <div className="spinner"></div>
                                        <span className="icon-position"></span>
                                        <span className="text-icon-desc">位置</span>
                                    </div>
                                    <div className="about-me-value">上海浦东</div>
                                </li>
                                <li className="about-me-item my-state">
                                    <div className="about-me-icon">
                                        <div className="spinner"></div>
                                        <span className="icon-state"></span>
                                        <span className="text-icon-desc">状态</span>
                                    </div>
                                    <div className="about-me-value">在职</div>
                                </li>
                            </ul>
                            <div className="about-me-text">
                                <p>六年互联网经验,三年半全职前端开发经验</p>
                                <p>自学能力强，喜欢钻研新技术，敢于面对和克服困难</p>
                                <p>具有很强的团队精神，有良好的组织、协调和沟通能力，有强烈的集体荣誉感</p>
                                <p>有比较强的动手能力，勇于面对困难和挑战，有很好的分析问题与解决问题的能力</p>
                                <p>本人热爱软件事业，对IT领域的软件开发和设计工作有浓厚的兴趣，能承受较大的工作压力</p>
                            </div>
                        </div>
                    </div>
                    <div className="fourth-section section skill-stack">
                        <div className="intro">
                            <h2>技能栈</h2>
                            <ul className="skill-stack-warpper clearfix">
                                <li className="skill-stack-item">
                                    <div className="skill-stack-list">
                                        <div className="cricle cricle-3"></div>
                                        <div className="cricle cricle-3-text"></div>
                                        <div className="cricle cricle-2"></div>
                                        <div className="cricle cricle-2-text"></div>
                                        <div className="cricle cricle-1">
                                            WEB前端
                                        </div>
                                    </div>
                                </li>
                                <li className="skill-stack-item">
                                    <div className="skill-stack-list">
                                        <canvas width="400" height="400" id="skill_stack_canvas">
                                            <p>您的浏览器暂不支持该页面效果，请更新浏览器版本。</p>
                                        </canvas>
                                        <div id="skill_stack_icon_list">
                                            <ul>
                                                <li><a href="http://jquery.com/" target="_blank"><img src={jqueryLogo} alt="jquery" /></a></li>
                                                <li><a href="http://zeptojs.com/" target="_blank"><img src={zeptoLogo} alt="zepto" /></a></li>
                                                <li><a href="https://angular.io/" target="_blank"><img src={angularLogo} alt="angular" /></a></li>
                                                <li><a href="http://www.requirejs.cn/" target="_blank"><img src={requireLogo} alt="requirejs" /></a></li>
                                                <li><a href="https://gruntjs.com/" target="_blank"><img src={gruntLogo} alt="gruntjs" /></a></li>
                                                <li><a href="http://www.gulpjs.com.cn/" target="_blank"><img src={gulpLogo} alt="gulp" /></a></li>
                                                <li><a href="http://webpack.github.io/" target="_blank"><img src={webpackLogo} alt="webpack" /></a></li>
                                                <li><a href="https://cn.vuejs.org/" target="_blank"><img src={vueLogo} alt="vue" /></a></li>
                                                <li><a href="https://facebook.github.io/react/" target="_blank"><img src={reactLogo} alt="react" /></a></li>
                                                <li><a href="http://www.bootcss.com/" target="_blank"><img src={bootstrapLogo} alt="bootstrap" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <p>Take it to the next level!</p>
                        </div>
                    </div>
                    <div className="third-section section">
                        <div className="slide" id="slide3-1">
                            <div className="intro">
                                <h1>TAKE CONTROL</h1>
                                <p>Totally configurable.</p>
                                <p>For sections & slides! </p>
                            </div>
                        </div>
                        <div className="slide" id="slide3-2">
                            <div className="intro">
                                <h1>GUARRANTEE</h1>
                                <p>30 days money back guarratee if no domain was activated.</p>
                            </div>
                        </div>
                        <div className="slide" id="slide3-3">
                            <div className="intro">
                                <h1>TRUSTED</h1>
                                <p>Join thoudands of other developers who trusted fullPage.js extensions!</p>
                            </div>
                        </div>
                        <div className="slide" id="slide3-4">
                            <div className="intro">
                                <h1>DOCUMENTED</h1>
                                <p>If fullPage.js is known for one thing it's for its great documentation!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="nav-menu" id="menu">
                    <li data-menuanchor="index" className="active menu-nav-item"><a href="#index">首页</a></li>
                    <li data-menuanchor="section2" className="menu-nav-item"><a href="#section2">关于我</a></li>
                    <li data-menuanchor="section3" className="menu-nav-item"><a href="#section3">技能栈</a></li>
                    <li data-menuanchor="section4" className="menu-nav-item"><a href="#section4">工作经历</a></li>
                    <li data-menuanchor="section4" className="menu-nav-item"><a href="#section4">作品集</a></li>
                    <li data-menuanchor="section4" className="menu-nav-item"><a href="#section4">我的简历</a></li>
                </ul>
            </div>
        )
    }
}
render(<MainPage/>,document.getElementById('app'));