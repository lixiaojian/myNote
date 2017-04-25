/**
 * Created by xiaojianli on 2017/4/25.
 */
import React from "react";
import ReactDOM from "react-dom";
import '../../../common/reset.less';
import '../styles/index.less';

import UserHeader from './components/UserHeader';

class MainPage extends React.Component{
    render(){
        return(
            <div className="resume2">
                <UserHeader />
            </div>
        )
    }
}
ReactDOM.render(<MainPage/>,document.getElementById('app'));