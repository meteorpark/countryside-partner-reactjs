import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from '../mentors/Mentors.module.scss';
import {Link} from 'react-router-dom';
import {CardColumns, Card} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";

class Mentees extends Component {

    render() {

        return (

            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaRegKissWinkHeart className={styles['main-icon']}/>
                    멘티소개
                </p>
                <CardColumns bsPrefix={'card-columns-custom'}>
                {this.props.mains.lists.map((mentors, i) => (

                    <Link className={classNames(styles['link'])} to={`/mentors/${mentors.mentor_srl}`} key={i}>
                        <Card className={styles['mentors-cards']}>
                            <Card.Body>
                                <Card.Title className={styles['mentors-title']}>{mentors.profile_image ? <Card.Img src={mentors.profile_image} /> : ""}{mentors.farm_name}</Card.Title>
                                <Card.Text className={styles['mentors-contents']}>
                                    <reactIconFa.FaUserAlt className={styles['icons']} />{mentors.name}<br/>
                                    <reactIconFa.FaHome className={styles['icons']} />{mentors.address}<br/>
                                    <reactIconFa.FaSeedling className={styles['icons']} />{mentors.crops}<br/>
                                    <reactIconFa.FaTractor className={styles['icons']} />{mentors.career}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
                </CardColumns>
            </div>
        );
    }

    componentDidMount() {

        const {getMains} = this.props;
        getMains.mentorLists();
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/Village.js 의 키값과 같아야 한다
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentees);