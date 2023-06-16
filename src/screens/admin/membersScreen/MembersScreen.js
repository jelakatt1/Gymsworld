import { ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppHeader, AssignRoleModal, Button, Img, Label, Pressable, ProfileBox, Section, TextField } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { En, SCREEN } from '../../../enums/AppEnums'
import { GroupWhite, SearchBlack } from '../../../assets/svg'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import { useSelector } from 'react-redux'

const MemberItem = ({ title, DATA, addMemberCallback, addMember, isLoading }) => {
    return (
        <Section spaceY={hp(1)}>
            <Label text={title} style={TEXT_STYLE.text_bold} textColor={COLOR.YELLOW} />
            {DATA?.length > 0 ?
                <>
                    {DATA?.map((item, index) => {
                        const { user_id, user_first_name, user_last_name, user_profile_picture, user_address } = item
                        return (
                            <ProfileBox
                                key={index}
                                addFriend={addMember}
                                friendId={user_id}
                                addFriendCallback={(id) => { addMemberCallback(id) }}
                                name={`${user_first_name} ${user_last_name}`}
                                disc={user_address.length > 30 ? `${user_address.slice(0, 30)} ...` : user_address}
                                image={user_profile_picture}
                            />
                        )
                    })}
                </>
                :
                <Section style={{ ...commonStyles.center, height: hp(8) }}>
                    {isLoading ?
                        <ActivityIndicator color={COLOR.YELLOW} />
                        :
                        <Label text={'No data found'} />
                    }
                </Section>
            }
            {/* <Button text={'See All'} textColor={COLOR.BLACK} /> */}
        </Section>
    )
}

const MembersScreen = ({ navigation }) => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [userData, setUserData] = useState([]);
    const [adminData, setAdminData] = useState([]);
    const [trainerData, setTrainerData] = useState([]);
    const [orgData, setOrgData] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOrg, setIsLoadingOrg] = useState(false);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        getUser();
        getOrganizations()
    }, [showModal])

    const getUser = async () => {
        try {
            setIsLoading(true);
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.USER_FRIENDS(user?.id) // we are giving organization id to this to get memebers.
            });
            if (result.status == 200) {
                let array = result.data.data
                let adminArray = []
                let trainerArray = []
                let memberArray = []

                array.forEach(element => {
                    if (element?.user_role == 'admin') {
                        adminArray.push(element)
                    } else if (element?.user_role == 'fitness_trainer') {
                        trainerArray.push(element)
                    } else {
                        memberArray.push(element)
                    }
                });
                setAdminData(adminArray)
                setTrainerData(trainerArray)
                setUserData(memberArray)
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }
    const getOrganizations = async () => {
        try {
            setIsLoadingOrg(true);
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.USER_ORGANIZATIONS(user?.id),
            });

            if (result.status === 200) {
                let fetchData = result?.data?.data;
                let newData = []
                fetchData.forEach(element => {
                    let { id, first_name, last_name, profile_picture, username, address } = element
                    newData.push({
                        user_id: id,
                        user_first_name: first_name,
                        user_last_name: last_name,
                        user_profile_picture: profile_picture,
                        user_username: username,
                        user_address: address,
                    })
                });
                setIsLoadingOrg(false)
                setOrgData(newData)
            }
        } catch (error) {
            setIsLoadingOrg(false);
            console.log(error);
        }
    };
    const handleAddMember = (_id) => {
        setSelectedUser(_id);
        setShowModal(true);
    }
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader
                    title={'Members'}
                    LeftComp={En.BackArrow}
                    RightComp={<GroupWhite />}
                />
                <Section fillX={'5%'}>
                    <Section row center justify={JUSTIFY.between} spaceB={hp(1)}>
                        <TextField
                            placeholder={'Search by area, city and zip code'}
                            color={COLOR.WHITE} radius={hp(2)} width={wp('75%')}
                        />
                        <Pressable center justify={JUSTIFY.center} bg={COLOR.YELLOW} fill={hp(2)} radius={hp(1.8)} >
                            <SearchBlack />
                        </Pressable>
                    </Section>

                    <Pressable
                        onClick={() => navigation.navigate(SCREEN.USER_FRIEND_REQ)}
                        style={{ alignSelf: 'flex-end', marginEnd: wp(2.5) }}>
                        <Label
                            text={"FRIEND REQUESTS"}
                            style={[TEXT_STYLE.small_text, { marginBottom: 10 }]}
                            spaceL={wp(6)}
                            textColor={COLOR.YELLOW}
                        />
                    </Pressable>

                    <Label text={'New people and members who join this group will appear here.'} style={TEXT_STYLE.small_text} />

                    {/* <Section row center spaceY={hp(2)} fillB={hp(2)} brBW={0.5} brBC={COLOR.GREY}>
                        <Img
                            src={require('../../../assets/images/userImage.png')} contain
                            height={hp(6)} width={hp(6)} radius={150 / 2} spaceR={wp(4)}
                        />
                        <Section>
                            <Label text={'Andrew Gaunfield'} style={TEXT_STYLE.text_bold} />
                            <Label text={'Los Angeles, United States'} style={TEXT_STYLE.text} textColor={COLOR.GREY} />
                        </Section>
                    </Section> */}
                    <MemberItem
                        title={'Admins and Moderators'} DATA={adminData}
                        addMemberCallback={(id) => { handleAddMember(id) }}
                        isLoading={isLoading} addMember
                    />
                    <MemberItem
                        title={'Fitness Trainers'} DATA={trainerData}
                        addMemberCallback={(id) => { handleAddMember(id) }}
                        isLoading={isLoading} addMember
                    />
                    <MemberItem
                        title={'Members'} DATA={userData}
                        addMemberCallback={(id) => { handleAddMember(id) }}
                        isLoading={isLoading} addMember
                    />
                    <MemberItem
                        title={'Organizations'} DATA={orgData}
                        isLoading={isLoadingOrg}
                    />
                </Section>

            </KeyboardAwareScrollView>
            <AssignRoleModal visible={showModal} setVisible={setShowModal} userId={selectedUser} />
        </Section>
    )
}

export default MembersScreen