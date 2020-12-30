import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import HeadPhoto from '../../components/head-photo/head-photo';
import {updateUser,getSelectOption} from '../../redux/actions';
import '../personal/personal.scss';

class MemberInfo extends Component {


    state={
        jobCollapse : "collapse show",
        typeCollapse: "collapse",
        //蒐集個人訊息
        job: "",
        preferType: [],
        interest: [],
        introduce: "",
    }

    

    //獲取興趣、偏好類型
    componentDidMount(){
        this.props.getSelectOption();
    }

    //收合表單
    handleCollapse = ()=>{
        const {jobCollapse} =this.state;
        if(jobCollapse ==="collapse show"){
            this.setState({jobCollapse:"collapse"});
        }else{
            this.setState({jobCollapse:"collapse show"});
        }
    }

    handleCollapse2 = ()=>{
        const {typeCollapse} =this.state;
        if(typeCollapse ==="collapse show"){
            this.setState({typeCollapse:"collapse"});
        }else{
            this.setState({typeCollapse:"collapse show"});
        }
    }

    

    //蒐集數據
    handleInput= (name,event)=>{
        const val = event.target.value;
        //取到要儲存的陣列
        let checkarr = this.state[name];  
        if(typeof(checkarr)!==String){
            checkarr.push(val);
        }          
        this.setState({[name]:checkarr});
    }

    //保存數據
    saveChange = ()=>{
        this.props.updateUser(this.state);
        console.log(this.state);
    }

    render() {

        const {gender,isRegist} =this.props.user;
        if(!isRegist && typeof(isRegist)===Boolean){
            const path=gender==="男"? "/female":"/male";
            return <Redirect to={path}/> //如果完善了訊息就跳轉到主頁面
        }
        
        

        return (
            <div className="mybody">
                
                <HeadPhoto></HeadPhoto>

                <div className="container">
                    <div className="row justify-content-center">
                        <form className="col-md-6">
                            <div className="form-group">                                     
                                <input type="text" className="form-control" id="userInput" placeholder="職業" onChange={e=>{this.handleInput("job",e)}}/>
                            </div>


                            <div className="accordion" id="accordionArea">

                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn btn-block text-left" type="button" data-toggle="collapse"
                                                data-target="#preferType" onClick={this.handleCollapse}>
                                                偏好類型
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="preferType" className={this.state.jobCollapse}  data-parent="#accordionArea">
                                        <div className="card-body">

                                            <div className="row"> 

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="checkbox" name="" id="" value="陽光" onChange={(e)=>{this.handleInput("preferType",e)}}/>
                                                        <label className="mx-2">陽光</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="checkbox" name="" id="" value="空氣" onChange={(e)=>{this.handleInput("preferType",e)}}/>
                                                        <label className="mx-2">空氣</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="checkbox" name="" id="" value="水" onChange={(e)=>{this.handleInput("preferType",e)}}/>
                                                        <label className="mx-2">水</label>
                                                    </div>
                                                </div>

                                            </div>

                                            
                                        </div>
                                    </div>

                                </div>

                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button className="btn btn-block text-left" type="button" data-toggle="collapse"
                                                data-target="#interest" onClick={this.handleCollapse2}>
                                                興趣
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="interest" className={this.state.typeCollapse}  data-parent="#accordionArea">
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="checkbox" name="" id="" value="釣魚" onChange={(e)=>{this.handleInput("interest",e)}}/>
                                                        <label className="mx-2">釣魚</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="checkbox" name="" id="" value="打手槍" onChange={(e)=>{this.handleInput("interest",e)}}/>
                                                        <label className="mx-2">打手槍</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="checkbox" name="" id="" value="睡覺" onChange={(e)=>{this.handleInput("interest",e)}}/>
                                                        <label className="mx-2">睡覺</label>
                                                    </div>
                                                </div>
                                            </div>
                                                                      
                                        </div>
                                    </div>
                                </div>
                                
                            </div>


                            <p></p>



                            <div className="form-group">
                                <textarea className="form-control" rows="4"  name="introduce" id="introduce"  placeholder="介紹一下自己吧" onChange={e=>{this.handleInput("introduce",e)}}></textarea>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-secondary btn-block" >skip</button>                                                
                                <button className="btn btn-outline-info btn-block" onClick={this.saveChange}>保存</button>
                            </div>



                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

export default connect(
    state=>({user:state.user}), //會產生一個新組建 會把 user、updateUser傳入 MemberInfo 的props， 可以用props調用
    {updateUser,getSelectOption}
)(MemberInfo);