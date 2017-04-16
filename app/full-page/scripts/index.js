/**
 * Created by 872458899@qq.com on 2017/4/15.
 */
import React from "react";
import {render} from "react-dom";
import 'fullpage.js';


import '../styles/index.less';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            anchors: ['section1', 'section2', 'section3', 'section4'],
            resize:true,
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['firstSlide', 'secondSlide','3rdPage','4thpage'],
            slidesNavigation: true,
            scrollingSpeed: 1000,
            autoScrolling: true,
            scrollBar: false,
            fitToSection:false,
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
        //$('#myContainer').fullpage(this.state);
    };
    render(){
        return(
            <div id="myContainer">
                <div className="first-section section" id="sss1">
                    <div className="intro">
                        <h1>fullPage.js</h1>
                    </div>
                </div>
                <div className="second-section section">
                    <div className="intro">
                        <h1>FLEXIBLE</h1>
                        <p>Put not limits to yourself</p>
                        <p>Use parallax even without scroll bar!</p>
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
                <div className="fourth-section section">
                    <div className="intro">
                        <h1>IMPRESS</h1>
                        <p>Take it to the next level!</p>
                    </div>
                </div>
            </div>
        )
    }
}
render(<MainPage/>,document.getElementById('app'));