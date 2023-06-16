import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BoardActive, BoardWhite, HomeActive, HomeWhite, MenuActive, MenuWhite, SearchActive, SearchWhite } from '../assets/svg';
import { SCREEN } from '../enums/AppEnums';
import { COLOR, FONT, hp } from '../enums/StyleGuide';
import { HomeScreen, LeaderboardScreen, MenuScreen, SearchScreen } from '../screens';
import { isIOS } from '../utils/myUtils';

const Tab = createBottomTabNavigator();
let size = hp(2.5)

const screenOptionStyle = {
    headerShown: false,
    tabBarHideOnKeyboard:true,
    tabBarStyle: {
        height: isIOS() ? hp(9.3) : hp(8),
        backgroundColor: COLOR.GREY_2,
        borderTopWidth: 0,
        paddingBottom: isIOS() ? hp(2.3) : hp(1),
    },
}

const BottomNavigator = () => {
    return (
            <Tab.Navigator screenOptions={screenOptionStyle}>
                <Tab.Screen
                    name={SCREEN.HOME}
                    component={HomeScreen}
                    options={() => ({
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
                    name={SCREEN.LEADER_BOARD}
                    component={LeaderboardScreen}
                    options={() => ({
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
                {/* <Tab.Screen
                    name={SCREEN.NOTIFICATION}
                    component={NotificationScreen}
                    options={() => ({
                        tabBarActiveTintColor: COLOR.YELLOW,
                        tabBarInactiveTintColor: COLOR.WHITE,
                        tabBarLabelStyle: styles.titleStyle,
                        tabBarIcon: ({ focused }) => {
                            return (focused ?
                                <NotificationActive width={size} height={size} />
                                :
                                <NotificationWhite width={size} height={size} />
                            )
                        }
                    })}
                /> */}
                <Tab.Screen
                    name={SCREEN.SEARCH}
                    component={SearchScreen}
                    options={() => ({
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

export default BottomNavigator

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 11,
        fontFamily: FONT.PoppinsRegular,
    }
})