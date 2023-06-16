import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLOR, hp, KEYBOARDTYPE, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { Label, Button, Pressable, Section, LogoHeader, TextField, SelectField } from '../../../components'
import { SCREEN } from '../../../enums/AppEnums'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { HidePassword, ShowPassword } from '../../../assets/svg'
import { useDispatch } from "react-redux"
import { setToken, setUser, setUserOrganizations } from '../../../redux/actions/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCOUNT_TYPE, KEYS } from '../../../utils/Keys'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import { handleEmail, showFlash } from '../../../utils/myUtils'

let size = hp(2.5);

let organizationRoles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Owner', value: 'owner' },
]

const userD = {
    email: 'test',
    password: 'password',
    username: 'testUsername',
}


const LoginScreen = ({ navigation, route }) => {
    const type = route?.params?.type;

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [gymUsername, setGymUsername] = useState('');
    const [orgRole, setOrgRole] = useState('owner');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleLogin = async () => {
        if (isEmailValid && password != '') {
            setIsLoading(true)
            const loginData = {
                email: email,
                password: password,
            }
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.LOGIN,
                data: loginData
            }).catch((error) => {
                setIsLoading(false)
                return false;
            });

            if (result.status === 200 && result.data.success) {
                setIsLoading(false)

                showFlash(result?.data?.message)
                let dataArray = Object.values(result?.data?.data?.userOrganizations)
                AsyncStorage.setItem(KEYS.USER_ORGANIZATIONS, JSON.stringify(dataArray))
                dispatch(setUserOrganizations(dataArray))

                AsyncStorage.setItem(KEYS.USER_ROLE_ORGANIZATIONS, JSON.stringify(result?.data?.data?.userRolesInOrganizations))

                dispatch(setToken(result?.data?.data?.token))
                AsyncStorage.setItem(KEYS.TOKEN, result?.data?.data?.token)
                dispatch(setUser(result?.data?.data?.info))
                AsyncStorage.setItem(KEYS.USER, JSON.stringify(result?.data?.data?.info))

            } else {
                setIsLoading(false)
                showFlash(result.data.message)
            }
        }
        else {
            if (!isEmailValid) {
                showFlash('Email is not valid')
            } else {
                showFlash('Please fill in all of the fields')
            }
        }
    }

    const handleOrgLogin = async () => {
        if (isEmailValid && password != '' && orgRole) {
            setIsLoading(true)
            const loginForm = new FormData()
            loginForm.append("email", email)
            loginForm.append("password", password)
            loginForm.append("role_in_organization", orgRole)
            if (orgRole == 'admin') {
                if (gymUsername) {
                    loginForm.append("org_username", gymUsername)
                } else {
                    showFlash('Organization username is required')
                    setIsLoading(false);
                }
            }
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.ORGANIZATON_LOGIN,
                data: loginForm
            }, { 'Content-Type': 'multipart/form-data' }
            ).catch((error) => {
                setIsLoading(false)
                return false;
            });

            if (result.status === 200 && result.data.success) {
                setIsLoading(false)

                showFlash(result?.data?.message)
                // AsyncStorage.setItem(KEYS.USER_ORGANIZATIONS, JSON.stringify(result?.data?.data?.userOrganizations))

                dispatch(setToken(result?.data?.data?.token))
                AsyncStorage.setItem(KEYS.TOKEN, result?.data?.data?.token)
                dispatch(setUser(result?.data?.data?.info))
                AsyncStorage.setItem(KEYS.USER, JSON.stringify(result?.data?.data?.info))

            } else {
                setIsLoading(false)
                showFlash(result.data.message)
            }
        }
        else {
            if (!isEmailValid) {
                showFlash('Email is not valid')
            } else {
                showFlash('Please fill in all of the fields')
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <LogoHeader title={'Login'} spaceT={hp(15)} />

                <Section height={hp(45)} spaceX={'5%'}>
                    {type == ACCOUNT_TYPE.ORGANIZATION &&
                        <SelectField
                            title={'Role'} placeholder={'Select your role'}
                            data={organizationRoles}
                            value={orgRole} onSelect={(x) => { setOrgRole(x) }}
                        />
                    }
                    {orgRole == 'admin' &&
                        <TextField
                            title={'Gym Username'}
                            placeholder={'Enter your gym username'}
                            value={gymUsername} onChangeText={(x) => { setGymUsername(x) }}
                            keyboardType={KEYBOARDTYPE.EMAILADDRESS}
                        />
                    }
                    <TextField
                        title={'Phone number, Username or Email'}
                        placeholder={'Enter your Email'}
                        value={email} onChangeText={(x) => { handleEmail(x, setEmail, setIsEmailValid) }}
                        keyboardType={KEYBOARDTYPE.EMAILADDRESS}
                    />

                    <TextField
                        title={'Password'} placeholder={'Enter your Password'}
                        value={password} onChangeText={(x) => { setPassword(x) }}
                        secure={!showPassword} forget
                        endSvg={showPassword ?
                            <ShowPassword height={size} width={size} />
                            : <HidePassword height={size} width={size} />
                        }
                        onEndSvg={() => { setShowPassword(!showPassword) }}
                    />
                </Section>

                <Section spaceX={'5%'}>
                    <Button
                        text={isLoading ? (<ActivityIndicator size={24} color={COLOR.BLACK} />) : 'Log In'}
                        textBold textColor={COLOR.BLACK}
                        onClick={() => { type == ACCOUNT_TYPE.ORGANIZATION ? handleOrgLogin() : handleLogin() }}
                    />
                    <Label text={'or login with '} center spaceY={hp(1)} style={TEXT_STYLE.small_text} />
                    <Section row center selfCenter spaceB={hp(2)}>
                        <Label text={'Don’t have an account?'} style={TEXT_STYLE.small_text_bold} spaceR={wp(2)} />
                        <Pressable onClick={() => { navigation.navigate(SCREEN.REGISTER) }}>
                            <Label text={'Register'} textColor={COLOR.YELLOW} style={[TEXT_STYLE.small_text_bold, { marginStart: -5 }]} />
                        </Pressable>
                    </Section>
                </Section>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default LoginScreen
