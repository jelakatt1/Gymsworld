import { StyleSheet } from 'react-native'
import { COLOR, hp, TEXT_STYLE } from '../../../enums/StyleGuide'

export const styles = StyleSheet.create({
    titleStyle: {
        ...TEXT_STYLE.small_text, fontSize: 11
    },
    inputStyle: {
        height: hp(5.3), borderRadius: hp(2),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
    weekInput: {
        height: hp(3), borderRadius: hp(2),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
        marginBottom: 0, marginVertical: 0, marginHorizontal: 0,
    },
    miniMap: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        alignSelf: 'center'
    },
})