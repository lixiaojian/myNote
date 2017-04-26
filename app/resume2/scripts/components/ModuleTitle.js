/**
 * Created by xiaojianli on 2017/4/25.
 */
import React from 'react';
import '../../styles/moduleTitle.less';

export default class ModuleTitle extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="module-title">
                {this.props.radius?<div className="m-title radius-title-text">{this.props.title}</div>:<div className="m-title title-text">{this.props.title}</div>}
                <div className="title-line"></div>
            </div>
        )
    }
}