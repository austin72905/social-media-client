import React, { Component } from 'react';

class Temp extends Component {
    render() {
        return (
            <nav className="nav nav-pills fixed-bottom " role="navigation">
                <div className="container justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-xs mx-4">
                            <a href="#" className="nav-link active nav-item ">
                                <BsFillPeopleFill />
                            </a>
                        </div>
                        <div className="col-xs mx-4">
                            <a href="#" className="nav-link active nav-item">
                                <BsHeartFill />
                            </a>
                        </div>
                        <div className="col-xs mx-4">
                            <a href="#" className="nav-link nav-item" ><BsFillChatDotsFill /></a>
                        </div>
                        <div className="col-xs mx-4">
                            <a href="#" className="nav-link nav-item"><BsFillGearFill /></a>
                        </div>


                    </div>

                </div>

            </nav>
        );
    }
}

export default Temp;