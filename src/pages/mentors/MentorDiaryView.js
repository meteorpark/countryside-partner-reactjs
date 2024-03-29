import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {MentorProfile} from "./MentorProfile";
import axios from "axios";
import history from "../history";
import {GlobalsContext} from '../../pages/globals';
import {withRouter} from "react-router";
import {withAlert} from "react-alert";
import Diary from "../diaries/Diary";

class MentorDiaryView extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiMentorDiary: `${context.server_host}/api/v1/mentors/${this.props.match.params.mentor}/diaries`,
            isLoading: false,
            schemaDefaultValue: {
                title: '',
                image: '',
                contents: '',
            }
        }
    }

    handleClick = () => {

        this.setState({isLoading: true}, () => {
            return new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
                this.setState({isLoading: false});
                this.handleDiaryCreate();
            });
        });
    }

    handleDiaries = () => {

        history.push(`/mentors/${localStorage.getItem('srl')}`);
    }
    handleDiaryModify = (diary_srl) => {

        history.push(`/mentors/${localStorage.getItem('srl')}/diaries/${diary_srl}/modify`);
    }
    handleDiaryDelete = (diary_srl) => {

        let formData = new FormData();
        formData.append('_method', 'DELETE');
        formData.append('diary_srl', diary_srl);
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        return axios.post(`${this.state.apiMentorDiary}/${diary_srl}`, formData, config)
            .then(response => {
                this.props.alert.show('삭제 되었습니다.');
                history.push(`/mentors/${this.props.match.params.mentor}`);
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    handleDiaryCreate = () => {

        let formData = new FormData();
        formData.append('title', this.state.schemaDefaultValue.title);
        formData.append('contents', this.state.schemaDefaultValue.contents);
        formData.append('image', this.state.schemaDefaultValue.image);

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        return axios.post(`${this.state.apiMentorDiary}`, formData, config)
            .then(response => {

                this.props.alert.show('등록 되었습니다.');
                history.push(`/mentors/${this.props.match.params.mentor}`);
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    render() {

        const {mapStateToPropsMentor, mapStateToPropsDiary} = this.props;

        return (

            <div>
                <MentorProfile mentor={mapStateToPropsMentor}/>
                <Diary
                    handleDiaries={() => this.handleDiaries()}
                    handleDiaryDelete={(diary_srl) => this.handleDiaryDelete(diary_srl)}
                    handleDiaryModify={(diary_srl) => this.handleDiaryModify(diary_srl)}
                    diary={mapStateToPropsDiary.diary}
                />
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
        actionMentor.getDiary(match.params.diary_id);
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor.mentor,
    mapStateToPropsDiary: state.diary

})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

MentorDiaryView.contextType = GlobalsContext;
export default withRouter(compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MentorDiaryView));