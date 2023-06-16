import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Img, Label, Section } from '../widgets'
import { COLOR, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'

const LogoHeader = ({ title, children, titleStyle, spaceT, textColor }) => {
    return (
        <Section spaceT={spaceT} fillX={'10%'} center spaceY={hp(2)} >
            <Img
                src={require('../../assets/images/Logo.png')} contain
                height={hp(7)} width={wp('70%')} spaceB={hp(2)}
            />
            {children && children}
            {title &&
                <Label text={title}
                    textBold textColor={textColor ? textColor : COLOR.YELLOW}
                    style={[TEXT_STYLE.semi_title, titleStyle]}
                />
            }
        </Section>
    )
}

export default React.memo(LogoHeader)

const styles = StyleSheet.create({})