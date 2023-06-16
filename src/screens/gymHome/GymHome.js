import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { useDispatch, useSelector } from 'react-redux'
import { Clock, DownWhite, Location, Mail, Phone, SearchWhite, SettingIconLight } from '../../assets/svg'
import { AppHeader, Img, Label, Pressable, Section, SocialPost, TextField, ScrollToTopButton } from '../../components'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { En, SCREEN } from '../../enums/AppEnums'
import { ActiveOpacity, COLOR, JUSTIFY, TEXT_STYLE, commonStyles, hp, wp } from '../../enums/StyleGuide'
import { setGymPosts } from '../../redux/actions/Actions'
import { isIOS } from '../../utils/myUtils'


const Options = [
  // { text: 'Whatsapp', route: SCREEN.USER_RESULTS },
  // { text: 'Like', route: SCREEN.PROGRESSION },
  { text: 'Create Workout Test', route: SCREEN.ADD_WORKOUT },
  { text: 'All Workout', route: SCREEN.WORKOUT },
  { text: 'Members', route: SCREEN.MEMBERS },
  // { text: 'Create Programs', route: SCREEN.CREATE_CHART },
  { text: 'View Reported Issues', route: SCREEN.REPORTED },
  { text: 'Create Classes', route: SCREEN.CREATE_CLASS },
  { text: 'All Classes', route: SCREEN.CLASSES },
  // { text: 'All Tests', route: SCREEN.TEST_SCREEN },
]


const size = hp(2)


const GymHome = ({ navigation, route }) => {

  const user = useSelector(({ appReducer }) => appReducer.user)
  const dispatch = useDispatch();

  const gymPosts = useSelector(({ appReducer }) => appReducer.gymPosts)

  const [feeds, setfeeds] = useState([])
  // const [posts, setposts] = useState([])

  const [isExpanded, setIsExpanded] = useState(false);
  const [showSrollTopButton, setSrollTopShowButton] = useState(false);

  const itemRef = useRef();

  const GYM_ID = route?.params?.GYM_ID || user?.id
  // const GYM_ID = 16

  const memoizedPosts = useMemo(() => gymPosts, [gymPosts]);

  useEffect(() => {
    getGymFeeds()
  }, [])

  const getGymFeeds = async () => {
    try {
      const result = await apiRequest({
        method: METHOD.GET,
        url: ROUTES.ORGANIZATION_HOME(GYM_ID),
      });

      if (result.status === 200) {
        setfeeds(result.data.data)
        dispatch(setGymPosts(result?.data?.data?.posts))
      }
    } catch (error) {
    }

  }

  const handleScroll = useCallback((event) => {
    const { nativeEvent: { contentOffset } } = event;
    const isScrollTopButtonVisible = contentOffset.y > 450;
    setSrollTopShowButton(isScrollTopButtonVisible);
  }, []);

  const handleScrollToTop = () => {
    itemRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const flatListHeader = () => {
    return (
      <View style={{ marginHorizontal: '-5%' }}>
        <Section height={hp(25)} fillX={'4%'}>
          <Img
            imageUrl={feeds?.org_cover_picture}
            style={{ borderRadius: 5 }}
            height={hp(22)} width={'100%'}
          />
          <Section
            height={hp(14)} width={hp(14)} bg={COLOR.CREAM} radius={150 / 2}
            justify={JUSTIFY.center} center spaceL={wp('10%')}
            style={{ position: 'absolute', bottom: 0 }}
          >
            <Img
              imageUrl={feeds?.org_profile_picture}
              contain
              height={hp(14)} width={hp(14)} radius={150 / 2}
            />
          </Section>
        </Section>

        <Section spaceY={hp(1)} fillX={'5%'}>
          <Label text={feeds?.org_full_name} style={TEXT_STYLE.semi_title} />

          <Section row center spaceT={hp(0.5)}>
            <Img
              src={require('../../assets/images/userImage.png')} contain
              height={hp(4)} width={hp(4)} radius={150 / 2} spaceR={wp(4)}
            />
            <Label text={feeds?.org_members} style={TEXT_STYLE.text_bold} spaceR={wp(3)} />
            <Label text={'Members'} style={TEXT_STYLE.text} textColor={COLOR.GREY} />
          </Section>
        </Section>
        {/* OPTIONS */}

        {
          GYM_ID ?
            <Section spaceY={hp(1)} fillX={'5%'} row style={commonStyles.flexWrap}>
              {Options.map((item, index) => {
                const { text, route } = item
                return (
                  <Pressable
                    key={index} spaceB={hp(1)} spaceR={wp(1.5)} fillX={wp(2.5)} fillY={hp(0.7)}
                    bg={COLOR.YELLOW} radius={150 / 2}
                    onClick={() => { route && navigation.navigate(route) }}
                  >
                    <Label text={text} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text_bold} />
                  </Pressable>
                )
              })}
            </Section>
            : null

        }

        <Section spaceY={hp(1)} fillX={'5%'} fillY={hp(1.5)} bg={COLOR.GREY_2} spaceX={'5%'} radius={hp(1)}>
          <Label text={'Details'} style={TEXT_STYLE.text_bold} />
          <Section row center spaceY={hp(0.5)}>
            <Location height={size} width={size} />
            <Label
              text={feeds?.org_address}
              size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)} spaceR={wp(3)}
            />
          </Section>
          <Section row center spaceY={hp(0.5)}>
            <Phone height={size} width={size} />
            <Label
              text={feeds?.org_phone_number}
              size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
            />
          </Section>
          <Section row center spaceY={hp(0.5)}>
            <Mail height={size} width={size} />
            <Label
              text={feeds?.org_email} style={{ textDecorationLine: 'underline' }}
              size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
            />
          </Section>

          <TouchableOpacity activeOpacity={ActiveOpacity} onPress={() => setIsExpanded(!isExpanded)}>
            <Section row center spaceY={hp(0.5)}>
              <Clock height={size} width={size} />
              <Label
                text={`${feeds?.org_business_hours?.[0]?.day_of_week} : ${feeds?.org_business_hours?.[0]?.opening_time} - ${feeds?.org_business_hours?.[0]?.closing_time}`}
                size={11} textColor={COLOR.LIGHT_GREY} spaceX={wp(3)}
              />
              <DownWhite height={hp(1.5)} width={hp(1.5)} />
            </Section>
          </TouchableOpacity>

          <Collapsible collapsed={!isExpanded}>
            <View>
              {
                feeds?.org_business_hours?.slice(1)?.map((item, index) => (
                  <Section row center spaceY={hp(0.5)} key={index}>
                    <Clock height={size} width={size} />
                    <Label
                      text={`${item?.day_of_week} : ${item?.opening_time} - ${item?.closing_time}`}
                      size={11} textColor={COLOR.LIGHT_GREY} spaceX={wp(3)}
                    />
                  </Section>
                ))
              }
            </View>
          </Collapsible>
        </Section>
      </View>
    )
  }


  return (
    <Section style={[commonStyles.flex_1, { paddingBottom: hp(5) }]} bg={COLOR.BLACK}>
      <AppHeader
        style={{ marginTop: isIOS() ? hp(6) : 0 }}
        // LeftComp={
        //   <Section width={wp('70%')}>
        //     <TextField
        //       radius={150 / 2} endSvg={<SearchWhite />} height={hp(5)}
        //       placeholder={'Search here'} onClick={() => { navigation.navigate(SCREEN.SEARCH) }}
        //     />
        //   </Section>
        // }
        LeftComp={En.BackArrow}
        RightComp={
          <Section row center>
            <Pressable onClick={() => { navigation.navigate(SCREEN.MENU) }}>
              <SettingIconLight height={hp(2.5)} width={hp(2.5)} />
            </Pressable>
            <Img
              imageUrl={user?.profile_picture}
              contain
              height={hp(3)} width={hp(3)} radius={150 / 2} spaceL={wp(4)}
            />
          </Section>
        }
      />

      <Section spaceX={'5%'} spaceB={hp(1)}>
        <FlatList
          ref={itemRef}
          ListHeaderComponent={flatListHeader}
          onScroll={handleScroll}
          data={memoizedPosts}
          bounces={false}
          style={{ height: isIOS() ? '86.5%' : '88%' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<View>
            <Label text={'No Feeds Found'} style={[TEXT_STYLE.text_bold, { marginTop: 20, alignSelf: 'center' }]} />

          </View>}
          renderItem={({ item, index }) => {
            const { profile_picture, files, posted_at, user_full_name,
              likes, user_id, id, video, description, comments, user_liked } = item

            return (
              <SocialPost
                profileImage={profile_picture} index={index} key={index}
                images={files} time={posted_at} accountName={user_full_name} likes={likes}
                userId={user_id} postId={id} video={video}
                description={description} feeds={memoizedPosts}
                comments={comments} user_liked={user_liked}
              />
            )
          }
          }
        />

        {
          showSrollTopButton &&
          <ScrollToTopButton onPress={handleScrollToTop} />
        }

      </Section>


    </Section>
  )
}

export default GymHome
