import React from 'react';
import MyPageEditMentor from "./MyPageEditMentor";
import MyPageEditMentee from "./MyPageEditMentee";


export const MyPageEndit = () => {

    return (
        <div>
            {localStorage.getItem('user_type') === "mentor" ? <MyPageEditMentor/> : <MyPageEditMentee/>}
        </div>
    )
}

