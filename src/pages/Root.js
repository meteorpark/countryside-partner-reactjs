import React from 'react';
import {BrowserRouter, Router, Route, Switch, withRouter} from "react-router-dom";
import Main from "./main/Main";
import TopBar from "./inc/TopBar";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "../index.module.scss";
import SideNav from "./inc/SideNav";
import history from './history';

import MentorCreate from "./join/MentorCreate";
import MenteeCreate from "./join/MenteeCreate";


import Mentors from "./mentors/Mentors";
import Mentees from "./mentees/Mentees";
import Mentor from "./mentors/Mentor";
import Machine from "./openapis/Machine";
import Dictionary from "./openapis/Dictionary";
import SelectJoin from "./join/SelectJoin";
import MentorDiaryCreate from "./mentors/MentorDiaryCreate";
import MentorDiaryModify from "./mentors/MentorDiaryModify";
import MentorDiaryView from "./mentors/MentorDiaryView";
import Login from "./join/Login";
import {Redirect} from "react-router";
import * as importActions from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Mentee from "./mentees/Mentee";
import MenteeDiaryCreate from "./mentees/MenteeDiaryCreate";
import MenteeDiaryView from "./mentees/MenteeDiaryView";
import MenteeDiaryModify from "./mentees/MenteeDiaryModify";
// import {Chat} from "./chat/Chat";
import SpecialCrops from "./openapis/SpecialCrops";
import EmptyHouses from "./openapis/EmptyHouses";
import {Mentoring} from "./chat/Mentoring";
import {MyPage} from "./inc/MyPage";
import {Introduce} from "./main/Introduce";


class Root extends React.Component {

    render() {

        return (
            <Router history={history}>
                <div className={styles['wrapper']}>
                    <TopBar/>
                    <Header/>
                    <div className={styles['wrapper']}>
                        {/*<SideNav />*/}
                        <main>
                            <Switch>

                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mentees/:mentee/create" component={MenteeDiaryCreate}/>}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mentors/:mentor/create" component={MentorDiaryCreate}/>}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/chat/mentoring" component={Mentoring} />}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/chat/mentoring/:chat_id" component={Mentoring} />}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mypage" component={MyPage} />}


                                <Route exact path="/" component={Main}/>
                                <Route exact path="/introduce" component={Introduce}/>

                                <Route exact path="/mentees" component={Mentees}/>
                                <Route exact path="/mentees/:mentee" component={Mentee}/>
                                <Route exact path="/mentees/:mentee/diaries/:diary_id" component={MenteeDiaryView}/>
                                <Route exact path="/mentees/:mentee/diaries/:diary_id/modify" component={MenteeDiaryModify}/>
                                <Route exact path="/mentors" component={Mentors}/>
                                <Route exact path="/mentors/:mentor" component={Mentor}/>
                                <Route exact path="/mentors/:mentor/diaries/:diary_id" component={MentorDiaryView}/>
                                <Route exact path="/mentors/:mentor/diaries/:diary_id/modify" component={MentorDiaryModify}/>




                                {/*<Route exact path="/chat" component={Chat} />*/}

                                /*
                                *   OpenApi Route ... Start
                                */
                                <Route exact path="/machines" component={Machine}/>
                                <Route exact path="/dictionary" component={Dictionary}/>
                                <Route exact path="/special-crops" component={SpecialCrops}/>
                                <Route exact path="/empty-houses" component={EmptyHouses}/>
                                /*
                                *   OpenApi Route ... End
                                */





                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/login" component={Login}/>}
                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/join" component={SelectJoin}/>}
                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/join/mentor" component={MentorCreate}/>}
                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/join/mentee" component={MenteeCreate}/>}




                                {/*<Route exact path="/chat" component={Chat}/>*/}
                                {/*<Redirect from='*' to="/" />*/}


                            </Switch>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    mapStateToPropsAuth: state.auth // state.variable_state 는 reducers/index.js 의 키값과 같아야 한다
})
export default connect(mapStateToProps)(Root);
