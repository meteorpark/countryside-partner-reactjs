import React, {Component} from 'react';

import styles from './Join.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";
import axios from 'axios';
import { withAlert } from 'react-alert'
import history from '../history';
import { withRouter } from "react-router";
import {GlobalsContext} from '../../pages/globals';
import * as importActions from "../../actions";
import {bindActionCreators, compose} from 'redux';
import {connect} from "react-redux";

const schema = yup.object({
    id: yup.string().min(5, '아이디를 5자 이상 넣어 주세요.').max(20, '아이디를 20자 이하로 넣어주세요').required('아이디를 입력해 주세요.'),
    password: yup.string().required('비밀번호를 입력해 주세요.'),
    name: yup.string().required('이름을 입력해 주세요.'),
    birthday: yup.string().required('생년월일 입력해 주세요.'),
    sex: yup.string().required('성별을 선택해 주세요.'),
    introduce: yup.string().required('소개를 해주세요.'),
    address: yup.string().required('주소를 입력해 주세요.'),
    farm_name: yup.string().required('농장명을 입력해 주세요.'),
    career: yup.string().required('경력을 선택해 주세요.'),
    crops: yup.string().required('주요작물을 선택해 주세요.'),
});


class MentorCreate extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUserCreate: context.server_host + '/api/v1/join/mentor',
            isLoading: false,
            daumPostOpen: false,
            schemaDefaultValue : {
                id: '',
                profile_image: '',
                password: '',
                name: '',
                birthday: '',
                sex: '',
                phone: '',
                address: '',
                farm_name: '',
                career: '',
                introduce: '',
                crops: '',
            }
        }
    }

    handleDaumPost = () => {
        this.state.daumPostOpen ? this.setState({daumPostOpen: false}) : this.setState({daumPostOpen: true});
    }

    handleAddress = (data) => {

        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.handleDaumPost();

        this.setState(prevState => ({
            ...prevState,
            schemaDefaultValue: {
                ...prevState.schemaDefaultValue,
                address: fullAddress
            }
        }));
    }

    handleText = (e, type = 'text') => {
        const schemaDefaultValue = {...this.state.schemaDefaultValue};

        if(type === "text"){

            schemaDefaultValue[e.target.name] = e.target.value;
        }else{

            schemaDefaultValue[e.target.name] = e.target.files[0];
        }

        this.setState({schemaDefaultValue})
    }


    handleClick = () => {

        this.setState({ isLoading: true }, () => {
            return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
                this.handleUserCreate();
            });
        });

    }


    handleUserCreate = () => {

        let formData = new FormData();
        formData.append('id', this.state.schemaDefaultValue.id);
        formData.append('profile_image', this.state.schemaDefaultValue.profile_image);
        formData.append('password', this.state.schemaDefaultValue.password);
        formData.append('name', this.state.schemaDefaultValue.name);
        formData.append('birthday', this.state.schemaDefaultValue.birthday);
        formData.append('sex', this.state.schemaDefaultValue.sex);
        formData.append('phone', this.state.schemaDefaultValue.phone);
        formData.append('address', this.state.schemaDefaultValue.address);
        formData.append('farm_name', this.state.schemaDefaultValue.farm_name);
        formData.append('career', this.state.schemaDefaultValue.career);
        formData.append('introduce', this.state.schemaDefaultValue.introduce);
        formData.append('crops', this.state.schemaDefaultValue.crops);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };

        return axios.post(`${this.state.apiUserCreate}`, formData, config)
                .then(response => {

                    const res = response.data;
                    this.props.alert.show('등록 되었습니다.');
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('name', res.name);
                    localStorage.setItem('user_type', 'mentor');
                    localStorage.setItem('srl', res.mentor_srl);
                    this.props.actions.isLogged(true, res.mentor_srl, 'mentor');
                    history.push("/");
                })
                .catch(error => {
                    console.log("error", error);
                });
    }


    render() {


        return (


            <div className={classNames('container', styles['in-container'])}>

                <div className={styles['user-create-container']}>
                    <h3>회원가입 - 멘토</h3>
                    <br/>
                    <Formik
                        onSubmit={(values, actions) => {
                            this.handleClick()
                        }}
                        enableReinitialize={true}
                        validationSchema={schema}
                        initialValues={this.state.schemaDefaultValue}
                        render={({
                                     handleSubmit,
                                     handleChange,
                                     handleBlur,
                                     values,
                                     errors
                                 }) => (

                            <Form
                                className="needs-validation"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <h5>*기본정보</h5>
                                <hr/>

                                <Form.Group as={Row} controlId="id">
                                    <Form.Label column sm="2">아이디</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            name="id"
                                            value={this.state.schemaDefaultValue.id}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.id}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.id}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password">
                                    <Form.Label column sm="2">비밀번호</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={this.state.schemaDefaultValue.password}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="name">
                                    <Form.Label column sm="2">이름</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={this.state.schemaDefaultValue.name}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="birthday">
                                    <Form.Label column sm="2">생년월일</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ex : 1984-11-24"
                                            name="birthday"
                                            value={this.state.schemaDefaultValue.birthday}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.birthday}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.birthday}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <fieldset>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={2}>성별</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="hidden"
                                                id="sex"
                                                name="sex"
                                                value={this.state.schemaDefaultValue.sex}
                                                onChange={(e) => this.handleText(e)}
                                                isInvalid={!!errors.sex}
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                value="male"
                                                label="남"
                                                name="sex"
                                                onChange={(e) => this.handleText(e)}
                                                id="sex1"
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                value="female"
                                                label="여"
                                                name="sex"
                                                onChange={(e) => this.handleText(e)}
                                                id="sex2"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.sex}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                                <br/><br/>
                                <h5>*농장정보</h5>
                                <hr/>
                                <Form.Group as={Row} controlId="farm_name">
                                    <Form.Label column sm="2">농장명</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            name="farm_name"
                                            placeholder=""
                                            value={this.state.schemaDefaultValue.farm_name}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.farm_name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.farm_name}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="introduce">
                                    <Form.Label column sm="2">농장소개</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="introduce"
                                            value={this.state.schemaDefaultValue.introduce}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.introduce}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.introduce}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="address">
                                    <Form.Label column sm="2">농장주소</Form.Label>
                                    <Col sm="10">
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                placeholder=""
                                                readOnly
                                                value={this.state.schemaDefaultValue.address}
                                                onChange={(e) => this.handleText(e)}
                                                isInvalid={!!errors.address}
                                            />
                                            <InputGroup.Append>
                                                <Button
                                                    variant="outline-dark"
                                                    onClick={this.handleDaumPost}>
                                                    주소검색
                                                </Button>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        {this.state.daumPostOpen ? <DaumPostcode onComplete={this.handleAddress}/> : ''}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="career">
                                    <Form.Label column sm="2">업종경력</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            as="select"
                                            name="career"
                                            value={this.state.schemaDefaultValue.career}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.career}
                                        >
                                            <option value="1년~3년">1년~3년</option>
                                            <option value="5년~9년">5년~9년</option>
                                            <option value="10년~14년">10년~14년</option>
                                            <option value="15년 이상">15년 이상</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.career}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="crops">
                                    <Form.Label column sm="2">주요작물</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            as="select"
                                            name="crops"
                                            value={this.state.schemaDefaultValue.crops}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.crops}
                                        >
                                            <option value="">선택해 주세요.</option>
                                            <option value="콩">콩</option>
                                            <option value="감">감</option>
                                            <option value="밀">밀</option>
                                            <option value="밤">밤</option>
                                            <option value="배">배</option>
                                            <option value="사과">사과</option>
                                            <option value="수수">수수</option>
                                            <option value="옥수수">옥수수</option>
                                            <option value="조">조</option>
                                            <option value="팥">팥</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.crops}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <br/><br/>
                                <h5>선택항목</h5>
                                <hr/>
                                <Form.Group as={Row} controlId="profile_image">
                                    <Form.Label column sm="2">프로필 이미지</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="file"
                                            name="profile_image"
                                            onChange={(e) => this.handleText(e, 'file')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.profile_image}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="phone">
                                    <Form.Label column sm="2">연락처</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            placeholder="010-1234-5678"
                                            name="phone"
                                            value={this.state.schemaDefaultValue.phone}
                                            onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Row>
                                    <Col className={classNames("text-center", styles['end-button-top'])}>
                                        <hr/>
                                        <Button
                                            variant="dark"
                                            type="submit"
                                            disabled={this.state.isLoading}
                                            onClick={!this.state.isLoading ? handleSubmit : null}

                                        >
                                            {this.state.isLoading ? '처리 중' : '가입하기'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}/>
                </div>
            </div>


        )
    }
}

MentorCreate.contextType = GlobalsContext;

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(importActions, dispatch),
})

export default withRouter(compose(withAlert(),connect(null, mapDispatchToProps))(MentorCreate));


