import React, {Component} from 'react';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import {MachinePC} from "./MachinePC";
import {MachineMobile} from "./MachineMobile";
import API from "../api/api";


class Machine extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isMobile: false,
            loading: false,
            machines: [],
            search: {
                ctprvn: '충청남도',
                fch_knd: '',
            }
        }
        this.resize = this.resize.bind(this);
    }


    handleSearch = () => {
        this.setState({loading: true})
        this.getMachineLists(this.state.search);
    }

    handleChange = (e) => {

        const search = {...this.state.search};
        search[e.target.name] = e.target.value;
        this.setState({search});
    }

    resize(){
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== this.state.isMobile) {
            this.setState({isMobile: currentHideNav});
        }
    }

    render() {

        // const machines = this.props.mapStateToMachine.lists.filter(m => m.ROW_NUM);

        return (

            <div className={classNames('container', styles['in-container'])}>
                <p className={styles['header-container']}>
                    <reactIconFa.FaTractor className={styles['main-icon']}/>
                    전국 농기계 현황
                </p>
                <Form.Row>
                    <Col sm={2}>
                        {/*<Form.Label>지역</Form.Label>*/}
                        <Form.Control name="ctprvn" as="select" onChange={this.handleChange}>
                            <option value="충청남도">충청남도</option>
                            <option value="충청북도">충청북도</option>
                            <option value="전라남도">전라남도</option>
                            <option value="전라북도">전라북도</option>
                            <option value="경상남도">경상남도</option>
                            <option value="경상북도">경상북도</option>
                            <option value="세종특별자치시">세종특별자치시</option>
                            <option value="서울특별시">서울특별시</option>
                            <option value="부산광역시">부산광역시</option>
                            <option value="대구광역시">대구광역시</option>
                            <option value="인천광역시">인천광역시</option>
                            <option value="광주광역시">광주광역시</option>
                            <option value="대전광역시">대전광역시</option>
                            <option value="울산광역시">울산광역시</option>
                            <option value="경기도">경기도</option>
                            <option value="강원도">강원도</option>
                            <option value="제주특별자치도">제주특별자치도</option>
                        </Form.Control>
                    </Col>

                    <Col sm={2}>
                        {/*<Form.Label>농기계 구분</Form.Label>*/}
                        <Form.Control name="fch_knd" as="select" onChange={this.handleChange}>
                            <option value="">전체</option>
                            <option value="동력경운기">동력경운기</option>
                            <option value="농용트랙터">농용트랙터</option>
                            <option value="스피드스프레이어">스피드스프레이어</option>
                            <option value="동력이앙기">동력이앙기</option>
                            <option value="관리기">관리기</option>
                            <option value="콤바인">콤바인</option>
                            <option value="곡물건조기">곡물건조기</option>
                            <option value="농산물건조기">농산물건조기</option>
                        </Form.Control>
                    </Col>
                    &nbsp;&nbsp;<Button variant="secondary" onClick={this.handleSearch}>
                    <reactIconFa.FaSearch className={styles['icons']}/>
                    조회</Button>
                    {this.state.loading === true ?
                        <Spinner
                            className={styles['custom-spinner']}
                            animation="grow"
                            variant="danger"
                        />
                        : ""
                    }
                </Form.Row>
                <p className={styles['source']}>농림축산식품 공공데이터포털 OpenAPI (전국 농기계 현황)</p>
                {
                    this.state.isMobile ?
                        <MachineMobile machines={this.state.machines}/> :
                        <MachinePC machines={this.state.machines}/>
                }


            </div>
        );
    }

    componentDidMount() {
        this.setState({loading: true});
        this.getMachineLists(this.state.search);

        window.addEventListener("resize", this.resize, false);
        this.resize();
    }

    getMachineLists = async (search) => {

        const res = await API.getMachineLists(search);
        this.setState({
            machines: res.Grid_20141119000000000080_1.row,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        이 API는 컴포넌트에서 render() 를 호출하고난 다음에 발생하게 됩니다. 이 시점에선 this.props 와 this.state 가 바뀌어있습니다.
        그리고 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 할 수 있습니다.
        그리고, getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값으로 받아옵니다.
         */
        if (prevState.loading === true) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize, false);
    }
}

export default Machine;
