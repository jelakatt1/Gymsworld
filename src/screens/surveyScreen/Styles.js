import { StyleSheet } from 'react-native'
import { COLOR, hp } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    headerView: {
        borderTopRightRadius: hp(2),
        borderTopLeftRadius: hp(2),
    },
    textStyle: { color: COLOR.BLACK, fontSize: 13 },
    input: {
        backgroundColor: COLOR.LIGHT_GREY_3,
        borderRadius: 150 / 2,
        borderWidth: 0.5,
        borderColor: COLOR.GREY
    },
})