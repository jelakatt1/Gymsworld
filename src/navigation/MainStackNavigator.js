import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
import { useDispatch, useSelector } from 'react-redux';
import { SCREEN } from '../enums/AppEnums';
import { setUser } from '../redux/actions/Actions';
import {
    AdminRegister, ForgetPassword, LoginScreen, RegisterScreen,
    SelectLocation,
    SplashScreen,
} from '../screens';
import { ACCOUNT_TYPE, KEYS } from '../utils/Keys';
import AdminStack from './AdminStack';
import UserStack from './UserStack';



const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerShown: false,
};

const MainStackNavigator = () => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    const dispatch = useDispatch();



    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const data = await AsyncStorage.getItem(KEYS.USER)
        const parsedUser = JSON.parse(data)
        dispatch(setUser(parsedUser))
        await RNBootSplash.hide({ fade: true, duration: 1500 });


    }


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                {!user?.email ?
                    <>
                        <Stack.Screen name={SCREEN.SPLASH} component={SplashScreen} />
                        <Stack.Screen name={SCREEN.LOGIN} component={LoginScreen} />
                        <Stack.Screen name={SCREEN.REGISTER} component={RegisterScreen} />
                        <Stack.Screen name={SCREEN.FORGET} component={ForgetPassword} />
                        <Stack.Screen name={SCREEN.SELECT_LOCATION} component={SelectLocation} />
                        <Stack.Screen name={SCREEN.ADMIN_REGISTER} component={AdminRegister} />
                    </>
                    :
                    
                    user?.role == ACCOUNT_TYPE.USER
                        ?
                        <Stack.Screen name={SCREEN.USER_STACK} component={UserStack} />

                        :
                        <Stack.Screen name={SCREEN.ADMIN_STACK} component={AdminStack} />

                }
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default MainStackNavigator