/**
 * Created by xiaojianli on 2017/4/20.
 */
import React from 'react';
import userHeaderImg from '../../common/images/user-header-img.png';
import '../styles/baseMsg.less';

const BaseMsg = () =>{
    return(
    <div className="my-base-msg">
        <div><img className="user-header-img" src={userHeaderImg} alt=""/></div>
        <h2><div className="my-motto">按照自己的意志去做，不要听那些闲言碎语，你就一定会成功。</div></h2>
        <div className="fullpage-line"></div>
        <h2><span className="job-name">WEB前端开发工程师</span></h2>
        <h2><span className="user-name">李晓健</span></h2>
    </div>
    )
}

export default BaseMsg;