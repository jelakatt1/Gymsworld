import React, { useEffect, useState } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { SearchWhite } from '../../assets/svg'
import { AppHeader, ProfileBox, Section, TextField } from '../../components'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { En } from '../../enums/AppEnums'
import { COLOR, hp } from '../../enums/StyleGuide'
import { ACCOUNT_TYPE } from '../../utils/Keys'
import { showFlash } from '../../utils/myUtils'


const AllUsersScreen = () => {

    const [loading, setloading] = useState(true)
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.ALL_USERS,
            });

            if (result.status === 200) {
                setUsers(result.data.data);
                setloading(false);

                // console.log(JSON.stringify(result.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addFriend = async (friendID) => {
        try {
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.SEND_REQUEST,
                data: { user_id: user?.id, friend_id: friendID }
            });

            if (result.status === 200) {
                showFlash(result?.data?.message)
            }

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={'All users'} LeftComp={En.BackArrow} RightComp={En.Setting} />

            <Section spaceX={'5%'} spaceY={hp(1)}>
                <TextField
                    radius={150 / 2} endSvg={<SearchWhite />}
                    placeholder={'Search here'}
                    onChangeText={(e) => setSearchQuery(e)}

                />
            </Section>


            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                {loading && <ActivityIndicator size="large" animating color={COLOR.RED} />}

                {users?.length > 0 && (
                    <Section
                        radius={hp(1)}
                        bg={COLOR.GREY_2}
                        fillX={"5%"}
                        fillY={hp(1)}
                        spaceX={"5%"}
                        spaceY={hp(2)}
                        brW={0.5}
                        brC={COLOR.YELLOW}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">


                        {users
                                .filter((friend) => {
                                    const { first_name, last_name } = friend;
                                    const fullName = `${first_name} ${last_name}`.toLowerCase();
                                    return fullName.includes(searchQuery.toLowerCase());
                                })
                                .map((friend, index) => {
                                    const { first_name, last_name, address, profile_picture, id, role } = friend;
                                    return (
                                        <>
                                            {

                                                user.id != id &&
                                                <ProfileBox
                                                    name={first_name + " " + last_name}
                                                    key={index}
                                                    location={address}
                                                    image={profile_picture}
                                                    addFriend={true}
                                                    friendId={id}
                                                    role={role}
                                                    addFriendCallback={addFriend}
                                                />
                                            }
    
                                        </>
    
                                    );
                                })}

                        </ScrollView>
                    </Section>
                )}

            </KeyboardAwareScrollView>
        </View>
    )
}

export default AllUsersScreen
