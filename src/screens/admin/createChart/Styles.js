import { StyleSheet } from 'react-native'
import { COLOR, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'

export const styles = StyleSheet.create({
    titleStyle: {
        ...TEXT_STYLE.small_text,
    },
    inputStyle: {
        height: hp(5), width:wp('38%'), borderRadius: hp(1.5),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
})