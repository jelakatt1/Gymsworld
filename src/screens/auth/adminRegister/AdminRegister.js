import React, { useRef, useState } from 'react'
import { ActivityIndicator, Platform, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView, { PROVIDER_GOOGLE, Marker, PROVIDER_DEFAULT, Callout } from 'react-native-maps';

import { HidePassword, ShowPassword } from '../../../assets/svg'
import { AppHeader, Button, CheckBox, CustomAlert, Img, Label, Pressable, Section, TextField, WorkingHours } from '../../../components'
import MapModal from '../../../components/modals/mapModal'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import apiRequest from '../../../data/remote/webHandler'
import { En, SCREEN } from '../../../enums/AppEnums'
import { COLOR, hp, KEYBOARDTYPE, TEXT_STYLE } from '../../../enums/StyleGuide'
import useLocation from '../../../hooks/location'
import { ACCOUNT_TYPE } from '../../../utils/Keys'
import { handleEmail, isIOS, openCamera, openGallery, passwordStrength_, showFlash } from '../../../utils/myUtils'
import { styles } from './Styles'


let size = hp(2.5);

const weekDays = [
    { day: 'Monday' },
    { day: 'Tuesday' },
    { day: 'Wednesday' },
    { day: 'Thursday' },
    { day: 'Friday' },
    { day: 'Saturday' },
    { day: 'Sunday' },
]

const AdminRegister = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comfirmed, setComfirmed] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [webLink, setWebLink] = useState('');
    const [businessHours, setBusinessHours] = useState([]);

    const [desc, setDesc] = useState('');
    const [profileImage, setProfileImage] = useState();
    const [coverImage, setCoverImage] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})
    const [currentLocation, setCurrentLocation] = useState();
    const [isMapModalVisible, setisMapModalVisible] = useState(false)
    const [placeName, setplaceName] = useState({})
    const { getCurrentPosition } = useLocation()

    const mapRef = useRef(null)


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

    const handleRegister = async () => {
        if (
            comfirmed && isEmailValid && number && password === confirmPassword
            && confirmPassword && passwordStrength_(password) && profileImage && coverImage
            && lastName && firstName && username && desc && currentLocation
            && webLink
        ) {
            setIsLoading(true)
            const form = new FormData()
            form.append("role", ACCOUNT_TYPE.ORGANIZATION)
            form.append("email", email)
            form.append("username", username)
            form.append("phone_number", number)
            form.append("password", password)
            form.append("confirm_password", confirmPassword)
            form.append("access_code", accessCode)
            form.append("latitude", currentLocation?.latitude)
            form.append("longitude", currentLocation?.longitude)
            form.append("country", placeName?.country)
            form.append("address", placeName?.placeName)
            form.append("zip_code", placeName?.zip)
            if (firstName) {
                form.append("first_name", firstName)
            }
            if (lastName) {
                form.append("last_name", lastName)
            }
            if (webLink) {
                form.append("website_link", webLink)
            }

            if (desc) {
                form.append("description", desc)
            }
            if (profileImage.path) {
                let uri = profileImage?.path
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                form.append("profile_picture", { uri: uploadUri, type: 'multipart/form-data', name: "Profile" })
            }
            if (coverImage.path) {
                let uri = coverImage?.path
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                form.append("cover_picture", { uri: uploadUri, type: 'multipart/form-data', name: "Cover" })
            }
            if (businessHours) {
                businessHours?.forEach((item, index) => {
                    form.append(`business_hours[${index}][day_of_week]`, item.day_of_week)
                    form.append(`business_hours[${index}][status]`, item.status.toString())
                    form.append(`business_hours[${index}][opening_time]`, item.opening_time)
                    form.append(`business_hours[${index}][closing_time]`, item.closing_time)
                })
            }

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.REGISTER,
                data: form
            }, { 'Content-Type': 'multipart/form-data' }
            ).catch((e) => {
                console.log('ERROR', e);
                setIsLoading(false)
                return false;
            });
            setIsLoading(false)

            if (result?.status === 200 && result?.data?.success) {
                showFlash('Organization Registered Successfully')
                navigation.navigate(SCREEN.LOGIN, { type: ACCOUNT_TYPE.ORGANIZATION })
            }
            else {
                showFlash('Some error occured.')
            }
        }
        else {
            if (!isEmailValid) {
                showFlash('Your Email is not Valid')
            } else if (!passwordStrength_(password)) {
                showFlash('Choose a strong password')
            } else if (password !== confirmPassword) {
                showFlash('Password does not match')
            }
            else {
                showFlash('Please fill in all of the required fields')
            }
        }

    }

    const handleChangeBusinessHour = (day, status, openTime, closeTime) => {
        const exists = businessHours?.find((x) => x.day_of_week == day)
        if (exists) {
            setBusinessHours(businessHours?.filter((x) => x.day_of_week != day))
        } else {
            let data = businessHours
            data.push({ day_of_week: day, status: status == true ? 1 : 0, opening_time: openTime, closing_time: closeTime })
            setBusinessHours(data)
        }
    }

    const handleTimeChange = (day, type, time) => {
        const exists = businessHours?.find((x) => x.day_of_week == day)
        if (exists) {
            let data = businessHours.map((x) => {
                if (x.day_of_week == day) {
                    if (type == 'opening') {
                        let data = { ...x, opening_time: time }
                        return data
                    } else if (type == 'closing') {
                        let data = { ...x, closing_time: time }
                        return data
                    }
                } else {
                    return x
                }
            })
            setBusinessHours(data)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader
                title={'Register'}
                LeftComp={
                    <Img src={require('../../../assets/images/Logo.png')} height={hp(6)} width={hp(6)} contain />
                }
            />
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

                <Section height={hp(25)} fillX={'5%'} spaceT={hp(5)}>
                    <Pressable onClick={() => { handleImagePicker(setCoverImage, 'Cover') }}>
                        <Img
                            imageUrl={coverImage && coverImage.path}
                            src={!coverImage && require('../../../assets/images/homeScreen/gymImage.png')}
                            style={{ borderRadius: hp(1), height: hp(22) }}
                        />
                    </Pressable>
                    <Pressable bg={COLOR.CREAM} style={styles.profileImageContainer}
                        onClick={() => { handleImagePicker(setProfileImage, 'ProfilePic') }}
                    >
                        {profileImage?.path ?
                            <Img
                                imageUrl={profileImage.path}
                                height={hp(14)} width={hp(14)} radius={150 / 2}
                            />
                            :
                            <Img
                                src={require('../../../assets/images/homeScreen/gymLogo.png')}
                                height={hp(8)} width={hp(8)} radius={150 / 2} contain
                            />
                        }
                    </Pressable>
                </Section>

                <Section spaceX={'5%'} spaceB={hp(4)}>
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

                    <TextField
                        keyboardType={KEYBOARDTYPE.EMAILADDRESS}
                        title={'Email'} placeholder={'Enter your Email'}
                        value={email} onChangeText={(x) => { handleEmail(x, setEmail, setIsEmailValid); }}
                    />
                    <TextField
                        title={'Username'} placeholder={'Enter your Username'}
                        value={username} onChangeText={(x) => { setUsername(x) }}
                    />
                    <TextField
                        title={'Password'} placeholder={'Enter your Password'} secure={!showPassword}
                        value={password} onChangeText={(x) => { setPassword(x) }}
                        endSvg={showPassword ?
                            <ShowPassword height={size} width={size} />
                            : <HidePassword height={size} width={size} />
                        }
                        onEndSvg={() => { setShowPassword(!showPassword) }}
                    />
                    <TextField
                        title={'Confirm Password'} placeholder={'Confirm your Password'} secure={!showConPassword}
                        value={confirmPassword} onChangeText={(x) => { setConfirmPassword(x) }}
                        endSvg={showConPassword ?
                            <ShowPassword height={size} width={size} />
                            : <HidePassword height={size} width={size} />
                        }
                        onEndSvg={() => { setShowConPassword(!showConPassword) }}
                    />
                    <TextField
                        keyboardType={KEYBOARDTYPE.NUMERIC}
                        title={'Access Code'} placeholder={'Enter your Access Code'}
                        value={accessCode} onChangeText={(x) => { setAccessCode(x) }}
                    />


                    <View style={{ marginVertical: hp(1) }}>
                        <Label text={'Location'} style={{ ...TEXT_STYLE.small_text_bold, marginBottom: hp(1) }} />
                        <Pressable onClick={() => getCurrentPosition(mapRef, setCurrentLocation, setplaceName)} style={[styles.InputStyle]}>
                            <Label style={{ ...TEXT_STYLE.text }} text={placeName?.placeName ?? 'Get your location'} textColor={COLOR.GREY} />
                        </Pressable>
                    </View>

                    {
                        currentLocation?.longitude && currentLocation?.latitude &&
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
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps

                                initialRegion={{
                                    latitude: currentLocation?.latitude,
                                    longitude: currentLocation?.longitude,
                                    // latitudeDelta: 0.0922,
                                    // longitudeDelta: 0.0421,
                                    latitudeDelta: isIOS() ? 0.1322 : 0.0922,
                                    longitudeDelta: isIOS() ? 0.0821 : 0.0421,
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
                    }

                    <TextField
                        title={'About Organization'} placeholder={'Enter about your organization'}
                        style={styles.multiInput} inputStyle={{ height: '100%' }} multiline
                        value={desc} onChangeText={(x) => { setDesc(x) }}
                    />

                    <TextField
                        title={'Phone Number'} placeholder={'Enter your number'}
                        keyboardType={KEYBOARDTYPE.NUMERIC}
                        value={number} onChangeText={(x) => { setNumber(x) }}
                    />
                    <TextField
                        title={'Website Link'} placeholder={'Enter your Website Link'}
                        value={webLink} onChangeText={(x) => { setWebLink(x) }}
                    />
                    <Section spaceY={hp(1)}>
                        <Label text={'Business Hours'} style={TEXT_STYLE.small_text_bold} spaceB={hp(0.5)} />
                        {weekDays.map((item, index) => {
                            const { day } = item
                            return (
                                <WorkingHours
                                    key={index} day={day}
                                    data={businessHours}
                                    onStatusChange={(day_, status, openTime, closeTime) => handleChangeBusinessHour(day_, status, openTime, closeTime)}
                                    onTimeChange={handleTimeChange}
                                />
                            )
                        })}

                    </Section>

                    <CheckBox
                        text={En.registerConfirmation} check={comfirmed} size={hp(1.6)}
                        textStyle={TEXT_STYLE.small_text} onClick={() => { setComfirmed(!comfirmed) }}
                    />

                    <Button
                        text={isLoading ? (<ActivityIndicator size={24} color={COLOR.BLACK} />) : 'Register'}
                        textColor={COLOR.BLACK} onClick={() => { handleRegister() }}
                    />

                    <Section row center selfCenter spaceT={hp(1)}>
                        <Pressable onClick={() => { navigation.goBack() }}>
                            <Label text={'Login'} style={TEXT_STYLE.small_text_bold} textColor={COLOR.YELLOW} />
                        </Pressable>
                    </Section>
                </Section>
            </KeyboardAwareScrollView>

            <CustomAlert visible={modalVisible} onClose={setModalVisible} modalData={modalData} />

            <MapModal
                isVisible={isMapModalVisible}
                onclose={() => { setisMapModalVisible(false) }}
                setLocation={setCurrentLocation}
                location={currentLocation}
                mapRef_={mapRef}
                setPlaceFormatedName={setplaceName}
            />
        </View >
    )
}

export default AdminRegister

