/**
 * Created by xiaojianli on 2017/4/21.
 */
import React from 'react';
import hongguanLogo from '../images/company-logo/hongguan.png';
import dneLogo from '../images/company-logo/dne.png';
import visionetLogo from '../images/company-logo/weiqi.png';
import wensiLogo from '../images/company-logo/wensi.png';
import juliLogo from '../images/company-logo/juli.png';
import '../styles/workExperience.less';

export default class WorkExperience extends React.Component {
    constructor(){
      super();
      this.state = {
        currIndex:1,
        boxTransLateX:0,
        clientWidth:1200,
        clientHeight:600,
        datas:[
            {isYear:true,year:'2011'},
            {year:'2011',month:'07',day:'29',companyIcon:hongguanLogo,companyName:'上海鸿冠信息科技股份有限公司',jobName:'系统工程师',action:'入职'},
            {isYear:true,year:'2012'},
            {year:'2012',month:'02',day:'28',companyIcon:hongguanLogo,companyName:'上海鸿冠信息科技股份有限公司',jobName:'',action:'离职'},
            {year:'2012',month:'03',day:'01',companyIcon:dneLogo,companyName:'上海慧广科技有限公司',jobName:'JAVA开发工程师',action:'入职'},
            {year:'2012',month:'11',day:'01',companyIcon:dneLogo,companyName:'上海慧广科技有限公司',jobName:'',action:'合同转出'},
            {year:'2012',month:'11',day:'01',companyIcon:visionetLogo,companyName:'上海微企信息技术股份有限公司',jobName:'JAVA开发工程师',action:'合同转入'},
            {isYear:true,year:'2014'},
            {year:'2014',month:'08',day:'28',companyIcon:visionetLogo,companyName:'上海微企信息技术股份有限公司',jobName:'',action:'离职'},
            {year:'2014',month:'09',day:'29',companyIcon:wensiLogo,companyName:'文思海辉技术有限公司',jobName:'WEB前端开发工程师',action:'入职'},
            {isYear:true,year:'2015'},
            {year:'2015',month:'07',day:'06',companyIcon:wensiLogo,companyName:'文思海辉技术有限公司',jobName:'',action:'离职'},
            {year:'2015',month:'07',day:'07',companyIcon:juliLogo,companyName:'上海聚力传媒技术有限公司',jobName:'WEB前端开发工程师',action:'入职'}
        ]
      };
      this.changeDate.bind(this);
      this.keyUp.bind(this);
    };
    changeDate(index){
        let boxTransLateX = this.state.clientWidth/2 - (index* 150+75+8);
        this.setState({currIndex:index,boxTransLateX});
    };
    keyUp(e){
        if(e.keyCode === 37){
            if(this.state.currIndex>0){
                let preIndex = this.state.currIndex -1;
                const data = this.state.datas[preIndex];
                if(data && data.isYear){
                    preIndex--
                }
                if(preIndex>-1){
                    this.changeDate(preIndex);
                }
            }
        }else if(e.keyCode === 39){
            if(this.state.currIndex<this.state.datas.length-1){
                let nextIndex = this.state.currIndex + 1;
                const data = this.state.datas[nextIndex];
                if(data && data.isYear){
                    nextIndex++
                }
                if(nextIndex<this.state.datas.length){
                    this.changeDate(nextIndex);
                }
            }
        }
    };
    componentDidMount(){
        const step_box = this.refs.step_box;
        step_box.style.width = (step_box.children.length*150+16) + 'px';
        const parentBox = step_box.parentElement;
        setTimeout(() => {
            this.setState({clientWidth:parentBox.clientWidth,clientHeight:parentBox.clientHeight});
            this.changeDate(1);
        },0);
        document.addEventListener('keyup',this.keyUp.bind(this));

    };
    componentWillUnmount(){
        document.removeEventListener('keyup',this.keyUp.bind(this));
    }
    render(){
        return(
            <div className="timeline-warpper">
                <div className="timeline">
                    <div className="line_white"></div>
                    <div className="step-box" style={{transform:`translate(${this.state.boxTransLateX}px,0)`}} ref="step_box">
                        {this.state.datas.map((item,index) =>{
                            return item.isYear?
                                (<div key={index} className="timeList_item year-step">
                                    <div className="year"> {item.year} </div>
                                </div>)
                            :(
                                <div key={index} className={`timeList_item step ${this.state.currIndex === index?'avtive':''}`}>
                                    <div onClick={() => this.changeDate(index)} className="circle">{item.month}/{item.day}</div>
                                    <h2 className="timeList_item_title">{item.action} : {item.companyName}</h2>
                                    <div className="list_show" style={{top:`-${(this.state.clientHeight - 230 -200)/2 +200}px`}}>
                                        <div className="company-logo-box">
                                            <img src={item.companyIcon} className="company-logo"/>
                                        </div>
                                        <div className="company-name">
                                            <span className="key-label">公司名称：</span>{item.companyName}
                                        </div>
                                        <div className="job-name">
                                            <span className="key-label">工作职位：</span>{item.jobName}
                                        </div>
                                        <div className="company-name">
                                            <span className="key-label">处理事件：</span>{item.action}
                                        </div>
                                        <div className="join-time">
                                            <span className="key-label">处理时间：</span>{item.year}年{item.month}月{item.day}日
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}