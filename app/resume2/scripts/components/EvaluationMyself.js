/**
 * Created by xiaojianli on 2017/4/27.
 */
import React from 'react';
import evaluations from '../../../../mockData/evaluation.json';
import ModuleTitle from '../components/ModuleTitle';
import '../../styles/evaluationMyself.less';

export default class EvaluationMyself extends React.Component{
    render(){
        return(
            <div className="evaluation-myself-warpper modeule-box" id="evaluation_myself">
                <ModuleTitle radius={true} title={this.props.title}/>
                <ul className="evaluation-box">
                    {evaluations.datas.map((item,index) => <li key={index} className="evaluation-item">{item}</li>)}
                </ul>
            </div>

        )
    }
}