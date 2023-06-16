import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { COLOR, hp, KEYBOARDTYPE, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { Label, Button, Pressable, Section, TextField, SelectField, CheckBox, DatePicker, CustomAlert, Img, AppHeader } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { HidePassword, ShowPassword } from '../../../assets/svg'
import { bloodData, En, genderData, SCREEN } from '../../../enums/AppEnums'
import { styles } from './Styles'
import { ACCOUNT_TYPE } from '../../../utils/Keys'
import { formatDate, handleEmail, openCamera, openGallery, passwordStrength_, showFlash } from '../../../utils/myUtils'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import useLocation from '../../../hooks/location'
import MapModal from '../../../components/modals/mapModal'
import MapView, { PROVIDER_GOOGLE, Marker, PROVIDER_DEFAULT, Callout } from 'react-native-maps';



let size = hp(2.5);

const RegisterScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comfirmed, setComfirmed] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fat, setFat] = useState('');
    const [IBM, setIBM] = useState('');
    const [age, setAge] = useState('');
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
            comfirmed && isEmailValid && number && birthday && bloodType && height && weight
            && passwordStrength_(password) && confirmPassword && firstName && desc && password === confirmPassword
            && lastName && username && gender && fat && IBM && age && profileImage && coverImage && currentLocation
        ) {
            setIsLoading(true)
            const form = new FormData()
            form.append("role", ACCOUNT_TYPE.USER)
            form.append("username", username)
            form.append("email", email)
            form.append("password", password)
            form.append("birthday", formatDate(birthday))
            form.append("address", placeName?.placeName)
            form.append("confirm_password", confirmPassword)
            form.append("phone_number", number)
            form.append("first_name", firstName)
            form.append("last_name", lastName)
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
            if (accessCode) {
                form.append("access_code", accessCode)
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

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.REGISTER,
                data: form
            }, { 'Content-Type': 'multipart/form-data' }
            ).catch((e) => {
                console.log('ERROR', e);
                setIsLoading(false)
            });
            setIsLoading(false)
            if (result.status === 200 && result.data.success) {
                showFlash('User Registered Successfully')
                navigation.navigate(SCREEN.LOGIN, { type: ACCOUNT_TYPE.USER })
            }
            else {
                showFlash(result?.data?.message)
            }
        } else {
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

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

                <AppHeader
                    title={'Register'}
                    LeftComp={
                        <Img src={require('../../../assets/images/Logo.png')} height={hp(6)} width={hp(6)} contain />
                    }
                />

                <Section height={hp(25)} fillX={'5%'} spaceT={hp(2)}>
                    <Pressable onClick={() => { handleImagePicker(setCoverImage, 'Cover') }}>
                        <Img
                            imageUrl={coverImage && coverImage?.path}
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
                        value={email} onChangeText={(x) => { handleEmail(x, setEmail, setIsEmailValid) }}
                    />
                    <TextField
                        title={'Username'} placeholder={'Enter your Username'}
                        value={username} onChangeText={(x) => { setUsername(x) }}
                    />
                    <SelectField
                        title={'Gender'} placeholder={'Select Gender'} data={genderData}
                        value={gender} onSelect={(x) => { setGender(x) }}
                    />
                    <TextField
                        title={'Phone Number'} placeholder={'Enter your number'}
                        keyboardType={KEYBOARDTYPE.NUMERIC}
                        value={number} onChangeText={(x) => { setNumber(x) }}
                    />
                    <DatePicker
                        title={'Birthday'} placeholder={'Enter your Birthday'}
                        value={birthday} onSelect={(x) => { setBirthday(x) }}
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
                        title={'BMI'} placeholder={'Enter your BMI in percentage'}
                        value={IBM} onChangeText={(x) => { setIBM(x) }}
                    />
                    <TextField
                        keyboardType={KEYBOARDTYPE.NUMERIC}
                        title={'Age'} placeholder={'Enter your Age'}
                        value={age} onChangeText={(x) => { setAge(x) }}
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
                    }
                    <TextField
                        keyboardType={KEYBOARDTYPE.NUMERIC}
                        title={'Access Code'} placeholder={'Enter your Access Code'}
                        value={accessCode} onChangeText={(x) => { setAccessCode(x) }}
                    />
                    <TextField
                        title={'Description'} placeholder={'Enter your Description'}
                        style={styles.multiInput} inputStyle={{ height: '100%' }} multiline
                        value={desc} onChangeText={(x) => { setDesc(x) }}
                    />

                    <CheckBox
                        text={En.registerConfirmation} check={comfirmed} size={hp(1.6)}
                        textStyle={TEXT_STYLE.small_text} onClick={() => { setComfirmed(!comfirmed) }}
                    />

                    <Button
                        text={isLoading ? (<ActivityIndicator size={24} color={COLOR.BLACK} />) : 'Register'}
                        textBold textColor={COLOR.BLACK} onClick={() => { handleRegister() }}
                    />

                    <Section row center selfCenter spaceT={hp(1)}>
                        <Label text={'Already have an account?'} style={TEXT_STYLE.small_text_bold} spaceR={wp(2)} />
                        <Pressable onClick={() => { navigation.goBack() }}>
                            <Label text={'Login'} style={[TEXT_STYLE.small_text_bold,{marginStart: -5}]} textColor={COLOR.YELLOW} />
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
        </View>
    )
}

export default RegisterScreen

