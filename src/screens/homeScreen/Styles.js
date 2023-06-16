import { StyleSheet } from 'react-native'
import { COLOR, hp, wp } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth: 1, borderColor: COLOR.YELLOW,
        height: hp(3), paddingHorizontal: wp(2),
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 150 / 2, marginHorizontal: wp(1),
    },
    container: {
        marginVertical: hp(1), paddingHorizontal: '5%', paddingVertical: hp(1.5),
        backgroundColor: COLOR.GREY_2,
        marginHorizontal: '5%', borderRadius: hp(1),
    },
    testContainer: {
        paddingBottom: hp(1),
        borderRadius: hp(1),
        width: wp(40),
        marginRight: wp(3),
        backgroundColor: COLOR.LIGHT_GREY_2,
    },
    testImageStyle: {
        height: hp(8),
        width: wp(40),
        borderTopRightRadius: hp(1),
        borderTopLeftRadius: hp(1),
        marginBottom: hp(1),
    },
})