import axios from 'axios';
import * as types from './ActionTypes';
import {GlobalsContext} from "../pages/globals";
const API_HOST = GlobalsContext._currentValue.server_host;
const API_MAIN = '/api/v1/main';
const API_MENTORS = '/api/v1/mentors';
const API_MENTEES = '/api/v1/mentees';
const API_DIARY  = '/api/v1/diaries-mentors/articles'; // {diary_srl}
const API_AUTH_CHECK = '/api/v1/auth'; // {diary_srl}
const API_USERS = '/api/v1/users';

export const authCheck = () => {

    return (dispatch) => {

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        return axios.get(`${API_HOST}${API_AUTH_CHECK}`, config)
            .then(response => {

                dispatch(Success(response.data, types.AUTH_CHECK))
            })
            .catch(error => {
                console.log("error", error);
            });
    }

}

export const mainLists = () => {

    return (dispatch) => {

        return axios.get(`${API_HOST}${API_MAIN}`)

            .then(response => {

                dispatch(Success(response.data, types.MAIN_LISTS))
            })
            .catch(error => {

                console.log("error : mainLists() " , error);
                throw(error);

            });
    }
}

export const getMentee = (mentee) => {

    return (dispatch) => {
        const url = `${API_HOST}${API_MENTEES}/${mentee}`;
        return axios.get(url)

            .then(response => {

                dispatch(Success(response.data, types.GET_MENTEE))

            })
            .catch(error => {

                console.log("error : getMentee() " , error);
                throw(error);

            });
    }
}
export const getMentor = (mentor) => {

    return (dispatch) => {

        const url = `${API_HOST}${API_MENTORS}/${mentor}`;

        return axios.get(url)

            .then(response => {

                dispatch(Success(response.data, types.GET_MENTOR))

            })
            .catch(error => {

                console.log("error : mentors() " , error);
                throw(error);

            });
    }
}

export const getUserInfo = () => {

    return (dispatch) => {

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        let url = `${API_HOST}${API_USERS}`;
        return axios.get(url, config)

            .then(response => {

                dispatch(Success(response.data, types.GET_USER))

            })
            .catch(error => {

                console.log("error : mentors() " , error);
                throw(error);

            });
    }
}

export const getMenteeDiary = (mentee, diary_id) => {

    return (dispatch) => {

        let config = {headers: {}};

        if ( localStorage.getItem('token') )
        {
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            };
        }

        return axios.get(`${API_HOST}${API_MENTEES}/${mentee}/diaries/${diary_id}`, config)

            .then(response => {

                if (!response.data.error) {

                    dispatch(Success(response.data, types.DIARY));
                }
            })
            .catch(error => {

                isLogged(false);

            });
    }
}


export const getDiary = (diary_id) => {

    return (dispatch) => {

        let config = {headers: {}};

        if ( localStorage.getItem('token') )
        {
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            };
        }

        return axios.get(`${API_HOST}${API_DIARY}/${diary_id}`, config)

            .then(response => {

                if (!response.data.error) {

                    dispatch(Success(response.data, types.DIARY));
                }
            })
            .catch(error => {

                isLogged(false);

            });
    }
}

export const isLogged = (stat = false, srl = null, user_type = null) => {

    if (stat === true) {

        return {

            type: types.IS_LOGGED,
            payload: {
                datas: {
                    logged: true,
                    srl: srl,
                    user_type: user_type,
                },
            }
        }

    } else {

        return {

            type: types.IS_LOGGED,
            payload: {
                datas: {
                    logged: false
                }
            }
        }
    }

}

export const Success = (datas, type) => {

    return {

        type: type,
        payload: {
            datas: datas
        }
    }
}