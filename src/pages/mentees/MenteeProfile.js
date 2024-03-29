import React from 'react';
import styles from './Mentees.module.scss';
import {Row, Col, Image, Container} from 'react-bootstrap';
import * as reactIconFa from "react-icons/fa";
import {Link} from "react-router-dom";

export const MenteeProfile = (props) => {

    const mentee = props.mentee;

    const jumbotronStyle = {
        backgroundImage: 'url(/images/bg/profile-bg-mentee.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className={styles['profile-container-fluid']}>
            <div style={jumbotronStyle}>
                <div className={styles['profile-introduce']}>
                    <Container className={styles['profile-container']}>
                        <Row className="justify-content-md-center">
                            <Col sm={3} className={styles['profile-image-container']}>
                                <Link to={`/mentees/${mentee.mentee_srl}`} className={styles['link-w']}>
                                <Image
                                    className={styles['profile-image']}
                                    roundedCircle
                                    src={mentee.profile_image ? mentee.profile_image : '/images/no-image.png'}
                                />
                                </Link>
                                {/*<br/>*/}
                                {/*<Button variant="success" className={styles['menteeing-button']}>*/}
                                {/*    <reactIconFa.FaPaperPlane className={styles['icon']}/>*/}
                                {/*    멘토링 요청*/}
                                {/*</Button>*/}
                            </Col>
                            <Col className={styles['profile-info']}>
                                <reactIconFa.FaUserAlt className={styles['icon']}/>
                                <Link to={`/mentees/${mentee.mentee_srl}`} className={styles['link-w']}>{mentee.name} ({mentee.id})</Link>
                                <br/>
                                <reactIconFa.FaRunning className={styles['icon']}/>{mentee.crops}
                                <br/>
                                <reactIconFa.FaMapMarked className={styles['icons']} />{mentee.target_area}
                                <br/>
                                <reactIconFa.FaPiedPiperHat className={styles['icon']}/>{mentee.homi}개
                                <br/>
                                <reactIconFa.FaRegCommentDots className={styles['icon']}/>{mentee.introduce}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

