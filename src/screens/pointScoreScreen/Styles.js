import { StyleSheet } from 'react-native'
import { COLOR, FONT_WEIGHT, hp, wp } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    headerView: {
        borderTopRightRadius: hp(2),
        borderTopLeftRadius: hp(2),
    },
    text: { color: COLOR.BLACK, fontSize: 12, width: wp(8), textAlign: 'center' },
    boldText: { color: COLOR.BLACK, fontSize: 12, ...FONT_WEIGHT.bold700 },
})
