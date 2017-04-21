/**
 * Created by xiaojianli on 2017/4/21.
 */
import React from 'react';
export default class WorkExperience2 extends React.Component {
    componentDidMount(){
        impress().init();
    };
    render(){
        return(
            <section id="timeline" className="timeline">
                <div id="line" className="line_white"></div>
                <div id="impress">
                    <div>
                        <div id="timeList">
                            <div className="step year past" data-x="-600" data-y="0" data-scale="0.5">
                                <div className="year2012">2012</div>
                                <div className="list_show">2012年<br /></div>
                            </div>
                            <div className="timeList_item step past" data-x="0" data-y="0" id="section4/1">
                                <div className="circle">02/29</div>
                                <h2 className="timeList_item_title">全面启用HTTPS登陆</h2>
                                <div className="list_show show1">
                                    <img src="images/event1.jpg" width="500" />
                                    <h2>
                                        <a href="">全面启用HTTPS登陆</a>
                                    </h2>
                                    <p>彻底保护你的密码不被嗅探和盗用<br/>OSCHINA采用商业证书，值得信赖</p>
                                </div>
                            </div>
                            <div className="timeList_item step past" data-x="200" data-y="0" id="2">
                                <div className="circle">03/10</div>
                                <h2 className="timeList_item_title">空间自定义风格</h2>
                                <div className="list_show">
                                    <img src="images/event2.jpg" />
                                    <h2>
                                        <a href="">全面启空间自定义风格</a>
                                    </h2>
                                    <p className="m160">Less CSS 框架开发<br />7种方案随心选择</p>
                                </div>
                            </div>
                            <div className="timeList_item step past" data-x="400" data-y="0" id="3">
                                <div className="circle">04/09</div>
                                <h2 className="timeList_item_title">收录软件超过2万</h2>
                                <div className="list_show">
                                    <img src="images/event3.png" width="500" />
                                    <h2>
                                        <a href="">收录软件超过2万</a>
                                    </h2>
                                    <p>截至2012年4月3日，收录的软件/项目（包括极少部分商业软件）达到2万款。</p>
                                </div>
                            </div>
                            <div className="timeList_item step past" data-x="600" data-y="0" id="4">
                                <div className="circle">04/15</div>
                                <h2 className="timeList_item_title">成都源创会</h2>
                                <div className="list_show show3">
                                    <img src="images/event4.jpg" width="500" />
                                    <h2>
                                        <a href="">成都源创会</a>
                                    </h2>
                                    <p><img src="images/chengdu.jpg" /></p>
                                </div>
                            </div>
                            <div className="timeList_item step past" data-x="800" data-y="0" id="5">
                                <div className="circle">05/02</div>
                                <h2 className="timeList_item_title">开源U型枕</h2>
                                <div className="list_show">
                                    <img src="images/event5.png" width="500" />
                                    <h2>
                                        <a href="">开源U型枕</a>
                                    </h2>
                                    <p>倾情定制，开源U型枕！<br />我们找了我们能找到的最好的工厂，用最好的面料加最好的粒子定制！</p>
                                </div>
                            </div>

                            <div className="timeList_item step past" data-x="4800" data-y="0" id="24">
                                <div className="circle">01/31</div>
                                <h2 className="timeList_item_title">JetBrains 开发工具全场2折</h2>
                                <div className="list_show">
                                    <img src="images/event24.jpg" className="opacity7" />
                                        <h2>
                                            <a href="">JetBrains 开发工具全场2折</a>
                                        </h2>
                                        <p className="m160">
                                            每个人都有选择的权力。你可以选择开源，可以选择正版，当然在国内选择盗版也没人管你。作为软件产业的一份子，我们十分清楚软件的价值，我们应该尊重他人的劳动，这样他人才会尊重你的工作成果。
                                            <br />
                                                拒绝盗版，选择开源 or 正版！
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}