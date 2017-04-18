/**
 * Created by 872458899@qq.com on 2017/4/15.
 */
import React from "react";
import {render} from "react-dom";
import 'fullpage.js';
import 'normalize-css';

import userHeaderImg from '../images/user-header-img.png';


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
                    <div className="fourth-section section">
                        <div className="intro">
                            <h1>IMPRESS</h1>
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
                    <li data-menuanchor="section4" className="menu-nav-item"><a href="#section4">作品集</a></li>
                </ul>
            </div>
        )
    }
}
render(<MainPage/>,document.getElementById('app'));