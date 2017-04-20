/**
 * Created by xiaojianli on 2017/4/20.
 */
import React from 'react';
import '../styles/workExperience.less';


export default class WorkExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <ul className="work-experience clearfix">
                <li className="experience-item"></li>
                <li className="experience-item">
                    <div className="experience-text">
                        <div className="exp-date">2011-07-29</div>
                        <div className="exp-org">上海鸿冠信息技术有限公司</div>
                    </div>
                </li>
                <li className="experience-item">
                    <div className="experience-text">
                        <div className="exp-date">2011年07月1日</div>
                        <div className="exp-org">上海鸿冠技术有限公司</div>
                    </div>
                </li>
                <li className="experience-item">
                    <div className="experience-text">
                        <div className="exp-date">2011年07月1日</div>
                        <div className="exp-org">上海鸿冠技术有限公司</div>
                    </div>
                </li>
                <li className="experience-item">
                    <div className="experience-text">
                        <div className="exp-date">2011年07月1日</div>
                        <div className="exp-org">上海鸿冠技术有限公司</div>
                    </div>
                </li>
                <li className="experience-item">
                    <div className="experience-text">
                        <div className="exp-date">2011年07月1日</div>
                        <div className="exp-org">上海鸿冠技术有限公司</div>
                    </div>
                </li>
                <li className="experience-item">
                    <div className="experience-text">
                        <div className="exp-date">2011年07月1日</div>
                        <div className="exp-org">上海鸿冠技术有限公司</div>
                    </div>
                </li>
                <li className="experience-item"></li>
            </ul>
        )
    }
}