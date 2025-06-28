import { useState } from "react";

import { useAuth } from "../config/AuthContext";

const ProfileUpdate = ()=>{

    const {user} = useAuth();
    console.log(user);
    

    return (
        <>
           <h1>Update Profile</h1>
        </>
    );

}

export default ProfileUpdate;