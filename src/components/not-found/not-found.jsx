import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../containers/personal/personal.scss';

class NotFound extends Component {

    goback= ()=>{
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">
                            找不到此頁面
                            <button className="btn btn-secondary ml-3" onClick={()=>this.goback()}>回上一頁</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NotFound);