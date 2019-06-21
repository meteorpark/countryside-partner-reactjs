import {GlobalsContext} from "../globals";

const API_HOST = GlobalsContext._currentValue.server_host;

// const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_MESSAGE_LISTS = "/api/v1/chat/message";
const API_CHAT_LISTS = "/api/v1/chat";
const API_CHAT_USER = "/api/v1/users";

console.log('server... ', API_HOST);

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
    }



}
