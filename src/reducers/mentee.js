import * as types from '../actions/ActionTypes';

const initialState = {

    mentee: {},
    diaries: {
        current_page: 0,
        last_page: 0,
        data: []
    },
    lists: {
        current_page: 0,
        last_page: 0,
        data: []
    },
};

export const mentee = (state = initialState, action) => {

    switch (action.type) {

        case types.GET_MENTEE:

            return {
                mentee: action.payload.datas,
                diaries: {
                    current_page: 0,
                    last_page: 0,
                    data: []
                },
                lists: {
                    current_page: 0,
                    last_page: 0,
                    data: []
                },
            };

        case types.MENTEE_LISTS:

            return {
                ...state,
                lists: {
                    ...state.lists,
                    current_page: action.payload.datas.current_page,
                    data: [
                        ...state.lists.data,
                        ...action.payload.datas.data
                    ],
                    last_page: action.payload.datas.last_page,
                }
            };

        case types.MENTEE_DIARIES:
            return {
                ...state,
                diaries: {
                    ...state.diaries,
                    current_page: action.payload.datas.current_page,
                    data: [
                        ...state.diaries.data,
                        ...action.payload.datas.data
                    ],
                    last_page: action.payload.datas.last_page,
                },
            };

        default:

            return state;
    }
}