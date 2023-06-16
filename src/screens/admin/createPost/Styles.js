import { StyleSheet } from 'react-native'
import { COLOR, hp } from '../../../enums/StyleGuide'

export const styles = StyleSheet.create({
    headerView: { borderBottomWidth: 0.5, borderBottomColor: COLOR.LIGHT_GREY, paddingHorizontal: 0 },
    selectView: { height: hp(3), borderRadius: 150 / 2, borderWidth: 0.5, borderColor: COLOR.LIGHT_GREY },
    input: { height: '72%', borderWidth: 0, textAlignVertical: 'top' },
    img_top:{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: COLOR.RED,
        borderRadius: 10,
        padding: 5,
        zIndex: 1,
    }
})