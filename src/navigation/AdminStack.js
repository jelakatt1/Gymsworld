import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Admin, ClassesScreen, PostCommentScreen, ProfileScreen, UserFriendRequests } from '../screens';
import { SCREEN } from '../enums/AppEnums';
import AdminBottomNavigator from './AdminBottomNavigator';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerShown: false,
};

const AdminStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name={SCREEN.ADMIN_TAB} component={AdminBottomNavigator} />
            <Stack.Screen name={SCREEN.CREATE_CLASS} component={Admin.CreateClass} />
            <Stack.Screen name={SCREEN.REPORTED} component={Admin.ReportedIssues} />
            <Stack.Screen name={SCREEN.ADD_WORKOUT} component={Admin.AddWorkout} />

            {/* <Stack.Screen name={SCREEN.CREATE_CHART} component={Admin.CreateChart} /> */}
            {/* <Stack.Screen name={SCREEN.USER_RESULTS} component={Admin.UserResults} /> */}

            <Stack.Screen name={SCREEN.TEST_SCREEN} component={Admin.TestScreen} />
            <Stack.Screen name={SCREEN.POST_COMMENTS} component={PostCommentScreen} />
            <Stack.Screen name={SCREEN.MEMBERS} component={Admin.MembersScreen} />
            <Stack.Screen name={SCREEN.USER_FRIEND_REQ} component={UserFriendRequests} />
            <Stack.Screen name={SCREEN.PROFILE} component={ProfileScreen} />
            {/* <Stack.Screen name={SCREEN.CLASSES} component={ClassesScreen} /> */}
            {/* <Stack.Screen name={SCREEN.WORKOUT} component={Admin.WorkoutScreen} /> */}
            {/* <Stack.Screen name={SCREEN.PROGRESSION} component={Admin.ProgressionScreen} /> */}
        </Stack.Navigator>
    )
}

export default AdminStack