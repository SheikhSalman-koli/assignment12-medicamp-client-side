import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UseAuth = () => {

    const authFunc = use(AuthContext)

    return authFunc
};

export default UseAuth;