/**
 * Created by xiaojianli on 2017/4/20.
 */
import React from 'react';

import '../styles/aboutMe.less';

const AboutMe = () => {
    const myMsg = [
        {key:'生日',value:'1987-02-04',cls:'my-birthday',iconCls:'icon-cake'},
        {key:'学历',value:'大专',cls:'my-education',iconCls:'icon-education'},
        {key:'位置',value:'上海浦东',cls:'my-position',iconCls:'icon-cake'},
        {key:'状态',value:'在职',cls:'my-state',iconCls:'icon-state'}
    ];
    return(
        <div className="about-me">
            <h2>关于我</h2>
            <ul className="about-me-box clearfix">
                {myMsg.map((item,index) =>{
                    return(
                        <li className={`about-me-item ${item.cls}`}>
                            <div className="about-me-icon">
                                <div className="spinner"></div>
                                <span className={item.iconCls}></span>
                                <span className="text-icon-desc">{item.key}</span>
                            </div>
                            <div className="about-me-value">{item.value}</div>
                        </li>
                    )
                })}
            </ul>
            <div className="about-me-text">
                <p>六年互联网经验,三年半全职前端开发经验</p>
                <p>自学能力强，喜欢钻研新技术，敢于面对和克服困难</p>
                <p>具有很强的团队精神，有良好的组织、协调和沟通能力，有强烈的集体荣誉感</p>
                <p>有比较强的动手能力，勇于面对困难和挑战，有很好的分析问题与解决问题的能力</p>
                <p>本人热爱软件事业，对IT领域的软件开发和设计工作有浓厚的兴趣，能承受较大的工作压力</p>
            </div>
        </div>
    )
}

export default AboutMe;