import React, { useEffect, useState } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { EditIconGrey, Location, Mail, Message, Phone, PhotoIcon } from '../../assets/svg'
import { AppHeader, Img, Label, LeaderItem, MessageBox, OrganizationTestBox, Pressable, ScoreBox, Section, TestBox, WorkoutItem } from '../../components'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { MORE_DESIGN, SCREEN } from '../../enums/AppEnums'
import { COLOR, JUSTIFY, TEXT_STYLE, commonStyles, hp, wp } from '../../enums/StyleGuide'
import { isIOS, showFlash } from '../../utils/myUtils'
import { styles } from './Styles'
import { getItem } from '../../utils/asyncStorage'
import { KEYS } from '../../utils/Keys'
import AsyncStorage from '@react-native-async-storage/async-storage';






const size = hp(2)

const HomeScreen = ({ navigation }) => {

  const user = useSelector(({ appReducer }) => appReducer.user);

  // const userExercises = useSelector(({ appReducer }) => appReducer.userExercisesList);


  const [inputValues, setInputValues] = useState([])

  const [caloriesEaten, setcaloriesEaten] = useState()
  const [bmiType, setbmiType] = useState()
  const [bmi, setbmi] = useState()
  const [calories, setcalories] = useState()
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [topWorkouts, setTopWorkouts] = useState()
  const [testData, setTestData] = useState([])
  const [myTestData, setMyTestData] = useState([])
  const [userRoles, setUserRoles] = useState([])
  const [userExercises, setuserExercises] = useState([])



  useEffect(() => {
    homeFunctions()
  }, [])


  const homeFunctions = async () => {

    const data = await AsyncStorage.getItem(KEYS.USER)
    const parsedUser = JSON.parse(data)

    await getHomeData(parsedUser?.id)
    // await getMyBestWorkouts(parsedUser.id)
    // await getOrgTest(parsedUser.id)
    // await getUserTest(parsedUser.id)
    await getUserRoles()
    await getUserExercises()
  };

  const getUserExercises = async () => {

    try {
      const result = await apiRequest({
        method: METHOD.GET,
        url: ROUTES.USER_ECERCISES_LIST,
      });

      if (result.status === 200) {
        setuserExercises(result.data.data)
        const updatedUserExercises = result.data.data.map(exercise => ({ ...exercise, inputValue: '' }));
        setInputValues(updatedUserExercises)
      }
    } catch (error) {
    }
  }



  const handleInputValues = (index, value, todo) => {
    const newExercises = [...inputValues];
    if (todo === 'name') {
      newExercises[index].name = value;
    }
    if (todo === 'input') {
      newExercises[index].inputValue = value;
    }
    setInputValues(newExercises);
  };

  const addMoreExercises = () => {
    const newExercise = { id: inputValues.length + 1, name: '', inputValue: '' };
    setInputValues([...inputValues, newExercise]);
  };


  const submitDailyProgress = async () => {
    if (
      caloriesEaten && bmiType && bmi
      && calories
    ) {
      setIsLoading(true)
      const form = new FormData()
      form.append("user_id", user.id)
      form.append("calorie_eaten", caloriesEaten)
      form.append("calorie_burn", calories)
      form.append("BMI_type", bmiType)
      form.append("BMI", bmi)
      form.append("date", new Date().toISOString().slice(0, 10))


      if (image.path) {

        let uri = image.path
        const uploadUri = isIOS() ? uri.replace('file://', '') : uri;

        form.append("file", { uri: uploadUri, type: image?.mime, name: image.mime.replace('/', '.') })
      }

      inputValues?.forEach((item, index) => {
        if (item.inputValue === '' || item.name === '') {
          return;
        }
        form.append(`workout[${index}][name]`, item.name)
        form.append(`workout[${index}][reps]`, item.inputValue)
      })

      const result = await apiRequest({
        method: METHOD.POST,
        url: ROUTES.ADD_USER_WORKOUT,
        data: form
      }, { 'Content-Type': 'multipart/form-data' }
      ).catch((e) => {
        console.log('ERROR', e);
        setIsLoading(false)
        return false;
      });
      setIsLoading(false)

      if (result?.status === 200 && result?.data?.success) {
        showFlash('Personal workout submitted.')
      }
      else {
        showFlash('Some error occured.')
      }
    }
    else {
      showFlash('Please fill all the general fields')
    }

  }

  const getHomeData = async (userID) => {


    try {
      const result = await apiRequest({
        method: METHOD.GET,
        url: ROUTES.HOME_DATA(userID),
      });

      console.log('====================================');
      console.log(userID, result?.status);
      console.log('====================================');

      if (result.status === 200) {
        setTestData(result?.data?.data?.getUserOrgTests)
        setMyTestData(result?.data?.data?.getUserSubmittedWorkoutTests)
        setTopWorkouts(result?.data?.data?.userTopWorkOutList)
      }
    } catch (error) {
    }
  }

  // const getMyBestWorkouts = async (userID) => {
  //   try {
  //     const result = await apiRequest({
  //       method: METHOD.GET,
  //       url: ROUTES.MY_BEST_WORKOUTS(userID),
  //     });
  //     if (result.status === 200) {

  //       setTopWorkouts(result.data.data)
  //     }
  //   } catch (error) {
  //   }
  // }

  // const getOrgTest = async (userID) => {
  //   try {
  //     const result = await apiRequest({
  //       method: METHOD.GET,
  //       url: ROUTES.USER_TEST_WORKOUT(userID),
  //     });

  //     if (result.status === 200) {
  //       setTestData(result?.data?.data)
  //     }
  //   } catch (error) {
  //   }
  // }

  // const getUserTest = async (userID) => {
  //   try {
  //     const result = await apiRequest({
  //       method: METHOD.GET,
  //       url: ROUTES.SUBMITTED_TEST(userID),
  //     });

  //     if (result.status === 200) {
  //       setMyTestData(result?.data?.data)
  //     }
  //   } catch (error) {
  //   }
  // }

  const getUserRoles = async () => {
    const data = await getItem(KEYS.USER_ROLE_ORGANIZATIONS);
    if (data) {
      setUserRoles(data)
    }
  }
  const handleSeeAllNavigation = (_title, _DATA, _design) => {
    navigation.navigate(SCREEN.SEE_ALL,
      { title: _title, DATA: _DATA, design: _design }
    )
  }

  return (
    <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
      {/* Header */}
      <AppHeader
        title={'Home'}
        LeftComp={
          <Img src={require('../../assets/images/Logo.png')} height={hp(6)} width={hp(6)} contain />
        }
      />

      {/* Intro Box */}
      <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

        <Section height={hp(29)} fillX={'5%'}>
          <Img
            imageUrl={user.cover_picture}
            height={hp(22)} width={'100%'}
            style={{ borderRadius: 5 }}
          />
          <Section fill={1} width={'100%'} row justify={JUSTIFY.between}
            style={{ position: 'absolute', bottom: 0, left: '5%' }}
          >
            <Section
              height={hp(13)} width={hp(13)} bg={COLOR.CREAM} radius={150 / 2}
              justify={JUSTIFY.center} center spaceL={'4%'}
            >
              <Img
                imageUrl={user.profile_picture}
                contain
                height={hp(13)} width={hp(13)} radius={150 / 2}
              />
            </Section>

            <Section spaceT={hp(8)} width={'64%'}>
              <Section row center justify={JUSTIFY.between} spaceB={hp(0.2)}>
                <Label text={user.first_name + ' ' + user.last_name} style={TEXT_STYLE.small_title} />
                <Pressable onClick={() => { navigation.navigate(SCREEN.FRIEND_LIST) }} style={styles.buttonStyle}>
                  <Label text={'Friends'} textColor={COLOR.YELLOW} size={11} />
                </Pressable>
              </Section>
              {/* <Section row center>
                <Label text={'Fitness Trainer'} style={TEXT_STYLE.small_text} />
                <Label text={'@Shapes Body Zone'} size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(1)} />
              </Section> */}

            </Section>

          </Section>
        </Section>

        <Section style={styles.container}>
          <Label text={user.description}
            style={[TEXT_STYLE.small_text]} width={wp('75%')}
          />
          {/* <PenGrey style={{ marginTop: hp(1) }} /> */}
        </Section>

        <Section style={styles.container}>

          <Section row center justify={JUSTIFY.between}>
            <Label text={'Details'} style={TEXT_STYLE.text_bold} />
            <Section row center>
              <Pressable onClick={() => { navigation.navigate(SCREEN.SCORE_BOARD) }} style={styles.buttonStyle}>
                <Label text={'My Calander'} textColor={COLOR.YELLOW} size={11} />
              </Pressable>
              <Pressable onClick={() => { navigation.navigate(SCREEN.REFERRAL) }} style={styles.buttonStyle}>
                <Label text={'Referrals'} textColor={COLOR.YELLOW} size={11} />
              </Pressable>
            </Section>
          </Section>

          <View style={{ marginTop: hp(0.8) }}>

            <Section row spaceY={hp(0.5)}>
              <Location height={size} width={size} />
              <Label
                text={user.address}
                size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
              />
            </Section>

            <Section row spaceY={hp(0.5)}>
              <Phone height={size} width={size} />
              <Label
                text={user.phone_number}
                size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
              />
            </Section>

            <Section row spaceY={hp(0.5)}>
              <Mail height={size} width={size} />
              <Label
                text={user.email}
                size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
              />
            </Section>

            {/* <Section row spaceY={hp(0.5)}>
            <Message height={size} width={size} />
            <Label
              text={'Send Message'}
              size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
            />
          </Section> */}

            <Section row spaceY={hp(0.5)}>
              <Message height={size} width={size} />
              <Label
                text={`Gender : ${user.gender}   Blood Type : ${user.blood_type}   Height : ${user.height}   Weight : ${user.weight}kg   Fat : ${user.fat}%   BMI : ${user.IBM}% (Normal Weight)`}
                size={11} textColor={COLOR.LIGHT_GREY} spaceL={wp(3)}
              />
            </Section>
          </View>

        </Section>

        {/* CREATE POST */}

        <Section spaceY={hp(1)} fillX={'5%'} fillY={hp(1.5)} bg={COLOR.GREY_2} spaceX={'5%'} radius={hp(1)}>
          <Label text={'Posts'} style={TEXT_STYLE.text_bold} />
          <Section row center justify={JUSTIFY.between} fillB={hp(2)} spaceY={hp(1)}
            style={{ borderBottomWidth: 0.5, borderBottomColor: COLOR.LIGHT_GREY }}
          >
            <Img
              imageUrl={user.profile_picture}
              contain
              height={hp(6)} width={hp(6)} radius={150 / 2}
            />

            <Pressable height={'100%'} width={'80%'} row center
              onClick={() => { navigation.navigate(SCREEN.CREATE_POST) }}
            >
              <Label text={'What’s on your mind ?'} style={TEXT_STYLE.text} />
            </Pressable>
          </Section>

          <Section row fillY={hp(1)}>
            <Pressable onClick={() => { navigation.navigate(SCREEN.CREATE_POST) }} row center width={'50%'} >
              <PhotoIcon height={size} width={size} />
              <Label text={'Photo / Video'} style={TEXT_STYLE.small_text} spaceL={wp(2)} />
            </Pressable>

          </Section>

        </Section>
        <>
          {userRoles.length > 0 &&
            <Section style={styles.container}>
              <>
                <Label text={'Work / Organizations'} style={TEXT_STYLE.text_bold} />
                {userRoles?.map((item, index) => {
                  const { first_name, last_name, address, profile_picture, updated_year, user_role } = item
                  return (
                    <Section key={index} row center spaceY={hp(1)} justify={JUSTIFY.between}>
                      <Section row center>
                        <Img
                          src={{ uri: profile_picture }} contain
                          height={hp(6)} width={hp(6)} radius={150 / 2} spaceR={wp(5)}
                        />
                        <Section width={'72%'}>
                          <Label text={user_role} style={TEXT_STYLE.text} capital />
                          <Label text={updated_year} textColor={COLOR.LIGHT_GREY} style={TEXT_STYLE.small_text} capital />
                          <Section row center>
                            <Label text={`At `} style={TEXT_STYLE.small_text} textColor={COLOR.LIGHT_GREY} />
                            <Label text={`${first_name} ${last_name}`} style={TEXT_STYLE.small_text_bold} textColor={COLOR.LIGHT_GREY} />
                          </Section>
                        </Section>
                      </Section>
                      {/* <EditIconGrey height={size} width={size} /> */}
                    </Section>
                  )
                })}
              </>
            </Section>
          }
          <Section fillX={'5%'} fillB={hp(2)}>
            {myTestData?.length > 0 &&
              <>
                <Section row center justify={JUSTIFY.between} spaceY={hp(1)}>
                  <Label text={'My Attempted Tests'} style={TEXT_STYLE.small_title} textColor={COLOR.YELLOW} />
                  <Pressable onClick={() => { handleSeeAllNavigation('My Tests', myTestData, MORE_DESIGN.MY_TEST) }}>
                    <Label text={'See All'} style={TEXT_STYLE.small_text} />
                  </Pressable>
                </Section>
                <Section spaceY={hp(1)}>
                  {myTestData?.slice(0, 5)?.map((item, index) => {
                    return <TestBox item={item} key={index} />
                  })}
                </Section>
              </>
            }

            {testData?.length > 0 &&
              <>
                <Section row center justify={JUSTIFY.between} spaceY={hp(1)}>
                  <Label text={'Organization Tests'} style={TEXT_STYLE.small_title} textColor={COLOR.YELLOW} />
                  <Pressable onClick={() => { handleSeeAllNavigation('Organization Tests', testData, MORE_DESIGN.ORG_TEST) }}>
                    <Label text={'See All'} style={TEXT_STYLE.small_text} />
                  </Pressable>
                </Section>

                <Section spaceY={hp(1)}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>
                    {testData?.slice(0, 10).map((item, index) => {
                      return <OrganizationTestBox item={item} key={index} />
                    })}
                  </ScrollView>
                </Section>
              </>
            }

            {topWorkouts?.length != 0 &&
              <>
                <Section row center justify={JUSTIFY.between} spaceT={hp(2)} spaceY={hp(1)}>
                  <Label text={'My Best Workouts'} style={TEXT_STYLE.small_title} textColor={COLOR.YELLOW} />
                  {/* <Label text={'See All'} style={TEXT_STYLE.small_text} /> */}
                </Section>

                <Section spaceY={hp(1)}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>
                    {topWorkouts?.map((item, index) => {
                      return (
                        <WorkoutItem key={index} title={item?.name} score={item?.score_total} image={require('../../assets/images/homeScreen/image_3.png')} />
                      )
                    })}
                  </ScrollView>
                </Section>
              </>
            }

            <Section spaceT={topWorkouts?.length != 0 ? hp(-2) : 0} spaceY={hp(1)}>
              <Label text={`Explore gym's`} style={TEXT_STYLE.small_title} textColor={COLOR.YELLOW} />
            </Section>


            <Pressable onClick={() => { navigation.navigate(SCREEN.MAP) }}>
              <Img
                src={require('../../assets/images/homeScreen/mapImage.png')}
                height={hp(25)} width={'100%'} radius={hp(1)} bg={'red'}
              />
            </Pressable>

            <MessageBox text={'Click any organization near you and ask to join for test and classes'} />

            <Section spaceB={hp(1)}>
              <ScoreBox
                handleInputValues={handleInputValues}
                date={new Date().getDate()}
                month={new Date().toLocaleString('default', { month: 'short' })}
                score={'100'}
                updatedUserExercises={inputValues}
                addMoreExercises={addMoreExercises}
                setImage={setImage}
                image={image}
                setcaloriesEaten={setcaloriesEaten}
                setbmiType={setbmiType}
                setbmi={setbmi}
                setcalories={setcalories}
                loading={isLoading}
                submitDailyProgress={submitDailyProgress}
                userprofilepic={user.profile_picture}
                userExercises={userExercises}
              />

            </Section>

          </Section>


        </>



      </KeyboardAwareScrollView>
    </Section>
  )
}

export default HomeScreen
