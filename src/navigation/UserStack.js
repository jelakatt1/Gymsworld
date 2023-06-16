import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Admin, FriendListScreen, GymHome, MapScreen, MemberListScreen,
    PointScoreScreen, ProfileScreen, ReferralScreen, ReportScreen, ScoreBoardScreen,
    StoreScreen, SurveyScreen, AllUsersScreen, UserFriendRequests,
    SelectOrganization, PostCommentScreen, ClassesScreen, SeeAllScreen
} from '../screens';
import { SCREEN } from '../enums/AppEnums';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerShown: false,
};

const UserStack = () => {
    return (
        <>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name={SCREEN.TAB} component={BottomNavigator} />

                {/* <Stack.Screen name={SCREEN.MEMBER_LIST} component={MemberListScreen} /> */}
                {/* <Stack.Screen name={SCREEN.POINT_SCORE} component={PointScoreScreen} /> */}

                <Stack.Screen name={SCREEN.FRIEND_LIST} component={FriendListScreen} />
                <Stack.Screen name={SCREEN.ALL_USERS} component={AllUsersScreen} />
                <Stack.Screen name={SCREEN.USER_FRIEND_REQ} component={UserFriendRequests} />
                <Stack.Screen name={SCREEN.CREATE_POST} component={Admin.CreatePost} />
                <Stack.Screen name={SCREEN.SELECT_ORGANIZATION} component={SelectOrganization} />
                <Stack.Screen name={SCREEN.SCORE_BOARD} component={ScoreBoardScreen} />


                <Stack.Screen name={SCREEN.SURVEY} component={SurveyScreen} />
                <Stack.Screen name={SCREEN.PROFILE} component={ProfileScreen} />
                <Stack.Screen name={SCREEN.REFERRAL} component={ReferralScreen} />
                <Stack.Screen name={SCREEN.GYM_HOME} component={GymHome} />
                <Stack.Screen name={SCREEN.POST_COMMENTS} component={PostCommentScreen} />
                <Stack.Screen name={SCREEN.REPORT} component={ReportScreen} />
                <Stack.Screen name={SCREEN.MAP} component={MapScreen} />
                <Stack.Screen name={SCREEN.STORE} component={StoreScreen} />
                <Stack.Screen name={SCREEN.CLASSES} component={ClassesScreen} />
                <Stack.Screen name={SCREEN.TEST_SCREEN} component={Admin.TestScreen} />
                <Stack.Screen name={SCREEN.SEE_ALL} component={SeeAllScreen} />
            </Stack.Navigator>
        </>
    )
}

export default UserStack