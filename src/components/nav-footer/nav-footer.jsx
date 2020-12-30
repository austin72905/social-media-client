import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './nav-footer.scss';

class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,

    }

    state = {
        currentPath: "",
    }

    redirectToPage = (nav, e) => {
        e.preventDefault();
        this.setState({ currentPath: nav.path });
        this.props.history.replace(nav.path);

    }

    render() {

        const { navList } = this.props;
        const { currentPath } = this.state;

        return (
            <nav className="nav nav-pills fixed-bottom " role="navigation">
                <div className="container justify-content-center">
                    <div className="row justify-content-center">
                        {
                            navList.map((nav, index) => (
                                nav.path !== "/memberinfo" ?
                                    <div className="col-xs mx-4" key={index}>
                                        <a href="#" className={`nav-link nav-item ${nav.path === currentPath ? "active" : null}`} onClick={(e) => this.redirectToPage(nav, e)}>
                                            {nav.icon}
                                        </a>
                                    </div> : null

                            ))
                        }


                    </div>

                </div>

            </nav>
        );
    }
}

//內部會像組件傳入一些路由組件特有的屬性 history /location
export default withRouter(NavFooter);