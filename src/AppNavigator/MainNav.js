import React, { useContext, useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from './BottomTab';
import AuthContext from '../Context/AuthContext';


const MainNav = () => {
    const {user} = useContext(AuthContext);
    return(
        <>
            {
                !!user ? <BottomTab /> : <AuthStack />
            }
        </>
    )
}

export default MainNav;