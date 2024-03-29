import {GlobalsContext} from "../globals";
const API_HOST = GlobalsContext._currentValue.server_host;

// const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_MESSAGE_LISTS = "/api/v1/chat/message";
const API_CHAT_LISTS = "/api/v1/chat";
const API_CHAT_USER = "/api/v1/users";
const API_BEST_DIARIES = "/api/v1/main/best-diaries";
const API_MENTORS = "/api/v1/mentors";
const API_MENTEES = "/api/v1/mentees";
const OPEN_API_EDUCATION_FARMS = "/api/openapi/educationFarms";
const OPEN_API_WEEK_FARM_INFO = "/api/openapi/weekFarmInfo";
const OPEN_API_SNS = "/api/openapi/sns";
const OPEN_API_MACHINE = '/api/openapi/machines';
// console.log('server... ', API_HOST);

export default {

    getBasicNextPage: (url) => {

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${url}`,{
            method: 'get',
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    getMessageLists: (chat_id, page) => { // 대화 목록 가져오기

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${API_HOST}${API_MESSAGE_LISTS}/${chat_id}?page=${page}`,{
            method: 'get',
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    sendMessage: (form) => { // 메세지 보내기

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${API_HOST}${API_SEND_MESSAGE}`,{
            method: 'post',
            body: form,
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    getChatLists: () => { // 채팅목록 가져오기

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };

        return fetch(`${API_HOST}${API_CHAT_LISTS}`,{
            method: 'get',
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    getUserInfo: () => { // 회원정보 가져오기

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${API_HOST}${API_CHAT_USER}`,{
            method: 'get',
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    getBestDiaries: () => { // 베스트 글 가져오기
        return fetch(`${API_HOST}${API_BEST_DIARIES}`).then(
            res => res.json()
        );
    },

    getOpenApiEducationFarms: (page, sType, sText) => { // 농촌교육농장
        return fetch(`${API_HOST}${OPEN_API_EDUCATION_FARMS}?page=${page}&sType=${encodeURI(sType)}&sText=${encodeURI(sText)}`).then(
            res => res.json()
        );
    },

    getOpenApiEducationFarmDetail: (cntntsNo) => { // 농촌교육농장 상세
        return fetch(`${API_HOST}${OPEN_API_EDUCATION_FARMS}/${cntntsNo}`).then(
            res => res.json()
        );
    },

    getOpenApiWeekFarmInfo: (page) => { // 주간농사정보
        return fetch(`${API_HOST}${OPEN_API_WEEK_FARM_INFO}?page=${page}`).then(
            res => res.json()
        );
    },

    getSns: () => { // SNS
        return fetch(`${API_HOST}${OPEN_API_SNS}`).then(
            res => res.json()
        );
    },

    getMentors: (page) => {
        return fetch(`${API_HOST}${API_MENTORS}?page=${page}`).then(
            res => res.json()
        );
    },

    getMentees: (page) => {
        return fetch(`${API_HOST}${API_MENTEES}?page=${page}`).then(
            res => res.json()
        );
    },

    getMenteeDiaries: (mentee, page) => {
        return fetch(`${API_HOST}${API_MENTEES}/${mentee}/diaries?page=${page}`).then(
            res => res.json()
        );
    },

    getMentorDiaries: (mentor, page) => {
        return fetch(`${API_HOST}${API_MENTORS}/${mentor}/diaries?page=${page}`).then(
            res => res.json()
        );
    },

    getMachineLists: (search) => {

        let apiAdd = "?CTPRVN="+encodeURI(search.ctprvn);
        if(search.fch_knd !== "") apiAdd += "&FCH_KND="+encodeURI(search.fch_knd);

        return fetch(`${API_HOST}${OPEN_API_MACHINE}${apiAdd}`).then(res => {
            return res.json();
        });
    },


}
