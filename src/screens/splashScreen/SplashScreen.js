import { ImageBackground } from 'react-native'
import React from 'react'
import { styles } from './Styles'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { Label, Button, Section, LogoHeader } from '../../components'
import { SCREEN } from '../../enums/AppEnums'
import { ACCOUNT_TYPE } from '../../utils/Keys'

const SplashScreen = ({ navigation }) => {
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <ImageBackground source={require('../../assets/images/splashScreen/SplashBackground.png')} style={styles.backgroundStyle}>

                <LogoHeader>
                    <Section spaceY={hp(1)} row center>
                        <Label text={'Gym '} style={TEXT_STYLE.title} />
                        <Label text={'Workout'} textColor={COLOR.YELLOW} style={TEXT_STYLE.title} />
                    </Section>
                    <Label text={'THE BODY ACHIEVE WHAT THE MIND BELIEVES'} style={styles.headingText} />
                </LogoHeader>

                <Section spaceX={'5%'}>
                    <Button
                        text={'Create Company Account'}
                        textBold textColor={COLOR.BLACK}
                        onClick={() => { navigation.navigate(SCREEN.ADMIN_REGISTER) }}
                    />
                    <Button
                        text={'Create User Account'}
                        textBold textColor={COLOR.BLACK}
                        onClick={() => { navigation.navigate(SCREEN.REGISTER) }}
                    />
                    <Button
                        text={'Sign In as User'} borderColor={COLOR.YELLOW}
                        textBold bg={COLOR.BLACK} textColor={COLOR.YELLOW}
                        onClick={() => { navigation.navigate(SCREEN.LOGIN, { type: ACCOUNT_TYPE.USER }) }}
                    />
                    <Button
                        text={'Sign In as Company'} borderColor={COLOR.YELLOW}
                        textBold bg={COLOR.BLACK} textColor={COLOR.YELLOW}
                        onClick={() => { navigation.navigate(SCREEN.LOGIN, { type: ACCOUNT_TYPE.ORGANIZATION }) }}
                    />

                </Section>

            </ImageBackground>
        </Section>
    )
}

export default SplashScreen