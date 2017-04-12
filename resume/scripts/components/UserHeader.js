/**
 * Created by 872458899@qq.com on 2017/4/12.
 */
import React from "react";
import headerImg from '../../images/silder/user-header-img.png';
import '../../styles/userHeader.less';

export default class UserHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
        fetch('/mockData/userHeaderMsg.json').then(resp=>resp.json()).then(data=>{
            this.setState(data);
        })
    };
    render(){
        let state = this.state;
        let imgUrl = state.headerImg;
        return (
            <div>
                <div className="user-header-box"><img src={headerImg} alt={state.userName} className="user-header"/></div>
                <div className="user-name">
                    {state.userName}
                    <p className="job-name">{state.jobTitle}</p>
                </div>
            </div>
        )
    }
}