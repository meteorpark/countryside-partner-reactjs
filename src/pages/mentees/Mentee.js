import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
// import {MentorProfile} from "./MentorProfile";
import {withRouter} from "react-router-dom";
import Diaries from "../diaries/Diaries";


class Mentee extends Component {

    constructor(props) {

        super(props);
        this.state = {
            hasMore: true
        }
    }

    loadItems = () => {

        const {actionMentor, match, mapStateToPropsMentorDiaries} = this.props;

        if (mapStateToPropsMentorDiaries.last_page === mapStateToPropsMentorDiaries.current_page) this.setState({hasMore: false});

        setTimeout(() => {
            actionMentor.getMentorDiaries(match.params.mentor, mapStateToPropsMentorDiaries.current_page + 1);
        }, 1000);
    }

    render() {

        const mentee = this.props.mapStateToPropsMentee;
        const diaries = this.props.mapStateToPropsMentorDiaries;

        return (

            <div>
                {/*<MentorProfile mentor={mentee}/>*/}

                {/*<Diaries*/}
                {/*    hasMore={this.state.hasMore}*/}
                {/*    user={mentee}*/}
                {/*    diaries={diaries}*/}
                {/*    loadItems={this.loadItems}*/}
                {/*/>*/}


            </div>
        );
    }

    componentDidMount() {

        const {actionMentee, match} = this.props;
        actionMentee.getMentee(match.params.mentee);
        // actionMentee.getMentorDiaries(match.params.mentor, 1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        이 API는 컴포넌트에서 render() 를 호출하고난 다음에 발생하게 됩니다. 이 시점에선 this.props 와 this.state 가 바뀌어있습니다.
        그리고 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 할 수 있습니다.
        그리고, getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값으로 받아옵니다.
         */
        if (this.props.match.params.mentor !== prevProps.match.params.mentor) {

            const {actionMentor, match} = this.props;
            actionMentor.getMentor(match.params.mentor);
            actionMentor.getMentorDiaries(match.params.mentor, 1);
        }
    }
}

const mapStateToProps = (state) => ({
    mapStateToPropsMentee: state.mentee.mentee,
    // mapStateToPropsMentorDiaries: state.mentor.diaries
})

const mapDispatchToProps = (dispatch) => ({
    actionMentee: bindActionCreators(importActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mentee));