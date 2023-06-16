import { StyleSheet } from 'react-native'
import React from 'react'
import Section from './Section'
import Label from './Label'
import { COLOR, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { AboutBlue } from '../../assets/svg'

const MessageBox = ({ text, style, textStyle }) => {
    return (
        <Section row style={[styles.container, style]}>
            <AboutBlue height={hp(2)} width={hp(2)} style={styles.icon} />
            <Label text={text} style={[styles.text, textStyle]} />
        </Section>
    )
}

export default React.memo(MessageBox)

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1), paddingHorizontal: '2.5%',
        borderRadius: hp(1), marginVertical: hp(1),
        backgroundColor: COLOR.BLUE_2,
    },
    text: {
        ...TEXT_STYLE.small_text,
        width: '72%',
        color: COLOR.BLUE,
    },
    icon: {
        marginEnd: wp(2), marginTop: hp(0.3),
    }
})