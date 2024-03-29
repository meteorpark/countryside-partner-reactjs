import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './Main.module.scss';
import classNames from 'classnames';
import API from "../api/api";
import * as reactIconFa from "react-icons/fa";


export function Sns() {

    const [blogRss, setBlogRss] = useState([]);
    const [twitter, setTwitter] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getSns();

    }, []);

    const getSns = () => {

        API.getSns().then((res) => {

            let blogContents = res.map((b, i) => {

                if(b.sns_type !== "naverblog") return false;

                return (

                    <a href={b.url} target="_blank" key={i} className={styles['link']} rel="noopener noreferrer" >
                        <Row className={styles['sns-contents-container']}>
                            <Col>
                                <div className={styles['sns-time']}><small className="text-right">{b.text_created_at}</small></div>
                                <p className={styles['sns-contents']}>
                                    {b.text.substr(0, 120)}...
                                </p>
                                <hr className={styles['sns_hr']}/>
                            </Col>
                        </Row>
                    </a>
                );
            });
            setBlogRss(blog => blog.concat(blogContents));


            let twitterContents = res.map((t, i) => {

                if(t.sns_type !== "twitter") return false;

                return (

                    <a href={t.url} target="_blank" key={i} className={styles['link']} rel="noopener noreferrer" >
                        <Row className={styles['sns-contents-container']}>
                            <Col>
                                <div className={styles['sns-time']}><small className="text-right">{t.text_created_at}</small></div>
                                <p className={styles['sns-contents']}>
                                    {t.text.substr(0, 120)}...
                                </p>
                                <hr className={styles['sns_hr']}/>
                            </Col>
                        </Row>
                    </a>
                );
            });
            setTwitter(tw => tw.concat(twitterContents));
        });
    }

    const styleContainer = {
        marginTop:'20px',
        paddingBottom:'20px',
        paddingTop:'20px',
        backgroundColor: '#ffffff'
    };

    return (


        <div className={classNames('container', styles['in-container'])} style={styleContainer}>

            <p className={styles['header-container']}><reactIconFa.FaRss className={styles['main-icon']}/>SNS</p>
            <Row className="justify-content-md-center">
                <Col sm>
                    <div
                        className={classNames('container', styles['in-container-two-row'], styles['auto-container'], styles['naverblog-color'])}>
                        <p className={styles['header-container']}>
                            <img src="/images/ico/blog.png" className={styles['image-ico']} alt="아이콘" />&nbsp;농촌진흥청 공식 네이버블로그
                        </p>
                        {blogRss}
                    </div>
                </Col>
                <Col sm>
                    <div
                        className={classNames('container', styles['in-container-two-row'], styles['auto-container'], styles['twitter-color'])}>
                        <p className={styles['header-container']}>
                            <img src="/images/ico/twitter.png" className={styles['image-ico']} alt="아이콘" />&nbsp;농촌진흥청 공식 트위터
                        </p>
                        {twitter}
                    </div>
                </Col>
            </Row>
        </div>
    )
}