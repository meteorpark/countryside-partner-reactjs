import * as types from '../actions/ActionTypes';

const initialState = {
    lists: [],
};

export const mainLists = (state = initialState, action) => {

    switch(action.type) {

        case types.MAIN_LISTS:

            return {
                lists: [
                    ...action.payload.datas
                ]
            };

        default:

            return state;
    }
}