import { View, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import { COLOR, commonStyles, hp, JUSTIFY, KEYBOARDTYPE, TEXT_STYLE, } from '../../enums/StyleGuide'
import { Section, LogoHeader, TextField, SelectField, Button, SelectOption, DatePicker, Pressable, Label, AppHeader, Img, CustomAlert } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { En, bloodData, genderData } from '../../enums/AppEnums'
import { styles } from './Styles'
import { formatDate, passwordStrength_, showFlash } from '../../utils/myUtils'
import { HidePassword, ShowPassword } from '../../assets/svg'
import MapModal from '../../components/modals/mapModal'
import { ACCOUNT_TYPE, KEYS } from '../../utils/Keys'
import apiRequest from '../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LocationField from '../../components/fields/LocationField'
import ImagePicker from 'react-native-image-crop-picker'

// const themeOptions = [
//   { text: 'Dark Mode' },
//   { text: 'Light Mode' },
// ]
// const accountOptions = [
//   { text: 'Hibernate account' },
//   { text: 'Close Account' },
// ]

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ appReducer }) => appReducer.user);
  const [mode, setMode] = useState('');
  const [account, setAccount] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [gender, setGender] = useState(user?.gender);
  const [birthday, setBirthday] = useState(new Date());
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [number, setNumber] = useState(user?.phone_number);
  const [bloodType, setBloodType] = useState(user?.blood_type);
  const [height, setHeight] = useState(user?.height);
  const [weight, setWeight] = useState(user?.weight);
  const [fat, setFat] = useState(user?.fat);
  const [IBM, setIBM] = useState(user?.IBM);
  const [age, setAge] = useState(user?.age);
  const [desc, setDesc] = useState(user?.description);
  const [profileImage, setProfileImage] = useState(user?.profile_picture);
  const [coverImage, setCoverImage] = useState(user?.cover_picture);
  const [currentLocation, setCurrentLocation] = useState({ latitude: parseFloat(user?.latitude), longitude: parseFloat(user?.longitude) });
  const [placeName, setplaceName] = useState({ placeName: user?.address });
  // const [isMapModalVisible, setisMapModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const mapRef = useRef(null);


  const handleImagePicker = (_image, Cover) => {
    setModalVisible(true)
    setModalData({
      message: 'Choose image from:',
      buttons: [
        {
          text: 'Camera',
          onPress: () => { openCamera(_image, Cover == 'Cover' ? 700 : 400) },
        },
        {
          text: 'Gallery',
          onPress: () => { openGallery(_image, Cover == 'Cover' ? 700 : 400) },
        },
        {
          text: En.cancel,
          onPress: () => { },
        },
      ]
    })
  }
  const openCamera = (callBack, width, height) => {
    ImagePicker.openCamera({
      height: height ? height : 400,
      width: width ? width : 700,
      cropping: true,
    }).then(async image => {
      callBack(image.path)
    }).catch(e => {
      console.log(e);
    });
  };

  const openGallery = (callBack, width, height, type) => {
    ImagePicker.openPicker({
      height: height ? height : 400,
      width: width ? width : 700,
      cropping: type === En.video ? false : true,
      multiple: type === En.multiImage ? true : false,
      mediaType: En.video,
    }).then(async image => {
      callBack(image.path)
    }).catch(e => {
      console.log(e);
    });
  };

  const handleUpdate = async () => {
    if (passwordStrength_(password) && confirmPassword && password === confirmPassword &&
      gender && firstName && lastName && bloodType && number &&
      height && weight && fat && IBM && age && desc && currentLocation && profileImage && coverImage
    ) {
      setIsLoading(true)
      const form = new FormData()
      form.append("user_id", user?.id)
      form.append("password", password)
      form.append("birthday", formatDate(birthday))
      form.append("address", placeName?.placeName)
      form.append("confirm_password", confirmPassword)
      form.append("first_name", firstName)
      form.append("last_name", lastName)
      form.append("phone_number", number)
      form.append("gender", gender)
      form.append("description", desc)
      form.append("latitude", currentLocation?.latitude)
      form.append("longitude", currentLocation?.longitude)
      form.append("blood_type", bloodType)
      form.append("height", height)
      form.append("weight", weight)
      form.append("fat", fat)
      form.append("IBM", IBM)
      form.append("age", age)
      if (profileImage) {
        let uri = profileImage
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        form.append("profile_picture", { uri: uploadUri, type: 'multipart/form-data', name: "Profile" })
      }
      if (coverImage) {
        let uri = coverImage
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        form.append("cover_picture", { uri: uploadUri, type: 'multipart/form-data', name: "Cover" })
      }

      const result = await apiRequest({
        method: METHOD.POST,
        url: ROUTES.PROFILE_UPDATE,
        data: form
      }, { 'Content-Type': 'multipart/form-data' }
      ).catch((e) => {
        console.log('ERROR', e);
        setIsLoading(false)
      });
      setIsLoading(false);

      showFlash(result?.data?.message);
      if (result?.status === 200 && result?.data?.success) {
        const profileData = {
          ...user,
          birthday: formatDate(birthday),
          address: placeName?.placeName,
          first_name: firstName,
          last_name: lastName,
          phone_number: number,
          gender: gender,
          description: desc,
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          profile_picture: profileImage,
          cover_picture: coverImage,
          blood_type: bloodType,
          height: height,
          weight: weight,
          fat: fat,
          IBM: IBM,
          age: age,
        }
        dispatch(setUser(profileData))
        AsyncStorage.setItem(KEYS.USER, JSON.stringify(profileData))
      }

    } else {
      if (!passwordStrength_(password)) {
        showFlash('Choose a strong password')
      } else if (password !== confirmPassword) {
        showFlash('Password does not match')
      }
      else {
        showFlash('Please fill in all of the required fields')
      }
    }
  }

  const handleOrgUpdate = async () => {
    if (passwordStrength_(password) && confirmPassword && password === confirmPassword &&
      firstName && lastName && number && desc &&
      currentLocation && profileImage && coverImage
    ) {
      setIsLoading(true)
      const form = new FormData()
      form.append("user_id", user?.id)
      form.append("password", password)
      form.append("address", placeName?.placeName)
      form.append("confirm_password", confirmPassword)
      form.append("first_name", firstName)
      form.append("last_name", lastName)
      form.append("phone_number", number)
      form.append("description", desc)
      form.append("latitude", currentLocation?.latitude)
      form.append("longitude", currentLocation?.longitude)
      if (profileImage) {
        let uri = profileImage
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        form.append("profile_picture", { uri: uploadUri, type: 'multipart/form-data', name: "Profile" })
      }
      if (coverImage) {
        let uri = coverImage
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        form.append("cover_picture", { uri: uploadUri, type: 'multipart/form-data', name: "Cover" })
      }

      const result = await apiRequest({
        method: METHOD.POST,
        url: ROUTES.PROFILE_UPDATE,
        data: form
      }, { 'Content-Type': 'multipart/form-data' }
      ).catch((e) => {
        console.log('ERROR', e);
        setIsLoading(false)
      });
      setIsLoading(false);

      showFlash(result?.data?.message);
      if (result?.status === 200 && result?.data?.success) {
        const profileData = {
          ...user,
          address: placeName?.placeName,
          first_name: firstName,
          last_name: lastName,
          phone_number: number,
          description: desc,
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          profile_picture: profileImage,
          cover_picture: coverImage,
        }
        dispatch(setUser(profileData))
        AsyncStorage.setItem(KEYS.USER, JSON.stringify(profileData))
      }

    } else {
      if (!passwordStrength_(password)) {
        showFlash('Choose a strong password')
      } else if (password !== confirmPassword) {
        showFlash('Password does not match')
      }
      else {
        showFlash('Please fill in all of the required fields')
      }
    }
  }

  return (
    <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
      <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

        <AppHeader
          title={'Profile'}
          LeftComp={
            <Img src={require('../../assets/images/Logo.png')} height={hp(6)} width={hp(6)} contain />
          }
        />

        <Section height={hp(25)} fillX={'5%'} spaceT={hp(2)}>
          <Pressable onClick={() => { handleImagePicker(setCoverImage, 'Cover') }}>
            <Img
              imageUrl={coverImage && coverImage}
              src={!coverImage && require('../../assets/images/homeScreen/gymImage.png')}
              style={{ borderRadius: hp(1), height: hp(22) }}
            />
          </Pressable>
          <Pressable bg={COLOR.CREAM} style={styles.profileImageContainer}
            onClick={() => { handleImagePicker(setProfileImage, 'ProfilePic') }}
          >
            {profileImage ?
              <Img
                imageUrl={profileImage?.path ? profileImage.path : profileImage}
                height={hp(14)} width={hp(14)} radius={150 / 2}
              />
              :
              <Img
                src={require('../../assets/images/homeScreen/gymLogo.png')}
                height={hp(8)} width={hp(8)} radius={150 / 2} contain
              />
            }
          </Pressable>
        </Section>


        {/* <LogoHeader title={'Profile'} spaceT={hp(5)} /> */}

        <Section spaceX={'5%'} fillB={hp(2)}>

          <TextField
            title={'First Name'}
            placeholder={'Enter your name'}
            value={firstName} onChangeText={(x) => { setFirstName(x) }}
          />
          <TextField
            title={'Last Name'}
            placeholder={'Enter your name'}
            value={lastName} onChangeText={(x) => { setLastName(x) }}
          />
          {user?.role !== ACCOUNT_TYPE.ORGANIZATION &&
            <DatePicker
              title={'Birthday'} placeholder={'Enter your Birthday'}
              value={birthday} onSelect={(x) => { setBirthday(x) }}
            />
          }

          <LocationField
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            placeName={placeName}
            setplaceName={setplaceName}
            style={styles.InputStyle}
          />

          {/* <Section style={{ marginVertical: hp(1) }}>
            <Label text={'Location'} style={{ ...TEXT_STYLE.small_text_bold, marginBottom: hp(1) }} />
            <Pressable onClick={() => getCurrentPosition(mapRef, setCurrentLocation, setplaceName)} style={[styles.InputStyle]}>
              <Label style={{ ...TEXT_STYLE.text }} text={placeName?.placeName ?? 'Get your location'} textColor={COLOR.GREY} />
            </Pressable>
          </Section>
          {currentLocation?.longitude && currentLocation?.latitude &&
            <TouchableOpacity
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                height: 200,
                width: '99%',
                marginVertical: 15,
              }}
              activeOpacity={0.8}
              onPress={() => setisMapModalVisible(true)}
            >

              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}

                initialRegion={{
                  latitude: currentLocation?.latitude,
                  longitude: currentLocation?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}


                style={styles.miniMap}
              >
                <Marker
                  coordinate={{
                    latitude: currentLocation?.latitude,
                    longitude: currentLocation?.longitude
                  }}

                />
              </MapView>
            </TouchableOpacity>
          } */}
          {/* <Section row center justify={JUSTIFY.between}>
            <SelectField title={'Competitions Won'} style={styles.selectStyle} />
            <SelectField title={'Military Status'} style={styles.selectStyle} general />
          </Section>
          <Section row center justify={JUSTIFY.between}>
            <SelectField title={'Ethinicity'} placeholder={'Select Ethnicity'} style={styles.selectStyle} />
          </Section>
          <Section row center justify={JUSTIFY.between}>
            <SelectField title={'Disability'} placeholder={'Select Disability'} style={styles.selectStyle} />
            <SelectField title={'Age'} placeholder={'Select Age'} style={styles.selectStyle} />
          </Section>
          <Section row center justify={JUSTIFY.between}>
            <SelectField title={'Language'} placeholder={'Select Language'} style={styles.selectStyle} />
          </Section>
          <SelectOption title={'Mode'}
            data={themeOptions} value={mode} callBack={setMode}
          />
          <SelectOption title={'Account Management'} titleColor={COLOR.YELLOW}
            data={accountOptions} value={account} callBack={setAccount}
          />
          <TextField
            keyboardType={KEYBOARDTYPE.NUMERIC}
            title={'Access Code'} placeholder={'Enter your Access Code'}
            value={accessCode} onChangeText={(x) => { setAccessCode(x) }}
          /> */}
          <TextField
            keyboardType={KEYBOARDTYPE.NUMERIC}
            title={'Phone number'} placeholder={'Enter your phone number'}
            value={number} onChangeText={(x) => { setNumber(x) }}
          />
          <TextField
            title={'Change Password'} placeholder={'Enter your Password'} secure={!showPassword}
            value={password} onChangeText={(x) => { setPassword(x) }}
            endSvg={showPassword ?
              <ShowPassword />
              : <HidePassword />
            }
            onEndSvg={() => { setShowPassword(!showPassword) }}
          />
          <TextField
            title={'Confirm Password'} placeholder={'Confirm your Password'} secure={!showConPassword}
            value={confirmPassword} onChangeText={(x) => { setConfirmPassword(x) }}
            endSvg={showConPassword ?
              <ShowPassword />
              : <HidePassword />
            }
            onEndSvg={() => { setShowConPassword(!showConPassword) }}
          />
          <TextField
            title={'Description'} placeholder={'Enter your Description'}
            style={{ height: hp(13) }} inputStyle={{ height: '100%' }} multiline
            value={desc} onChangeText={(x) => { setDesc(x) }}
          />

          {user?.role !== ACCOUNT_TYPE.ORGANIZATION &&
            <>
              <SelectField
                title={'Gender'} placeholder={'Select gender'}
                data={genderData}
                value={gender} onSelect={(x) => { setGender(x) }}
              />
              <SelectField
                title={'BLood Type'} placeholder={'Enter your blood type'} data={bloodData}
                value={bloodType} onSelect={(x) => { setBloodType(x) }}
              />
              <TextField
                keyboardType={KEYBOARDTYPE.NUMERIC}
                title={'Height'} placeholder={'Enter your height in inches'}
                value={height} onChangeText={(x) => { setHeight(x) }}
              />
              <TextField
                keyboardType={KEYBOARDTYPE.NUMERIC}
                title={'Weight'} placeholder={'Enter your weight in (Kg)'}
                value={weight} onChangeText={(x) => { setWeight(x) }}
              />
              <TextField
                title={'Fat'} placeholder={'Enter your body fats in percentage'}
                value={fat} onChangeText={(x) => { setFat(x) }}
              />
              <TextField
                title={'IBM'} placeholder={'Enter your IBM  in percentage'}
                value={IBM} onChangeText={(x) => { setIBM(x) }}
              />
              <TextField
                keyboardType={KEYBOARDTYPE.NUMERIC}
                title={'Age'} placeholder={'Enter your Age'}
                value={age} onChangeText={(x) => { setAge(x) }}
              />
            </>
          }

          {/* <TextField title={'Devices that remember you'} placeholder={'Enter your devices'} /> */}

          <Section spaceY={hp(1)}>
            <Button
              text={isLoading ? (<ActivityIndicator size={24} color={COLOR.BLACK} />) : 'Save'}
              textColor={COLOR.BLACK}
              onClick={() => user?.role !== ACCOUNT_TYPE.ORGANIZATION ? handleUpdate() : handleOrgUpdate()}
            />
          </Section>


        </Section>
      </KeyboardAwareScrollView>
      <CustomAlert visible={modalVisible} onClose={setModalVisible} modalData={modalData} />
      {/* <MapModal
        isVisible={isMapModalVisible}
        onclose={() => { setisMapModalVisible(false) }}
        setLocation={setCurrentLocation}
        location={currentLocation}
        mapRef_={mapRef}
        setPlaceFormatedName={setplaceName}
      /> */}
    </Section>
  )
}

export default ProfileScreen
