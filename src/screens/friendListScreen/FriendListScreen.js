import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { SearchWhite } from '../../assets/svg'
import { AppHeader, Label, ProfileBox, Section, TextField } from '../../components'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { En, SCREEN } from '../../enums/AppEnums'
import { COLOR, hp, TEXT_STYLE, wp, ActiveOpacity } from '../../enums/StyleGuide'
import { showFlash } from '../../utils/myUtils'


const FriendListScreen = ({ navigation }) => {

    const [loading, setloading] = useState(true)
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [friends, setFriends] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const unsubsribe = navigation.addListener("focus", () => {
            getUserFriends()
        });
        return unsubsribe;
    }, [navigation]);

    const getUserFriends = async () => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.USER_FRIENDS(user.id),
            });

            if (result.status === 200) {
                setFriends(result.data.data);
                setloading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeFriend = async (friendID) => {
        try {
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.REMOVE_FRIEND,
                data: { user_id: user?.id, friend_id: friendID }
            });

            if (result.status === 200) {
                showFlash(result?.data?.message)
                getUserFriends()

            }

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={'Friend List'} LeftComp={En.BackArrow} RightComp={En.Setting} />

            <Section spaceX={'5%'} spaceY={hp(1)}>
                <TextField
                    radius={150 / 2} endSvg={<SearchWhite />}
                    placeholder={'Search here'}
                    onChangeText={(e) => setSearchQuery(e)}
                />
            </Section>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>


                <TouchableOpacity
                    activeOpacity={ActiveOpacity}
                    onPress={() => navigation.navigate(SCREEN.USER_FRIEND_REQ)}
                    style={{ alignSelf: 'flex-end', marginEnd: wp(2.5) }}>
                    <Label
                        text={"FRIEND REQUESTS"}
                        style={[TEXT_STYLE.small_text, { marginBottom: 10 }]}
                        spaceL={wp(6)}
                        textColor={COLOR.YELLOW}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={ActiveOpacity}
                    onPress={() => navigation.navigate(SCREEN.ALL_USERS)}
                    style={{ alignSelf: 'flex-end', marginEnd: wp(2.5) }}>
                    <Label
                        text={"ADD FRIENDS"}
                        style={[TEXT_STYLE.small_text, { marginBottom: 10 }]}
                        spaceR={wp(3)}
                        textColor={COLOR.YELLOW}
                    />
                </TouchableOpacity>
            </View>

            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

                {loading && <ActivityIndicator size="large" animating color={COLOR.RED} />}
                {friends?.length == 0 && loading == false && (
                    <Label
                        text={"No friends found"}
                        style={[TEXT_STYLE.small_title, { textAlign: 'center', marginTop: hp(10) }]}
                        spaceR={wp(3)}
                        textColor={COLOR.LIGHT_GREY}
                    />
                )}

                {friends?.length > 0 && (
                    <Section
                        radius={hp(1)}
                        bg={COLOR.GREY_2}
                        fillX={"5%"}
                        fillY={hp(1)}
                        spaceX={"5%"}
                        spaceB={hp(2)}
                        brW={0.5}
                        brC={COLOR.YELLOW}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">

                            {friends
                                .filter((friend) => {
                                    const { user_first_name, user_last_name } = friend;
                                    const fullName = `${user_first_name} ${user_last_name}`.toLowerCase();
                                    return fullName.includes(searchQuery.toLowerCase());
                                })
                                .map((friend, index) => {
                                    const { user_first_name, user_last_name, address, user_profile_picture, id, role } = friend;
                                    return (
                                        <ProfileBox
                                            name={user_first_name + " " + user_last_name}
                                            key={index}
                                            location={address}
                                            image={user_profile_picture}
                                            friendId={id}
                                            role={role}
                                            removeFriendCallback={removeFriend}

                                        />
                                    );
                                })}
                        </ScrollView>
                    </Section>
                )}

            </KeyboardAwareScrollView>
        </View>
    )
}

export default FriendListScreen
