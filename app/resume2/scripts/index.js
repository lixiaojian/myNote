/**
 * Created by xiaojianli on 2017/4/25.
 */
import React from "react";
import ReactDOM from "react-dom";
import '../../common/styles/reset.less';
import '../styles/index.less';


import UserHeader from './components/UserHeader';
import AboutMe from './components/AboutMe';
import MySkill from './components/MySkill';
class MainPage extends React.Component{
    render(){
        return(
            <div className="resume2">
                <UserHeader />
                <AboutMe />
                <MySkill />
            </div>
        )
    }
}

ReactDOM.render(<MainPage/>,document.getElementById('app'));