import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BoardActive, BoardWhite, HomeActive, HomeWhite, MenuActive, MenuWhite, SearchActive, SearchWhite } from '../assets/svg';
import { SCREEN } from '../enums/AppEnums';
import { COLOR, FONT, hp } from '../enums/StyleGuide';
import { Admin, ClassesScreen, GymHome, MenuScreen } from '../screens';
import { isIOS } from '../utils/myUtils';

const Tab = createBottomTabNavigator();
let size = hp(2.5)

const screenOptionStyle = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        height: isIOS() ? hp(9.3) : hp(8),
        backgroundColor: COLOR.GREY_2,
        borderTopWidth: 0,
        paddingBottom: isIOS() ? hp(2.3) : hp(1),
    },
}

const AdminBottomNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptionStyle}>
            <Tab.Screen
                name={SCREEN.GYM_HOME}
                component={GymHome}
                options={() => ({
                    title: 'Home',
                    tabBarActiveTintColor: COLOR.YELLOW,
                    tabBarInactiveTintColor: COLOR.WHITE,
                    tabBarLabelStyle: styles.titleStyle,
                    tabBarIcon: ({ focused }) => {
                        return (focused ?
                            <HomeActive width={size} height={size} />
                            :
                            <HomeWhite width={size} height={size} />
                        )
                    }
                })}
            />
            <Tab.Screen
                name={SCREEN.WORKOUT}
                component={Admin.WorkoutScreen}
                options={() => ({
                    title: 'Workout',
                    tabBarActiveTintColor: COLOR.YELLOW,
                    tabBarInactiveTintColor: COLOR.WHITE,
                    tabBarLabelStyle: styles.titleStyle,
                    tabBarIcon: ({ focused }) => {
                        return (focused ?
                            <BoardActive width={size} height={size} />
                            :
                            <BoardWhite width={size} height={size} />
                        )
                    }
                })}
            />
            <Tab.Screen
                name={SCREEN.CLASSES}
                component={ClassesScreen}
                options={() => ({
                    title: 'Classes',
                    tabBarActiveTintColor: COLOR.YELLOW,
                    tabBarInactiveTintColor: COLOR.WHITE,
                    tabBarLabelStyle: styles.titleStyle,
                    tabBarIcon: ({ focused }) => {
                        return (focused ?
                            <SearchActive width={size} height={size} />
                            :
                            <SearchWhite width={size} height={size} />
                        )
                    }
                })}
            />
            <Tab.Screen
                name={SCREEN.MENU}
                component={MenuScreen}
                options={() => ({
                    tabBarActiveTintColor: COLOR.YELLOW,
                    tabBarInactiveTintColor: COLOR.WHITE,
                    tabBarLabelStyle: styles.titleStyle,
                    tabBarIcon: ({ focused }) => {
                        return (focused ?
                            <MenuActive width={size} height={size} />
                            :
                            <MenuWhite width={size} height={size} />
                        )
                    }
                })}
            />

        </Tab.Navigator>
    )
}

export default AdminBottomNavigator

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 11,
        fontFamily: FONT.PoppinsRegular,
    }
})