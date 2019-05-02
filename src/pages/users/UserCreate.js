import React, {Component} from 'react';

import styles from './UserCreate.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";


const schema = yup.object({
    id: yup.string().min(5, '아이디를 5자 이상 넣어 주세요.').max(20, '아이디를 20자 이하로 넣어주세요').required('아이디를 입력해 주세요.'),
    password: yup.string().required('비밀번호를 입력해 주세요.'),
    name: yup.string().required('이름을 입력해 주세요.'),
    birthday: yup.string().required('생년월일 입력해 주세요.'),
    sex: yup.string().required('성별을 선택해 주세요.'),
    // address: yup.string().required('주소를 입력해 주세요.'),
    // farm_name: yup.string().required('주소를 입력해 주세요.'),
});

// let schemaDefaultValue = {
//     id: 'Test123',
//     password: 'Test123',
//     name: 'Test123',
//     birthday: '1984-11-24',
//     sex: '',
//     phone: '',
//     address: '',
// };

class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: '',
            daumPostOpen: false,
            schemaDefaultValue : {
                id: 'Test123',
                password: 'Test123',
                name: 'Test123',
                birthday: '1984-11-24',
                sex: '',
                phone: '',
                address: '',
                farm_name: '',
            }
        }

    }


    handleDaumPost = () => {
        console.log("----", this.state.schemaDefaultValue );
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

        // schemaDefaultValue.address = fullAddress;

        this.setState(prevState => ({
            ...prevState,
            schemaDefaultValue: {
                ...prevState.schemaDefaultValue,
                address: fullAddress
            }
        }));
    }


    handleText = (e) => {

        const schemaDefaultValue = {...this.state.schemaDefaultValue};
        schemaDefaultValue[e.target.name] = e.target.value;
        this.setState({schemaDefaultValue})
    }


    render() {

        return (

            <div className={classNames('container', styles['in-container'])}>

                <div className={styles['user-create-container']}>
                    <h3>회원가입 - 멘토</h3>
                    <br/>
                    <Formik
                        enableReinitialize={true}
                        validationSchema={schema}
                        initialValues={this.state.schemaDefaultValue}
                        onSubmit={(values, {setSubmitting}) => {

                            console.log("gggg");
                            setTimeout(() => {
                                alert(JSON.stringify(this.state.schemaDefaultValue, null, 2));
                                setSubmitting(false);
                            }, 500);
                        }}


                        render={({
                                     handleSubmit,
                                     handleChange,
                                     handleBlur,
                                     values,
                                     touched,
                                     errors,
                                     setFieldValue
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
                                            value={values.id}
                                            onChange={handleChange}
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
                                            value={values.password}
                                            onChange={handleChange}
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
                                            value={values.name}
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
                                                value={values.sex}
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
                                            value={values.farm_name}
                                            // onChange={(e) => this.handleText(e)}
                                            isInvalid={!!errors.farm_name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.farm_name}
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
                                                value={values.address}
                                                readOnly
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
                                        <Form.Control as="select" name="career">
                                            <option value="1-3">1년 ~ 3년</option>
                                            <option value="5-9">5년 ~ 9년</option>
                                            <option value="10-14">10년 ~ 14년</option>
                                            <option value="15-0">15년 이상</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="crops">
                                    <Form.Label column sm="2">주요작물</Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" name="crops">
                                            <option value="콩">콩</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <br/><br/>
                                <h5>선택항목</h5>
                                <hr/>
                                <Form.Group as={Row} controlId="profile_image">
                                    <Form.Label column sm="2">프로필 이미지</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="file" name="profile_image"/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="phone">
                                    <Form.Label column sm="2">연락처</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            placeholder="010-1234-5678"
                                            name="phone"
                                            value={values.phone}
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
                                        <Button variant="dark" type="submit">가입하기</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}/>
                </div>
            </div>


        )
    }
}

export default UserCreate