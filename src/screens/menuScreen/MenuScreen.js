import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { AboutGrey, ContactGrey, FingerPrintGrey, FriendsGrey, GroupGrey, HandsGrey, HomeGrey, LogOutGrey, SettingGrey, ShirtGrey } from '../../assets/svg'
import { Img, Label, LogoHeader, Pressable, Section } from '../../components'
import { SCREEN } from '../../enums/AppEnums'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { setUser, setUserOrganizations } from '../../redux/actions/Actions'
import { ACCOUNT_TYPE, KEYS } from '../../utils/Keys'
import { isIOS, showFlash } from '../../utils/myUtils'
import { getItem } from '../../utils/asyncStorage'
import Octicons from 'react-native-vector-icons/Octicons'
import apiRequest from '../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../data/remote/routes'

let logOut = "Logout"

const MenuScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ appReducer }) => appReducer.user);
  const [userOrganizations, setuserOrganizations] = useState([])

  const handleOnPress = useCallback((_route, _title) => {
    if (!_route) {
      if (_title === logOut) {
        handleLogout();
      }
      if (_title === 'Delete Account') {
        deleteUser()
      }
    } else {
      navigation.navigate(_route);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    const keysToRemove = [KEYS.USER, KEYS.USER_ORGANIZATIONS];
    dispatch(setUser(null));
    dispatch(setUserOrganizations(null));
    await AsyncStorage.multiRemove(keysToRemove);
  }, []);


  const fetchData = useCallback(async () => {
    try {
      const result = await apiRequest({
        method: METHOD.GET,
        url: ROUTES.USER_ORGANIZATIONS(user?.id),
      });

      if (result.status === 200) {
        setuserOrganizations(result?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
    // const data = await getItem(KEYS.USER_ORGANIZATIONS);
    // if (data) {
    //   console.log(data)
    //   setuserOrganizations(data)
    // }
  }, []);

  const SettingData = useMemo(
    () => {
      if (user?.role == ACCOUNT_TYPE.USER) {
        return [
          { id: 1, text: 'About Us', svg: <AboutGrey /> },
          { id: 2, text: 'Profile Settings', svg: <SettingGrey />, route: SCREEN.PROFILE },
          { id: 3, text: 'Classes', svg: <GroupGrey />, route: SCREEN.CLASSES },
          { id: 4, text: 'Contact Us', svg: <ContactGrey />, }, // route: SCREEN.SURVEY
          { id: 5, text: 'Report Issue', svg: <Octicons name='report' color={COLOR.LIGHT_GREY} size={hp(2.5)} />, route: SCREEN.REPORT },
          { id: 6, text: 'Go to Our Store', svg: <ShirtGrey />, route: SCREEN.STORE },
          { id: 7, text: logOut, svg: <LogOutGrey /> },
          { id: 8, text: 'Delete Account', svg: <HandsGrey /> },
          // { id: 1, text: 'Home', svg: <HomeGrey />, route: SCREEN.GYM_HOME },
          // { id: 5, text: 'Language', svg: <HandsGrey />, route: SCREEN.POINT_SCORE },
          // { id: 9, text: 'Switch Account', svg: <GroupGrey />, route: SCREEN.MEMBER_LIST },
        ]
      } else {
        return [
          // { id: 5, text: 'Classes', svg: <GroupGrey />, route: SCREEN.CLASSES },
          // { id: 6, text: 'Go to Our Store', svg: <ShirtGrey />, route: SCREEN.STORE },
          { id: 1, text: 'About Us', svg: <AboutGrey /> },
          { id: 2, text: 'Profile Settings', svg: <SettingGrey />, route: SCREEN.PROFILE },
          { id: 3, text: 'Contact Us', svg: <ContactGrey />, },
          { id: 4, text: logOut, svg: <LogOutGrey /> },
          { id: 5, text: 'Delete Account', svg: <HandsGrey /> },

        ]
      }
    },
    []
  );




  useEffect(() => {
    if (user?.role == ACCOUNT_TYPE.USER) {
      fetchData();
    }
  }, [fetchData]);


  const deleteUser = async () => {
    try {
      const result = await apiRequest({
        method: METHOD.GET,
        url: ROUTES.DELETE_USER(user?.id),
      });

      if (result.status === 200) {
        showFlash('Account deleted successfully.')
        handleLogout()
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
        <LogoHeader title={'The Gym Workout'} textColor={COLOR.WHITE} spaceT={isIOS() ? hp(7) : hp(5)} />
        <Section spaceX={'5%'}>

          {SettingData.map(({ id, text, svg, route = undefined }) => (
            <Pressable row center key={id} fillY={hp(1)} spaceY={hp(0.2)} onClick={() => handleOnPress(route, text)}>
              {svg}
              <Label text={text} spaceL={wp(5)} style={TEXT_STYLE.text} />
            </Pressable>
          ))}

        </Section>

        {user?.role == ACCOUNT_TYPE.USER &&
          <Section spaceT={hp(1)} spaceX={'5%'}>
            {
              userOrganizations?.length != 0 && <Label text={'Shortcuts'} size={16} textBold spaceY={hp(1)} />
            }

            <Section row style={commonStyles.flexWrap}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>
                {userOrganizations?.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate(SCREEN.GYM_HOME, { GYM_ID: item.id })}>
                    <Section center spaceR={wp(3)} spaceB={hp(1)} width={hp(9)}>
                      <Section
                        height={hp(7)} width={hp(7)} bg={COLOR.CREAM} radius={hp(1)}
                        justify={JUSTIFY.center} center
                      >
                        <Img
                          imageUrl={item.profile_picture} contain
                          height={hp(5)} width={hp(5)} radius={150 / 2}
                        />
                      </Section>
                      <Label
                        text={`${item.first_name} ${item.last_name}`.slice(0, 18)}
                        size={10} center spaceT={hp(0.5)}
                        ellipsizeMode="tail" numberOfLines={1}
                      />
                    </Section>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </Section>
          </Section>
        }

      </ScrollView>
    </Section>
  )
}

export default MenuScreen
