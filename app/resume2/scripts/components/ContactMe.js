/**
 * Created by xiaojianli on 2017/4/27.
 */
import React from 'react';
import {Icon } from 'antd';
import ModuleTitle from '../components/ModuleTitle';
import contacts from '../../../../mockData/contactWay.json';
import '../../styles/contactMe.less';

export default class ContactMe extends React.Component{
    render(){
        return(
            <div className="contact-warpper modeule-box" id="contact_me">
                <ModuleTitle radius={true} title={this.props.title}/>
                <ul className="contact-box">
                    {contacts.msgs.map((item,index) => <li key={index}><Icon type={item.icon} /> {item.value}</li>)}
                </ul>
            </div>
        )
    }
}