import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLOR, hp, KEYBOARDTYPE, TEXT_STYLE } from '../../../enums/StyleGuide'
import { Label, Button, Section, LogoHeader, TextField } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { En, SCREEN } from '../../../enums/AppEnums'
import { HidePassword, ShowPassword } from '../../../assets/svg'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import { handleEmail, passwordStrength_, showFlash } from '../../../utils/myUtils'

let size = hp(2.5);

const ForgetPassword = ({ navigation }) => {
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSend = async () => {
        if (isEmailValid) {
            setIsLoading(true)
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.FORGET_PASSWORD,
                data: { email: email }
            }).catch((e) => {
                setIsLoading(false)
                return false;
            });
            if (result.status === 200 && result.data.success) {
                showFlash(result?.data?.message);
                setIsLoading(false)
                setToggle(true);
            } else {
                showFlash(result?.data?.message);
            }
        } else {
            showFlash('Your email is not valid');
        }
    }

    const handleChange = async () => {
        if (otpCode && passwordStrength_(password)) {
            setIsLoading(true)
            const resetForm = {
                email: email,
                otp_code: otpCode,
                password: password,
            }
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.RESET_PASSWORD,
                data: resetForm
            }).catch((e) => {
                setIsLoading(false)
                return false;
            });
            setIsLoading(false)
            if (result?.status === 200 && result?.data?.success) {
                showFlash('Your password has been updated');
                navigation.navigate(SCREEN.LOGIN);
            }
            else {
                showFlash(result?.data?.message);
            }
        } else {
            if (!passwordStrength_(password)) {
                showFlash('Choose a strong password');
            } else {
                showFlash('Please fill all of the required fields');
            }
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <LogoHeader title={'Forget Password'} spaceT={hp(15)} />

                <Section spaceX={'5%'} spaceY={hp(1)} fillY={hp(1.5)} fillX={'5%'} bg={COLOR.CREAM} radius={hp(1)}>
                    <Label style={TEXT_STYLE.text} text={En.forgetWarning} textColor={COLOR.BLACK} />
                </Section>

                <Section height={hp(35)} spaceX={'5%'}>
                    {toggle ?
                        <>
                            <TextField
                                title={'Otp Code'} placeholder={'Enter your Password'}
                                value={otpCode} onChangeText={(x) => { setOtpCode(x) }}
                                keyboardType={KEYBOARDTYPE.NUMERIC}
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
                        </>
                        :
                        <TextField
                            title={'Email'}
                            placeholder={'Enter your Email'}
                            keyboardType={KEYBOARDTYPE.EMAILADDRESS}
                            value={email} onChangeText={(x) => { handleEmail(x, setEmail, setIsEmailValid); }}
                        />
                    }



                </Section>

                <Section spaceX={'5%'}>
                    <Button
                        // text={toggle ? 'Change Password' : 'Send'}
                        text={isLoading ? (<ActivityIndicator size={24} color={COLOR.BLACK} />) : toggle ? 'Change Password' : 'Send'}
                        textColor={COLOR.BLACK}
                        onClick={() => { toggle ? handleChange() : handleSend() }}
                    />
                    <Button
                        text={'Cancel'} borderColor={COLOR.YELLOW}
                        bg={COLOR.BLACK} textColor={COLOR.YELLOW}
                        onClick={() => { toggle ? setToggle(false) : navigation.goBack() }}
                    />
                </Section>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ForgetPassword
