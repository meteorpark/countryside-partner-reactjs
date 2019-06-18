import React, { Component } from 'react';
import styles from './Header.module.scss';
import {Link, withRouter} from "react-router-dom";
import history from "../history";
import * as importActions from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

class LoginComplete extends Component {

    handleLogOut = () => {
        localStorage.clear();
        this.props.actions.isLogged(false);
        history.push("/");
    }

    render() {

        return (
            <div>
                <Link className={styles['link']} to={`/${localStorage.getItem('user_type')}s/${localStorage.getItem('srl')}`}>영농일지</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link className={styles['link']} to="/mypage">마이페이지</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <a className={styles['link']} onClick={this.handleLogOut}>로그아웃</a>
            </div>
        )
    }

}
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(importActions, dispatch),
})
export default connect(null, mapDispatchToProps)(LoginComplete);

