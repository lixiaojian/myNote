/**
 * Created by 872458899@qq.com on 2017/4/12.
 */
import React from "react";
import headerMsg from '../../../../mockData/userHeaderMsg.json';
import headerImg from '../../images/silder/user-header-img.png';
import '../../styles/userHeader.less';

export default class UserHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
        this.setState(headerMsg);
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