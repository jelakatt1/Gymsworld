import { StyleSheet } from 'react-native'
import { COLOR, hp, wp } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    input: {
        height: hp(3.5),
        width: wp(38),
        borderRadius: 150 / 2,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GREY,
    },
})