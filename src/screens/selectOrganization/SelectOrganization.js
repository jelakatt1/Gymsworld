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


const SelectOrganization = ({ navigation, route }) => {

  const [loading, setloading] = useState(true)
  const user = useSelector(({ appReducer }) => appReducer.user);
  const [organizations, setOrganizations] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

  const setselectOrg = route.params.setselectOrg;

  useEffect(() => {
    getUserOrganizations()
  }, [])

  const getUserOrganizations = async () => {
    try {
      const result = await apiRequest({
        method: METHOD.GET,
        url: ROUTES.USER_ORGANIZATIONS(user?.id),
      });

      if (result.status === 200) {
        setOrganizations(result.data.data);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallback = (id, first_name, last_name) => {
    setselectOrg({
      id: id,
      firstName: first_name,
      lastName: last_name
    });
    navigation.goBack();
  };




  return (
    <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
      <AppHeader title={'Select Organization'} LeftComp={En.BackArrow} RightComp={En.Setting} />

      <Section spaceX={'5%'} spaceY={hp(1)}>
        <TextField
          radius={150 / 2} endSvg={<SearchWhite />}
          placeholder={'Search here'}
          onChangeText={(e) => setSearchQuery(e)}
        />
      </Section>


      <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

        {loading && <ActivityIndicator size="large" animating color={COLOR.RED} />}
        {organizations?.length == 0 && loading == false && (
          <Label
            text={"No data found"}
            style={[TEXT_STYLE.small_title, { textAlign: 'center', marginTop: hp(10) }]}
            spaceR={wp(3)}
            textColor={COLOR.LIGHT_GREY}
          />
        )}

        {organizations?.length > 0 && (
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

              {organizations
                .filter((friend) => {
                  const { first_name, last_name } = friend;
                  const fullName = `${first_name} ${last_name}`.toLowerCase();
                  return fullName.includes(searchQuery.toLowerCase());
                })
                .map((friend, index) => {
                  const { first_name, last_name, address, profile_picture, id, role } = friend;
                  return (
                    <TouchableOpacity key={index} activeOpacity={ActiveOpacity}
                      onPress={() => handleCallback(id, first_name, last_name)}>

                      <ProfileBox
                        name={first_name + " " + last_name}
                        key={index}
                        location={address}
                        image={profile_picture}
                        friendId={id}
                        role={role}

                      />
                    </TouchableOpacity>

                  );
                })}
            </ScrollView>
          </Section>
        )}

      </KeyboardAwareScrollView>
    </View>
  )
}

export default SelectOrganization
